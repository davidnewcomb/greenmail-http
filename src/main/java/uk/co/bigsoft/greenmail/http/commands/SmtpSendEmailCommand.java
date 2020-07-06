package uk.co.bigsoft.greenmail.http.commands;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.GreenMailUtil;
import com.icegreen.greenmail.util.ServerSetup;
import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.EmailDto;

public class SmtpSendEmailCommand extends BaseHandler{

    private static final String HOST = "localhost";
    private static final int PORT = 3025;
    
    public SmtpSendEmailCommand(GreenMail greenMail){
        super(greenMail);
    }
    
    @Override
    public void handle(Context ctx) throws Exception {
        EmailDto emailDto = ctx.bodyAsClass(EmailDto.class);
        ServerSetup setup = new ServerSetup(PORT, HOST, ServerSetup.PROTOCOL_SMTP);
        setup.setServerStartupTimeout(ServerSetup.SERVER_STARTUP_TIMEOUT);
        GreenMailUtil.sendTextEmail(emailDto.getTo(),emailDto.getFrom(),emailDto.getSubject(),emailDto.getMsg(),setup);
        ctx.json("OK");
    }
}
