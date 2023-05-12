// import { GET_ALL_FAQS, GET_ALL_SECTION, SELECTED_FAQ, SELECTED_SECTION } from "../../actionTypes"
import { SELECTED_SECTION, SELECTED_FAQ, GET_ALL_SECTION_SUCCESS } from "../../actionTypes";

// export const setFaqList = (_payload: any) => {
//     return { type: GET_ALL_FAQS, payload: _payload }
// }

export const setSelectedFaq = (_payload: any) => {
    return { type: SELECTED_FAQ, payload: _payload };
};

export const setSectionList = (_payload: any) => {
    return { type: GET_ALL_SECTION_SUCCESS, payload: _payload };
};

export const setSelectedSection = (_payload: any) => {
    return { type: SELECTED_SECTION, payload: _payload };
};
