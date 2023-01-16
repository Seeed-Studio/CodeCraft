const SET_VISIBLE = 'scratch-gui/code-view/SET_VISIBLE';

const initialState = {
    visible: false
}

const reducer = (state, action) => {
    if (typeof state === 'undefined') state = initialState;
    switch (action.type) {
        case SET_VISIBLE:
            return {
                ...state,
                visible: action.visible
            }
        default:
            return state;
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
    setVisible,
}