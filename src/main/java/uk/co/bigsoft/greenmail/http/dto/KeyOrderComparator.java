package uk.co.bigsoft.greenmail.http.dto;

import java.util.Comparator;

public class KeyOrderComparator implements Comparator<KeyValue> {

	@Override
	public int compare(KeyValue a, KeyValue b) {
		return a.getName().compareTo(b.getName());
	}
	
}
