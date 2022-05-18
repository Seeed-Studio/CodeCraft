const SET_VOD_SECURITY_SIGN = 'scratch-gui/micro-course/SET_VOD_SECURITY_SIGN';
const SET_VISIBLE = 'scratch-gui/micro-course/SET_VISIBLE';
const SET_FULLSCREEN = 'scratch-gui/micro-course/SET_FULLSCREEN';
const SET_FILE_INFO = 'scratch-gui/micro-course/SET_FILE_INFO';


const initialState = {
    vodSecuritySign: null,
    visible: true,
    fullscreen: false,
    fileId: null,
    fileName: null,
    description: null,
    coverUrl: null,
}


const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_VOD_SECURITY_SIGN:
            return {
                ...state,
                vodSecuritySign: action.sign
            }
        case SET_VISIBLE:
            return {
                ...state,
                visible: action.visible
            }
        case SET_FULLSCREEN:
            return {
                ...state,
                fullscreen: action.fullscreen
            }
        case SET_FILE_INFO:
            return {
                ...state,
                fileId: action.file.fileId,
                fileName: action.file.fileName,
                description: action.file.description,
                coverUrl: action.file.coverUrl
            }
        default:
            return state;
    }
}

const setFullscreen = fullscreen => {
    return {
        type: SET_FULLSCREEN,
        fullscreen: fullscreen
    }
}

const setVodSecuritySign = sign => {
    return {
        type: SET_VOD_SECURITY_SIGN,
        sign: sign
    }
}

const setVisible = visible => {
    return {
        type: SET_VISIBLE,
        visible: visible
    }
}

const setFileInfo = file => {
    return {
        type: SET_FILE_INFO,
        file: file
    }
}


export {
    reducer as default,
    setVodSecuritySign,
    setVisible,
    setFullscreen,
    setFileInfo
}