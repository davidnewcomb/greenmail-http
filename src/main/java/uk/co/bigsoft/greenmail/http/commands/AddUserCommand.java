package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;
import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.Credentials;

public class AddUserCommand extends BaseHandler {

    public AddUserCommand(GreenMail greenMail) {
        super(greenMail);
    }

    @Override
    public void handle(Context ctx) throws Exception {
        Credentials credentials = ctx.bodyAsClass(Credentials.class);
        UserManager um = gm.getManagers().getUserManager();
        utils.addUser(credentials,um);
        ctx.json("OK");
    }

}

