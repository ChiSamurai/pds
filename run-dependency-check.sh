#!/bin/sh

set -e

RELEASE_URL=https://github.com/jeremylong/DependencyCheck/releases/download/v6.5.1/dependency-check-6.5.1-release.zip

mkdir odc | true
mkdir odc/tmp | true
mkdir odc/reports | true

curl -s -L -o odc/tmp/dependency-check.zip "$RELEASE_URL"
(cd odc/tmp && jar xvf dependency-check.zip && rm -rf dependency-check.zip)

chmod +x ./odc/tmp/dependency-check/bin/dependency-check.sh
./odc/tmp/dependency-check/bin/dependency-check.sh \
  --project "Global" \
  --scan "./package.json" \
  --format "XML" \
  --format "HTML" \
  --format "JSON" \
  --log
  --out "./odc/reports/global"

#./odc/tmp/dependency-check/bin/dependency-check.sh \
#  --project "PDS CDK" \
#  --scan "./packages/cdk/package.json" \
#  --format "XML" \
#  --format "HTML" \
#  --format "JSON" \
#  --out "./odc/reports/cdk"
#
#./odc/tmp/dependency-check/bin/dependency-check.sh \
#  --project "PDS common" \
#  --scan "./packages/common/package.json" \
#  --format "XML" \
#  --format "HTML" \
#  --format "JSON" \
#  --out "./odc/reports/common"
#
#./odc/tmp/dependency-check/bin/dependency-check.sh \
#  --project "PDS components" \
#  --scan "./packages/pds-components/package.json" \
#  --format "XML" \
#  --format "HTML" \
#  --format "JSON" \
#  --out "./odc/reports/components"
