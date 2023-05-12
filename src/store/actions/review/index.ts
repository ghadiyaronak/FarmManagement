import { SELECTED_REVIEW } from "../../actionTypes";

// setSelectedCategory
export const setSelectedReview = (_payload: any) => {
    return { type: SELECTED_REVIEW, payload: _payload };
};
