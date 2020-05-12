#!/bin/bash
#
# Guts of
# https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
# but without rollup. Is it needed, create issue for discussion?

react-scripts build
brunch build -p
browserify ./index.js \
  -g [ envify --NODE_ENV production ] \
  -g uglifyify \
  | terser --compress --mangle > ./bundle.js
