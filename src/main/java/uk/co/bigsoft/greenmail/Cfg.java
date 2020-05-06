package uk.co.bigsoft.greenmail;


public class Cfg {

	public boolean useTestData() {
		return System.getProperty("uk.co.bigsoft.greenmail.add_test_data") != null;
	}

	public boolean useAccessControlAnywhere() {
		return System.getProperty("uk.co.bigsoft.greenmail.ac_anywhere") != null;
	}
}
