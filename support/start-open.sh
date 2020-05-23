#!/bin/bash

JAR=`ls target/greenmail-http*.jar`
java	\
	-Dgreenmail.setup.test.smtp		\
	-Dgreenmail.setup.test.pop3		\
	-Dgreenmail.setup.test.imap		\
	-Dgreenmail.auth.disabled		\
	-Dgreenmail.hostname=127.0.0.1		\
	-Dgreenmail.verbose			\
	-Duk.co.bigsoft.greenmail.add_test_data	\
	-Duk.co.bigsoft.greenmail.ac_anywhere	\
	-jar $JAR
