export const BASE_URL = process.env.REACT_APP_BACKEND + "/api";
export const ADMIN_AUTH = BASE_URL + "/admin/auth/login";
export const REFRESH_TOKEN_URL = BASE_URL + "/admin/auth/refresh-token";
export const UPDATEPASSWORD = BASE_URL + "/admin/auth/reset-password";
export const GETPROFILE = BASE_URL + "/admin/profile";
export const UPDATE_NAME = BASE_URL + "/admin/";
export const FORGOT_PASSWORD_URL = BASE_URL + "/admin/forgot";

//inquiry
export const ALL_INQUIRY_URL = BASE_URL + "/admin/inquiry";
export const EXCELINQUIRY = BASE_URL + "/inquiry/excel";
export const UPDATE_INQUIRY_DETAILS_API = BASE_URL + "/admin/inquiry/";
export const GET_INQUIRY_DOWNLOAD_API = BASE_URL + "/admin/inquiry/excel";

// Dashboard
export const GET_ALL_DATA = BASE_URL + "/admin/count";

//Farm
export const GET_FARM_API = BASE_URL + "/admin/farm/list";
export const DELETE_FARM_API = BASE_URL + "/admin/farm/";
export const ADD_FARM_DETAILS = BASE_URL + "/admin/farm";
export const UPDATE_FARM_DETAILS = BASE_URL + "/admin/farm/";
export const GET_FARM_NAME_API = BASE_URL + "/admin/farm/name/list";
export const GET_FARM_DOWNLOAD_API = BASE_URL + "/admin/farm/excel";
export const SUBMIT_EMAIL_DETAILS = BASE_URL + "/data/remove"

//Device
export const GET_DEVICE_API = BASE_URL + "/admin/device/list";
export const UPDATE_DEVICE_DETAILS = BASE_URL + "/admin/device/";
export const GET_DEVICE_DOWNLOAD_API = BASE_URL + "/admin/device/excel";
export const GET_DEVICE_ACTIVITY_API = BASE_URL + "/admin/device/activity";
export const GET_DEVICE_CHART_ACTIVITY_API = BASE_URL + "/admin/weekly/data";

//Camera
export const GET_CAMERA_API = BASE_URL + "/admin/camera/list";
export const UPDATE_CAMERA_DETAILS = BASE_URL + "/admin/camera/";
export const GET_CAMERA_DOWNLOAD_API = BASE_URL + "/admin/camera/excel";
export const GET_CAMERA_ACTIVITY_API = BASE_URL + "/admin/camera/activity";

//User
export const GET_USER_API = BASE_URL + "/admin/user/list";
export const GET_USER_DOWNLOAD_API = BASE_URL + "/admin/user/excel";
export const UPDATE_USER_DETAILS = BASE_URL + "/admin/";

// News
export const GET_NEWS_API = BASE_URL + "/admin/news";
export const DELETE_NEWS_API = BASE_URL + "/admin/news/";
export const ADD_NEWS_API = BASE_URL + "/admin/news";
export const UPDATE_NEWS_DETAILS = BASE_URL + "/admin/news/";
export const GET_NEWS_DOWNLOAD_API = BASE_URL + "/admin/news/excel";

// FAQS
export const GET_ALL_SECTION_API = BASE_URL + "/admin/sections";
export const ADD_SECTION_DETAILS = BASE_URL + "/admin/sections";
export const CREATE_SECTION = BASE_URL + "/admin/sections";
export const UPDATE_SECTIONS_DETAILS = BASE_URL + "/admin/sections";
export const DELETE_SECTION_API = BASE_URL + "/admin/sections";
export const CREATE_FAQ_API = BASE_URL + "/admin/faq";
export const GET_ALL_FAQ_API = BASE_URL + "/admin/faq";
export const UPDATE_FAQ_DETAILS = BASE_URL + "/admin/faq";
export const DELETE_FAQ_API = BASE_URL + "/admin/";
export const GET_ALL_SECTION = "GET_ALL_SECTION";
export const GET_ALL_SECTION_SUCCESS = "GET_ALL_SECTION_SUCCESS";
export const GET_ALL_SECTION_ERROR = "GET_ALL_SECTION_ERROR";
