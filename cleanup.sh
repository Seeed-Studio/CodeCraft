#!/bin/bash

#!/bin/bash

script_dir="/root/workspace/seeed-codecraft_2f88"

echo "Cleanup..."
cd ${script_dir}/gui && rm -rf node_modules package-lock.json build dist
cd ${script_dir}/blocks && rm -rf node_modules package-lock.json build dist
cd ${script_dir}/l10n && && rm -rf node_modules package-lock.json build dist
cd ${script_dir}/vm && && rm -rf node_modules package-lock.json build dist
rm -rf ${script_dir}/main/app/gui
rm -rf ${script_dir}/main/app/blocks
rm -rf ${script_dir}/main/app/l10n
rm -rf ${script_dir}/main/app/vm
cd ${script_dir}/main/app && rm -rf node_modules package-lock.json build dist
cd ${script_dir}/main && rm -rf node_modules package-lock.json build dist
echo "Finished..."
