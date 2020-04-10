package uk.co.bigsoft.greenmail.support;

import java.util.Properties;

import javax.mail.Flags;
import javax.mail.Folder;
import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Store;

// https://alvinalexander.com/java/javamail-pop-pop3-reader-email-inbox-example/
public class Pop3Reader {

	public static void main(String args[]) throws Exception {

		// mail server connection parameters
		String user = "test_to@dom1.example.com";
		String password = "test_to@dom1.example.com";
		String host = "127.0.0.1";
		
		if (args.length > 0) {
			user = args[0];
		}

		if (args.length > 1) {
			password = args[1];
		}

		if (args.length > 2) {
			host = args[2];
		}

		// connect to my pop3 inbox
		Properties properties = System.getProperties();
		Session session = Session.getDefaultInstance(properties);
		Store store = session.getStore("pop3");
		store.connect(host, user, password);
		Folder inbox = store.getFolder("Inbox");
		inbox.open(Folder.READ_ONLY);

		// Need to delete messages
		//inbox.open(Folder.READ_WRITE);

		// get the list of inbox messages
		Message[] messages = inbox.getMessages();

		if (messages.length == 0) {
			System.out.println("No messages found.");
		} else {
			for (int i = 0; i < messages.length; i++) {
				// stop after listing ten messages
				if (i > 10) {
					System.exit(0);
					inbox.close(true);
					store.close();
				}

				System.out.println("Message " + (i + 1));
				System.out.println("From : " + messages[i].getFrom()[0]);
				System.out.println("Subject : " + messages[i].getSubject());
				System.out.println("Sent Date : " + messages[i].getSentDate());
				System.out.println();
				
				// Ignored if folder is read only
				messages[i].setFlag(Flags.Flag.DELETED, true);
			}
		}

		inbox.close(true);
		store.close();
	}
}
