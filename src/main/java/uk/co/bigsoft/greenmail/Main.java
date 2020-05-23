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
import uk.co.bigsoft.greenmail.http.commands.CfgClientCommand;
import uk.co.bigsoft.greenmail.http.commands.CfgGreenMailCommand;
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
import uk.co.bigsoft.greenmail.http.commands.ViewMessageCommand;
import uk.co.bigsoft.greenmail.javalin.AccessControlAllowOriginHandler;
import uk.co.bigsoft.greenmail.mailx.MimeMessageBuilder;

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
		
		String SUPERMAN = "clarke.kent@superman.com";
		String SPIDERMAN = "peter.parker@spiderman.co.uk";
		String BATMAN = "bruce.wayne@batman.gotham.us";
		String WONDER_WOMAN = "diana.prince@wonderwoman.com";
		String TGAH = "ralph.hinkley@thegreatestamericanhero.com";
		String SFH = "stringfellow.hawk@airwolf.com";
		
		try {

			UserManager um = gm.getManagers().getUserManager();
			ImapHostManager im = gm.getManagers().getImapHostManager();

			GreenMailUser user1 = um.createUser(SUPERMAN, "blar", "b123");
			GreenMailUser user2 = um.createUser(SPIDERMAN, "foo", "f123");

			MailFolder user1Inbox = im.getInbox(user1);
			MailFolder user1Other = im.createMailbox(user1, "otherfolder1");
			MailFolder user2Other = im.createMailbox(user2, "otherfolder2");

			MimeMessage m1 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withSubject("sub1")
					.withFrom(SUPERMAN)
					.withTo(BATMAN)
					.withBody("blar to dest1")
					.build();

			MimeMessage m2 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withSubject("sub2")
					.withFrom(SPIDERMAN)
					.withTo(WONDER_WOMAN)
					.withBody("foo to dest2")
					.build();

			MimeMessage m3 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withSubject("sub3")
					.withFrom(BATMAN)
					.withTo(SUPERMAN)
					.withBody("dest1 to blar")
					.build();

			MimeMessage m4 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withSubject("sub4")
					.withFrom(WONDER_WOMAN)
					.withTo(SPIDERMAN)
					.withBody("dest2 to foo")
					.build();

			MimeMessage m5 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withSubject("sub5")
					.withFrom(BATMAN)
					.withCc(BATMAN)
					.withCc(WONDER_WOMAN)
					.withTo(SUPERMAN)
					.withTo(SPIDERMAN)
					.withBcc(TGAH)
					.withBcc(SFH)
					.withBody("dest2 to foo")
					.build();

			System.out.println("Store1");
			user1Inbox.store(m1);
			user1Inbox.store(m5);
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
		app.config.addStaticFiles("/frontend", Location.CLASSPATH);
		app.get("/imap/:email/inbox", new ImapGetInBoxCommand(greenMail));
		app.get("/imap/:email", new ImapListMailBoxCommand(greenMail));
		app.get("/imap", new ImapAllMessagesCommand(greenMail));
		app.get("/lu", new ListUsersCommand(greenMail));
		app.get("/p", new PurgeEmailFromAllMailboxesCommand(greenMail));
		app.get("/rm", new ReceivedMessagesCommand(greenMail));
		app.get("/rmd/:domain", new ReceivedMessagesForDomainCommand(greenMail));
		app.get("/r", new ResetCommand(greenMail));
		app.get("/cfg/greenmail", new CfgGreenMailCommand(greenMail));
		app.get("/cfg/client", new CfgClientCommand(greenMail));
		app.get("/m/:mailbox", new MailboxMessagesCommand(greenMail));
		app.get("/m/:mailbox/delete", new DeleteMailboxCommand(greenMail));
		app.get("/d/:mailbox/:uid", new DeleteMessageCommand(greenMail));
		app.get("/v/:mailbox/:uid", new ViewMessageCommand(greenMail));
		app.get("/u/:email/delete", new DeleteUserCommand(greenMail));
		
		if (cfg.useAccessControlAnywhere()) {
			System.out.println("Allow REST connections from anywhere");
			app.after("/*", new AccessControlAllowOriginHandler("*"));
		}
	}
}
