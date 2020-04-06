package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class PurgeEmailFromAllMailboxesCommand extends BaseHandler {

	public PurgeEmailFromAllMailboxesCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		gm.purgeEmailFromAllMailboxes();
		ctx.status(200);
	}

}
