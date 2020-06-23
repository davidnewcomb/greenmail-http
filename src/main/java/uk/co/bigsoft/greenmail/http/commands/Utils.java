package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserException;
import com.icegreen.greenmail.user.UserManager;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.Credentials;

public class Utils {

	public GreenMailUser getUser(Context ctx, UserManager um) {
		String user = ctx.pathParam("email");
		return um.getUserByEmail(user);
	}

	public GreenMailUser addUser(Credentials credentials, UserManager um) throws UserException {
		return um.createUser(credentials.getEmail(),credentials.getLogin(),credentials.getPassword());
	}

	public String getEmail(Context ctx) {
		String email = ctx.pathParam("email");
		return email;
	}

	public String getDomain(Context ctx) {
		String domain = ctx.pathParam("domain");
		return domain;
	}

	public MailFolder getMailbox(Context ctx, ImapHostManager im) {
		String mailbox = ctx.pathParam("mailbox").replace("%23", "#");
		MailFolder m = im.getStore().getMailbox(mailbox);
		return m;
	}

	public long getUid(Context ctx) {
		String sUid = ctx.pathParam("uid");
		Long uid = new Long(sUid);
		return uid.longValue();
	}
}
