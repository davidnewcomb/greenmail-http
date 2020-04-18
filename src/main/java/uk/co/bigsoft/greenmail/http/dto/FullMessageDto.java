package uk.co.bigsoft.greenmail.http.dto;

import java.util.Map;

public class FullMessageDto {
	private String[] to;
	private String[] from;
	private String[] cc;
	private String[] bcc;
	private Map<String, String> headers;
	private String subject;
	private String body;
	private String[] flags;

	public FullMessageDto() {
		//
	}

	public String[] getTo() {
		return to;
	}

	public void setTo(String[] to) {
		this.to = to;
	}

	public String[] getFrom() {
		return from;
	}

	public void setFrom(String[] from) {
		this.from = from;
	}

	public String[] getCc() {
		return cc;
	}

	public void setCc(String[] cc) {
		this.cc = cc;
	}

	public String[] getBcc() {
		return bcc;
	}

	public void setBcc(String[] bcc) {
		this.bcc = bcc;
	}

	public Map<String, String> getHeaders() {
		return headers;
	}

	public void setHeaders(Map<String, String> headers) {
		this.headers = headers;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getBody() {
		return body;
	}

	public void setBody(String body) {
		this.body = body;
	}

	public String[] getFlags() {
		return flags;
	}

	public void setFlags(String[] flags) {
		this.flags = flags;
	}
}
