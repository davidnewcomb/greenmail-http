package uk.co.bigsoft.greenmail.http.commands;

import java.util.Collection;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.Dto;

public class ImapListMailBoxCommand extends BaseHandler {

	private Dto dto = new Dto();

	public ImapListMailBoxCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		GreenMailUser user = utils.getUser(ctx, gm.getManagers().getUserManager());
		ImapHostManager manager = gm.getManagers().getImapHostManager();
		Collection<MailFolder> mailboxes = manager.listMailboxes(user, "*");
		ctx.json(dto.toMailFolder(mailboxes));
	}

}
