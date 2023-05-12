import { LOGIN, SELECTED_USER } from "../../actionTypes";

export const auth = (_payload: any) => {
    return { type: LOGIN, payload: _payload };
};

export const selectedUser = (_payload: any) => {
    return { type: SELECTED_USER, payload: _payload };
};
