# GreenMail HTTP

Encapsulates GreenMail Standalone 1.6.x, adds a web server to deliver JSON and web pages showing the internals of GreenMail.

## Frontend
More screenshots and instructions in the [frontend](Documentation/frontend.md) section.
![Project home](Documentation/images/project-home.png "Project home")

## Browser access
http://localhost:7000/

## Build
While the project is in flux, it's not in the Maven repos, but it is now a one step build.

```
git clone https://github.com/davidnewcomb/greenmail-http.git
cd greenmail-http
mvn clean install
```
Downloads `node` and `yarn` (to the `exe` folder) and uses them to build the React frontend.

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

## Developers
I'm always happy to receive push requests. Just a couple of guidelines for a speedy merge.

1. Take your branch from `master`.
1. Follow the format and style in other files.
1. Rebase before pushing.
1. I like lots of smaller self-contained classes rather than huge source files containing everything.
1. If possible, try to get the frontend working when running `yarn` separately.


## Versions

### 1.0.0
Initial release - Prototype
### 2.0.0
Pretty frontend
