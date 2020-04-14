package uk.co.bigsoft.greenmail.http.dto;

public class KeyValue {
	private String key;
	private String value;

	public KeyValue(String k, String v) {
		key = k;
		value = v;
	}

	public String getKey() {
		return key;
	}

	public String getValue() {
		return value;
	}

}