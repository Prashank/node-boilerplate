#!/bin/sh

npm i -g hotel@0.8.6

npm install

hotel stop 
hotel start

networksetup -setautoproxyurl "Wi-Fi" "http://localhost:2000/proxy.pac"
# Turn Wifi Off and On, if not running this script for the first time

hotel add "npm start" --name "node-call-ai" --port 5011

hotel stop 
hotel start