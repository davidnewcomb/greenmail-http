package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.FullMessageDto;

public class ViewMessageCommand extends BaseHandler {

	public ViewMessageCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		MailFolder mailbox = utils.getMailbox(ctx, gm.getManagers().getImapHostManager());
		long uid = utils.getUid(ctx);
		StoredMessage sm = mailbox.getMessage(uid);
		FullMessageDto mesg = new FullMessageDto(mailbox, sm);
		ctx.json(mesg);
	}

}
