package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.imap.ImapConstants;
import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class DeleteMailboxCommand extends BaseHandler {

	public DeleteMailboxCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		ImapHostManager im = gm.getManagers().getUserManager().getImapHostManager();
		MailFolder mb = utils.getMailbox(ctx, im);
		if (mb.getName().equalsIgnoreCase(ImapConstants.INBOX_NAME)) {
			ctx.json("ERROR");
			return;
		}
		mb.deleteAllMessages();
		im.getStore().deleteMailbox(mb);
		mb.expunge();
		ctx.json("OK");
	}

}
