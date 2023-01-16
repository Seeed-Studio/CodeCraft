const SET_PROJECT_ITEM = 'scratch-gui/material-special/SET_PROJECT_ITEM';
const SET_REMIND_SAVE = 'scratch-gui/material-special/SET_REMIND_SAVE';
const SET_REMIND_SAVE_TYPE = 'scratch-gui/material-special/SET_REMIND_SAVE_TYPE';
const SET_SHOW_LOADING_PROJECT = 'scratch-gui/material-special/SET_SHOW_LOADING_PROJECT';
const SET_PROJECT_SAVED = 'scratch-gui/material-special/SET_PROJECT_SAVED';
const SET_LOCAL_PROJECT_ITEM = 'scratch-gui/material-special/SET_LOCAL_PROJECT_ITEM';
const SET_DELETED_PROJECT_UUID = 'scratch-gui/material-special/SET_DELETED_PROJECT_UUID';


const initialState = {
  projectItem: {},
  isRemindSave: false,
  isRemindSaveType: '',     // newProject--新建  openOnlineProject--打开线上项目 openLocalProject--打开本地项目
  isLoadingProject: false,
  isProjectSaved: true,
  localProjectItem: null,
  deletedProjectUUID: null, //被删除的作品
}

const reducer = (state, action) => {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
    case SET_PROJECT_ITEM:
      return Object.assign({}, state, {
        projectItem: action.item
      });
    case SET_REMIND_SAVE:
      return Object.assign({}, state, {
        isRemindSave: action.isRemindSave
      })
    case SET_REMIND_SAVE_TYPE:
      return Object.assign({}, state, {
        isRemindSaveType: action.isRemindSaveType
      })
    case SET_SHOW_LOADING_PROJECT:
      return Object.assign({}, state, {
        isLoadingProject: action.isLoadingProject
      })
    case SET_PROJECT_SAVED:
      return Object.assign({}, state, {
        isProjectSaved: action.isProjectSaved
      });
    case SET_LOCAL_PROJECT_ITEM:
      return Object.assign({}, state, {
        localProjectItem: action.item
      })
    case SET_DELETED_PROJECT_UUID:
      return Object.assign({}, state, {
        deletedProjectUUID: action.item
      })
    default:
      return state;
  }
}


const setProjectItem = (item) => {
  return {
    type: SET_PROJECT_ITEM,
    item: item
  }
}

const setRemindSave = (bool) => {
  return {
    type: SET_REMIND_SAVE,
    isRemindSave: bool
  }
}

const setRemindSaveType = (type) => {
  return {
    type: SET_REMIND_SAVE_TYPE,
    isRemindSaveType: type
  }
}

const setShowLoadingProject = (bool) => {
  return {
    type: SET_SHOW_LOADING_PROJECT,
    isLoadingProject: bool
  }
}

const setProjectSaved = (bool) => {
  return {
    type: SET_PROJECT_SAVED,
    isProjectSaved: bool
  }
}

const setLocalProjectItem = (item) => {
  return {
    type: SET_LOCAL_PROJECT_ITEM,
    item: item
  }
}

const setDeletedProjectUUID = (item) => {
  return {
    type: SET_DELETED_PROJECT_UUID,
    item: item
  }
}

export {
  reducer as default,
  initialState as materialInitialState,

  setProjectItem,
  setRemindSave,
  setRemindSaveType,
  setShowLoadingProject,
  setProjectSaved,
  setLocalProjectItem,
  setDeletedProjectUUID
}