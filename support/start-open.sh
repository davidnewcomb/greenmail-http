#!/bin/bash

if [ "$GREENMAIL_API_PORT" = "" ]
then
	# Default
	GREENMAIL_API_PORT=8080
fi

JAR=`ls target/greenmail-http*.jar`
java	\
	-Dgreenmail.setup.test.smtp		\
	-Dgreenmail.setup.test.pop3		\
	-Dgreenmail.setup.test.imap		\
	-Dgreenmail.auth.disabled		\
	-Dgreenmail.hostname=127.0.0.1		\
	-Dgreenmail.api.port=$GREENMAIL_API_PORT\
	-Dgreenmail.verbose			\
	-Duk.co.bigsoft.greenmail.add_test_data	\
	-Duk.co.bigsoft.greenmail.ac_anywhere	\
	-jar $JAR
