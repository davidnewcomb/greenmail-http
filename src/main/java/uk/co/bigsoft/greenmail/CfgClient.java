package uk.co.bigsoft.greenmail;

public class CfgClient {

	private boolean hidePassword = true;
	private boolean debug = true;

	public CfgClient() {
		//
	}

	public boolean isHidePassword() {
		return hidePassword;
	}

	public void setHidePassword(boolean hidePassword) {
		this.hidePassword = hidePassword;
	}

	public boolean isDebug() {
		return debug;
	}

	public void setDebug(boolean debug) {
		this.debug = debug;
	}

}
