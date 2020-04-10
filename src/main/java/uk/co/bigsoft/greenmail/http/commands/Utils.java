package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class Utils {

	public GreenMailUser getUser(Context ctx, UserManager um) {
		String user = ctx.pathParam("email");
		return um.getUserByEmail(user);
	}

	public MimeMessage createMessage(GreenMail gm, String subject, String from, String to, String body) {
		MimeMessage mm = null;
		try {
			javax.mail.Session smtpSession = gm.getSmtp().createSession();
			mm = new MimeMessage(smtpSession);
			mm.setRecipients(RecipientType.TO, to);
			mm.setSubject(subject);
			mm.setFrom(from);
			mm.setText(body);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
		return mm;
	}
}
