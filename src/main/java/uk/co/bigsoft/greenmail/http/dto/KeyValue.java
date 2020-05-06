package uk.co.bigsoft.greenmail.http.dto;

public class KeyValue {
	private String name;
	private String value;

	public KeyValue(String n, String v) {
		name = n;
		value = v;
	}

	public String getValue() {
		return value;
	}

	// Needed for frontend v1
	@Deprecated
	public String getKey() {
		return name;
	}

	public String getName() {
		return name;
	}

}