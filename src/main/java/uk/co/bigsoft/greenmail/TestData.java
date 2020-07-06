package uk.co.bigsoft.greenmail;

import javax.mail.internet.MimeMessage;
import com.icegreen.greenmail.imap.ImapHostManager;
import com.icegreen.greenmail.store.MailFolder;
import com.icegreen.greenmail.user.GreenMailUser;
import com.icegreen.greenmail.user.UserManager;
import com.icegreen.greenmail.util.GreenMail;
import uk.co.bigsoft.greenmail.mailx.MimeMessageBuilder;

public class TestData {


	public void populate(GreenMail gm) {

		String SUPERMAN = "clarke.kent@superman.com";
		String SUPERMAN_USER = "superman";
		String SUPERMAN_PASS = "x-ray-vision";

		String SPIDERMAN = "peter.parker@spiderman.co.uk";
		String SPIDERMAN_USER = "spiderman";
		String SPIDERMAN_PASS = "spin-webs";

		String WONDER_WOMAN = "diana.prince@wonderwoman.com";
		String WONDER_WOMAN_USER = "wonderwoman";
		String WONDER_WOMAN_PASS = "nice-boots";

		String BATMAN = "bruce.wayne@gotham.us";
		String ROBIN = "dick.grayson@gotham.us";
		String TGAH = "ralph.hinkley@thegreatestamericanhero.com";
		String SFH = "stringfellow.hawk@airwolf.com";

		try {

			UserManager um = gm.getManagers().getUserManager();
			ImapHostManager im = gm.getManagers().getImapHostManager();

			GreenMailUser superman = um.createUser(SUPERMAN, SUPERMAN_USER, SUPERMAN_PASS);
			GreenMailUser spiderman = um.createUser(SPIDERMAN, SPIDERMAN_USER, SPIDERMAN_PASS);
			GreenMailUser wonderwoman = um.createUser(WONDER_WOMAN, WONDER_WOMAN_USER, WONDER_WOMAN_PASS);

			MailFolder supermanInbox = im.getInbox(superman);
			MailFolder supermanPofF = im.createMailbox(superman, "PalaceOfF");
			
			MailFolder spidermanWebjuce = im.createMailbox(spiderman, "web-juice");
			
			MailFolder wonderwomanInbox = im.getInbox(wonderwoman);
			
			MimeMessage m1 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(SUPERMAN)
					.withTo(BATMAN)
					.withSubject("Ears")
					.withBody("I like the pointy ears on your hat.")
					.build();

			MimeMessage m2 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(SPIDERMAN)
					.withTo(WONDER_WOMAN)
					.withSubject("Gym")
					.withBody("You look great, can you recommend a good gym?")
					.build();

			MimeMessage m3 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(BATMAN)
					.withTo(SUPERMAN)
					.withSubject("Lift")
					.withBody("I need a lift to Gotham.")
					.build();

			MimeMessage m4 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(WONDER_WOMAN)
					.withTo(SPIDERMAN)
					.withSubject("Re: Gym")
					.withBody("Why thank you! The best gym is Gymmy's in Birkdale, UK.")
					.build();

			MimeMessage m5 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(BATMAN)
					.withTo(SUPERMAN).withTo(SPIDERMAN)
					.withCc(BATMAN).withCc(WONDER_WOMAN)
					.withBcc(TGAH).withBcc(SFH)
					.withSubject("New suit")
					.withBody("I'm having a party to show off my new suit. Do you want to come?")
					.build();
			
			MimeMessage m6 = new MimeMessageBuilder(gm.getSmtp().createSession())
					.withFrom(ROBIN)
					.withTo(WONDER_WOMAN).withTo(SUPERMAN)
					.withSubject("Batman is evil!")
					.withBody("I need a lift from Gotham to Metropolis, asap")
					.build();

			System.out.println("");
			System.out.println("================ STORING TEST EMAILS - Start");
			System.out.println("");
			System.out.println("On my computer storing emails takes ages.");
			System.out.println("So if it sticks for you then please wait a second or two.");
			System.out.println("If it does stick for you, maybe you can help me figure out why!");
			System.out.println("");

			System.out.println("|......|");
			System.out.print("|");

			supermanInbox.store(m1);
			System.out.print("*");

			supermanInbox.store(m5);
			System.out.print("*");

			supermanInbox.store(m3);
			System.out.print("*");

			supermanPofF.store(m2);
			System.out.print("*");

			spidermanWebjuce.store(m4);
			System.out.print("*");

			wonderwomanInbox.store(m6);
			System.out.print("*");

			System.out.println("|");
			System.out.println("================ STORING TEST EMAILS - Done");

		} catch (Exception e) {
			e.printStackTrace();
		}

	}
}
