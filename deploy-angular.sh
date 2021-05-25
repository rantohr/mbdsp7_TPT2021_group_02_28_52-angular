echo "copy files"
cp -f package.json dist/
cp -f package-lock.json dist/
cp -f angular.json dist/
cp -f karma.conf.js dist/
cp -f README.md dist/

echo "cd dist"
cd dist/

echo "init"
git init

echo "add origin"
git remote add origin git@github.com:rantohr/mbdsp7_TPT2021_group_02_28_52-angular.git

echo "git add & commit"
git add . && git commit -m "$1"

echo "push origin master"
git push origin master

echo "DEPLOYEMENT DONE"