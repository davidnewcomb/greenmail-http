package uk.co.bigsoft.greenmail.http.commands;

import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.MessageDto;

public class ListUserMessageCommand extends BaseHandler {

	private String who;
	
	public ListUserMessageCommand(GreenMail greenMail, String who) {
		super(greenMail);
		this.who = who;
	}

	@Override
	public void handle(Context ctx) throws Exception {
		String email = utils.getEmail(ctx);
		List<MessageDto> messages = new ArrayList<>();

		for(MailFolder mailbox : im.getStore().listMailboxes("*")) {
			ArrayList<StoredMessage> end;
			if ("from".equals(who)) {
				end = filterBySender(email, mailbox.getMessages());
			} else {
				end = filterByRecipientType(email, mailbox.getMessages());
			}
			messages.addAll(dto.toMessages(mailbox, end));
		}
		ctx.json(messages);
	}

	private ArrayList<StoredMessage> filterBySender(String email, List<StoredMessage> allStoredMessages) throws MessagingException {
		ArrayList<StoredMessage> ret = new ArrayList<>();
		
		for (StoredMessage sm : allStoredMessages) {
			MimeMessage m = sm.getMimeMessage();
			Address a = m.getSender();
			if (a == null) {
				Address[] addresses = m.getFrom();
				if (isEmailInAddresses(email, addresses)) {
					ret.add(sm);
				}
				continue;
			}
			if (email.equalsIgnoreCase(a.toString())) {
				ret.add(sm);
			}
		}
		return ret;
	}

	private ArrayList<StoredMessage> filterByRecipientType(String email, List<StoredMessage> allStoredMessages) throws MessagingException {
		
		RecipientType rt = null;
		switch(who) {
		case "to" : rt = RecipientType.TO; break;
		case "cc" : rt = RecipientType.CC; break;
		case "bcc" : rt = RecipientType.BCC; break;
		}

		ArrayList<StoredMessage> ret = new ArrayList<>();
		
		for (StoredMessage sm : allStoredMessages) {
			MimeMessage m = sm.getMimeMessage();
			Address[] addresses = m.getRecipients(rt);
			if (isEmailInAddresses(email, addresses)) {
				ret.add(sm);
			}
		}
		return ret;
	}

	private boolean isEmailInAddresses(String email, Address[] addresses) {
		if (addresses == null) {
			return false;
		}
		for (Address a : addresses) {
			if (email.equalsIgnoreCase(a.toString())) {
				return true;
			}
		}
		return false;
	}

}
