#!/bin/sh
if [ ! -f "pid" ]
then
    node ../lib/daemon.js &
    echo $! > pid
fi
