import {
    GET_DASHBOARD_DETAILS_SUCCESS,
    GET_PIECHART_DETAILS_SUCCESS,
    GET_WEEKLY_PRODUCTS_SELL_SUCCESS,
    GET_WEEKLY_REVENUE_DETAILS_SUCCESS,
    LAST_SIX_MONTH_REVENUE_SUCCESS
} from "../actionTypes";

const INITIAL_STATE = {
    allDashboard: {},
    pieChartDetails: [],
    weeklyRevenueDetails: [],
    weeklyProductsSold: {},
    SixMonthRevenue: []
};
const Dashboard = (state = INITIAL_STATE, action: { type: string; payload: any }) => {
    switch (action.type) {
        case GET_DASHBOARD_DETAILS_SUCCESS:
            return {
                ...state,
                allDashboard: action.payload.data
            };
        case GET_PIECHART_DETAILS_SUCCESS:
            return {
                ...state,
                pieChartDetails: [...action.payload.data.rows]
            };
        case GET_WEEKLY_REVENUE_DETAILS_SUCCESS:
            return {
                ...state,
                weeklyRevenueDetails: { ...action.payload.data }
            };
        case GET_WEEKLY_PRODUCTS_SELL_SUCCESS:
            return {
                ...state,
                weeklyProductsSold: action.payload.data
            };
        case LAST_SIX_MONTH_REVENUE_SUCCESS:
            return {
                ...state,
                SixMonthRevenue: action.payload.data
            };
        default:
            return state;
    }
};

export default Dashboard;
