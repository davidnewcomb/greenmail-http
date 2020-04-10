package uk.co.bigsoft.greenmail.http.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

import javax.mail.Flags;
import javax.mail.Flags.Flag;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
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
	public List<MessageDto> toMessages(Collection<StoredMessage> messages) {
		ArrayList<MessageDto> out = new ArrayList<>();
		for (StoredMessage sm : messages) {
			MimeMessage mm = sm.getMimeMessage();
			out.add(new MessageDto(mm));
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
	
	public List<String> toString(Flags flags) {
		ArrayList<String> out = new ArrayList<>();
		for (Flag f : flags.getSystemFlags()) {
			out.add(flagTranslator.get(f));
		}
		return out;
	}
}
