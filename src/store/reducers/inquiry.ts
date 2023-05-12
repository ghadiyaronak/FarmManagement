import { GET_ALL_INQUIRY_DETAILS_SUCCESS, GET_INQUIRY_DETAILS_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {
    allInquires: [],
    selectedInquires: {}
};

const Inquiry = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
    switch (action.type) {
        case GET_ALL_INQUIRY_DETAILS_SUCCESS:
            return {
                ...state,
                allInquires: [...action.payload.data.rows]
            };
        case GET_INQUIRY_DETAILS_SUCCESS:
            return {
                ...state,
                selectedInquires: action.payload.data.rows[0]
            };
        default:
            return state;
    }
};
export default Inquiry;
