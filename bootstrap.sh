#!/usr/bin/bash

mydir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )

if [ ! -d "${mydir}/packages/@laravel-streams" ]; then
    mkdir -p ${mydir}/packages/@laravel-streams
fi
mkdir -p ${mydir}/packages/streams

cd ${mydir}/packages/streams
git clone git@github.com:laravel-streams/streams-api api
git clone git@github.com:laravel-streams/streams-core core
git clone git@github.com:laravel-streams/streams-ui ui

cd ${mydir}/packages/@laravel-streams
git clone git@github.com:laravel-streams/api-js streams-api
git clone git@github.com:laravel-streams/mix-extension mix-extension
