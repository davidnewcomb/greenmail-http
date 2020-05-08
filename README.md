# GreenMail HTTP

Encapsulates GreenMail Standalone, adds a web server to deliver JSON and web pages showing the internals of GreenMail.

## Build
The new frontend is experimental so it's not linked into the main build yet.
```
git clone https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
root=$PWD
```
Optional: if you want the v2 frontend, then it still needs to be built by hand.
```
cd $root/src/main/web/
yarn install
yarn build
mv build ../resources/web/v2
```
Then build and package.
```
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

## Develop
To develop the frontend
```
java -Duk.co.bigsoft.greenmail.ac_anywhere [opts] -jar target/greenail-http.jar
```
adds `Access-Control-Allow-Origin: *` to responses, so then you can do:
```
cd yarn start
```
The browser will open automatically and off you go!


## Access
1. Stable frontend - http://localhost:7000/
1. Under development - http://localhost:7000/v2/

## Versions

### 1.0.0
Initial release - Prototype

