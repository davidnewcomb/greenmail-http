package uk.co.bigsoft.greenmail.http.dto;

import java.util.Map;

public class ServerConfigDto {
	private String section;
	private Map<String, String> map;

	public ServerConfigDto(String name, Map<String, String> props) {
		section = name;
		map = props;
	}

	public String getSection() {
		return section;
	}

	public Map<String, String> getProperties() {
		return map;
	}

}
