# Greenmail HTTP

Encapsulates GreenMail Standalone, adds a web server to deliver json and web pages showing the internals of GreenMail.

## Build

```
https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
mvn clean install
java -Dgreenmail.setup.test.smtp -Dgreenmail.setup.test.imap -Dgreenmail.setup.test.http -Dgreenmail.verbose jar target/greenail-http-<ver>.jar
```


## Run
Run using same command line options as Greenmail Standalone ( https://greenmail-mail-test.github.io/greenmail/#deployment ).
```
java -Dgreenmail.setup.test.smtp -Dgreenmail.setup.test.imap -Dgreenmail.setup.test.http -Dgreenmail.verbose jar target/greenail-http.jar
```

Goto http://localhost:7000/

## Future
The project is still taking shape. Currently you can list users and all emails in imap.
There's more features to come but If you want a particular feature first then raise a feature request.

