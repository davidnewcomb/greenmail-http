package uk.co.bigsoft.greenmail.http.dto;

import java.util.Arrays;
import java.util.List;

import javax.mail.Flags;

import com.icegreen.greenmail.store.MailFolder;

public class MailFolderDto {
	private static FlagConverter flagConverter = new FlagConverter();
	private int firstUnseen;
	private String fullName;
	private String name;
	private int messageCount;
	private long[] messageUids;
	private List<String> userFlags;
	private List<String> sysFlags;

	public MailFolderDto(MailFolder mailFolder) {
		firstUnseen = mailFolder.getFirstUnseen();
		fullName = mailFolder.getFullName();
		name = mailFolder.getName();
		messageCount = mailFolder.getMessageCount();
		messageUids = mailFolder.getMessageUids();

		Flags flags = mailFolder.getPermanentFlags();
		sysFlags = flagConverter.toString(flags.getSystemFlags());
		userFlags = Arrays.asList(flags.getUserFlags());

	}

	public int getFirstUnseen() {
		return firstUnseen;
	}

	public String getFullName() {
		return fullName;
	}

	public String getName() {
		return name;
	}

	public int getMessageCount() {
		return messageCount;
	}

	public long[] getMessageUids() {
		return messageUids;
	}

	public List<String> getPermanentFlagsUser() {
		return userFlags;
	}

	public List<String> getPermanentFlagsSystem() {
		return sysFlags;
	}

}
