package uk.co.bigsoft.greenmail.http.commands;

import java.util.Collection;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ImapListMailBoxCommand extends BaseHandler {

	public ImapListMailBoxCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		GreenMailUser u = utils.getUser(ctx, gm.getManagers().getUserManager());
		ImapHostManager man = gm.getManagers().getImapHostManager();

		Collection<MailFolder> mailboxes = man.listMailboxes(u, "*");
		ctx.json(mailboxes);

		// MailFolder mf = mailboxes.iterator().next();
		// mf.getMessages();
		// List<StoredMessage> x = man.getAllMessages();
		// ctx.json(x);
	}

}
