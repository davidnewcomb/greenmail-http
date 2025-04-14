package uk.co.bigsoft.greenmail.http.commands;

import java.io.InputStream;

import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class FrontendCommand extends BaseHandler {

    public FrontendCommand(GreenMail greenMail) {
        super(greenMail);
    }

    @Override
    public void handle(Context ctx) throws Exception {
        InputStream indexhtml = this.getClass().getClassLoader()
                .getResourceAsStream("frontend/index.html");
        ctx.result(indexhtml);
        ctx.header("Content-Type", "text/html");
    }
}
