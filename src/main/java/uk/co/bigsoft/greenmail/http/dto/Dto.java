package uk.co.bigsoft.greenmail.http.dto;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.mail.MessagingException;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;

public class Dto {

	public List<MessageDto> toMessages(MailFolder mailbox, Collection<StoredMessage> messages)
			throws MessagingException, IOException {
		ArrayList<MessageDto> out = new ArrayList<>();
		for (StoredMessage sm : messages) {
			out.add(new MessageDto(mailbox, sm));
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

}
