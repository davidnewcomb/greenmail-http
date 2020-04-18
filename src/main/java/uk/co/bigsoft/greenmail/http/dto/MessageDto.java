package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.Folder;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.StoredMessage;

public class MessageDto {
	private static final List<String> EMPTY_LIST = new ArrayList<>();
	private MimeMessage mm;
	private StoredMessage sm;
	private String mailbox;

	public MessageDto(String mailboxFqn, StoredMessage storedMessage) {
		sm = storedMessage;
		mm = storedMessage.getMimeMessage();
		mailbox = mailboxFqn;
	}

	public long getUid() throws MessagingException {
		 return sm.getUid();
	}

	public String getMailbox() throws MessagingException {
		 return mailbox;
	}

	public String getMessageId() throws MessagingException {
		return mm.getMessageID();
	}

	public String getFolder() throws MessagingException {
		Folder f = mm.getFolder();
		if (f == null) {
			return "";
		}
		return f.getName();
	}

	public String getSubject() throws MessagingException {
		return mm.getSubject();
	}

	public String getBody() throws MessagingException, IOException {
		Object o = mm.getContent();
		return o.toString();
	}

	public String getFrom() throws MessagingException {
		Address[] from = mm.getFrom();
		return from[0].toString();
	}

	public List<String> getTo() throws MessagingException {
		Address[] addrs = mm.getRecipients(RecipientType.TO);
		return addressesArrayOfStrings(addrs);
	}

	public List<String> getCc() throws MessagingException {
		Address[] addrs = mm.getRecipients(RecipientType.CC);
		if (addrs == null) {
			return EMPTY_LIST;
		}
		return addressesArrayOfStrings(addrs);
	}

	public List<String> getBcc() throws MessagingException {
		Address[] addrs = mm.getRecipients(RecipientType.BCC);
		if (addrs == null) {
			return EMPTY_LIST;
		}
		return addressesArrayOfStrings(addrs);
	}

	private List<String> addressesArrayOfStrings(Address[] addresses) {
		ArrayList<String> list = new ArrayList<>();
		for (Address a : addresses) {
			list.add(a.toString());
		}
		return list;
	}
}
