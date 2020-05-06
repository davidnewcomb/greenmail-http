package uk.co.bigsoft.greenmail.javalin;

import io.javalin.http.Context;
import io.javalin.http.Handler;

public class AccessControlAllowOriginHandler implements Handler {
	private String value;

	public AccessControlAllowOriginHandler(String wildcard) {
		value = wildcard;
	}

	public void handle(Context ctx) throws Exception {
		ctx.header("Access-Control-Allow-Origin", value);
	}
}
