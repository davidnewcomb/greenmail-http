package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class DeleteUserCommand extends BaseHandler {

	public DeleteUserCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {

		UserManager um = gm.getManagers().getUserManager();
		GreenMailUser user = utils.getUser(ctx, um);
		um.deleteUser(user);
		ctx.json("OK");
	}

}
