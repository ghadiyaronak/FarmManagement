import { all } from "redux-saga/effects";
import apiSaga from "../apiConfig/apiSaga";

export default function* rootSaga() {
    yield all([apiSaga()]);
}
