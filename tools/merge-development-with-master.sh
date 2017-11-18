#!/bin/bash
set -e

echo Test: merging development with master...
if [ "$TRAVIS_BRANCH" != "development" ]; then
  echo Test: travis branch is not development...
  exit 0;
fi

git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_USERNAME
git remote set-branches --add origin master
git fetch
git reset --hard
git checkout master --force
git merge --no-ff --no-edit development
git push origin master

git push "https://${GITHUB_TOKEN}@github.com/PHPiotr/phpiotr4"