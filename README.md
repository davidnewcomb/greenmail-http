# GreenMail HTTP

Encapsulates GreenMail Standalone, adds a web server to deliver JSON and web pages showing the internals of GreenMail.

## Build

```
git clone https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
mvn clean install
```


## Run
Run using same command line options as GreenMail Standalone ( https://greenmail-mail-test.github.io/greenmail/#deployment ).

```
java -Dgreenmail.setup.test.smtp -Dgreenmail.setup.test.imap -Dgreenmail.setup.test.http -Dgreenmail.verbose -jar target/greenail-http.jar
```

### Test
If you would like to start with some test mailboxes then you can launch with the `add_test_data` option.

```
java -Duk.co.bigsoft.greenmail.add_test_data [opts] -jar target/greenail-http.jar
```

Adds `Access-Control-Allow-Origin: *` to responses. I use it when testing the frontend externally.
```
java -Duk.co.bigsoft.greenmail.ac_anywhere [opts] -jar target/greenail-http.jar
```


## Access
1. Stable frontend - http://localhost:7000/
1. Under development - http://localhost:7000/v2/

## Versions

### 1.0.0
Initial release - Prototype

