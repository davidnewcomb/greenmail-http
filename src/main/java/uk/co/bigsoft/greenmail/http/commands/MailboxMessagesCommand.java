package uk.co.bigsoft.greenmail.http.commands;

import java.util.Collection;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.Dto;

public class MailboxMessagesCommand extends BaseHandler {

	private Dto dto = new Dto();

	public MailboxMessagesCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		MailFolder mailbox = utils.getMailbox(ctx, im);
		Collection<StoredMessage> messages = mailbox.getMessages();
		ctx.json(dto.toMessages(mailbox, messages));
	}

}
