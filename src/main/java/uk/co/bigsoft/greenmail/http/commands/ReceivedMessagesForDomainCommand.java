package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ReceivedMessagesForDomainCommand extends BaseHandler {

	public ReceivedMessagesForDomainCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		String domain = ctx.queryParam("domain");
		MimeMessage[] x = gm.getReceivedMessagesForDomain(domain);
		ctx.json(x);
	}

}
