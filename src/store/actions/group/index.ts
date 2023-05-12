import { SET_GROUP_LIST, SELECTED_GROUP } from "../../actionTypes";

// setGroupList
export const setGroupList = (_payload: any) => {
    return { type: SET_GROUP_LIST, payload: _payload };
};

// setSelectedGroup
export const setSelectedGroup = (_payload: any) => {
    return { type: SELECTED_GROUP, payload: _payload };
};
