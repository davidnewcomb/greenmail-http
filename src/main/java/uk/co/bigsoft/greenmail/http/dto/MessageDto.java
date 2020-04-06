package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.Folder;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

public class MessageDto {
	private static final List<String> EMPTY_LIST = new ArrayList<>();
	private MimeMessage m;

	public MessageDto(MimeMessage mimeMessage) {
		m = mimeMessage;
	}

	public String getMessageId() throws MessagingException {
		return m.getMessageID();
	}

	public String getFolder() throws MessagingException {
		Folder f = m.getFolder();
		if (f == null) {
			return "";
		}
		return f.getName();
	}

	public String getSubject() throws MessagingException {
		return m.getSubject();
	}

	public String getBody() throws MessagingException, IOException {
		Object o = m.getContent();
		return o.toString();
	}

	public String getFrom() throws MessagingException {
		Address[] from = m.getFrom();
		return from[0].toString();
	}

	public List<String> getTo() throws MessagingException {
		Address[] addrs = m.getRecipients(RecipientType.TO);
		return addressesArrayOfStrings(addrs);
	}

	public List<String> getCc() throws MessagingException {
		Address[] addrs = m.getRecipients(RecipientType.CC);
		if (addrs == null) {
			return EMPTY_LIST;
		}
		return addressesArrayOfStrings(addrs);
	}

	public List<String> getBcc() throws MessagingException {
		Address[] addrs = m.getRecipients(RecipientType.BCC);
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
