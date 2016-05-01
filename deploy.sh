#!/bin/sh

PATH=$(npm bin):$PATH

envsubst < ./build/web.config.template > ./build/web.config

rm ./build/web.config.template

ftpsync -h $FTP_HOST -u $FTP_USER -s $FTP_PASS -l ./build -r / -c 4

if [ $? -ne 0 ]
then
  echo "FTP sync failed, trying again..."
  ftpsync -h $FTP_HOST -u $FTP_USER -s $FTP_PASS -l ./build -r / -c 4
fi
