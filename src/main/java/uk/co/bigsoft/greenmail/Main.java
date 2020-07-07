package uk.co.bigsoft.greenmail;

import java.util.Properties;
import com.icegreen.greenmail.standalone.HttpGreenMailStandaloneRunner;
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

public class Main {

	private static Cfg cfg = new Cfg();
	private static TestData testData = new TestData();
	
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

		testData.populate(gm);
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
