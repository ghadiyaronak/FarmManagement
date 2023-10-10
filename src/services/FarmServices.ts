import {
    ADD_FARM,
    API_INVOCATION,
    DELETE_FARM,
    GET_FARM,
    GET_FARM_DOWNLOAD,
    GET_FARM_NAME,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    LOGIN,
    SUBMIT_EMAIL,
    UPDATE_FARM,
    UPDATE_PASSWORD
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADMIN_AUTH,
    DELETE_FARM_API,
    GETPROFILE,
    GET_FARM_API,
    GET_FARM_DOWNLOAD_API,
    GET_FARM_NAME_API,
    REFRESH_TOKEN_URL,
    SUBMIT_EMAIL_DETAILS,
    UPDATEPASSWORD,
    UPDATE_FARM_DETAILS
} from "../utils/url";

class FarmService {
    isEdit: any;
    // get farm
    getFarm(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.farm_name) {
            query.append("farm_name", _payload?.farm_name);
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
        if (_payload?.farmId) {
            query.append("_id", _payload?.farmId);
        }
        if (_payload?.limit) {
            query.append("limit", _payload?.limit);
        }
        const payload = {
            action: GET_FARM,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_FARM_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getName(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.farm_name) {
            query.append("farm_name", _payload?.farm_name);
        }
        if (_payload?.farmId) {
            query.append("_id", _payload?.farmId);
        }
        const payload = {
            action: GET_FARM_NAME,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_FARM_NAME_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    deleteFarm(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DELETE_FARM,
            method: DELETE,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: DELETE_FARM_API + _payload.id,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    addFarm(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: ADD_FARM,
            method: POST,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: ADD_FARM_DETAILS,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    submitEmail(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: SUBMIT_EMAIL,
            method: POST,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: SUBMIT_EMAIL_DETAILS,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    updateFarm(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_FARM,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_FARM_DETAILS + _payload._id,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadFarmList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_FARM_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_FARM_DOWNLOAD_API}`,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new FarmService();
