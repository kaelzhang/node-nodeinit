#!/bin/bash

npm install

# babel fails old node, so install babel manually
type babel || npm i -g babel babel-preset-es2015
