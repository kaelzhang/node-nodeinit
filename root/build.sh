#!/bin/bash

type babel && babel src --out-dir lib || echo 'warn: babel failed'
