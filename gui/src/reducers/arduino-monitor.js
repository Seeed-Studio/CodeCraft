const SET_IS_SCROLL = 'monitor/SET_IS_SCROLL';
const SET_IS_SHOW_TIME = 'monitor/SET_IS_SHOW_TIME';
const SET_BAUD_RATE = 'monitor/SET_BAUD_RATE';
const SET_VISIBLE = 'monitor/SET_VISIBLE';

const initialState = {
    visible: false,
    isScroll: true,
    isShowTime: false,
    baudRate: '9600'
}

const reducer = (state, action) => {

    if (typeof state === 'undefined') state = initialState;

    switch (action.type) {
        case SET_VISIBLE:
            return {
                ...state,
                visible: action.visible
            }
        case SET_IS_SCROLL:
            return {
                ...state,
                isScroll: action.isScroll
            }
        case SET_IS_SHOW_TIME:
            return {
                ...state,
                isShowTime: action.isShowTime
            }
        case SET_BAUD_RATE:
            return {
                ...state,
                baudRate: action.baudRate
            }
        default:
            return state;
    }


}

const setBaudRate = (newBaudRate) => {
    return {
        type: SET_BAUD_RATE,
        baudRate: newBaudRate
    }
}

const setIsScroll = (newIsScroll) => {
    return {
        type: SET_IS_SCROLL,
        isScroll: newIsScroll
    }
}

const setIsShowTime = (newIsShowTime) => {
    return {
        type: SET_IS_SHOW_TIME,
        isShowTime: newIsShowTime
    }
}

const setVisible = visible => {
    return {
        type: SET_VISIBLE,
        visible: visible
    }
}

export {
    reducer as default,
    initialState as arduinoMonitorInitialState,
    setIsScroll, setIsShowTime, setBaudRate, setVisible
}