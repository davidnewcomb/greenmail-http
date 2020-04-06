package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ReceivedMessagesCommand extends BaseHandler {

	public ReceivedMessagesCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		MimeMessage[] x = gm.getReceivedMessages();
		ctx.json(x);
	}

}
