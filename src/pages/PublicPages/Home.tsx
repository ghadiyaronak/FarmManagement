import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TokenService from "../../services/TokenService";
import { useDispatch } from "react-redux";
import AuthService from "../../services/AuthService";
import { useTranslation } from "react-i18next";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        const refreshToken = TokenService.getLocalRefreshToken();

        if (!refreshToken) {
            navigate("/login");
            sessionStorage.removeItem("selectedtabadmin");
        }

        dispatch(
            AuthService.refreshToken(
                { refresh_token: refreshToken },
                (responseData: any) => {
                    TokenService.setUser(responseData?.data);
                    navigate("/home");
                    sessionStorage.setItem("selectedtabadmin", "home");
                },
                (errorData: any) => {
                    navigate("/login");
                    sessionStorage.removeItem("selectedtabadmin");
                }
            )
        );
    }, []);

    return <></>;
};

export default Home;
