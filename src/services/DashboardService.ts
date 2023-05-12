import {
    ADD_FARM,
    API_INVOCATION,
    DELETE_FARM,
    GET_DASHBOARD,
    GET_FARM,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    GET_USER,
    GET_USER_DOWNLOAD,
    LOGIN,
    UPDATE_FARM,
    UPDATE_PASSWORD
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADMIN_AUTH,
    DELETE_FARM_API,
    GETPROFILE,
    GET_ALL_DATA,
    GET_FARM_API,
    GET_USER_API,
    GET_USER_DOWNLOAD_API,
    REFRESH_TOKEN_URL,
    UPDATEPASSWORD,
    UPDATE_FARM_DETAILS
} from "../utils/url";

class DashboardService {
    // get farm
    getDashboard(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.user) {
            query.append("user", _payload?.user);
        }
        if (_payload?.farm) {
            query.append("farm", _payload?.farm);
        }
        if (_payload?.device) {
            query.append("device", _payload?.device);
        }
        if (_payload?.camera) {
            query.append("camera", _payload?.camera);
        }

        const payload = {
            action: GET_DASHBOARD,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_ALL_DATA}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadUSerList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_USER_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_USER_DOWNLOAD_API}`,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }

    // deleteFarm(_payload: any, resolve: any, reject: any) {
    //     const payload = {
    //         action: DELETE_FARM,
    //         method: DELETE,
    //         apiConfig: {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         },
    //         url: DELETE_FARM_API + _payload.id,
    //         resolve,
    //         reject
    //     };
    //     return { type: API_INVOCATION, payload };
    // }

    // addFarm(_payload: any, resolve: any, reject: any) {
    //     const payload = {
    //         action: ADD_FARM,
    //         method: POST,
    //         apiConfig: {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         },
    //         url: ADD_FARM_DETAILS,
    //         resolve,
    //         reject,
    //         data: _payload.data
    //     };
    //     return { type: API_INVOCATION, payload };
    // }

    // updateFarm(_payload: any, resolve: any, reject: any) {
    //     const payload = {
    //         action: UPDATE_FARM,
    //         method: PUT,
    //         apiConfig: {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             }
    //         },
    //         url: UPDATE_FARM_DETAILS + _payload._id,
    //         resolve,
    //         reject,
    //         data: _payload.data
    //     };
    //     return { type: API_INVOCATION, payload };
    // }
}

export default new DashboardService();
