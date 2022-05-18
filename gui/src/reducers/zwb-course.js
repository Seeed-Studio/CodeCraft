const UPDATE_CDC_URL = 'scratch-gui/zwb-course/UPDATE_CDC_URL';
const UPDATE_COURSE_SKU_UUID = 'scratch-gui/zwb-course/UPDATE_COURSE_SKU_UUID';
const UPDATE_ZWB_COURSE_DATA = 'scratch-gui/zwb-course/UPDATE_ZWB_COURSE_DATA';
const UPATE_ONLINE_COURSEWARE_DATA = 'scratch-gui/zwb-course/UPATE_ONLINE_COURSEWARE_DATA';
const UPATE_COURSE_MATERIAL_BOX_DATA = 'scratch-gui/zwb-course/UPATE_COURSE_MATERIAL_BOX_DATA';
const UPATE_COURSE_LOADING = 'scratch-gui/zwb-course/UPATE_COURSE_LOADING';
const UPDATE_REQUEST_CDC_DATA = 'scratch-gui/zwb-course/UPDATE_REQUEST_CDC_DATA';
const UPDATE_FIRST_CLASSHOUR_DATA = 'scratch-gui/zwb-course/UPDATE_FIRST_CLASSHOUR_DATA';
const UPDATE_CLASS_HOUR_INFO_LOADING = 'scratch-gui/zwb-course/UPDATE_CLASS_HOUR_INFO_LOADING';

const initialState = {
  cdcUrl: '',
  cdcName: '',
  selectedSkuUUID: '',
  selectedCourseUUID: '',
  selectedSkuNumber: '',
  hasShowHomePage: false,
  zwb_course_data: {},
  online_courseware_data: {},
  course_material_data: {},
  isLoadingCourse: false,
  isLoadingClassHourInfo: false,
  requestCdcData: {},
  firstClassHourData: {},
}

const reducer = function (state, action) {
  if (typeof state === 'undefined') state = initialState;
  switch (action.type) {
    case UPDATE_CDC_URL: {
      return Object.assign({}, state, {
        cdcUrl: action.cdcUrl,
        cdcName: action.cdcName
      });
    }
    case UPDATE_COURSE_SKU_UUID: {
      return Object.assign({}, state, {
        selectedSkuUUID: action.selectedSkuUUID,
        selectedCourseUUID: action.selectedCourseUUID,
        selectedSkuNumber: action.selectedSkuNumber
      });
    }
    case UPDATE_ZWB_COURSE_DATA: {
      return Object.assign({}, state, {
        zwb_course_data: action.zwbCourseData
      })
    }
    case UPATE_ONLINE_COURSEWARE_DATA: {
      return Object.assign({}, state, {
        online_courseware_data: action.onlineCourseData
      })
    }
    case UPATE_COURSE_MATERIAL_BOX_DATA: {
      return Object.assign({}, state, {
        course_material_data: action.courseMaterialBoxData
      })
    }
    case UPATE_COURSE_LOADING: {
      return Object.assign({}, state, {
        isLoadingCourse: action.loading
      })
    }
    case UPDATE_REQUEST_CDC_DATA: {
      return Object.assign({}, state, {
        requestCdcData: action.requestCdcData
      })
    }
    case UPDATE_FIRST_CLASSHOUR_DATA: {
      return Object.assign({}, state, {
        firstClassHourData: action.firstClassHourData
      })
    }
    case UPDATE_CLASS_HOUR_INFO_LOADING: {
      return Object.assign({}, state, {
        isLoadingClassHourInfo: action.isLoadingClassHourInfo
      })
    }
    default:
      return state;
  }
}

const updateCdcUrl = function (cdcUrl, cdcName) {
  return {
    type: UPDATE_CDC_URL,
    cdcUrl: cdcUrl,
    cdcName: cdcName
  }
}

const updateCourseSku = function (skuUUID, courseUUID, skuNumber) {
  return {
    type: UPDATE_COURSE_SKU_UUID,
    selectedSkuUUID: skuUUID,
    selectedCourseUUID: courseUUID,
    selectedSkuNumber: skuNumber
  }
}

const updateZwbCourseData = function (zwbCourseData) {
  return {
    type: UPDATE_ZWB_COURSE_DATA,
    zwbCourseData
  }
}

const updateOnlineCoursewareData = function(onlineCourseData) {
  return {
    type: UPATE_ONLINE_COURSEWARE_DATA,
    onlineCourseData
  }
}

const updateCourseMaterialBoxData = function(courseMaterialBoxData) {
  return {
    type: UPATE_COURSE_MATERIAL_BOX_DATA,
    courseMaterialBoxData
  }
}

const updateLoadingCourse = function (tag) {
  return {
    type: UPATE_COURSE_LOADING,
    loading: tag
  }
}

const updateRequestCdcData = function (params) {
  return {
    type: UPDATE_REQUEST_CDC_DATA,
    requestCdcData: params
  }
}

const updateFirstClassHourData = function (params) {
  return {
    type: UPDATE_FIRST_CLASSHOUR_DATA,
    firstClassHourData: params
  }
}

const updateClassHourInfoLoading = function (tag) {
  return {
    type: UPDATE_CLASS_HOUR_INFO_LOADING,
    isLoadingClassHourInfo: tag
  }
}

export {
  reducer as default,
  initialState as zwbCourseInitialState,

  updateCdcUrl,
  updateCourseSku,
  updateZwbCourseData,
  updateOnlineCoursewareData,
  updateCourseMaterialBoxData,
  updateLoadingCourse,
  updateRequestCdcData,
  updateFirstClassHourData,
  updateClassHourInfoLoading
}