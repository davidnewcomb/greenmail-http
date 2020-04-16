package uk.co.bigsoft.greenmail.http.commands;

import java.util.Collection;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.Store;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.user.GreenMailUser;
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
		MailFolder mailbox = utils.getMailbox(ctx, gm.getManagers().getImapHostManager());
		Collection<StoredMessage> messages = mailbox.getMessages();
		ctx.json(dto.toMessages(messages));
	}

}
