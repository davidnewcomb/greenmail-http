package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.Enumeration;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.mail.Header;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;

public class FullMessageDto extends MessageDto {
	private static FlagConverter flagConverter = new FlagConverter();
	private Map<String, String> headers;
	private List<String> flags;

	public FullMessageDto(MailFolder mailbox, StoredMessage sm) throws MessagingException, IOException {
		super(mailbox, sm);
		MimeMessage mm = sm.getMimeMessage();
		headers = toMap(mm.getAllHeaders());
		flags = flagConverter.toString(sm.getFlags());

		// String s= mm.getContentID();
		// String[] ss=mm.getContentLanguage();
		// Folder ff = mm.getFolder();
		// int i = mm.getMessageNumber();
		// Date dd = mm.getReceivedDate();
		// List<String> x = toStrings(mm.getReplyTo());
		//
		// MailMessageAttributes mma = sm.getAttributes();
		// String s1 = mma.getBodyStructure(true);
		// String s2 = mma.getBodyStructure(false);
		// String ee = mma.getEnvelope();
		// int sz = mma.getSize();

	}

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	public List<String> getFlags() {
		return flags;
	}

	public void setFlags(List<String> flags) {
		this.flags = flags;
	}

	private Map<String, String> toMap(Enumeration<?> headers) {
		TreeMap<String, String> map = new TreeMap<>();
		while (headers.hasMoreElements()) {
			Header h = (Header) headers.nextElement();
			map.put(h.getName(), h.getValue());
		}

		return map;
	}

}
