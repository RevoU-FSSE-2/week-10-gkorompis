#!/bin/sh
echo ">>> transpiling..."
cd ~/snow-revou/week-102/week-10-gkorompis/server/src
npx tsc
cd ..
echo ">>> compress deploy file"
zip -r deploy.zip . -x "src/*" "misc/*" "test.js" "*.sh" "./testenv.js" "cek/*"
echo ">>> upload to aws s3 bucket"
aws s3 cp deploy.zip s3://revou-week10-00