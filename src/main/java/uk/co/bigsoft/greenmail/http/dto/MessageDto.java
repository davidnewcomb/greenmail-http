package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;

public class MessageDto {
	private String mailboxFqn;
	private long uid;
	private String messageId;
	private String subject;
	private String body;
	private List<String> to;
	private List<String> from;
	private List<String> cc;
	private List<String> bcc;

	public MessageDto(MailFolder mailbox, StoredMessage storedMessage) throws MessagingException, IOException {
		MimeMessage mm = storedMessage.getMimeMessage();

		uid = storedMessage.getUid();
		if (mailbox == null) {
			mailboxFqn = "(unknown)";
		} else {
			mailboxFqn = mailbox.getFullName();
		}
		messageId = mm.getMessageID();
		subject = mm.getSubject();
		body = mm.getContent().toString();

		Address[] a;
		a = mm.getRecipients(RecipientType.TO);
		to = toStrings(a);
		a = mm.getRecipients(RecipientType.CC);
		cc = toStrings(a);
		a = mm.getRecipients(RecipientType.BCC);
		bcc = toStrings(a);
		a = mm.getFrom();
		from = toStrings(a);
	}

	public long getUid() throws MessagingException {
		return uid;
	}

	public String getMailbox() throws MessagingException {
		return mailboxFqn;
	}

	public String getMessageId() throws MessagingException {
		return messageId;
	}

	public String getSubject() throws MessagingException {
		return subject;
	}

	public String getBody() throws MessagingException, IOException {
		return body;
	}

	public List<String> getFrom() throws MessagingException {
		return from;
	}

	public List<String> getTo() throws MessagingException {
		return to;
	}

	public List<String> getCc() throws MessagingException {
		return cc;
	}

	public List<String> getBcc() throws MessagingException {
		return bcc;
	}

	private List<String> toStrings(Address[] addresses) {
		ArrayList<String> out = new ArrayList<>();
		if (addresses != null) {
			for (Address a : addresses) {
				out.add(a.toString());
			}
		}
		return out;
	}

}
