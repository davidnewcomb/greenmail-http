package uk.co.bigsoft.greenmail.javalin;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class AccessControlAllowOriginOptionsHandler implements Handler {

	public AccessControlAllowOriginOptionsHandler() {
	}

	public void handle(Context ctx) throws Exception {
		ctx.header("Access-Control-Allow-Credentials", "true");
		ctx.header("Access-Control-Allow-Methods", "*");
		ctx.header("Access-Control-Max-Age: 604800");
		ctx.header("Access-Control-Allow-Headers", "*");
	}
}
