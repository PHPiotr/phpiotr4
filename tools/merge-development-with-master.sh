#!/bin/bash
set -e

if [ "$TRAVIS_BRANCH" != "development" ]; then
  exit 0;
fi

git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_USERNAME
git remote set-branches --add origin master
git fetch
git reset --hard
git checkout master --force
git merge --no-ff --no-edit development
git remote add travis-origin https://${GITHUB_SECRET_TOKEN}@github.com/PHPiotr/phpiotr4
git push --quiet --set-upstream travis-origin master