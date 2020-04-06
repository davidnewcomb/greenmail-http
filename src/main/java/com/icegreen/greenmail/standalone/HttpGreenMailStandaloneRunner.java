package com.icegreen.greenmail.standalone;

import java.util.Properties;

import com.icegreen.greenmail.util.GreenMail;

public class HttpGreenMailStandaloneRunner extends GreenMailStandaloneRunner {

	public HttpGreenMailStandaloneRunner(Properties properties) {
		configureLogging(properties);
	}

	public GreenMail getMailer() {
		GreenMail gm = getGreenMail();
		return gm;
	}
}
