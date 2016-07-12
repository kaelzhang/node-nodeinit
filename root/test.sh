#!/bin/bash

export PATH=$PATH:./node_modules/.bin/

type babel && babel src --out-dir lib --presets es2015 || echo 'warn: babel failed'

mocha --reporter spec ./test/*.js
