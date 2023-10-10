import {
    ADD_SECTION,
    API_INVOCATION,
    CREATE_FAQ,
    CREATE_SECTIONS,
    DELETE_FAQ,
    DELETE_SECTIONS,
    GET_ALL_FAQ,
    GET_ALL_SECTION,
    GET_FARM,
    UPDATE_FAQ,
    UPDATE_SECTIONS
} from "../store/actionTypes";
import { DELETE, GET, PATCH, POST } from "../utils/apiConstant";
import {
    ADD_SECTION_DETAILS,
    CREATE_FAQ_API,
    CREATE_SECTION,
    DELETE_FAQ_API,
    DELETE_SECTION_API,
    GET_ALL_FAQ_API,
    GET_ALL_SECTION_API,
    GET_FARM_API,
    UPDATE_FAQ_DETAILS,
    UPDATE_SECTIONS_DETAILS
} from "../utils/url";

class FaqService {
    isEdit: any;
    // get farm
    getFaq(_payload: any, resolve: any, reject: any) {
        const URLSearchParams = window.URLSearchParams;

        let query: any = new URLSearchParams();

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

    getAllSections(resolve: any, reject: any) {
        const payload = {
            action: GET_ALL_SECTION,
            method: GET,
            apiConfig: {},
            url: GET_ALL_SECTION_API,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    getAllFaq(resolve: any, reject: any) {
        const payload = {
            action: GET_ALL_FAQ,
            method: GET,
            apiConfig: {},
            url: GET_ALL_FAQ_API,
            resolve,
            reject
        };
        return { type: API_INVOCATION, payload };
    }

    AddSection(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: ADD_SECTION,
            method: POST,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: ADD_SECTION_DETAILS,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    createSection(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: CREATE_SECTIONS,
            method: POST,
            apiConfig: {},
            url: CREATE_SECTION,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    updateSection(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_SECTIONS,
            method: PATCH,
            apiConfig: {},
            url: `${UPDATE_SECTIONS_DETAILS}`,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    updateFaq(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: UPDATE_FAQ,
            method: PATCH,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: UPDATE_FAQ_DETAILS,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    createFaq(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: CREATE_FAQ,
            method: POST,
            apiConfig: {
                headers: {
                    "Content-Type": "application/json"
                }
            },
            url: CREATE_FAQ_API,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    deleteSection(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DELETE_SECTIONS,
            method: DELETE,
            apiConfig: {},
            url: `${DELETE_SECTION_API}/${_payload.id}`,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }

    deleteFaq(_payload: any, resolve: any, reject: any) {
        const payload = {
            action: DELETE_FAQ,
            method: DELETE,
            apiConfig: {},
            url: `${DELETE_FAQ_API}/${_payload.id}`,
            resolve,
            reject,
            data: _payload.data
        };
        return { type: API_INVOCATION, payload };
    }
}

export default new FaqService();
