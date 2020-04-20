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
import uk.co.bigsoft.greenmail.http.commands.CfgCommand;
import uk.co.bigsoft.greenmail.http.commands.DeleteMailboxCommand;
import uk.co.bigsoft.greenmail.http.commands.DeleteMessageCommand;
import uk.co.bigsoft.greenmail.http.commands.DeleteUserCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapAllMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapGetInBoxCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapListMailBoxCommand;
import uk.co.bigsoft.greenmail.http.commands.ListUsersCommand;
import uk.co.bigsoft.greenmail.http.commands.MailboxMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.PurgeEmailFromAllMailboxesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesForDomainCommand;
import uk.co.bigsoft.greenmail.http.commands.ResetCommand;
import uk.co.bigsoft.greenmail.http.commands.Utils;
import uk.co.bigsoft.greenmail.http.commands.ViewMessageCommand;

public class Main {

	private static Cfg cfg = new Cfg();
	
	public static void main(String[] args) {
		final Properties properties = System.getProperties();

		HttpGreenMailStandaloneRunner runner = new HttpGreenMailStandaloneRunner(properties);
		runner.doRun(properties);

		populate(runner.getMailer());
		startHttpServer(runner.getMailer());
	}

	private static void populate(GreenMail gm) {
		if (!cfg.useTestData()) {
			return;
		}
		
		try {

			Utils utils = new Utils();
			UserManager um = gm.getManagers().getUserManager();
			ImapHostManager im = gm.getManagers().getImapHostManager();

			GreenMailUser user1 = um.createUser("blar@blar.com", "blar", "b123");
			GreenMailUser user2 = um.createUser("foo@foo.com", "foo", "f123");

			MailFolder user1Inbox = im.getInbox(user1);
			MailFolder user2Inbox = im.getInbox(user2);
			MailFolder user1Other = im.createMailbox(user1, "otherfolder1");
			MailFolder user2Other = im.createMailbox(user2, "otherfolder2");

			MimeMessage m1 = utils.createMessage(gm, "sub1", "blar@blar.com", "boo@dest1.com", "blar to dest1");
			MimeMessage m2 = utils.createMessage(gm, "sub2", "foo@foo.com", "boo@dest2.com", "foo to dest2");
			MimeMessage m3 = utils.createMessage(gm, "sub3", "boo@dest1.com", "blar@blar.com", "dest1 to blar");
			MimeMessage m4 = utils.createMessage(gm, "sub4", "boo@dest2.com", "foo@foo.com", "dest2 to foo");


			System.out.println("Store1");
			user1Inbox.store(m1);
			System.out.println("Store2");
			user1Inbox.store(m3);

			System.out.println("Store3");
			user1Other.store(m2);
			System.out.println("Store4");
			user2Other.store(m4);
			System.out.println("Store done");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	private static void startHttpServer(GreenMail greenMail) {
		Javalin app = Javalin.create().start(7000);
		app.config.addStaticFiles("/web", Location.CLASSPATH);
		app.get("/imap/:email/inbox", new ImapGetInBoxCommand(greenMail));
		app.get("/imap/:email", new ImapListMailBoxCommand(greenMail));
		app.get("/imap", new ImapAllMessagesCommand(greenMail));
		app.get("/lu", new ListUsersCommand(greenMail));
		app.get("/p", new PurgeEmailFromAllMailboxesCommand(greenMail));
		app.get("/rm", new ReceivedMessagesCommand(greenMail));
		app.get("/rmd/:domain", new ReceivedMessagesForDomainCommand(greenMail));
		app.get("/r", new ResetCommand(greenMail));
		app.get("/cfg", new CfgCommand(greenMail));
		app.get("/m/:mailbox", new MailboxMessagesCommand(greenMail));
		app.get("/m/:mailbox/delete", new DeleteMailboxCommand(greenMail));
		app.get("/d/:mailbox/:uid", new DeleteMessageCommand(greenMail));
		app.get("/v/:mailbox/:uid", new ViewMessageCommand(greenMail));
		app.get("/u/:email/delete", new DeleteUserCommand(greenMail));
	}
}
