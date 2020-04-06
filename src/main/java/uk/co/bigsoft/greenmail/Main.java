package uk.co.bigsoft.greenmail;

import java.util.Properties;

import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.standalone.HttpGreenMailStandaloneRunner;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.Javalin;
import io.javalin.http.staticfiles.Location;
import uk.co.bigsoft.greenmail.http.commands.ImapAllMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapGetInBoxCommand;
import uk.co.bigsoft.greenmail.http.commands.ListUsersCommand;
import uk.co.bigsoft.greenmail.http.commands.PurgeEmailFromAllMailboxesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesForDomainCommand;
import uk.co.bigsoft.greenmail.http.commands.ResetCommand;
import uk.co.bigsoft.greenmail.http.commands.Utils;

public class Main {

	public static void main(String[] args) {
		final Properties properties = System.getProperties();

		HttpGreenMailStandaloneRunner runner = new HttpGreenMailStandaloneRunner(properties);
		runner.doRun(properties);

		populate(runner.getMailer());
		startHttpServer(runner.getMailer());
	}

	private static void populate(GreenMail gm) {
		try {

			Utils utils = new Utils();
			UserManager um = gm.getManagers().getUserManager();
			ImapHostManager im = gm.getManagers().getImapHostManager();
			GreenMailUser user1 = um.createUser("myemail@blar.com", "mylogin", "mypass");
			GreenMailUser user2 = um.createUser("youremail", "yourlogin", "yourpass");

			im.createPrivateMailAccount(user1);
			im.createPrivateMailAccount(user2);

			MailFolder fm1 = im.getInbox(user1);
			MailFolder fm2 = im.getInbox(user2);

			MimeMessage m1 = utils.createMessage(gm, "sub1", "myemail@blar.com", "myemail@blar.com", "the body");
			MimeMessage m2 = utils.createMessage(gm, "sub2", "myemail@blar.com", "myemail@blarblar.com",
					"the body again");
			user1.deliver(m1);
			user1.deliver(m2);

			// fm1.store(m1);
			// fm1.store(utils.createMessage();

			// fm1.cr
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private static void startHttpServer(GreenMail greenMail) {
		Javalin app = Javalin.create().start(7000);
		app.config.addStaticFiles("/web", Location.CLASSPATH);
		app.get("/imap", new ImapAllMessagesCommand(greenMail));
		app.get("/imap/:user/inbox", new ImapGetInBoxCommand(greenMail));
		app.get("/lu", new ListUsersCommand(greenMail));
		app.get("/p", new PurgeEmailFromAllMailboxesCommand(greenMail));
		app.get("/rm", new ReceivedMessagesCommand(greenMail));
		app.get("/rmd/:domain", new ReceivedMessagesForDomainCommand(greenMail));
		app.get("/r", new ResetCommand(greenMail));
	}
}
