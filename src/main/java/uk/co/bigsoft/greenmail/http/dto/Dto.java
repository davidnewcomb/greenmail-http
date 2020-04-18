package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.mail.Flags;
import javax.mail.Flags.Flag;
import javax.mail.Header;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.MailMessageAttributes;
import com.icegreen.greenmail.store.StoredMessage;

public class Dto {

	private HashMap<Flag, String> flagTranslator = new HashMap<>();

	public Dto() {
		flagTranslator.put(Flag.ANSWERED, "ANSWERED");
		flagTranslator.put(Flag.DELETED, "DELETED");
		flagTranslator.put(Flag.DRAFT, "DRAFT");
		flagTranslator.put(Flag.FLAGGED, "FLAGGED");
		flagTranslator.put(Flag.RECENT, "RECENT");
		flagTranslator.put(Flag.SEEN, "SEEN");
		flagTranslator.put(Flag.USER, "USER");
	}

	public List<MessageDto> toMessages(MailFolder mailbox, Collection<StoredMessage> messages) {
		String fqn = mailbox.getFullName();
		ArrayList<MessageDto> out = new ArrayList<>();
		for (StoredMessage sm : messages) {
			out.add(new MessageDto(fqn, sm));
		}
		return out;
	}

	public List<MailFolderDto> toMailFolder(Collection<MailFolder> mailFolders) {
		ArrayList<MailFolderDto> out = new ArrayList<>();
		for (MailFolder mf : mailFolders) {
			out.add(new MailFolderDto(mf));
		}
		return out;
	}

	public FullMessageDto toFullMessage(StoredMessage sm) throws MessagingException, IOException {
		MimeMessage mm = sm.getMimeMessage();
		MailMessageAttributes mma = sm.getAttributes();
		Flags f = sm.getFlags();
		Date d = sm.getReceivedDate();

		FullMessageDto m = new FullMessageDto();
		m.setSubject(mm.getSubject());
		m.setHeaders(toMap(mm.getAllHeaders()));
		m.setBody(mm.getContent().toString());
		return m;
	}

	private Map<String, String> toMap(Enumeration<?> headers) {
		TreeMap<String, String> map = new TreeMap<>();
		while (headers.hasMoreElements()) {
			Header h = (Header) headers.nextElement();
			map.put(h.getName(), h.getName());
		}

		return map;
	}

	public List<String> toString(Flags flags) {
		ArrayList<String> out = new ArrayList<>();
		for (Flag f : flags.getSystemFlags()) {
			String s = f.toString();
			String ff = flagTranslator.get(f);
			out.add(flagTranslator.get(f));
		}
		return out;
	}
}
