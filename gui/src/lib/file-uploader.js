import { BitmapAdapter } from 'scratch-svg-renderer';
import log from './log.js';
import randomizeSpritePosition from './randomize-sprite-position.js';
import { getLocalMaterial } from './busi-proxy/busi-proxy';

/**
 * 数组转arraybuffer
 * @param {*} data 
 */
const toArrayBuffer = (data = []) => {
    return new Uint8Array(data).buffer;
}

/**
 * empty svg image
 */
const emptySvg = `<svg version="1.1" width="2" height="2" viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<!-- Exported by Scratch - http://scratch.mit.edu/ -->
</svg>`;

/**
 * Extract the file name given a string of the form fileName + ext
 * @param {string} nameExt File name + extension (e.g. 'my_image.png')
 * @return {string} The name without the extension, or the full name if
 * there was no '.' in the string (e.g. 'my_image')
 */
const extractFileName = function (nameExt) {
    // There could be multiple dots, but get the stuff before the first .
    const nameParts = nameExt.split('.', 1); // we only care about the first .
    return nameParts[0];
};

/**
 * Handle a file upload given the input element that contains the file,
 * and a function to handle loading the file.
 * @param {Input} fileInput The <input/> element that contains the file being loaded
 * @param {Function} onload The function that handles loading the file
 */
const handleFileUpload = function (fileInput, onload) {
    let thisFile = null;
    const reader = new FileReader();
    reader.onload = () => {
        // Reset the file input value now that we have everything we need
        // so that the user can upload the same sound multiple times if
        // they choose
        fileInput.value = null;
        const fileType = thisFile.type;
        const fileName = extractFileName(thisFile.name);

        onload(reader.result, fileType, fileName);
    };
    if (fileInput.files) {
        thisFile = fileInput.files[0];
        reader.readAsArrayBuffer(thisFile);
    }
};

const handleFileUploadSpecial = function (obj, onload) {
    const {
        file,
        fileType,
        fileName,
    } = obj;
    let thisFile = null;
    const reader = new FileReader();
    reader.onload = () => {
        onload(reader.result, fileType, fileName);
    }
    thisFile = file;
    reader.readAsArrayBuffer(thisFile);
}

// 生成4位随机数
const fourDigitRandomNum = (n) => {
    let t = '';
    for (var i = 0; i < n; i++) {
        t += Math.floor(Math.random() * 10);
    }
    return t;
}


const handleContentType = (type) => {
    let contentType = '';
    switch (type.toLowerCase()) {
        case 'svg':
            contentType = 'image/svg+xml';
            break;
        case 'jpeg':
        case 'jpg':
            contentType = 'image/jpeg';
            break;
        case 'png':
            contentType = 'image/png';
            break;
        case 'mp3':
            contentType = 'audio/mp3';
            break;
        case 'mpeg':
            contentType = 'audio/mpeg';
            break;
        case 'wav':
            contentType = 'audio/wav';
            break;
        case 'wave':
            contentType = 'audio/wave';
            break;
        case 'x-wav':
            contentType = 'audio/x-wav';
            break;
        case 'x-pn-wav':
            contentType = 'audio/x-pn-wav';
            break;
        case 'zip':
            contentType = 'application/zip';
            break;
        default:
            break;
    }
    return contentType;
}

/**
 * handleInputStreamUpload
 * @param {*} object 
 * @param {*} onload 
 */
const handleInputStreamUpload = function (obj, onload, onError) {
    const { url, fileName, isOnLine } = obj;
    if (isOnLine) {
        const requestUrl = url + '&n=' + fourDigitRandomNum(4);
        fetch(requestUrl).then(response => {
            if (!response) return;
            response.arrayBuffer()
                .then(buffer => {
                    onload(buffer, response.headers.get('Content-Type'), fileName);
                });
        }).catch(e => {
            onError && onError();
        });
    } else {
        const suffix = url.substring(url.lastIndexOf('.') + 1);
        const contentType = handleContentType(suffix);
        console.log('contentType--', contentType)
        console.log('fileName--', fileName)
        getLocalMaterial({ localPath: url }).then((res) => {
            console.log('res---', res)
            if (res.errorCode === 0) {
                onload(toArrayBuffer(res.data.data), contentType, fileName);
            }
        })

        // const requestUrl = 'file://' + url
        // const xhr = new XMLHttpRequest();
        // xhr.open('GET', requestUrl, true);
        // xhr.send();
        // xhr.onreadystatechange = function () {
        //     // 这步为判断服务器是否正确响应
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         console.log('xhr--', xhr)

        //         // const contentType = xhr.responseXML.contentType;
        //         const content = xhr.response;
        //         const blob = new Blob([content]);
        //         const reader = new FileReader();
        //         reader.readAsArrayBuffer(blob)
        //         reader.onload = function () {
        //             onload(this.result, contentType, fileName);
        //         }
        //     }
        // };
    }
};

const fetchInputStream = function (obj, isOnLine) {
    if (!obj) return Promise.reject();
    const {
        url,
        fileName
    } = obj;
    if (isOnLine) {
        const requestUrl = url + '&n=' + fourDigitRandomNum(4);
        return new Promise((resolve, reject) => {
            fetch(requestUrl).then(response => {
                if (!response) {
                    reject();
                }
                response.arrayBuffer()
                    .then(buffer => {
                        resolve({
                            buffer: buffer,
                            assetType: response.headers.get('Content-Type'),
                            fileName: fileName
                        });
                    }).catch(e => {
                        reject();
                    });
            }).catch(e => {
                reject();
            });
        });
    } else {
        return new Promise((resolve, reject) => {
            const suffix = url.substring(url.lastIndexOf('.') + 1);
            const contentType = handleContentType(suffix);
            console.log('contentType--', contentType)
            console.log('fileName--', fileName)
            getLocalMaterial({ localPath: url }).then((res) => {
                console.log('res---', res)
                if (res.errorCode === 0) {
                    resolve({
                        buffer: toArrayBuffer(res.data.data),
                        assetType: contentType,
                        fileName: fileName
                    });
                } else {
                    reject();
                }
            })
        })
    }
};

const handleInputStreamsUpload2 = async function (datas, isOnLine) {
    if (!datas || datas.length === 0) throw ('datas is empty!');
    let jsonObjs = [];
    for (let index = 0; index < datas.length; index++) {
        const item = datas[index];
        const httpResponse = await fetchInputStream(item, isOnLine);
        jsonObjs.push(httpResponse);
    }
    return jsonObjs;
}

/**
 * @typedef VMAsset
 * @property {string} name The user-readable name of this asset - This will
 * automatically get translated to a fresh name if this one already exists in the
 * scope of this vm asset (e.g. if a sound already exists with the same name for
 * the same target)
 * @property {string} dataFormat The data format of this asset, typically
 * the extension to be used for that particular asset, e.g. 'svg' for vector images
 * @property {string} md5 The md5 hash of the asset data, followed by '.'' and dataFormat
 * @property {string} The md5 hash of the asset data // TODO remove duplication....
 */

/**
 * Create an asset (costume, sound) with storage and return an object representation
 * of the asset to track in the VM.
 * @param {ScratchStorage} storage The storage to cache the asset in
 * @param {string} fileName The name of the asset
 * @param {AssetType} assetType A ScratchStorage AssetType indicating what kind of
 * asset this is.
 * @param {string} dataFormat The format of this data (typically the file extension)
 * @param {UInt8Array} data The asset data buffer
 * @return {VMAsset} An object representing this asset and relevant information
 * which can be used to look up the data in storage
 */
const createVMAsset = function (storage, fileName, assetType, dataFormat, data) {
    const asset = storage.createAsset(
        assetType,
        dataFormat,
        data,
        null,
        true // generate md5
    );

    return {
        name: fileName,
        dataFormat: dataFormat,
        asset: asset,
        md5: `${asset.assetId}.${dataFormat}`,
        assetId: asset.assetId
    };
};

/**
 * Handles loading a costume or a backdrop using the provided, context-relevant information.
 * @param {ArrayBuffer | string} fileData The costume data to load (this can be a base64 string
 * iff the image is a bitmap)
 * @param {string} fileType The MIME type of this file
 * @param {string} costumeName The user-readable name to use for the costume.
 * @param {ScratchStorage} storage The ScratchStorage instance to cache the costume data
 * @param {Function} handleCostume The function to execute on the costume object returned after
 * caching this costume in storage - This function should be responsible for
 * adding the costume to the VM and handling other UI flow that should come after adding the costume
 */
const costumeUpload = function (fileData, fileType, costumeName, storage, handleCostume) {
    let costumeFormat = null;
    let assetType = null;
    switch (fileType) {
        case 'image/svg+xml': {
            costumeFormat = storage.DataFormat.SVG;
            assetType = storage.AssetType.ImageVector;
            break;
        }
        case 'image/jpeg': {
            costumeFormat = storage.DataFormat.JPG;
            assetType = storage.AssetType.ImageBitmap;
            break;
        }
        case 'image/png': {
            costumeFormat = storage.DataFormat.PNG;
            assetType = storage.AssetType.ImageBitmap;
            break;
        }
        default:
            log.warn(`Encountered unexpected file type: ${fileType}`);
            return;
    }

    const bitmapAdapter = new BitmapAdapter();
    const addCostumeFromBuffer = function (dataBuffer) {
        const vmCostume = createVMAsset(
            storage,
            costumeName,
            assetType,
            costumeFormat,
            dataBuffer
        );
        handleCostume(vmCostume);
    };

    if (costumeFormat === storage.DataFormat.SVG) {
        // Must pass in file data as a Uint8Array,
        // passing in an array buffer causes the sprite/costume
        // thumbnails to not display because the data URI for the costume
        // is invalid
        addCostumeFromBuffer(new Uint8Array(fileData));
    } else {
        // otherwise it's a bitmap
        bitmapAdapter.importBitmap(fileData, fileType).then(addCostumeFromBuffer)
            .catch(e => {
                log.error(e);
            });
    }
};


/**
 * Handles loading a costume or a backdrop using the provided, context-relevant information.
 * @param {ArrayBuffer | string} fileData The costume data to load (this can be a base64 string
 * iff the image is a bitmap)
 * @param {string} fileType The MIME type of this file
 * @param {string} costumeName The user-readable name to use for the costume.
 * @param {ScratchStorage} storage The ScratchStorage instance to cache the costume data
 * @param {Function} handleCostume The function to execute on the costume object returned after
 * caching this costume in storage - This function should be responsible for
 * adding the costume to the VM and handling other UI flow that should come after adding the costume
 */
const costumeUploadAsync = function (fileData, fileType, costumeName, storage) {
    return new Promise((resolve,reject)=>{
        let costumeFormat = null;
        let assetType = null;
        switch (fileType) {
            case 'image/svg+xml': {
                costumeFormat = storage.DataFormat.SVG;
                assetType = storage.AssetType.ImageVector;
                break;
            }
            case 'image/jpeg': {
                costumeFormat = storage.DataFormat.JPG;
                assetType = storage.AssetType.ImageBitmap;
                break;
            }
            case 'image/png': {
                costumeFormat = storage.DataFormat.PNG;
                assetType = storage.AssetType.ImageBitmap;
                break;
            }
            default:
                log.warn(`Encountered unexpected file type: ${fileType}`);
                return;
        }
    
        const bitmapAdapter = new BitmapAdapter();
        const addCostumeFromBuffer = function (dataBuffer) {
            const vmCostume = createVMAsset(
                storage,
                costumeName,
                assetType,
                costumeFormat,
                dataBuffer
            );
            resolve(vmCostume);
        };
    
        if (costumeFormat === storage.DataFormat.SVG) {
            // Must pass in file data as a Uint8Array,
            // passing in an array buffer causes the sprite/costume
            // thumbnails to not display because the data URI for the costume
            // is invalid
            addCostumeFromBuffer(new Uint8Array(fileData));
        } else {
            // otherwise it's a bitmap
            bitmapAdapter.importBitmap(fileData, fileType).then(addCostumeFromBuffer)
                .catch(e => {
                    log.error(e);
                    reject(e);
                });
        }
    })
};


/**
 * uploadEmpty Costume
 * @param {*} fileData 
 * @param {*} fileType 
 * @param {*} costumeName 
 * @param {*} storage 
 * @param {*} handleCostume 
 */
const costumeEmUpload = function (costumeName, storage, handleCostume) {
    let b = new Blob([emptySvg], { type: 'text/plain' });
    let r = new FileReader();
    r.onload = function () {
        costumeUpload(r.result, 'image/svg+xml', costumeName, storage, handleCostume);
    }
    r.readAsArrayBuffer(b);
}

/**
 * uploadEmpty Sprite
 * @param {*} costumeName 
 * @param {*} storage 
 * @param {*} handleCostume 
 */
const spriteEmUpload = function (spriteName, storage, handleSprite) {
    let b = new Blob([emptySvg], { type: 'text/plain' });
    let r = new FileReader();
    r.onload = function () {
        spriteUpload(r.result, 'image/svg+xml', spriteName, storage, handleSprite);
    }
    r.readAsArrayBuffer(b);
}



/**
 * Handles loading a sound using the provided, context-relevant information.
 * @param {ArrayBuffer} fileData The sound data to load
 * @param {string} fileType The MIME type of this file; This function will exit
 * early if the fileType is unexpected.
 * @param {string} soundName The user-readable name to use for the sound.
  * @param {ScratchStorage} storage The ScratchStorage instance to cache the sound data
 * @param {Function} handleSound The function to execute on the sound object of type VMAsset
 * This function should be responsible for adding the sound to the VM
 * as well as handling other UI flow that should come after adding the sound
 */
const soundUpload = function (fileData, fileType, soundName, storage, handleSound) {
    let soundFormat;
    switch (fileType) {
        case 'audio/mp3':
        case 'audio/mpeg': {
            soundFormat = storage.DataFormat.MP3;
            break;
        }
        case 'audio/wav':
        case 'audio/wave':
        case 'audio/x-wav':
        case 'audio/x-pn-wav': {
            soundFormat = storage.DataFormat.WAV;
            break;
        }
        default:
            log.warn(`Encountered unexpected file type: ${fileType}`);
            return;
    }

    const vmSound = createVMAsset(
        storage,
        soundName,
        storage.AssetType.Sound,
        soundFormat,
        new Uint8Array(fileData));

    handleSound(vmSound);
};

const spriteUpload = function (fileData, fileType, spriteName, storage, handleSprite, fileName) {
    const costumeName = fileName || 'costume1';
    switch (fileType) {
        case '':
        case 'application/zip': { // We think this is a .sprite2 or .sprite3 file
            handleSprite(new Uint8Array(fileData));
            return;
        }
        case 'image/svg+xml':
        case 'image/png':
        case 'image/jpeg': {
            // Make a sprite from an image by making it a costume first '-${costumeName}'
            costumeUpload(fileData, fileType, `${costumeName}`, storage, (vmCostume => {
                const newSprite = {
                    name: spriteName,
                    isStage: false,
                    x: 0,
                    y: 0,
                    visible: true,
                    size: 100,
                    rotationStyle: 'all around',
                    direction: 90,
                    draggable: true,
                    currentCostume: 0,
                    blocks: {},
                    variables: {},
                    costumes: [vmCostume],
                    sounds: [] // TODO are all of these necessary?
                };
                randomizeSpritePosition(newSprite);
                // TODO probably just want sprite upload to handle this object directly
                handleSprite(JSON.stringify(newSprite));
            }));
            return;
        }
        default: {
            log.warn(`Encountered unexpected file type: ${fileType}`);
            return;
        }
    }
};

export {
    handleFileUpload,
    handleInputStreamUpload,
    handleFileUploadSpecial,
    handleInputStreamsUpload2,
    costumeUpload,
    costumeEmUpload,
    soundUpload,
    spriteUpload,
    spriteEmUpload,
    costumeUploadAsync
};
