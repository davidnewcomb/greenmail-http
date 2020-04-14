package uk.co.bigsoft.greenmail.http.dto;

import javax.mail.Flags;

import com.icegreen.greenmail.store.MailFolder;

public class MailFolderDto {
	private MailFolder folder;

	public MailFolderDto(MailFolder mailFolder) {
		folder = mailFolder;
	}

	public int getFirstUnseen() {
		return folder.getFirstUnseen();
	}

	public String getFullName() {
		return folder.getFullName();
	}

	public String getName() {
		return folder.getName();
	}

	public int getMessageCount() {
		return folder.getMessageCount();
	}

	public long[] getMessageUids() {
		return folder.getMessageUids();
	}

	public String[] getPermanentFlags() {
		Flags flags = folder.getPermanentFlags();
		//Flag[] sysFlags = flags.getSystemFlags();

		String[] userFlags = flags.getUserFlags();
		return userFlags;
	}

}
