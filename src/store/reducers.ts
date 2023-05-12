import { combineReducers } from "redux";
import User from "./reducers/user";
import Auth from "./reducers/Auth";
import Inquiry from "./reducers/inquiry";
import Dashboard from "./reducers/dashboard";
import FAQ from "./reducers/faq";

const rootReducer = combineReducers({
    Auth,
    User,
    Dashboard,
    Inquiry,
    FAQ
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
