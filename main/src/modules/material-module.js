const { get, set } = require('../common/local-storage')
const {
    getItemCache,
    setItemCache,
    deepCopy,
    readFile,
    clearCacheQueue,
} = require('../common/image-cache')

const fs = require("fs");

// 平台素材
const MATERIAL_PLATFORM_SPRITE_FILENAME = 'platform_sprite';
const MATERIAL_PLATFORM_SPRITE_PAGES = 'platform_sprite_pages';
const MATERIAL_PLATFORM_BACKDROP_FILENAME = 'platform_backdrop';
const MATERIAL_PLATFORM_BACKDROP_PAGES = 'platform_backdrop_pages';
const MATERIAL_PLATFORM_ADUIO_FILENAME = 'platform_aduio';
const MATERIAL_PLATFORM_ADUIO_PAGES = 'platform_aduio_pages';

// 用户素材  （匿名）
const MATERIAL_USER_SPRITE_FILENAME = 'user_sprite';
const MATERIAL_USER_BACKDROP_FILENAME = 'user_backdrop';
const MATERIAL_USER_ADUIO_FILENAME = 'user_aduio';

// 定义平台素材类型
const platformType = {
    '1': MATERIAL_PLATFORM_SPRITE_FILENAME,
    '2': MATERIAL_PLATFORM_BACKDROP_FILENAME,
    '3': MATERIAL_PLATFORM_ADUIO_FILENAME
}
// 定义平台素材类型分页记录
const platformPages = {
    '1': MATERIAL_PLATFORM_SPRITE_PAGES,
    '2': MATERIAL_PLATFORM_BACKDROP_PAGES,
    '3': MATERIAL_PLATFORM_ADUIO_PAGES
}


// 定义用户素材类型
const userType = {
    '1': MATERIAL_USER_SPRITE_FILENAME,
    '2': MATERIAL_USER_BACKDROP_FILENAME,
    '3': MATERIAL_USER_ADUIO_FILENAME
}

/**
 * 去重算法
 * @param {*} data 
 */
const deWeight = (data = []) => {
    let obj = {};
    let result = data.reduce(function (item, next) {
        obj[next.materialUUID] ? '' : obj[next.materialUUID] = true && item.push(next);
        return item;
    }, []);
    return result;
}

/**
 * 保存素材图片
 * @param {*} url 
 * @param {*} coskey 
 */
const saveMaterialImage = ({ url, coskey }) => {
    setItemCache(url, coskey)
}

/**
 * 获取图片文件流
 * @param {*} param0 
 * @param {*} callback 
 */
const getMaterialImage = ({ localPath }, callback) => {
    readFile(localPath, callback);
}

const clearCacheDownloadQueue = () => {
    clearCacheQueue();
}

/**
 * 平台素材保存
 * @param {*} param0 
 */
const savePlatformMaterials = ({ type = "1", page = 0, content = [] }, callback) => {
    set(`${platformType[type]}_${page}`, content, callback);
    get(platformPages[type], (error, data = {}) => {
        data[`page_${page}`] = `${platformType[type]}_${page}`;
        set(platformPages[type], data);
    })
}

/**
 * 获取平台素材数据集
 * @param {*} param0 
 */
const getPlatformMaterials = ({ type = "1" }, callback) => {
    get(platformPages[type], async (error, data = {}) => {
        let result = [];
        let dataKeys = Object.keys(data);
        for (let index = 0; index < dataKeys.length; index++) {
            try {
                const itemkey = dataKeys[index];
                const itemValue = data[itemkey];
                const materials = await getPlatformPageMaterials(itemValue);
                result = result.concat(materials);
            } catch (error) { }
        }
        //去重算法
        result = deWeight(result);
        callback(null, result);
    })
}

/**
 * 获取平台素材数据集
 * @param {*} param0 
 */
const getPlatformPageMaterials = (materialsKey) => {
    return new Promise((resolve, reject) => {
        get(materialsKey, (error, data = []) => {
            if (error) {
                reject();
            } else {
                //非数组转数组
                if (!(data instanceof Array)) {
                    data = [];
                }
                // 赋值url
                let materials = data.map((m, i) => {
                    let {
                        cosFile,
                        cosFileList
                    } = m;
                    // 背景素材
                    if (cosFile) {
                        const cosFileName = cosFile.fileName;
                        const suffix = cosFileName.lastIndexOf('.') > 0 ? cosFileName.substring(cosFileName.lastIndexOf('.')) : '';
                        let ipath = getItemCache(cosFile.cosKey + suffix);
                        cosFile = Object.assign({}, cosFile, {
                            url: ipath
                        });
                    }
                    // 造型素材、角色素材
                    if (cosFileList) {
                        //赋值url 
                        cosFileList = cosFileList.map(file => {
                            const cosFileName = file.realName;
                            const suffix = cosFileName.lastIndexOf('.') > 0 ? cosFileName.substring(cosFileName.lastIndexOf('.')) : '';

                            let ipath = getItemCache(file.cosKey + suffix);
                            return Object.assign({}, file, {
                                url: ipath
                            });
                        });
                        //过滤 url = null
                        cosFileList = cosFileList.filter(f => !!f.url);
                    }
                    return Object.assign({}, m, {
                        cosFile: cosFile,
                        cosFileList: cosFileList
                    });
                });
                // 过滤 url = null
                materials = materials.filter(m => {
                    if (m.cosFile) {
                        return !!m.cosFile.url;
                    }
                    if (m.cosFileList) {
                        return m.cosFileList.length > 0;
                    }
                });
                // 分页查询
                //materials = materials.slice(from, from + size)
                //  数据回调
                resolve(materials);
            }
        })
    });
}

/**
 * 用户素材保存
 * @param {*} param0 
 */
const saveUserMaterials = ({ type = "1", material = {} }, callback) => {
    if (Object.keys(material).length == 0) {
        callback('content is null ...');
    } else {
        // 获取用户素材数据列表
        get(userType[type], (error, data = []) => {
            if (error) {
                callback(error);
            } else {
                //非数组转数组
                if (!(data instanceof Array)) {
                    data = [];
                }
                //获取cosFile对象
                let cosFile = material.cosFile;
                let cosFileList = material.cosFileList;
                if (cosFile) {
                    let localUrl = cosFile.localUrl;
                    if (localUrl) {
                        //复制图片到指定目录
                        let dstpath = deepCopy(localUrl, cosFile.cosKey);
                        if (dstpath) {
                            //生成新的 cosfile (附带url)
                            cosFile = Object.assign({}, cosFile, {
                                url: dstpath
                            })
                            //生成新的 material
                            material = Object.assign({}, material, {
                                cosFile: cosFile
                            })
                            //添加数据到集合中
                            data.unshift(material);
                            //保存数据到本地缓存
                            set(userType[type], data);
                            //添加成功，数据回调
                            setTimeout(() => callback(null, data), 200);
                        } else {
                            callback('deep copy fail ...');
                        }
                    } else {
                        callback('localUrl is null ...');
                    }
                } else if (cosFileList) {
                    const localUrl = cosFileList[0].localUrl;
                    if (localUrl) {
                        //复制图片到指定目录
                        let dstpath = deepCopy(localUrl, cosFileList[0].cosKey);
                        if (dstpath) {
                            cosFileList[0].url = dstpath;
                            //添加数据到集合中
                            data.unshift(material);
                            //保存数据到本地缓存
                            set(userType[type], data);
                            //添加成功，数据回调
                            setTimeout(() => callback(null, data), 200);
                        } else {
                            callback('deep copy fail ...');
                        }
                    } else {
                        callback('localUrl is null ...');
                    }
                } else {
                    callback('cosFile is null ...');
                }
            }
        });
    }
}


/**
 * 用户素材保存
 * @param {*} param0 
 */
const getUserMaterials = ({ type = "1" }, callback) => {
    // 获取用户素材数据列表
    get(userType[type], (error, data = []) => {
        if (!(data instanceof Array)) {
            data = [];
        }
        if (error) {
            callback(error);
        } else {
            callback(null, data);
        }
    })
}

/**
 * 素材删除
 * @param {*} param0 
 * @param {*} callback 
 */
const deleteUserMaterial = ({ type = "1", materialUUID }, callback) => {
    console.log('materialUUID---', materialUUID)
    // 获取用户素材数据列表
    get(userType[type], (error, data = []) => {
        if (!(data instanceof Array)) {
            data = [];
        }
        if (error) {
            callback(error);
        } else {
            //删除素材列表中数据
            let processData = [];
            let material = {};
            data.forEach(m => {
                if (materialUUID != m.materialUUID) {
                    processData.push(m);
                }
                if (materialUUID === m.materialUUID) {
                    material = m;
                }
            })
            set(userType[type], processData);
            //删除图片资源数据
            let cosFile = material.cosFile;
            let cosFileList = material.cosFileList;
            if (cosFile) {
                try {
                    fs.unlink(cosFile.url);
                } catch (error) { }
            }
            if (cosFileList) {
                try {
                    fs.unlink(cosFileList[0].url);
                } catch (error) { }
            }
            callback(null, processData);
        }
    })
}

export {
    savePlatformMaterials,
    getPlatformMaterials,
    saveUserMaterials,
    getUserMaterials,
    deleteUserMaterial,
    saveMaterialImage,
    getMaterialImage,
    clearCacheDownloadQueue
}





