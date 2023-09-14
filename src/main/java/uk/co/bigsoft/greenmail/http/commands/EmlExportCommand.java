package uk.co.bigsoft.greenmail.http.commands;

import java.io.ByteArrayOutputStream;

import javax.mail.internet.MimeMessage;

import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.StoredMessage;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;

public class EmlExportCommand extends BaseHandler {

    public EmlExportCommand(GreenMail greenMail) {
        super(greenMail);
    }

    @Override
    public void handle(Context ctx) throws Exception {
        MailFolder mailbox = utils.getMailbox(ctx, im);
		long uid = utils.getUid(ctx);
		StoredMessage sm = mailbox.getMessage(uid);
        MimeMessage mime = sm.getMimeMessage();
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
        mime.writeTo(baos);
        byte[] bytes = baos.toByteArray();
        ctx.result(bytes);
        ctx.header("Content-Disposition", "attachment; filename=\"email.eml\"");
        ctx.header("Content-Type", "text/plain; charset=utf-8");
    }
}
