package uk.co.bigsoft.greenmail.http.commands;

import java.util.ArrayList;
import java.util.List;

import javax.mail.Address;
import javax.mail.MessagingException;
import javax.mail.Message.RecipientType;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.MessageDto;

public class ListDomainMessageCommand extends BaseHandler {

	private String who;

	public ListDomainMessageCommand(GreenMail greenMail, String who) {
		super(greenMail);
		this.who = who;
	}

	@Override
	public void handle(Context ctx) throws Exception {
		String domain = utils.getDomain(ctx);
		List<MessageDto> messages = new ArrayList<>();

		for(MailFolder mailbox : im.getStore().listMailboxes("*")) {
			ArrayList<StoredMessage> end;
			if ("from".equals(who)) {
				end = filterBySender(domain, mailbox.getMessages());
			} else {
				end = filterByRecipientType(domain, mailbox.getMessages());
			}
			messages.addAll(dto.toMessages(mailbox, end));
		}
		ctx.json(messages);
	}

	private ArrayList<StoredMessage> filterBySender(String domain, List<StoredMessage> allStoredMessages)
			throws MessagingException {
		ArrayList<StoredMessage> ret = new ArrayList<>();

		for (StoredMessage sm : allStoredMessages) {
			MimeMessage m = sm.getMimeMessage();
			Address a = m.getSender();
			if (a == null) {
				Address[] addresses = m.getFrom();
				if (isDomainInAddress(domain, addresses)) {
					ret.add(sm);
				}
				continue;
			}
			if (isDomainInAddress(domain, a)) {
				ret.add(sm);
			}
		}
		return ret;
	}

	private ArrayList<StoredMessage> filterByRecipientType(String email, List<StoredMessage> allStoredMessages)
			throws MessagingException {

		RecipientType rt = null;
		switch (who) {
		case "to":
			rt = RecipientType.TO;
			break;
		case "cc":
			rt = RecipientType.CC;
			break;
		case "bcc":
			rt = RecipientType.BCC;
			break;
		}

		ArrayList<StoredMessage> ret = new ArrayList<>();

		for (StoredMessage sm : allStoredMessages) {
			MimeMessage m = sm.getMimeMessage();
			Address[] addresses = m.getRecipients(rt);
			if (isDomainInAddress(email, addresses)) {
				ret.add(sm);
			}
		}
		return ret;
	}

	private boolean isDomainInAddress(String domain, Address[] addresses) {
		if (addresses == null) {
			return false;
		}
		for (Address a : addresses) {
			if (isDomainInAddress(domain, a)) {
				return true;
			}
		}
		return false;
	}

	private boolean isDomainInAddress(String domain, Address address) {
		String a = address.toString();
		int idx = a.indexOf('@');
		if (idx < 0) {
			return false;
		}
		String dom = a.substring(idx + 1);
		if (domain.equalsIgnoreCase(dom)) {
			return true;
		}
		return false;
	}

}
