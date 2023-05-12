export default {
    // USER
    GENDER: ["MALE", "FEMALE", "OTHER"],
    USER_PROFILE_STATUS: [
        {
            label: "all",
            value: ""
        },
        {
            label: "active",
            value: "ACTIVE"
        },
        {
            label: "deleted",
            value: "DELETED"
        },
        {
            label: "deactivated",
            value: "DEACTIVATED"
        }
    ],

    // PRODUCT
    PRODUCT_FLAG: ["NEW", "OLD"],
    PRODUCT_STATUS: [
        {
            label: "all",
            value: ""
        },
        {
            label: "ACTIVE",
            value: "ACTIVE"
        },
        {
            label: "DEACTIVATED",
            value: "DEACTIVATED"
        }
    ],

    CATEGORY_STATUS: [
        {
            label: "ALL",
            value: ""
        },
        {
            label: "active",
            value: "true"
        },
        {
            label: "deactive",
            value: "false"
        }
    ],

    // ORDER
    ORDER_STATUS: [
        {
            label: "all",
            value: ""
        },
        {
            label: "ORDER",
            value: "ORDER"
        },
        {
            label: "PAYMENT-PENDING",
            value: "PAYMENT-PENDING"
        },
        // {
        //     label: "OUT-OF-DELIVERED",
        //     value: "OUT-OF-DELIVERED"
        // },

        {
            label: "DELIVERED",
            value: "DELIVERED"
        },
        {
            label: "CANCEL",
            value: "CANCEL"
        }
    ],
    ORDER_STATUS2: [
        {
            label: "ORDER",
            value: "ORDER"
        },
        {
            label: "DELIVERED",
            value: "DELIVERED"
        },
        {
            label: "CANCEL",
            value: "CANCEL"
        }
    ],
    ORDER_CANCEL_STATUS: ["ORDER"],
    ORDER_PAYMENT_TYPE: ["COD", "LINE"],
    ORDER_CANCEL_BY: ["USER", "ADMIN"],
    ORDER_PAYMENT_STATUS: [
        "INITIATED",
        "PROCESSING",
        "SUCCESS",
        "FAILED",
        "REQUEST_FOR_REFUND",
        "REFUND_SUCCESS",
        "REFUND_FAILED"
    ], // 0 = Initiated, 1 = Success, 2 = Failed, 3 = Request For Refund, 4 = Refund Success, 5 = Refund Faile
    ORDER_CANCEL_PAYMENT_STATUS: ["REQUEST_FOR_REFUND", "REFUND_SUCCESS", "REFUND_FAILED"],

    // REVIEW
    REVIEW_POINTS: [0, 1, 2, 3, 4, 5],

    // Status   //

    // farm status

    FARM_STATUS: [
        {
            label: "アクティブ ",
            value: "ACTIVE"
        },
        {
            label: "ブロック ",
            value: "BLOCK"
        }
    ],

    CAMERA_ACCESS: [
        {
            label: "有効",
            value: "ENABLE"
        },
        {
            label: "無効",
            value: "DISABLE"
        }
    ],

    CAMERA_STATUS: [
        {
            label: "稼働中",
            value: "OPERATIONAL"
        },
        {
            label: "停止中",
            value: "NOT-OPERATIONAL"
        }
    ],

    USER_ROLE: [
        {
            label: "管理者",
            value: "true"
        },
        {
            label: "読み取り",
            value: "false"
        }
    ],

    DEVICE_STATUS: [
        {
            label: "稼働中",
            value: "OPERATIONAL"
        },
        {
            label: "停止中",
            value: "NOT-OPERATIONAL"
        }
    ],

    DEVISE_ACCESS: [
        {
            label: "有効",
            value: "ENABLE"
        },
        {
            label: "無効",
            value: "DISABLE"
        }
    ],

    INQUIRY_STATUS: [
        {
            label: "未確認",
            value: "UNCONFIRMED"
        },
        {
            label: "確認中",
            value: "CONFIRMED"
        },
        {
            label: "対応完了",
            value: "COMPLETED"
        }
    ]
};
