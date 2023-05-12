import {
    GET_ALL_USERS_DETAILS_SUCCESS,
    GET_USER_ADDRESS_SUCCESS,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_PURCHASE_INFORMATION_SUCCESS,
    GET_USER_REVIEW_HISTORY_SUCCESS
} from "../actionTypes";

const INITIAL_STATE = {
    allUsers: [],
    selectedUserDetail: {},
    address: [],
    reviews: [],
    purchase: []
};
const User = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
    switch (action.type) {
        case GET_ALL_USERS_DETAILS_SUCCESS:
            return {
                ...state,
                allUsers: [...action.payload.data.rows]
            };
        case GET_USER_DETAILS_SUCCESS:
            return {
                ...state,
                selectedUserDetail: action.payload.data
            };
        case GET_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                address: action.payload.data.rows
            };
        case GET_USER_PURCHASE_INFORMATION_SUCCESS:
            return {
                ...state,
                purchase: action.payload.data.rows
            };
        case GET_USER_REVIEW_HISTORY_SUCCESS:
            return {
                ...state,
                reviews: action.payload.data.rows
            };
        default:
            return state;
    }
};

export default User;
