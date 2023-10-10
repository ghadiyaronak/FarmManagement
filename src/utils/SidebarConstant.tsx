import { AiOutlineCamera, AiOutlineControl, AiOutlineQuestion, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCategory, BiDevices, BiTransfer } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { GiWheat } from "react-icons/gi";
import { MdHome, MdOutlineEmail, MdOutlinePrivacyTip, MdOutlineRateReview } from "react-icons/md";
import { ImNewspaper } from "react-icons/im";
import { RxQuestionMark } from "react-icons/rx";
import { RiContactsBookLine } from "react-icons/ri";

//react scripts flag if heap memory is not enough --max_old_space_size=8000
export interface INavItem {
    id: number;
    icon?: any;
    path: string;
    label: string;
    // subLabel?: string;
    // children?: Array<INavItem>;
    // href?: string;
}

export const NAV_ITEMS: Array<INavItem> = [
    {
        id: 1,
        icon: () => <MdHome />,
        path: "/home",
        label: "home"
    },
    {
        id: 2,
        icon: () => <FiUser />,
        path: "/user-management",
        label: "users"
    },
    {
        id: 3,
        icon: () => <BiDevices />,
        path: "/device-management",
        label: "Device"
    },
    {
        id: 4,
        icon: () => <GiWheat />,
        path: "/farm-management",
        label: "Farm"
    },
    {
        id: 5,
        icon: () => <AiOutlineCamera />,
        path: "/camera-management",
        label: "Camera"
    },
    {
        id: 6,
        icon: () => <ImNewspaper />,
        path: "/news-management",
        label: "News"
    },

    {
        id: 7,
        icon: () => <MdOutlineEmail />,
        path: "/inquiry-management",
        label: "Inquiry"
    },
    {
        id: 8,
        icon: () => <RxQuestionMark />,
        path: "/faq-management",
        label: "faq"
    },
    {
        id: 9,
        icon: () => <MdOutlinePrivacyTip />,
        path: "/privacy-policy",
        label: "プライバシーポリシー "
    },
    {
        id: 10,
        icon: () => <BiTransfer />,
        path: "/notaion",
        label: "特定商取引法に基づく表記"
    }
    // {
    //     id: 11,
    //     icon: () => <RiContactsBookLine />,
    //     path: "/user-guide",
    //     label: "利用規約"
    // }
];
