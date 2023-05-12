import { SELECTED_USER, USER_LIST } from "../../actionTypes";

export const setUserLIst = (_payload: any) => {
    return { type: USER_LIST, payload: _payload };
};

export const setSelectedUserManagmenet = (_payload: any) => {
    return { type: SELECTED_USER, payload: _payload };
};
