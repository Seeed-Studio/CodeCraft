docker build . -t seeed/codecraft-build-env:latest

docker run -it --rm -v $(pwd):/root/workspace/seeed-codecraft_2f88 seeed/codecraft-build-env:latest bash -c "chmod +x run-win64.sh && ./run-win64.sh"

docker run -it --rm -v $(pwd):/root/workspace/seeed-codecraft_2f88 seeed/codecraft-build-env:latest bash -c "chmod +x run-mac.sh && ./run-mac.sh"
