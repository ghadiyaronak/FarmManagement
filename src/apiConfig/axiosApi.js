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
            if (refreshToken && error.response.status === 406 && !originalConfig._retry) {
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
                    return instance(originalConfig);
                } catch (error) {
                    TokenService.removeUser();
                    window.location = "/";
                }

                return;
            } else {
                return Promise.reject(error.response.data);
            }
        }

        return Promise.reject(error);
    }
);

const getAxios = () => instance;

export default getAxios;
