# Greenmail HTTP

Encapsulates GreenMail Standalone, adds a web server to deliver JSON and web pages showing the internals of GreenMail.

## Build

```
git clone https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
mvn clean install
```


## Run
Run using same command line options as Greenmail Standalone ( https://greenmail-mail-test.github.io/greenmail/#deployment ).

```
java -Dgreenmail.setup.test.smtp -Dgreenmail.setup.test.imap -Dgreenmail.setup.test.http -Dgreenmail.verbose -jar target/greenail-http.jar
```

### Test
If you would like to start with some test mailboxes then you can launch with the `add_test_data` option.

```
java -Duk.co.bigsoft.greenmail.add_test_data [opts] -jar target/greenail-http.jar
```

## Access
Goto http://localhost:7000/

## Project plan
1. Prototype - make it work - done
1. Make it better: breadcrumbs, more links, prettier.

This is round one. So if you are interviewing me then don't judge this code yet! It's so dirty, but it works!

If you want a particular feature first then raise a feature request.
