package uk.co.bigsoft.greenmail.http.dto;

import java.util.Collection;

public class ServerConfigDto {
	private String section;
	private Collection<KeyValue> list;

	public ServerConfigDto(String name, Collection<KeyValue> props) {
		section = name;
		list = props;
	}

	public String getSection() {
		return section;
	}

	public Collection<KeyValue> getProperties() {
		return list;
	}

}
