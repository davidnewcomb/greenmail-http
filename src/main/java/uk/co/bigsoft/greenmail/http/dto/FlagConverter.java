package uk.co.bigsoft.greenmail.http.dto;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.mail.Flags;
import javax.mail.Flags.Flag;

public class FlagConverter {

	private static HashMap<Flag, String> flagTranslator = new HashMap<>();

	static {
		flagTranslator.put(Flag.ANSWERED, "ANSWERED");
		flagTranslator.put(Flag.DELETED, "DELETED");
		flagTranslator.put(Flag.DRAFT, "DRAFT");
		flagTranslator.put(Flag.FLAGGED, "FLAGGED");
		flagTranslator.put(Flag.RECENT, "RECENT");
		flagTranslator.put(Flag.SEEN, "SEEN");
		flagTranslator.put(Flag.USER, "USER");
	}

	public FlagConverter() {
	}

	public List<String> toString(Flags flags) {
		ArrayList<String> out = new ArrayList<>();
		for (Flag f : flags.getSystemFlags()) {
			String ff = toString(f);
			out.add(ff);
		}
		return out;
	}

	public String toString(Flag flag) {
		String ff = flagTranslator.get(flag);
		if (ff == null) {
			ff = "UNKNOWN(" + flag.toString() + ")";
		}
		return ff;
	}

	public List<String> toString(Flag[] flags) {
		ArrayList<String> out = new ArrayList<>();
		for (Flag f : flags) {
			String ff = toString(f);
			out.add(ff);
		}
		return out;
	}

}
