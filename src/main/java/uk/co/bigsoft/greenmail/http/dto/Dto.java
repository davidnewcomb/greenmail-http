package uk.co.bigsoft.greenmail.http.dto;

import java.util.ArrayList;
import java.util.List;

import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.StoredMessage;

public class Dto {

	public List<MessageDto> toMessages(List<StoredMessage> messages) {
		ArrayList<MessageDto> out = new ArrayList<>();
		for (StoredMessage sm : messages) {
			MimeMessage mm = sm.getMimeMessage();
			out.add(new MessageDto(mm));
		}
		return out;
	}

}
