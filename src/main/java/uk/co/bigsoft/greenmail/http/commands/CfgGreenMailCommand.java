package uk.co.bigsoft.greenmail.http.commands;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Properties;

import com.icegreen.greenmail.util.GreenMail;
import com.icegreen.greenmail.util.PropertiesBasedServerSetupBuilder;
import com.icegreen.greenmail.util.ServerSetup;

import io.javalin.http.Context;
import uk.co.bigsoft.greenmail.http.dto.ServerConfigDto;

public class CfgGreenMailCommand extends BaseHandler {

	public CfgGreenMailCommand(GreenMail greenMail) {
		super(greenMail);
	}

	@Override
	public void handle(Context ctx) throws Exception {
		Properties properties = System.getProperties();
		ServerSetup[] serverSetup = new PropertiesBasedServerSetupBuilder().build(properties);

		ArrayList<ServerConfigDto> list = new ArrayList<>();

		list.add(toServerConfigDto("greenmail", properties, "greenmail."));
		list.add(toServerConfigDto("greenmail-http", properties, "uk.co.bigsoft.greenmail."));

		// Service props
		for (ServerSetup ss : serverSetup) {
			Properties serProp = ss.configureJavaMailSessionProperties(properties, false);
			list.add(toServerConfigDto(ss.getProtocol(), serProp, "mail."));
		}
		
		ctx.json(list);
	}

	private ServerConfigDto toServerConfigDto(String title, Properties properties, String filter) {
		Map<String, String> map = filterFor(properties, filter);
		ServerConfigDto xx = new ServerConfigDto(title, map);
		return xx;
	}

	private Map<String, String> filterFor(Properties properties, String prefix) {
		HashMap<String, String> map = new HashMap<>();
		for (Entry<Object, Object> entry : properties.entrySet()) {
			String key = entry.getKey().toString();
			if (key.startsWith(prefix)) {
				map.put(key, entry.getValue().toString());
			}
		}
		return  map;
	}

}
