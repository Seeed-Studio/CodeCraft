#!/bin/bash

script_dir=$(pwd)

echo "Cleanup..."
cd ${script_dir}/gui && rm -rf node_modules package-lock.json translations build dist
cd ${script_dir}/blocks && rm -rf node_modules package-lock.json gh-pages dist \
blockly_compressed_horizontal.js \
blockly_compressed_vertical.js \
blockly_uncompressed_horizontal.js \
blockly_uncompressed_vertical.js \
blocks_compressed_horizontal.js \
blocks_compressed_vertical.js \
blocks_compressed.js
cd ${script_dir}/l10n && rm -rf node_modules package-lock.json locales dist
cd ${script_dir}/vm && rm -rf node_modules package-lock.json playground dist
cd ${script_dir}/main/app && rm -rf node_modules package-lock.json shell gui 
cd ${script_dir}/main && rm -rf node_modules package-lock.json build
echo "Finished..."
