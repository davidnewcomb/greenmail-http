package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ResetCommand extends BaseHandler {

	public ResetCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		gm.reset();
		ctx.status(200);
	}

}
