import { SET_CATEGORY_LIST, SELECTED_CATEGORY, SET_ACTIVE_CATEGORY } from "../../actionTypes";

// setCategoryList
export const setCategoryList = (_payload: any) => {
    return { type: SET_CATEGORY_LIST, payload: _payload };
};

// setSelectedCategory
export const setSelectedCategory = (_payload: any) => {
    return { type: SELECTED_CATEGORY, payload: _payload };
};

// setActiveCategory
export const setActiveCategory = (_payload: any) => {
    return { type: SET_ACTIVE_CATEGORY, payload: _payload };
};
