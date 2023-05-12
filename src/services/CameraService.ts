import {
    ADD_FARM,
    API_INVOCATION,
    DELETE_FARM,
    GET_CAMERA,
    GET_CAMERA_ACTIVITY,
    GET_CAMERA_DOWNLOAD,
    GET_FARM,
    GET_PROFILE,
    GET_TOKEN_VALIDATION,
    LOGIN,
    UPDATE_CAMERA,
    UPDATE_FARM,
    UPDATE_PASSWORD
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import {
    ADD_FARM_DETAILS,
    ADMIN_AUTH,
    DELETE_FARM_API,
    GETPROFILE,
    GET_CAMERA_ACTIVITY_API,
    GET_CAMERA_API,
    GET_CAMERA_DOWNLOAD_API,
    GET_FARM_API,
    REFRESH_TOKEN_URL,
    UPDATEPASSWORD,
    UPDATE_CAMERA_DETAILS,
    UPDATE_FARM_DETAILS
} from "../utils/url";

class CameraService {
    // get farm
    getCamera(_payload: any, resolve: any, reject: any) {
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
        if (_payload?.status) {
            query.append("status", _payload?.status);
        }
        if (_payload?.camera_access) {
            query.append("cameraAccess", _payload?.camera_access);
        }
        if (_payload?.cameraId) {
            query.append("_id", _payload?.cameraId);
        }
        if (_payload?.camera_Id) {
            query.append("farm_id", _payload?.camera_Id);
        }

        const payload = {
            action: GET_CAMERA,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_CAMERA_API}?${query.toString()}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getCameraActivity(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.cameraId) {
            query.append("cameraId", _payload?.cameraId);
        }
        if (_payload?.limit) {
            query.append("limit", _payload?.limit);
        }

        const payload = {
            action: GET_CAMERA_ACTIVITY,
            method: GET,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: `${GET_CAMERA_ACTIVITY_API}?cameraId=${_payload.cameraId}&limit=${_payload.limit}`,
            // url: GET_CAMERA_ACTIVITY_API + _payload.cameraId,

            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    updateCamera(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_CAMERA,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_CAMERA_DETAILS + _payload._id,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadCameraList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_CAMERA_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_CAMERA_DOWNLOAD_API}`,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new CameraService();
