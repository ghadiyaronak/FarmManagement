import {
    ACTIVATE_ACCOUNT,
    API_INVOCATION,
    DEACTIVATE_ACCOUNT,
    GET_ALL_USERS_DETAILS,
    GET_EXCEL_DATA,
    GET_USER_ADDRESS,
    GET_USER_DETAILS,
    GET_USER_PURCHASE_INFORMATION,
    GET_USER_REVIEW_HISTORY
} from "../store/actionTypes";
import { GET, POST, PUT } from "../utils/apiConstant";
import {
    ACTIVATEACCOUNT,
    DEACTIVATEACCOUNT,
    EXCELUSER,
    GET_ALL_USERS,
    GET_ORDER,
    GET_USER_ADDRESS_URL,
    USERREVIEW
} from "../utils/url";

class UserDetails {
    getUserDetails(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_USER_DETAILS,
            method: GET,
            apiConfig: {},
            url: `${GET_ALL_USERS}?userId=${_payload.id}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }
    getUserAddress(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_USER_ADDRESS,
            method: GET,
            apiConfig: {},
            url: `${GET_USER_ADDRESS_URL}?userId=${_payload.id}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }
    getUserByDate(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_ALL_USERS_DETAILS,
            method: GET,
            apiConfig: {},
            url: `${GET_ALL_USERS}?start_date=${_payload.startDate}&end_date=${_payload.endDate}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }
    getUserPurchasInformation(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_USER_PURCHASE_INFORMATION,
            method: GET,
            apiConfig: {},
            url: `${GET_ORDER}?user=${_payload.id}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getUserReviewHistory(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_USER_REVIEW_HISTORY,
            method: GET,
            apiConfig: {},
            url: USERREVIEW + _payload.id,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    deactivateAccount(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DEACTIVATE_ACCOUNT,
            method: PUT,
            apiConfig: {},
            url: DEACTIVATEACCOUNT + "/" + _payload.user_id,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    activateAccount(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: ACTIVATE_ACCOUNT,
            method: PUT,
            apiConfig: {},
            url: ACTIVATEACCOUNT + "/" + _payload.user_id,
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
            url: EXCELUSER,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new UserDetails();
