package uk.co.bigsoft.greenmail.http.commands;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.mail.MessagingException;

import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.FolderException;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.store.Store;
import com.icegreen.greenmail.util.GreenMail;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.MessageDto;

public class ImapAllMessagesCommand extends BaseHandler {

	public ImapAllMessagesCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		ImapHostManager im = gm.getManagers().getImapHostManager();
		List<MessageDto> all = getAllMessages(im.getStore());
		ctx.json(all);
	}

	private List<MessageDto> getAllMessages(Store store) throws MessagingException, IOException {
		List<MessageDto> ret = new ArrayList<>();
		try {
			Collection<MailFolder> boxes = store.listMailboxes("*");
			for (MailFolder box : boxes) {
				ret.addAll(dto.toMessages(box, box.getMessages()));
			}
		} catch (FolderException e) {
			throw new IllegalStateException(e);
		}
		return ret;
	}

}
