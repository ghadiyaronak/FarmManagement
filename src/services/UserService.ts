import {
    ADD_FARM,
    API_INVOCATION,
    DELETE_FARM,
    GET_FARM,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    GET_USER,
    GET_USER_DOWNLOAD,
    LOGIN,
    UPDATE_FARM,
    UPDATE_PASSWORD,
    UPDATE_USER
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADMIN_AUTH,
    DELETE_FARM_API,
    GETPROFILE,
    GET_FARM_API,
    GET_USER_API,
    GET_USER_DOWNLOAD_API,
    REFRESH_TOKEN_URL,
    UPDATEPASSWORD,
    UPDATE_FARM_DETAILS,
    UPDATE_USER_DETAILS
} from "../utils/url";

class UserService {
    // get farm
    getUser(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.user_name) {
            query.append("user_name", _payload?.user_name);
        }
        if (_payload?.farm_id) {
            query.append("farm_id", _payload?.farm_id);
        }
        if (_payload?.email) {
            query.append("email", _payload?.email);
        }
        if (_payload?.contact_number) {
            query.append("contact_number", _payload?.contact_number);
        }
        if (_payload?.register_date) {
            query.append("register_date", _payload?.register_date);
        }
        if (_payload?.status) {
            query.append("status", _payload?.status);
        }
        if (_payload?.userId) {
            query.append("_id", _payload?.userId);
        }
        if (_payload?.role) {
            query.append("role", _payload?.role);
        }
        if (_payload?.farm_Id) {
            query.append("farm_id", _payload?.farm_Id);
        }
        if (_payload?.limit) {
            query.append("limit", _payload?.limit);
        }

        const payload = {
            action: GET_USER,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_USER_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    updateUser(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_USER,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_USER_DETAILS + _payload._id,
            resolve,
            reject,
            data: _payload.data
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
}

export default new UserService();
