import {
    Avatar,
    Badge,
    Box,
    Button,
    chakra,
    Divider,
    Flex,
    Heading,
    Icon,
    Link,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    Table,
    TableCaption,
    TableContainer,
    Tbody,
    Td,
    Text,
    Tfoot,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useToast
} from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";
import { AiOutlineCamera, AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { BiDevices, BiLinkExternal } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { FiServer } from "react-icons/fi";
import { GiFarmer, GiWheat } from "react-icons/gi";
import { GoLocation } from "react-icons/go";
import { useNavigate, useParams } from "react-router-dom";
import DataTableComponent from "../../components/Table/DataTable";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import FarmServices from "../../services/FarmServices";
import { FaEye } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import MainHeading from "../../components/menu/MainHeading";
import { CiCircleMore } from "react-icons/ci";
import UserService from "../../services/UserService";
import { useFormik } from "formik";
import DeviceService from "../../services/DeviceService";
import CameraService from "../../services/CameraService";
import DashboardService from "../../services/DashboardService";

interface StatsCardProps {
    title: string;
    stat: string;
    icon: ReactNode;
    color: any;
}

function StatsCard(props: StatsCardProps) {
    const { title, stat, icon } = props;

    var SI_SYMBOL = ["", "k", "M", "B", "T", "P", "E"];

    function abbreviateNumber(number: any) {
        // what tier? (determines SI symbol)
        var tier = (Math.log10(Math.abs(number)) / 3) | 0;

        // if zero, we don't need a suffix
        if (tier == 0) return number;

        // get suffix and determine scale
        var suffix = SI_SYMBOL[tier];
        var scale = Math.pow(10, tier * 3);

        // scale the number
        var scaled = number / scale;

        // format number and add suffix
        return scaled.toFixed(1) + suffix;
    }

    return (
        <>
            <Stat
                px={{ base: 2, md: 4 }}
                py={"3"}
                shadow={" 0px 10px 15px -3px rgba(0,0,0,0.1)"}
                bg={"white"}
                rounded={"lg"}
            >
                <Flex justifyContent={"space-between"}>
                    <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel fontWeight={"semibold"} fontSize={"xl"} isTruncated>
                            {title}
                        </StatLabel>

                        <StatNumber fontSize={"xl"} flexWrap={"wrap"} fontWeight={"medium"}>
                            {abbreviateNumber(stat)}
                        </StatNumber>
                    </Box>
                    <Box my={"auto"} color={useColorModeValue("gray.800", "gray.200")} alignContent={"center"}>
                        {icon}
                    </Box>
                </Flex>
            </Stat>
        </>
    );
}

export default function BasicStatistics() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const dispatch = useDispatch();
    const [userData, setUserData] = useState<any>([]);
    const [deviceData, setDeviceData] = useState<any>([]);
    const [tableData, setTableData] = useState<any>([]);
    const [cameradata, setCameraData] = useState<any>([]);
    const [dashboarddata, setDashboardData] = useState<any>([]);

    const getUserList = (isReset: boolean) => {
        dispatch(
            UserService.getUser(
                {
                    limit: 5
                },
                (success: any) => {
                    setUserData(success.data.rows);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    const getDeviceList = (isReset: boolean) => {
        dispatch(
            DeviceService.getDevice(
                {
                    limit: 5
                },
                (success: any) => {
                    setDeviceData(success.data.rows);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    const getFarmList = (isReset: boolean) => {
        dispatch(
            FarmServices.getFarm(
                {
                    limit: 5
                },
                (success: any) => {
                    setTableData(success.data.rows);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    const getCameraList = (isReset: boolean) => {
        dispatch(
            CameraService.getCamera(
                {
                    limit: 5
                },
                (success: any) => {
                    setCameraData(success.data.rows);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    const handleSearchData = () => {
        getDashboardList(false);
    };

    const { values, handleChange, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty } = useFormik({
        initialValues: {
            name: "",
            farm_id: {
                label: "",
                value: ""
            },
            registerDate: undefined,
            email: {
                label: "",
                value: ""
            },
            status: {
                label: "",
                value: ""
            },
            device_access: {
                label: "",
                value: ""
            }
        },
        onSubmit: handleSearchData
    });

    const getDashboardList = (isReset: boolean) => {
        if (!isReset) {
            const farmName = values.name;
            const farm = values.farm_id.value;
            const registerDate = values.registerDate;
            const device_access = values.device_access.value;
            let formattedRegisterDate = "";
            if (registerDate) {
                formattedRegisterDate = dayjs(registerDate).format("YYYY-MM-DD");
            }

            const status = values.status.value;

            dispatch(
                DashboardService.getDashboard(
                    {
                        user: farmName ?? undefined,
                        farm: farm ?? undefined,
                        device: status ?? undefined,
                        camera: formattedRegisterDate ?? undefined
                    },
                    (success: any) => {
                        setDashboardData(success);
                    },
                    (errorData: any) => {}
                )
            );
        } else {
            dispatch(
                DashboardService.getDashboard(
                    {},
                    (success: any) => {
                        setDashboardData(success.data.rows);
                    },
                    (errorData: any) => {}
                )
            );
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getDashboardList(false);
        getUserList(false);
        getDeviceList(false);
        getFarmList(false);
        getCameraList(false);
    }, []);

    return (
        <Box>
            <MainHeading title={t("home")} />
            <Box w="full" justifyContent={"center"} pt={2} border={"none"}>
                <Flex flexWrap={{ base: "wrap", md: "nowrap" }} justifyContent={"center"} gap={3}>
                    <Box w={"full"} cursor={"pointer"} onClick={() => navigate("/user-management")}>
                        <StatsCard
                            color={"#bcbcbc"}
                            title={t("dashboard.user")}
                            stat={dashboarddata?.data?.user}
                            icon={<BsPerson size={"2em"} />}
                        />
                    </Box>
                    <Box w={"full"} cursor={"pointer"} onClick={() => navigate("/device-management")}>
                        <StatsCard
                            color={"#bcbcbc"}
                            title={t("Device")}
                            stat={dashboarddata?.data?.device}
                            icon={<BiDevices size={"2em"} />}
                        />
                    </Box>
                    <Box w={"full"} cursor={"pointer"} onClick={() => navigate("/farm-management")}>
                        <StatsCard
                            color={"#bcbcbc"}
                            title={t("Farm")}
                            stat={dashboarddata?.data?.farm}
                            icon={<GiWheat size={"2em"} />}
                        />
                    </Box>
                    <Box w={"full"} cursor={"pointer"} onClick={() => navigate("/camera-management")}>
                        <StatsCard
                            color={"#bcbcbc"}
                            title={t("Camera")}
                            stat={dashboarddata?.data?.camera}
                            icon={<AiOutlineCamera size={"2em"} />}
                        />
                    </Box>
                </Flex>
            </Box>

            <Box>
                <SimpleGrid columns={1} spacing={6} pt={10}>
                    <Box bg="white" rounded={"lg"}>
                        <Flex justifyContent={"space-between"} bg={"#eeeeee"} roundedTop={"lg"} alignItems={"center"}>
                            <Text
                                fontWeight={"bold"}
                                color={globalStyles.colors.mainColor}
                                px={6}
                                roundedTop={"lg"}
                                py={2}
                                fontSize={24}
                            >
                                {t("dashboard.user")}
                            </Text>
                            <Flex
                                onClick={() => navigate("/user-management")}
                                fontWeight={"bold"}
                                alignItems={"center"}
                                fontSize={"16"}
                                gap={"1"}
                                cursor="pointer"
                                transition={"0.3s all"}
                                borderBottom={"1px solid #ecf4fc"}
                                color={globalStyles.colors.mainColor}
                                _hover={{ borderBottom: `2px solid ${globalStyles.colors.mainColor}` }}
                                mx={3}
                            >
                                <Text>{t("show_more")}</Text>
                                <BiLinkExternal />
                            </Flex>
                        </Flex>

                        <TableContainer>
                            <Table variant="simple">
                                <Thead bg={"#ecf4fc"} fontSize={16} fontWeight={"bold"}>
                                    <Tr>
                                        <Td>{t("common.name")}</Td>
                                        <Td>{t("farm_mgmt.farm_name")}</Td>
                                        <Td>{t("common.contact_number")}</Td>
                                        <Td>{t("common.register_date")}</Td>
                                        <Td w={"48"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            {t("common.status")}
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody fontSize={14}>
                                    {userData.map?.((data: any, index: any) => (
                                        <>
                                            <Tr
                                                key={index}
                                                _hover={{ bgColor: "#e2e8f06b" }}
                                                cursor={"pointer"}
                                                onClick={() => navigate(`/user-view/${data._id}`)}
                                            >
                                                <Td w={"60"} alignItems={"center"} gap={"3"}>
                                                    <Flex alignItems={"center"} gap={"3"}>
                                                        <Avatar size={"sm"} src={data?.profile_image?.url} />
                                                        <Text>{data?.user_name ?? "--"}</Text>
                                                    </Flex>
                                                </Td>
                                                <Td w={"60"}>{data.farm_id?.farm_name ?? "--"}</Td>
                                                <Td w={"60"}>{data.contact_number ?? "--"}</Td>
                                                <Td w={"60"}>
                                                    {data.register_date
                                                        ? dayjs(data?.register_date).format("YYYY/MM/DD")
                                                        : "--"}
                                                </Td>
                                                <Td>
                                                    <Badge variant={data?.status === "ACTIVE" ? "success" : "danger"}>
                                                        {data?.status === "ACTIVE"
                                                            ? t("status.active")
                                                            : t("status.block")}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* DEVICE  */}
                    <Box bg="white" rounded={"lg"}>
                        <Flex justifyContent={"space-between"} bg={"#eeeeee"} roundedTop={"lg"} alignItems={"center"}>
                            <Text
                                fontWeight={"bold"}
                                color={globalStyles.colors.mainColor}
                                px={6}
                                roundedTop={"lg"}
                                py={2}
                                fontSize={24}
                            >
                                {t("Device")}
                            </Text>
                            <Flex
                                onClick={() => navigate("/device-management")}
                                fontWeight={"bold"}
                                alignItems={"center"}
                                fontSize={"16"}
                                gap={"1"}
                                cursor="pointer"
                                transition={"0.3s all"}
                                borderBottom={"1px solid #ecf4fc"}
                                color={globalStyles.colors.mainColor}
                                _hover={{ borderBottom: `2px solid ${globalStyles.colors.mainColor}` }}
                                mx={3}
                            >
                                <Text>{t("show_more")}</Text>
                                <BiLinkExternal />
                            </Flex>
                        </Flex>

                        <TableContainer>
                            <Table variant="simple">
                                <Thead fontSize={16} bg={"#ecf4fc"} fontWeight={"bold"}>
                                    <Tr>
                                        <Td>{t("common.name")}</Td>
                                        <Td>{t("Farm")}</Td>
                                        <Td>{t("device_mgmt.current_value")}</Td>
                                        <Td>{t("device_mgmt.location")}</Td>
                                        <Td w={"48"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            {t("common.status")}
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody fontSize={14}>
                                    {deviceData.map?.((data: any, index: any) => (
                                        <>
                                            <Tr
                                                key={index}
                                                _hover={{ bgColor: "#e2e8f06b" }}
                                                onClick={() => navigate(`/device-view/${data._id}`)}
                                                cursor={"pointer"}
                                            >
                                                <Td w={"60"}>{data.name ?? "--"}</Td>
                                                <Td w={"60"}>{data.farm_id?.farm_name ?? "--"}</Td>
                                                <Td w={"60"}>
                                                    {data.deviceType === "CYLINDER" ? (
                                                        <>
                                                            {data?.current_value === "0"
                                                                ? t("status.open")
                                                                : t("status.close")}
                                                        </>
                                                    ) : (
                                                        <>
                                                            {deviceData?.current_value === "0"
                                                                ? t("status.running")
                                                                : t("status.stop")}
                                                        </>
                                                    )}
                                                </Td>
                                                <Td w={"60"}>{data.location ?? "--"}</Td>
                                                <Td>
                                                    <Badge
                                                        variant={data?.status === "OPERATIONAL" ? "success" : "danger"}
                                                    >
                                                        {data?.status === "OPERATIONAL"
                                                            ? t("status.operational")
                                                            : t("status.non_operational")}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* FARM  */}
                    <Box bg="white" rounded={"lg"}>
                        <Flex justifyContent={"space-between"} bg={"#eeeeee"} roundedTop={"lg"} alignItems={"center"}>
                            <Text
                                fontWeight={"bold"}
                                color={globalStyles.colors.mainColor}
                                px={6}
                                roundedTop={"lg"}
                                py={2}
                                fontSize={24}
                            >
                                {t("Farm")}
                            </Text>
                            <Flex
                                onClick={() => navigate("/farm-management")}
                                fontWeight={"bold"}
                                alignItems={"center"}
                                fontSize={"16"}
                                gap={"1"}
                                cursor="pointer"
                                transition={"0.3s all"}
                                borderBottom={"1px solid #ecf4fc"}
                                color={globalStyles.colors.mainColor}
                                _hover={{ borderBottom: `2px solid ${globalStyles.colors.mainColor}` }}
                                mx={3}
                            >
                                <Text>{t("show_more")}</Text>
                                <BiLinkExternal />
                            </Flex>
                        </Flex>

                        <TableContainer>
                            <Table variant="simple">
                                <Thead fontSize={16} bg={"#ecf4fc"} fontWeight={"bold"}>
                                    <Tr>
                                        <Td>{t("common.name")}</Td>
                                        <Td>{t("farm_mgmt.owner_name")}</Td>
                                        <Td>{t("common.contact_number")}</Td>
                                        <Td>{t("common.register_date")}</Td>
                                        <Td w={"48"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            {t("common.status")}
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody fontSize={14}>
                                    {tableData.map?.((data: any, index: any) => (
                                        <>
                                            <Tr
                                                key={index}
                                                _hover={{ bgColor: "#e2e8f06b" }}
                                                onClick={() =>
                                                    navigate({
                                                        pathname: `/viewfarm/${data._id}`,
                                                        search: `?tab=0`
                                                    })
                                                }
                                                cursor={"pointer"}
                                            >
                                                <Td w={"60"}>{data.farm_name}</Td>
                                                <Td w={"60"}>
                                                    {data.owner_id?.user_name ? data.owner_id?.user_name : "--"}
                                                </Td>
                                                <Td w={"60"}>{data.contact_number}</Td>
                                                <Td w={"60"}>
                                                    {data?.register_date
                                                        ? dayjs(data?.register_date).format("YYYY/MM/DD")
                                                        : "--"}
                                                </Td>
                                                <Td>
                                                    <Badge variant={data?.status === "ACTIVE" ? "success" : "danger"}>
                                                        {data?.status === "ACTIVE"
                                                            ? t("status.active")
                                                            : t("status.block")}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>

                    {/* CAMERA  */}
                    <Box rounded={"lg"} bg="white">
                        <Flex justifyContent={"space-between"} bg={"#eeeeee"} roundedTop={"lg"} alignItems={"center"}>
                            <Text
                                fontWeight={"bold"}
                                color={globalStyles.colors.mainColor}
                                px={6}
                                roundedTop={"lg"}
                                py={2}
                                fontSize={24}
                            >
                                {t("Camera")}
                            </Text>
                            <Flex
                                onClick={() => navigate("/camera-management")}
                                fontWeight={"bold"}
                                alignItems={"center"}
                                fontSize={"16"}
                                gap={"1"}
                                cursor="pointer"
                                transition={"0.3s all"}
                                borderBottom={"1px solid #ecf4fc"}
                                color={globalStyles.colors.mainColor}
                                _hover={{ borderBottom: `2px solid ${globalStyles.colors.mainColor}` }}
                                mx={3}
                            >
                                <Text>{t("show_more")}</Text>
                                <BiLinkExternal />
                            </Flex>
                        </Flex>

                        <TableContainer>
                            <Table variant="simple">
                                <Thead fontSize={16} bg={"#ecf4fc"} fontWeight={"bold"}>
                                    <Tr>
                                        <Td>{t("common.name")}</Td>
                                        <Td>{t("device_mgmt.mac_address")}</Td>
                                        <Td>{t("Farm")}</Td>
                                        <Td>{t("common.register_date")}</Td>
                                        <Td w={"48"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                            {t("common.status")}
                                        </Td>
                                    </Tr>
                                </Thead>
                                <Tbody fontSize={14}>
                                    {cameradata.map?.((data: any, index: any) => (
                                        <>
                                            <Tr
                                                key={index}
                                                _hover={{ bgColor: "#e2e8f06b" }}
                                                onClick={() => navigate(`/camera-view/${data._id}`)}
                                                cursor={"pointer"}
                                            >
                                                <Td w={"60"}>{data.name}</Td>
                                                <Td w={"60"}>{data.mac_address ?? "--"}</Td>
                                                <Td w={"60"}>{data.farm_id?.farm_name ?? "--"}</Td>
                                                <Td w={"60"}>
                                                    {data.register_date
                                                        ? dayjs(data?.register_date).format("YYYY/MM/DD")
                                                        : "--"}
                                                </Td>
                                                <Td>
                                                    <Badge
                                                        variant={data?.status === "OPERATIONAL" ? "success" : "danger"}
                                                    >
                                                        {data?.status === "OPERATIONAL"
                                                            ? t("status.operational")
                                                            : t("status.non_operational")}
                                                    </Badge>
                                                </Td>
                                            </Tr>
                                        </>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                </SimpleGrid>
            </Box>
        </Box>
    );
}
