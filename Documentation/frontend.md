# GreenMail HTTP Frontend
Written in ReactJS, using Material-UI and Axios.

## Run locally
Maven builds this package as part of the main build but if you'd like to develop it then it's easy.

```
yarn install
yarn start
```
A web browser will open automatically showing the front page.
You must have the GreenMail HTTP application running (obviously!).
If you get CORS issues then consider adding [ac_anywhere](../README.md#user-content-run-with-access-control-allow-origin).

## Screenshots
### Project
Checks if you are on the latest version.
![Project home](images/project-home.png "Project home")

### Config
Collapsable configuration
![Configuration](images/config.png "Configuration")

### Users
List users
![List users](images/list-users.png "List users")
Add user
![Add user](images/add-user.png "Add user")

### Messages
Clarke Kent's mailbox
![Clarke's mailbox](images/clarke-mailbox.png "Clarke's mailbox")
Clarke Kent's inbox
![Clarke's inbox](images/clarke-folder-messages.png "Clarke's inbox")

### Messages
Message body
![Message body](images/message-body.png "Message body")
Message Headers
![Message body](images/message-headers.png "Message body")
Compose and send mail
![Compose and send mail](images/compose-email.png "Compose and send mail")
All messages (without folders)
![All messages](images/all-messages.png "All messages")

