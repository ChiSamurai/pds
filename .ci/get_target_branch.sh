#!/usr/bin/env bash

case $BRANCH_NAME in
    master)
      exit 0
      ;;
    develop)
      exit 0
      ;;
    *)
      echo "develop"
      exit 0
      ;;
esac
