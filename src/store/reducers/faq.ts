import {
    SELECTED_FAQ,
    GET_ALL_SECTION,
    SELECTED_SECTION,
    GET_ALL_SECTION_SUCCESS,
    GET_ALL_FAQS_SUCCESS
} from "../actionTypes";

const INITIAL_STATE = {
    allSections: [],
    allFAQ: [],
    selectedFAQ: {},
    selectedSection: {}
};

const FAQ = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
    switch (action.type) {
        case GET_ALL_SECTION_SUCCESS:
            return {
                ...state,
                allSections: action.payload.data.rows
            };

        case GET_ALL_FAQS_SUCCESS:
            return {
                ...state,
                allFAQ: action.payload.data.rows
            };

        case SELECTED_FAQ:
            return {
                ...state,
                selectedFAQ: action.payload
            };

        case SELECTED_SECTION:
            return {
                ...state,
                selectedSection: action.payload
            };
        default:
            return state;
    }
};

export default FAQ;
