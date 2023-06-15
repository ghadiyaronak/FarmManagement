import {
    API_INVOCATION,
    DELETE_INQUIRY,
    GET_ALL_INQUIRY_DETAILS,
    GET_EXCEL_DATA,
    GET_INQUIRY_DETAILS,
    GET_INQUIRY_DOWNLOAD,
    SELECTED_INQUIRY,
    UPDATE_INQUIRY,
    UPDATE_INQUIRY_DETAILS
} from "../store/actionTypes";
import { DELETE, GET, POST, PUT } from "../utils/apiConstant";
import { ALL_INQUIRY_URL, EXCELINQUIRY, GET_INQUIRY_DOWNLOAD_API, UPDATE_INQUIRY_DETAILS_API } from "../utils/url";

class InquiryService {
    getInquiryByDate(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_ALL_INQUIRY_DETAILS,
            method: GET,
            apiConfig: {},
            url: `${ALL_INQUIRY_URL}?start_date=${_payload.startDate}&end_date=${_payload.endDate}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getInquiry(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

        if (_payload?.userName) {
            query.append("userName", _payload?.userName);
        }
        if (_payload?.farmName) {
            query.append("farmName", _payload?.farmName);
        }
        if (_payload?.dateOfContact) {
            query.append("dateOfContact", _payload?.dateOfContact);
        }
        if (_payload?.status) {
            query.append("status", _payload?.status);
        }
        if (_payload?.inquiryId) {
            query.append("_id", _payload?.inquiryId);
        }

        const payload = {
            action: GET_INQUIRY_DETAILS,
            method: GET,
            apiConfig: {},
            url: `${ALL_INQUIRY_URL}?${query}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    addInquiryData(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_INQUIRY,
            method: PUT,
            apiConfig: {},
            url: ALL_INQUIRY_URL,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    updateInquiry(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_INQUIRY_DETAILS,
            method: PUT,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_INQUIRY_DETAILS_API + _payload._id,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    deleteInquiry(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DELETE_INQUIRY,
            method: DELETE,
            apiConfig: {},
            url: ALL_INQUIRY_URL + "/" + _payload.id,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getExcelData(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_EXCEL_DATA,
            method: POST,
            apiConfing: {},
            url: EXCELINQUIRY,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }

    DownloadDeviceList(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_INQUIRY_DOWNLOAD,
            method: POST,
            apiConfig: {},
            url: `${GET_INQUIRY_DOWNLOAD_API}`,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new InquiryService();
