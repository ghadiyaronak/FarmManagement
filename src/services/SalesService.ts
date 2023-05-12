import {
    ADD_ORDER_DATA,
    API_INVOCATION,
    GET_ALL_SALES_DETAILS,
    GET_EXCEL_DATA,
    GET_ORDER_DETAIL
} from "../store/actionTypes";
import { GET, POST, PUT } from "../utils/apiConstant";
import { ALL_SALES_URL, SALES_EXPORT } from "../utils/url";

class SalesService {
    // getAllSales(resolve: any, reject: any) {
    //     const payload = {
    //         action: GET_ALL_SALES_DETAILS,
    //         method: GET,
    //         apiConfig: {},
    //         url: ALL_SALES_URL,
    //         resolve,
    //         reject
    //     };
    //     return { type: API_INVOCATION, payload };
    // }
    getSalesByDate(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_ALL_SALES_DETAILS,
            method: GET,
            apiConfig: {},
            url: `${ALL_SALES_URL}?start_date=${_payload.startDate}&end_date=${_payload.endDate}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }
    getOrder(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_ORDER_DETAIL,
            method: GET,
            apiConfing: {},
            url: `${ALL_SALES_URL}?id=${_payload.id}`,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    addOrderData(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: ADD_ORDER_DATA,
            method: PUT,
            apiConfing: {},
            url: ALL_SALES_URL,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    getExcelData(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: GET_EXCEL_DATA,
            method: POST,
            apiConfing: {},
            url: SALES_EXPORT,
            resolve,
            reject,
            data: _payload
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new SalesService();
