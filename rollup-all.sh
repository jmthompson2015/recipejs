#! /bin/bash

export BASE="/Users/jmthompson/Documents/Software Development/git/recipejs"
export BIN="${BASE}"/node_modules/rollup/dist/bin

"${BIN}"/rollup -c
"${BIN}"/rollup -c rollup.config.terser.js
