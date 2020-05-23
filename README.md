# GreenMail HTTP

Encapsulates GreenMail Standalone, adds a web server to deliver JSON and web pages showing the internals of GreenMail.

## Build
One step build with Maven. Downloads `node` and `yarn` (to the `exe` folder) and uses them to build the React frontend.

```
git clone https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
mvn clean install
```

## Run
If you just want to see GreenMail HTTP in action, with a few pre-loaded test emails, without a lot of faffing, then run:

```
support/start-open.sh
```

You can run GreenMail HTTP using the same options as GreenMail Standalone ( https://greenmail-mail-test.github.io/greenmail/#deployment ).

### Test
There are a few options specific to GreenMail HTTP. These are configured using `-D` options in the same way GreenMail does.
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
cd src/main/web
yarn start
```
The browser will open automatically and off you go!


## Access
http://localhost:7000/

## Versions

### 1.0.0
Initial release - Prototype
### 2.0.0
Pretty frontend

