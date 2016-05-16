#!/bin/bash

type babel && babel src --out-dir lib --presets es2015 || echo 'warn: babel failed'
