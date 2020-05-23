#!/bin/bash
#
# Guts of
# https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
# but without rollup. Is it needed, create issue for discussion?

echo ""
echo ""
pwd
echo ""
echo ""

OUT="../../../target/classes/frontend"
echo "Running React build"
react-scripts build

echo "Moving build folder to $OUT"
#find ../../../target

#echo "Here"
#ls -l
#ls -l build
#ls -l

mv build $OUT


#brunch build -p
#browserify ./index.js \
#  -g [ envify --NODE_ENV production ] \
#  -g uglifyify \
#  | terser --compress --mangle > ./bundle.js
