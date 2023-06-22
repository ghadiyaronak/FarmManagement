export const BASE_URL = process.env.REACT_APP_BACKEND + "/api";
export const ADMIN_AUTH = BASE_URL + "/admin/auth/login";
export const REFRESH_TOKEN_URL = BASE_URL + "/admin/auth/refresh-token";
export const UPDATEPASSWORD = BASE_URL + "/admin/auth/reset-password";
export const GETPROFILE = BASE_URL + "/admin/profile";
export const UPDATE_NAME = BASE_URL + "/admin/";
export const FORGOT_PASSWORD_URL = BASE_URL + "/admin/forgot";


//dashboard
export const DASHBOARD_DETAILS_URL = BASE_URL + "/admin/dashboard";

export const PIE_CHART_URL = BASE_URL + "/admin/dashboard/one-month";

export const WEEKLY_REVENUE_URL = BASE_URL + "/admin/dashboard/weekly-revenue";
export const WEEKLY_PRODUCT_SOLD_URL = BASE_URL + "/admin/dashboard/weekly-product-sell";

export const SIX_MONTH_REVENUE_URL = BASE_URL + "/admin/dashboard/six-month";

//Category
export const CATEGORY = BASE_URL + "/category";

// Group
export const GROUP = BASE_URL + "/group";

//Product
export const ALL_PRODUCTS = BASE_URL + "/product";
export const PRODUCT_COVER_PHOTO = BASE_URL + "/product/cover-photo";
export const PRODUCT_PHOTOS = BASE_URL + "/product/photos";
export const PRODUCT_DELETE_PHOTOS = BASE_URL + "/product/delete";
export const PRODUCT = BASE_URL + "/product?id=";
export const PRODUCT_REVIEW_URL = BASE_URL + "/review/?product=";

// User
export const GET_ALL_USERS = BASE_URL + "/admin/user/get-users";
export const GET_USER_ADDRESS_URL = BASE_URL + "/user/address";
export const DEACTIVATEACCOUNT = BASE_URL + "/admin/user/deactivate";
export const ACTIVATEACCOUNT = BASE_URL + "/admin/user/activate";
export const EXCELUSER = BASE_URL + "/admin/user/get-users/excel";

// Review
export const REVIEW = BASE_URL + "/review";
export const USERREVIEW = BASE_URL + "/review/?user=";
export const REPLYREVIEW = BASE_URL + "/review/reply";
export const EXCELREVIEW = BASE_URL + "/review/excel";

// ADMIN PROFILE
export const ADMIN_PROFILE = BASE_URL + "/admin/profile";

///INQUIRY
export const ALL_INQUIRY = BASE_URL + "/inquiry/store?offset=0&limit=20";
export const CREATE_INQUIRY = BASE_URL + "/inquiry/store";
export const UPDATE_INQUIRY = BASE_URL + "/inquiry/comment";
export const DELETE_INQUIRY = BASE_URL + "/inquiry";
export const EXCELINQUIRY = BASE_URL + "/inquiry/excel";

//ORDERS
export const ALL_ORDER = BASE_URL + "/order?limit=10";
export const GET_ORDER = BASE_URL + "/order";
export const COMPLETE_ORDER = BASE_URL + "/order/delivered";

//Sales
export const ALL_SALES_URL = BASE_URL + "/order";
export const ALL_RESERVATION_URL = BASE_URL + "/order";
export const SALES_EXPORT = BASE_URL + "/order/excel";

export const DASHBOARD_URL = BASE_URL + "/adminDashboard/dashboard";

//inquiry
export const ALL_INQUIRY_URL = BASE_URL + "/admin/inquiry";
export const UPDATE_INQUIRY_DETAILS_API = BASE_URL + "/admin/inquiry/";
export const GET_INQUIRY_DOWNLOAD_API = BASE_URL + "/admin/inquiry/excel";


// Invoice
export const DOWNLOADINVOICE = BASE_URL + "/order/invoice";

// Dashboard
export const GET_ALL_DATA = BASE_URL + "/admin/count";

//Farm
export const GET_FARM_API = BASE_URL + "/admin/farm/list";
export const DELETE_FARM_API = BASE_URL + "/admin/farm/";
export const ADD_FARM_DETAILS = BASE_URL + "/admin/farm";
export const UPDATE_FARM_DETAILS = BASE_URL + "/admin/farm/";

export const GET_FARM_NAME_API = BASE_URL + "/admin/farm/name/list";


export const GET_FARM_DOWNLOAD_API = BASE_URL + "/admin/farm/excel";

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




