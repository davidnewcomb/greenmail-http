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
import uk.co.bigsoft.greenmail.http.commands.DeleteMessageCommand;
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

			GreenMailUser user1 = um.createUser("blar@blar.com", "blar", "b123");
			GreenMailUser user2 = um.createUser("foo@foo.com", "foo", "f123");

			user1.create();
			user2.create();

			// im.createPrivateMailAccount(user1);
			// im.createPrivateMailAccount(user2);
			//
			// // POP
			// um.addUser(user1);
			// um.addUser(user2);

			// gm.getPop3().getState().

			// IMAP

			MailFolder fm1 = im.getInbox(user1);
			MailFolder fm2 = im.getInbox(user2);

			MimeMessage m1 = utils.createMessage(gm, "sub1", "blar@blar.com", "boo@dest1.com", "blar to dest1");
			MimeMessage m2 = utils.createMessage(gm, "sub2", "foo@foo.com", "boo@dest2.com", "foo to dest2");
			MimeMessage m3 = utils.createMessage(gm, "sub3", "boo@dest1.com", "blar@blar.com", "dest1 to blar");
			MimeMessage m4 = utils.createMessage(gm, "sub4", "boo@dest2.com", "foo@foo.com", "dest2 to foo");
			
			MailFolder fm3 = im.createMailbox(user1, "myfolder1");
			MailFolder fm4 = im.createMailbox(user2, "myfolder2");

			System.out.println("Store1");
			fm1.store(m1);
			System.out.println("Store2");
			fm1.store(m3);

			System.out.println("Store3");
			fm3.store(m2);
			System.out.println("Store4");
			fm4.store(m4);
			System.out.println("Store done");

			// System.out.println("Deliver1");
			// user1.deliver(m1);
			// System.out.println("Deliver2");
			// user1.deliver(m3);
			// System.out.println("Deliver3");
			// user2.deliver(m2);
			// System.out.println("Deliver4");
			// user2.deliver(m4);
			// System.out.println("Done");

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
		app.get("/d/:mailbox/:uid", new DeleteMessageCommand(greenMail));
		app.get("/v/:mailbox/:uid", new ViewMessageCommand(greenMail));
	}
}
