#!/bin/bash

PID_FILE=running.pid

kill `cat $PID_FILE`
rm $PID_FILE
