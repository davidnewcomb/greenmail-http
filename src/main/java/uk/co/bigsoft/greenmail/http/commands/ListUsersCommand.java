package uk.co.bigsoft.greenmail.http.commands;

import java.util.Collection;

import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class ListUsersCommand extends BaseHandler {

	public ListUsersCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		UserManager um = gm.getManagers().getUserManager();
		Collection<GreenMailUser> x = um.listUser();
		ctx.json(x);
	}

}
