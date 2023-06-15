import axios from "axios";
import TokenService from "../services/TokenService";
import { REFRESH_TOKEN_URL } from "../utils/url";

const configuration = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": ["Origin", "Accept", "X-Requested-With", "Content-Type", "Authorization"]
    }
};

const instance = axios.create({ configuration });

let isRefreshTokenUpdating = false
instance.interceptors.request.use(
    (config) => {
        const token = TokenService.getLocalAccessToken();
        if (token) {
            config.headers["Authorization"] = "Bearer " + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error?.config;
        const refreshToken = TokenService.getLocalRefreshToken();
        if (error.response) {
            if (!isRefreshTokenUpdating && refreshToken && error.response.status === 406 && !originalConfig._retry) {
                isRefreshTokenUpdating = true;
                originalConfig._retry = true;
                try {
                    const data = JSON.stringify({
                        refresh_token: refreshToken
                    });
                    const config = {
                        method: "post",
                        url: `${REFRESH_TOKEN_URL}`,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        data: data
                    };
                    const result = await axios(config);
                    TokenService.setUser(result.data?.data);
                    isRefreshTokenUpdating = false;
                    return instance(originalConfig);
                } catch (error) {
                    TokenService.removeUser();
                    window.location = "/";
                    // isRefreshTokenUpdating = false;
                }
                return;
            } else if (isRefreshTokenUpdating) {
                await isRefreshTokenDone();
                return instance(originalConfig);
            }
            else {
                return Promise.reject(error.response.data);
            }
        }
        return Promise.reject(error);
    }
);
/**
* Stop Function excution still refresh token did't update
*/
const isRefreshTokenDone = async () => {
    if (isRefreshTokenUpdating) {
        await new Promise(resolve => setTimeout(resolve, 300)) // Wait for second       
        return await isRefreshTokenDone()
    } else {
        return true
    }
}

const getAxios = () => instance;

export default getAxios;
