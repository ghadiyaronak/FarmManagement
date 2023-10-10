import { API_INVOCATION, GET_DASHBOARD, GET_USER_DOWNLOAD } from "../store/actionTypes";
import { GET, POST } from "../utils/apiConstant";
import { GET_ALL_DATA, GET_USER_DOWNLOAD_API } from "../utils/url";

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
}

export default new DashboardService();
