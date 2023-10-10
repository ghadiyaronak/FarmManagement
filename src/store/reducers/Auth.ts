import { GET_PROFILE_SUCCESS, LOGIN_SUCCESS } from "../actionTypes";

const INITIAL_STATE = {
    accessToken: "",
    refreshToken: "",
    profile: ""
};
const Auth = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                accessToken: action.payload.data.access_token,
                refreshToken: action.payload.data.refresh_token
            }; 

        case GET_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload.data.email
            };

        default:
            return state;
    }
};

export default Auth;
