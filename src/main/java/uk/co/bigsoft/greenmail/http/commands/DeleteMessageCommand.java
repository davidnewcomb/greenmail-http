package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class DeleteMessageCommand extends BaseHandler {

	public DeleteMessageCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		throw new UnsupportedOperationException();
	}

}
