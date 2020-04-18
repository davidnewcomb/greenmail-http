// https://www.tutorialspoint.com/java/java_sending_email.htm
package uk.co.bigsoft.greenmail.support;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

	public static void main(String[] args) {

		String to = "blar@blar.com";
		String from = "boo@dest1.com";
		String host = "127.0.0.1";
		
		// Recipient's email ID needs to be mentioned.
		if (args.length > 0) {
			to = args[0];
		}

		// Sender's email ID needs to be mentioned
		if (args.length > 1) {
			to = args[1];
		}

		// Assuming you are sending email from localhost
		if (args.length > 2) {
			host = args[2];
		}

		// Get system properties
		Properties properties = System.getProperties();

		// Setup mail server
		properties.setProperty("mail.smtp.host", host);

		// Get the default Session object.
		Session session = Session.getDefaultInstance(properties);

		try {
			// Create a default MimeMessage object.
			MimeMessage message = new MimeMessage(session);

			// Set From: header field of the header.
			message.setFrom(new InternetAddress(from));

			// Set To: header field of the header.
			message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));

			// Set Subject: header field
			message.setSubject("This is the Subject Line!");

			// Now set the actual message
			message.setText("This is actual message");

			// Send message
			Transport.send(message);
			System.out.println("Sent message successfully....");
		} catch (MessagingException mex) {
			mex.printStackTrace();
		}
	}
}
