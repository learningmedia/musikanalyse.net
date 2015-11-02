#!/bin/sh

PATH=$(npm bin):$PATH

ftpsync -h $FTP_HOST -u $FTP_USER -s $FTP_PASS -l ./build -r / -c 4
