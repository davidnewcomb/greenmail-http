package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.Flags.Flag;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class DeleteMessageCommand extends BaseHandler {

	public DeleteMessageCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		MailFolder mailbox = utils.getMailbox(ctx, gm.getManagers().getImapHostManager());
		long uid = utils.getUid(ctx);
		StoredMessage sm = mailbox.getMessage(uid);

		sm.setFlag(Flag.DELETED, true);
		mailbox.expunge();

		ctx.json("OK");
	}

}
