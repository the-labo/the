#!/bin/bash

set -eu

PROJECT_DIR=$(cd "$(dirname "$0")/../.." && pwd)
cd ${PROJECT_DIR}

for dir in ${PROJECT_DIR}/packages/*
do
  cd  ${dir}
  if test -f "package.json"; then
    echo "=== ${dir} ==="
    $@
  fi
  cd ${PROJECT_DIR}
done
