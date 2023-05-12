import { EMPTY_SELECTED_PRODUCT } from "../../actionTypes";

// setSelectedCategory
export const emptySelectedProduct = (_payload: any) => {
    return { type: EMPTY_SELECTED_PRODUCT, payload: _payload };
};
