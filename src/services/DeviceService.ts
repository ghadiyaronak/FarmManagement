import {
    ADD_FARM,
    API_INVOCATION,
    DELETE_FARM,
    GET_DEVICE,
    GET_DEVICE_ACTIVITY,
    GET_DEVICE_DOWNLOAD,
    GET_FARM,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    LOGIN,
    UPDATE_DEVICE,
    UPDATE_FARM,
    UPDATE_PASSWORD
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADMIN_AUTH,
    DELETE_FARM_API,
    GETPROFILE,
    GET_DEVICE_ACTIVITY_API,
    GET_DEVICE_API,
    GET_DEVICE_DOWNLOAD_API,
    GET_FARM_API,
    REFRESH_TOKEN_URL,
    UPDATEPASSWORD,
    UPDATE_DEVICE_DETAILS,
    UPDATE_FARM_DETAILS
} from "../utils/url";

class DeviceService {
    // get farm
    getDevice(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.name) {
            query.append("name", _payload?.name);
        }
        if (_payload?.farm_id) {
            query.append("farm_id", _payload?.farm_id);
        }
        if (_payload?.register_date) {
            query.append("register_date", _payload?.register_date);
        }
        if (_payload?.device_access) {
            query.append("deviceAccess", _payload?.device_access);
        }
        if (_payload?.status) {
            query.append("status", _payload?.status);
        }
        if (_payload?.deviceId) {
            query.append("_id", _payload?.deviceId);
        }
        if (_payload?.device_Id) {
            query.append("farm_id", _payload?.device_Id);
        }
        if (_payload?.limit) {
            query.append("limit", _payload?.limit);
        }

        const payload = {
            action: GET_DEVICE,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_DEVICE_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getDeviceActivity(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.deviceId) {
            query.append("deviceId", _payload?.deviceId);
        }
        if (_payload?.limit) {
            query.append("limit", _payload?.limit);
        }

        const payload = {
            action: GET_DEVICE_ACTIVITY,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_DEVICE_ACTIVITY_API}?deviceId=${_payload.deviceId}&limit=${_payload.limit}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadDeviceList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_DEVICE_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_DEVICE_DOWNLOAD_API}`,
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

    updateDevice(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_DEVICE,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_DEVICE_DETAILS + _payload._id,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new DeviceService();
