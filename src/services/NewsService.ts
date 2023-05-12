import {
    ADD_FARM,
    ADD_NEWS,
    API_INVOCATION,
    DELETE_FARM,
    DELETE_NEWS,
    GET_FARM,
    GET_NEWS,
    GET_NEWS_DOWNLOAD,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    LOGIN,
    UPDATE_FARM,
    UPDATE_NEWS,
    UPDATE_PASSWORD
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADD_NEWS_API,
    ADMIN_AUTH,
    DELETE_FARM_API,
    DELETE_NEWS_API,
    GETPROFILE,
    GET_FARM_API,
    GET_NEWS_API,
    GET_NEWS_DOWNLOAD_API,
    REFRESH_TOKEN_URL,
    UPDATEPASSWORD,
    UPDATE_FARM_DETAILS,
    UPDATE_NEWS_DETAILS
} from "../utils/url";

class NewsService {
    isEdit: any;
    // get farm
    getNews(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.title) {
            query.append("title", _payload?.title);
        }
        if (_payload?.contant) {
            query.append("contant", _payload?.contant);
        }
        if (_payload?.start_date) {
            query.append("start_date", _payload?.start_date);
        }
        if (_payload?.end_date) {
            query.append("end_date", _payload?.end_date);
        }
        if (_payload?.newsId) {
            query.append("_id", _payload?.newsId);
        }

        const payload = {
            action: GET_NEWS,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_NEWS_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    deleteNews(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DELETE_NEWS,
            method: DELETE,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: DELETE_NEWS_API + _payload.id,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    addNews(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: ADD_NEWS,
            method: POST,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: ADD_NEWS_API,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    updateNews(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_NEWS,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_NEWS_DETAILS + _payload._id,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadNewsList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_NEWS_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_NEWS_DOWNLOAD_API}`,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new NewsService();
