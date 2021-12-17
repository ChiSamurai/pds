#!/bin/sh

set -e

RELEASE_URL=https://github.com/jeremylong/DependencyCheck/releases/download/v5.3.2/dependency-check-5.3.2-release.zip

mkdir odc | true
mkdir odc/tmp | true
mkdir odc/reports | true

curl -s -L -o odc/tmp/dependency-check.zip "$RELEASE_URL"
(cd odc/tmp && jar xvf dependency-check.zip && rm -rf dependency-check.zip)

chmod +x ./odc/tmp/dependency-check/bin/dependency-check.sh
./odc/tmp/dependency-check/bin/dependency-check.sh \
  --project "PDS Design System" \
  --scan "./package.json" \
  --format "XML" \
  --format "HTML" \
  --format "JSON" \
  --out "./odc/reports"
