import { AiOutlineCamera, AiOutlineControl, AiOutlineQuestion, AiOutlineQuestionCircle } from "react-icons/ai";
import { BiCategory, BiDevices } from "react-icons/bi";
import { BsCurrencyYen } from "react-icons/bs";
import { FaCcStripe, FaLine, FaQuestion, FaUsers } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { GiFarmTractor, GiWheat } from "react-icons/gi";
import { ImPriceTag } from "react-icons/im";
import { MdHome, MdOutlinePrivacyTip, MdOutlineRateReview } from "react-icons/md";
import { SiGoogleanalytics } from "react-icons/si";
import { ImNewspaper } from "react-icons/im";
import { TbArrowGuide } from "react-icons/tb";

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
        icon: () => <AiOutlineQuestionCircle />,
        path: "/inquiry-management",
        label: "Inquiry"
    },
    {
        id: 8,
        icon: () => <FaQuestion />,
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
        icon: () => <FaQuestion />,
        path: "/notaion",
        label: "特定商取引法に基づく表記"
    },
    {
        id: 11,
        icon: () => <TbArrowGuide />,
        path: "/user-guide",
        label: "利用ガイド"
    }
];
