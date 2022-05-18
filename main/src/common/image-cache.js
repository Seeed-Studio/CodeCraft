const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const {
    get,
    set
} = require('./local-storage')

const IMAGE_CACHE_MAPFILE_NAME = 'imagesCache';
const IMAGE_CACHE_PATH = path.join($dirname, '../../__imgCache');

const BUILDCACHE_TEMPLATE_PATH = path.join($dirname, '../../buildCacheTemplate');
const BUILDCACHE_PATH = path.join($dirname, '../../buildCache');

let __lowPriorityQueue = []
let __highPriorityQueue = []


let imagesCacheMap = {}; //用来存储本地文件映射关系

/**
 * 文件下载
 * @param {*} url 
 * @param {*} path 
 */
const download = (url, path) => {
    // 触发文件下载
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/octet-stream'
            },
        }).then(res => res.buffer()).then(_ => {
            // 如果buffer为空直接返回
            if (!!!_) {
                reject();
                return;
            }
            // 判断文件是否存在
            // if (await exists(path)) {
            //     await fs.unlink(path);
            // }
            // 写入文件
            fs.writeFile(path, _, "binary", function (err) {
                if (err) {
                    // console.log('save fail ! >>> url : ' + url);
                    reject();
                } else {
                    // console.log('save succ ! >>> url : ' + url);
                    resolve();
                }
            });
        }).catch(() => {
            reject();
        });
    });
}


const copy = function (src, dst) {
    let paths = fs.readdirSync(src);
    paths.forEach(function (path) {
        var _src = src + '/' + path;
        var _dst = dst + '/' + path;
        fs.stat(_src, function (err, stats) { 
            if (err) throw err;
            if (stats.isFile()) { //如果是个文件则拷贝 
                let readable = fs.createReadStream(_src);
                let writable = fs.createWriteStream(_dst);
                readable.pipe(writable);
            } else if (stats.isDirectory()) { 
                checkDirectory(_src, _dst, copy);
            }
        });
    });
}
var checkDirectory = function (src, dst, callback) {
    fs.access(dst, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(dst);
            callback(src, dst);
        } else {
            callback(src, dst);
        }
    });
};

const initBuildCacheDir = async () => {
    fs.access(BUILDCACHE_PATH, fs.constants.F_OK, (err) => {
        if (err) {
            fs.mkdirSync(BUILDCACHE_PATH);
            checkDirectory(BUILDCACHE_TEMPLATE_PATH, BUILDCACHE_PATH, copy)
        }
    });
}

/**
 * 初始化
 */
const injectImageCache = async () => {
    try {
        //init build cache 
        initBuildCacheDir()

        //检测并创建图片缓存目录
        fs.access(IMAGE_CACHE_PATH, fs.constants.F_OK, (err) => {
            if (err) {
                fs.mkdirSync(IMAGE_CACHE_PATH);
            }
        });

        //读取本地缓存文件
        get(IMAGE_CACHE_MAPFILE_NAME, (error, data) => {
            if (!error) {
                imagesCacheMap = data;
            } else {
                imagesCacheMap = {};
            }
        })
    } catch (error) {
        console.log('init module fail ... ', error);
    }
    // 周期循环遍历处理图片
    setInterval(() => {
        let processData = [];
        if (__highPriorityQueue.length > 0) {
            processData = __highPriorityQueue.slice(0, 5);
            if (__highPriorityQueue.length > 5) {
                __highPriorityQueue = __highPriorityQueue.slice(5);
            } else {
                __highPriorityQueue = [];
            }
        } else {
            processData = __lowPriorityQueue.slice(0, 5);
            if (__lowPriorityQueue.length > 5) {
                __lowPriorityQueue = __lowPriorityQueue.slice(5);
            } else {
                __lowPriorityQueue = [];
            }
        }
        handleProcessData(processData);
    }, 1000);
}

/**
 * 处理待处理的数据集
 * @param {*} data 
 */
const handleProcessData = (data = []) => {
    data.forEach(item => {
        saveItemCache(item);
    });
}

/**
 * 保存 ItemCache
 * @param {*} param0 
 */
const saveItemCache = ({
    url,
    coskey
}) => {
    try {
        //声明文件目录、文件路径
        let fpath = path.join(IMAGE_CACHE_PATH, `./image_cache__${coskey}`);
        //下载文件
        download(url, fpath).then(() => {
            //保存当前文件映射关系
            imagesCacheMap[coskey] = fpath;
            //保存覆盖映射文件
            set(IMAGE_CACHE_MAPFILE_NAME, imagesCacheMap);
        });
    } catch (error) {
        console.log('save file fail  ...', error);
    }
}

/**
 * 深度复制文件
 * @param {*} respath 
 */
const deepCopy = (srcpath, coskey) => {
    try {
        //声明文件目录、文件路径
        let dstpath = path.join(IMAGE_CACHE_PATH, `./image_cache__${coskey}`);
        // 创建读取流
        let readable = fs.createReadStream(srcpath);
        // 创建写入流
        let writable = fs.createWriteStream(dstpath);
        // 通过管道来传输流
        readable.pipe(writable);
        return dstpath;
    } catch (error) {
        console.log('file deep copy fail ...  ', error);
        return null;
    }
}

/**
 * 保存 image
 * @param {*} url 
 * @param {*} coskey 
 */
const setItemCache = async (url, coskey) => {
    if (!imagesCacheMap[coskey]) {
        __highPriorityQueue.push({
            url,
            coskey
        });
    } else {
        __lowPriorityQueue.push({
            url,
            coskey
        });
    }
}

/**
 * 获取文件数据
 * @param {*} url 
 * @param {*} coskey 
 */
const getItemCache = (coskey) => {
    if (imagesCacheMap[coskey]) {
        return imagesCacheMap[coskey];
    } else {
        return null;
    }
}

/**
 * 清空图片缓存队列
 * 正在下载的队列
 */
const clearCacheQueue = () => {
    __lowPriorityQueue = [];
    __highPriorityQueue = [];
}

/**
 * 读取本地文件流
 * @param {*} filepath 
 * @param {*} callback 
 */
const readFile = (filepath, callback) => {
    fs.readFile(filepath, callback)
}

export {
    injectImageCache,
    getItemCache,
    setItemCache,
    readFile,
    deepCopy,
    clearCacheQueue
}