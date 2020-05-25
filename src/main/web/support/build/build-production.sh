#!/bin/bash
#
# Guts of
# https://reactjs.org/docs/optimizing-performance.html#use-the-production-build
# but without rollup. Is it needed, create issue for discussion?


OUT="../../../target/classes/frontend"

echo "Switch off yarn commit"
yarn config set version-git-tag false

echo "Updating frontend package version to: $GREENMAIL_HTTP_VERSION"
yarn version --new-version $GREENMAIL_HTTP_VERSION

echo "yarn install"
yarn install

echo "Running React build"
react-scripts build

echo "Moving build folder to $OUT"
mv build $OUT


#brunch build -p
#browserify ./index.js \
#  -g [ envify --NODE_ENV production ] \
#  -g uglifyify \
#  | terser --compress --mangle > ./bundle.js
