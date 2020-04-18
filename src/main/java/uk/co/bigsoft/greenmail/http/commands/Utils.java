package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class Utils {

	public GreenMailUser getUser(Context ctx, UserManager um) {
		String user = ctx.pathParam("email");
		return um.getUserByEmail(user);
	}

	public MailFolder getMailbox(Context ctx, ImapHostManager im) {
		String mailbox = ctx.pathParam("mailbox");
		MailFolder m = im.getStore().getMailbox(mailbox);
		return m;
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

	public long getUid(Context ctx) {
		String sUid = ctx.pathParam("uid");
		Long uid = new Long(sUid);
		return uid.longValue();
	}
}
