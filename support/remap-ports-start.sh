#!/bin/bash
#

PID_FILE=running.pid
socat tcp-listen:25,reuseaddr,fork tcp:localhost:3025 &
socat tcp-listen:110,reuseaddr,fork tcp:localhost:3110 &
socat tcp-listen:143,reuseaddr,fork tcp:localhost:3143 &

jobs -p %1 %2 %3 > $PID_FILE

ps -eaf | grep socat | grep -v grep
