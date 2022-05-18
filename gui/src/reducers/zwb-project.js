const UPDATE_PROJECT_UUID = 'scratch-gui/zwb-project/UPDATE_PROJECT_UUID';
const UPDATE_ZWB_PROJECT_DATA = 'scratch-gui/zwb-project/UPDATE_ZWB_PROJECT_DATA';
const UPATE_PROJECT_LOADING = 'scratch-gui/zwb-project/UPATE_PROJECT_LOADING';

const initialState = {
  selectedProjectUUID: '',
  zwb_project_data: {},
  isLoadingProject: false,
}

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {

    case UPDATE_PROJECT_UUID: {
      return Object.assign({}, state, {
        selectedProjectUUID: action.selectedProjectUUID,
      });
    }
    case UPDATE_ZWB_PROJECT_DATA: {
      return Object.assign({}, state, {
        zwb_project_data: action.zwbProjectData
      })
    }
    case UPATE_PROJECT_LOADING: {
      return Object.assign({}, state, {
        isLoadingProject: action.loading
      })
    }
    default:
      return state;
  }
}


const updateProjectUUID = function (projectUUID) {
  return {
    type: UPDATE_PROJECT_UUID,
    selectedProjectUUID: projectUUID,
  }
}

const updateZwbProjectData = function (zwbProjectData) {
  return {
    type: UPDATE_ZWB_PROJECT_DATA,
    zwbProjectData
  }
}

const updateLoadingProject = function (tag) {
  return {
    type: UPATE_PROJECT_LOADING,
    loading: tag
  }
}


export {
  reducer as default,
  initialState as zwbProjectInitialState,

  updateProjectUUID,
  updateZwbProjectData,
  updateLoadingProject,
}