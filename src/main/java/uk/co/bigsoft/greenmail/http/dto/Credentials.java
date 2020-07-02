package uk.co.bigsoft.greenmail.http.dto;

public class Credentials {
    
    private String email;
    private String login;
    private String password;

    public Credentials() {
    }

    public Credentials(String email, String username, String password) {
        this.email = email;
        this.login = username;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return login + ":" + password;
    }
}
