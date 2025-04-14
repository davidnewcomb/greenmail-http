package uk.co.bigsoft.greenmail.http.commands;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetup;

import io.javalin.http.Context;
import io.javalin.http.UploadedFile;

public class EmlImportCommand extends BaseHandler {

    public EmlImportCommand(GreenMail greenMail) {
        super(greenMail);
    }

    @Override
    public void handle(Context ctx) throws Exception {
        ServerSetup setup = new ServerSetup(gm.getSmtp().getPort(), gm.getSmtp().getBindTo(), ServerSetup.PROTOCOL_SMTP);
        setup.setServerStartupTimeout(ServerSetup.SERVER_STARTUP_TIMEOUT);
        Session session = GreenMailUtil.getSession(setup);
        for (UploadedFile file : ctx.uploadedFiles()) {
            MimeMessage mime = new MimeMessage(session, file.getContent());
            GreenMailUtil.sendMimeMessage(mime);
        }
        ctx.json("OK");
    }
}
