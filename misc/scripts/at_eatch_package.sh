#!/bin/bash

set -eu

PROJECT_DIR=$(cd "$(dirname "$0")/../.." && pwd)
cd ${PROJECT_DIR}

for dir in ${PROJECT_DIR}/packages/*
do
cd  ${dir}
echo "=== ${dir} ==="
$@
cd ${PROJECT_DIR}
done
