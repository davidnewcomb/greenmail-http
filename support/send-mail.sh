#!/bin/bash
# 

for i in `seq 1 10`
do
	cat mail.txt | sed "s/THE_DATE/`date -u`/" | while read L; do sleep "1"; echo "$L"; done | "nc" -C -v "127.0.0.1" "3025"
done
