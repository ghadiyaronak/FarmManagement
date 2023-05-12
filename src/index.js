import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import store from "./store";
import customTheme from "./theme/theme";

import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

//i18 instance
import i18n from "./i18n/config";
import { I18nextProvider } from "react-i18next";

import * as Yup from "yup";


export const signUpSchema = Yup.object({
    firstName: Yup.string().min(2).max(25).required("Please enter your Firstname"),
    lastName: Yup.string().min(2).max(25).required("Please enter your Lastname"),
    email: Yup.string().email().required("Please enter your email"),
    password: Yup.string().min(6).required("Please enter your password"),
    confirmPassword: Yup.string().required()
        .oneOf([Yup.ref('password'), null], "Password must match ")

})

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <ChakraProvider theme={customTheme}>
                <App />
            </ChakraProvider>
        </I18nextProvider>
    </Provider>
);
