import { SELECTED_SALES, SET_SALES_LIST } from "../../actionTypes";

//set Sales List
export const setSalesList = (_payload: any) => {
    return { type: SET_SALES_LIST, payload: _payload };
};

//setSelected Sales List
export const setSelectedSales = (_payload: any) => {
    return { type: SELECTED_SALES, payload: _payload };
};
