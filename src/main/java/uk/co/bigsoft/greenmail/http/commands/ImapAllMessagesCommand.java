package uk.co.bigsoft.greenmail.http.commands;

import java.util.List;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ImapAllMessagesCommand extends BaseHandler {

	public ImapAllMessagesCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		ImapHostManager man = gm.getManagers().getImapHostManager();
		List<StoredMessage> messages = man.getAllMessages();
		ctx.json(dto.toMessages(messages));
	}

}
