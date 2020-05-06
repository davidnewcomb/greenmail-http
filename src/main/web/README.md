# Build front end

Currently package.homepage is set to /v2. I need the old version and the new version running at the same time.
```
yarn install
yarn build
rm -rf ../resources/web/v2
cp -r build ../resources/web/v2
```
**NOTE**: The maven build has not been updated to build the frontend yet.
