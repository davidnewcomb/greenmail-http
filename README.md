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

You can run GreenMail HTTP using the same options as [GreenMail Standalone](https://greenmail-mail-test.github.io/greenmail/#deployment).

There are a few options specific to GreenMail HTTP. Inline with GreenMail these are `-D` options too.

### Run with test data
Creates a couple of users with a couple of mail folders containing varying numbers of emails.
```
-Duk.co.bigsoft.greenmail.add_test_data
```

### Run with Access-Control-Allow-Origin
When developing the frontend you can run into [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) issues.
Using this flag will tell GreenMail HTTP to add Access-Control-Allow-Origin to the response headers.
```
-Duk.co.bigsoft.greenmail.ac_anywhere
```

## Browser access
http://localhost:7000/

## Frontend development
See [README](src/main/web/README.md).

## Versions

### 1.0.0
Initial release - Prototype
### 2.0.0
Pretty frontend

