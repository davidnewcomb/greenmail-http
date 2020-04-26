package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.CfgClient;

public class CfgClientCommand extends BaseHandler {

	public CfgClientCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		ctx.json(new CfgClient());
	}

}
