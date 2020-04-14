var templates = {};

var CFG = {};
CFG.HIDE_PASSOWRDS = true;

const ANCH = {
	EMAIL: '<a href="/email/%1">%1</a>',
	DOMAIN: '<a href="/domain/%1">%1</a>',
	LIST_MAILBOXES: '<a href="/lf/%1">%2</a>',
	MAILBOX: '<a href="/mailbox/%1">%1</a>',
	MESSAGE_BODY: '<a href="/messbody/%1">%2</a>'
};

const URLS = {
	ALL_IMAP: '/imap',
	LIST_MAILBOXES: '/lf',
	LIST_USERS: '/lu',
	PURGE: '/p',
	RESET: '/r'
};

function mk_url(template, params) {
	let s = template;

	for (let i = 0; i < params.length; ++i) {
		let re = new RegExp('%' + (i + 1), 'g');
		s = s.replace(re, params[i]);
	}
	return s;
}

// https://code-maven.com/handlebars-with-dynamically-loaded-template
function display_template(selector, template, data) {
	console.log('display selector=' + selector + ' template=' + template + ' data=' + data);

	if (templates[template] === undefined) {
		console.log("generating..");
		let url = "/templates/" + template + ".html";
		$.get(url, function (get_data, get_status) {
			//console.log(get_data);
			//console.log(get_status);
			templates[template] = Handlebars.compile(get_data);
			display_template(selector, template, data);
		});
		return;
	}

	var template_cached = templates[template];
	var html = template_cached(data);

	$(selector).html(html);
}

Handlebars.registerHelper("table_header", function () {
	let s = '<tr>';
	for (var i = 0; i < arguments.length - 1; ++i) {
		s += '<th> ' + arguments[i] + ' </th>';
	}
	s += '</tr>';
	return new Handlebars.SafeString(s);
});

Handlebars.registerHelper("print_email", function (email) {
	let at = email.indexOf('@');
	if (at == -1) {
		return email;
	}
	let u = email.substring(0, at);
	let d = email.substring(at + 1, email.length);

	let ua = mk_url(ANCH.EMAIL, [u]);
	let da = mk_url(ANCH.DOMAIN, [d]);

	let html = ua + '@' + da;
	return new Handlebars.SafeString(html);
});

Handlebars.registerHelper("print_password", function (pwd) {
	if (CFG.HIDE_PASSOWRDS) {
		return "*".repeat(pwd.length);
	} else {
		return pwd;
	}
});
