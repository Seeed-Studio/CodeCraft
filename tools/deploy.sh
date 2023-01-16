#!/bin/bash

# mac环境下，部署cc到测试、正式环境
# 需要ssh免密登陆，生成本机密钥，将公钥上传到服务器
# 步骤：https://www.cnblogs.com/itwlg/p/4526920.html
# 调用指令 sh deploy.sh

hosts=("47.107.191.228" "47.107.224.241") # 测试

# hosts=("zheng_shi_huan_jing1.com" "zheng_shi_huan_jing2.com") # 正式



cd gui

# echo '打包 yarn run build-mac'
# yarn run build-mac

echo '删除 build.zip'
rm build.zip

echo '压缩 build'
zip -q -r -o build.zip build

for host in ${hosts[@]}
do
    echo "上传build.zip到${host}:/home/ccfront/"
    scp -r build.zip root@${host}:/home/ccfront/

    echo "连接${host} 解压 部署"
    ssh root@${host} "cd /home/ccfront/;rm -rf build;unzip build.zip;rm -rf codecraft/* && cp -r build/* codecraft/"
done