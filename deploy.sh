#!/bin/sh

PATH=$(npm bin):$PATH

envsubst < ./build/web.config.template > ./build/web.config

rm ./build/web.config.template

mkdir -p ~/.lftp
echo "set ssl:verify-certificate no" > ~/.lftp/rc

FTP_URL="ftp://$FTP_USER:$FTP_PASS@$FTP_HOST"
LCD="./build"
RCD="/$FTP_USER"

lftp -c "
  set ftp:list-options -a;
  open '$FTP_URL';
  lcd $LCD;
  cd $RCD;
  mirror --reverse \
         --delete \
         --exclude-glob .git* \
"
