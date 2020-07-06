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
import uk.co.bigsoft.greenmail.http.commands.AddUserCommand;
import uk.co.bigsoft.greenmail.http.commands.DeleteUserCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapAllMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapGetInBoxCommand;
import uk.co.bigsoft.greenmail.http.commands.ImapListMailBoxCommand;
import uk.co.bigsoft.greenmail.http.commands.ListDomainMessageCommand;
import uk.co.bigsoft.greenmail.http.commands.ListUserMessageCommand;
import uk.co.bigsoft.greenmail.http.commands.ListUsersCommand;
import uk.co.bigsoft.greenmail.http.commands.MailboxMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.PurgeEmailFromAllMailboxesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesCommand;
import uk.co.bigsoft.greenmail.http.commands.ReceivedMessagesForDomainCommand;
import uk.co.bigsoft.greenmail.http.commands.ResetCommand;
import uk.co.bigsoft.greenmail.http.commands.SmtpSendEmailCommand;
import uk.co.bigsoft.greenmail.http.commands.ViewMessageCommand;
import uk.co.bigsoft.greenmail.javalin.AccessControlAllowOriginHandler;
import uk.co.bigsoft.greenmail.javalin.AccessControlAllowOriginOptionsHandler;
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
		String SUPERMAN_USER = "superman";
		String SUPERMAN_PASS = "x-ray-vision";

		String SPIDERMAN = "peter.parker@spiderman.co.uk";
		String SPIDERMAN_USER = "spiderman";
		String SPIDERMAN_PASS = "spin-webs";

		String WONDER_WOMAN = "diana.prince@wonderwoman.com";
		String WONDER_WOMAN_USER = "wonderwoman";
		String WONDER_WOMAN_PASS = "nice-boots";

		String BATMAN = "bruce.wayne@gotham.us";
		String ROBIN = "dick.grayson@gotham.us";
		String TGAH = "ralph.hinkley@thegreatestamericanhero.com";
		String SFH = "stringfellow.hawk@airwolf.com";

		try {

			UserManager um = gm.getManagers().getUserManager();
			ImapHostManager im = gm.getManagers().getImapHostManager();

			GreenMailUser superman = um.createUser(SUPERMAN, SUPERMAN_USER, SUPERMAN_PASS);
			GreenMailUser spiderman = um.createUser(SPIDERMAN, SPIDERMAN_USER, SPIDERMAN_PASS);
			GreenMailUser wonderwoman = um.createUser(WONDER_WOMAN, WONDER_WOMAN_USER, WONDER_WOMAN_PASS);

			MailFolder supermanInbox = im.getInbox(superman);
			MailFolder supermanPofF = im.createMailbox(superman, "PalaceOfF");
			
			MailFolder spidermanWebjuce = im.createMailbox(spiderman, "web-juice");
			
			MailFolder wonderwomanInbox = im.getInbox(wonderwoman);
			
			MimeMessage m1 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(SUPERMAN)
					.withTo(BATMAN)
					.withSubject("Ears")
					.withBody("I like the pointy ears on your hat.")
					.build();

			MimeMessage m2 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(SPIDERMAN)
					.withTo(WONDER_WOMAN)
					.withSubject("Gym")
					.withBody("You look great, can you recommend a good gym?")
					.build();

			MimeMessage m3 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(BATMAN)
					.withTo(SUPERMAN)
					.withSubject("Lift")
					.withBody("I need a lift to Gotham.")
					.build();

			MimeMessage m4 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(WONDER_WOMAN)
					.withTo(SPIDERMAN)
					.withSubject("Re: Gym")
					.withBody("Why thank you! The best gym is Gymmy's in Birkdale, UK.")
					.build();

			MimeMessage m5 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(BATMAN)
					.withTo(SUPERMAN).withTo(SPIDERMAN)
					.withCc(BATMAN).withCc(WONDER_WOMAN)
					.withBcc(TGAH).withBcc(SFH)
					.withSubject("New suit")
					.withBody("I'm having a party to show off my new suit. Do you want to come?")
					.build();
			
			MimeMessage m6 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(ROBIN)
					.withTo(WONDER_WOMAN).withTo(SUPERMAN)
					.withSubject("Batman is evil!")
					.withBody("I need a lift from Gotham to Metropolis, asap")
					.build();

			System.out.println("");
			System.out.println("================ STORING TEST EMAILS - Start");
			System.out.println("");
			System.out.println("On my computer storing emails takes ages.");
			System.out.println("So if it sticks for you then please wait a second or two.");
			System.out.println("If it does stick for you, maybe you can help me figure out why!");
			System.out.println("");

			System.out.println("|......|");
			System.out.print("|");

			supermanInbox.store(m1);
			System.out.print("*");

			supermanInbox.store(m5);
			System.out.print("*");

			supermanInbox.store(m3);
			System.out.print("*");

			supermanPofF.store(m2);
			System.out.print("*");

			spidermanWebjuce.store(m4);
			System.out.print("*");

			wonderwomanInbox.store(m6);
			System.out.print("*");

			System.out.println("|");
			System.out.println("================ STORING TEST EMAILS - Done");

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
		app.post("/send", new SmtpSendEmailCommand(greenMail));
		app.get("/v/:mailbox/:uid", new ViewMessageCommand(greenMail));
		app.get("/u/:email/delete", new DeleteUserCommand(greenMail));
		app.post("/u/add", new AddUserCommand(greenMail));
		app.get("/u/:email/from", new ListUserMessageCommand(greenMail, "from"));
		app.get("/u/:email/to", new ListUserMessageCommand(greenMail, "to"));
		app.get("/u/:email/cc", new ListUserMessageCommand(greenMail, "cc"));
		app.get("/u/:email/bcc", new ListUserMessageCommand(greenMail, "bcc"));
		app.get("/dn/:domain/from", new ListDomainMessageCommand(greenMail, "from"));
		app.get("/dn/:domain/to", new ListDomainMessageCommand(greenMail, "to"));
		app.get("/dn/:domain/cc", new ListDomainMessageCommand(greenMail, "cc"));
		app.get("/dn/:domain/bcc", new ListDomainMessageCommand(greenMail, "bcc"));
		
		if (cfg.useAccessControlAnywhere()) {
			System.out.println("Allow REST connections from anywhere");
			app.after("/*", new AccessControlAllowOriginHandler("*"));
			app.options("/*", new AccessControlAllowOriginOptionsHandler());
		}
	}
}
