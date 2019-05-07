#!/bin/bash
#
# Install on root deps if needed

set -eu

PROJECT_DIR=$(cd "$(dirname "$0")/../.." && pwd)
cd ${PROJECT_DIR}

npx npm-install-if-needed --ignore-script
