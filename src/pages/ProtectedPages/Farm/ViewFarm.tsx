import {
    Avatar,
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    Divider,
    Flex,
    FormControl,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    WrapItem,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import DataTableComponent from "../../../components/Table/DataTable";
import { useDispatch } from "react-redux";
import FarmServices from "../../../services/FarmServices";
import DeviceService from "../../../services/DeviceService";
import CameraService from "../../../services/CameraService";
import dayjs from "dayjs";
import UserService from "../../../services/UserService";

interface EditProps {
    mode?: any;
    contractInformationData?: any;
    getContractDetails?: any;
}

const ViewFarm = ({ mode }: EditProps) => {
    const { t } = useTranslation();
    const toast = useToast();
    const params = useParams();
    const [farmData, setFarmData] = useState<any>([]);
    const [modal, setModal] = useState<any>(false);
    const [userData, setUserData] = useState<any>([]);
    const [farmUserData, setFarmUserData] = useState<any>([]);
    const [farmDeviceData, setFarmDeviceData] = useState<any>([]);
    const [farmCameraeData, setFarmCameraData] = useState<any>([]);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [openTab, setOpenTab] = useState(searchParams.get("tab"));
    const [scrollTop, setScrollTop] = useState<boolean>(false);

    const location = useLocation();

    function handleClick(row: any) {
        navigate(`/user-view/${row._id}`);
    }

    function handleCamera(row: any) {
        navigate(`/camera-view/${row._id}`, { state: location?.pathname + "?tab=3" });
    }

    function handleDevice(row: any) {
        navigate(`/device-view/${row._id}`, { state: location?.pathname + "?tab=2" });
    }

    // user panel //
    const columnUSer = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("common.name")}</Text>,
            selector: (row: any) => row?.user_name,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Flex alignItems={"center"} onClick={() => navigate(`/user-view/${row._id}`, { state: row })}>
                        <WrapItem pr={2}>
                            <Avatar size="md" src={userData?.profile_image?.url ?? "--"} />
                        </WrapItem>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.user_name?.toString().substring(row.user_name, row?.user_name.length)}
                        </Text>
                    </Flex>
                );
            },
            width: "200px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.farm_name")}</Text>,
            selector: (row: any) => row?.farm_id?.farm_name,
            sortable: true,
            wrap: true,
            width: "150px"
        },

        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("common.contact_number")}</Text>,
            selector: (row: any) => row?.contact_number,
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 4,
            name: <Text fontWeight={"bold"}>{t("common.register_date")}</Text>,
            selector: (row: any) => row?.register_date,
            cell: (row: any) => (
                <Text>{row?.register_date ? dayjs(row?.register_date).format("YYYY/MM/DD") : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 5,
            name: <Text fontWeight={"bold"}>{t("common.email")}</Text>,
            selector: (row: any) => row?.email,
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 6,
            name: <Text fontWeight={"bold"}>{t("user_mgmt.role")}</Text>,
            selector: (row: any) => (
                <Text flexWrap={"wrap"}>
                    {row?.role === "WRITE" ? t("status.write") : "READ" ? t("status.read") : "--"}
                </Text>
            ),
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 7,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,
            cell: (row: any) => (
                <Badge variant={row?.status === "ACTIVE" ? "success" : "danger"}>
                    {row?.status === "ACTIVE" ? t("status.active") : t("status.block")}
                </Badge>
            ),

            width: "180px"
        }
    ];

    // Device panel //
    const column2 = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("common.name")}</Text>,
            selector: (row: any) => row?.name,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Box>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            flexWrap={"wrap"}
                            cursor={"pointer"}
                        >
                            {row.name?.toString().substring(row.name, row?.name.length)}
                        </Text>
                    </Box>
                );
            },
            width: "150px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("farm_mgmt.farm")}</Text>,
            selector: (row: any) => <Text flexWrap={"wrap"}>{row?.farm_id?.farm_name}</Text>,
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.current_value")}</Text>,
            selector: (row: any) => (
                <Text flexWrap={"wrap"}>
                    {row.deviceType === "CYLINDER" ? (
                        <>{row?.current_value === "0" ? t("status.open") : t("status.close")}</>
                    ) : (
                        <>{row?.current_value === "0" ? t("status.running") : t("status.stop")}</>
                    )}
                </Text>
            ),
            sortable: true,
            wrap: true,
            width: "180px"
        },
        {
            id: 4,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.location")}</Text>,
            selector: (row: any) => <Text flexWrap={"wrap"}>{row?.location}</Text>,
            sortable: true,
            wrap: true,
            width: "180px"
        },
        {
            id: 5,
            name: <Text fontWeight={"bold"}>{t("common.register_date")}</Text>,
            selector: (row: any) => row?.register_date,
            sortable: true,
            cell: (row: any) => (
                <Text>{row?.register_date ? dayjs(row?.register_date).format("YYYY/MM/DD") : "--"}</Text>
            ),
            wrap: true,
            width: "160px"
        },
        {
            id: 6,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,

            cell: (row: any) => (
                <Badge variant={row?.status === "OPERATIONAL" ? "success" : "danger"}>
                    {row?.status === "OPERATIONAL" ? t("status.operational") : t("status.non_operational")}
                </Badge>
            ),
            width: "180px"
        }
    ];

    // Camera penel //
    const column1 = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("common.name")}</Text>,
            selector: (row: any) => row?.name,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Box>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.name?.toString().substring(row.name, row?.name.length)}
                        </Text>
                    </Box>
                );
            },
            width: "130px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.mac_address")}</Text>,
            selector: (row: any) => row?.mac_address,
            sortable: true,
            wrap: true,
            width: "180px"
        },
        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("farm_mgmt.farm")}</Text>,
            selector: (row: any) => row?.farm_id?.farm_name,
            sortable: true,
            wrap: true,
            width: "130px"
        },
        {
            id: 4,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.location")}</Text>,
            selector: (row: any) => row?.location,
            sortable: true,
            wrap: true,
            width: "180px"
        },
        {
            id: 5,
            name: <Text fontWeight={"bold"}>{t("common.register_date")}</Text>,
            selector: (row: any) => row?.register_date,
            cell: (row: any) => (
                <Text>{row?.register_date ? dayjs(row?.register_date).format("YYYY/MM/DD") : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 6,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,

            cell: (row: any) => (
                <Badge variant={row?.status === "OPERATIONAL" ? "success" : "danger"}>
                    {row?.status === "OPERATIONAL" ? t("status.operational") : t("status.non_operational")}
                </Badge>
            ),
            width: "200px"
        }
    ];

    const getFarmListById = () => {
        dispatch(
            FarmServices.getFarm(
                {
                    farmId: params.id
                },
                (success: any) => {
                    setFarmData(success.data.rows[0]);
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

    const getUserDetailsByFarmId = async () => {
        <>
            {dispatch(
                UserService.getUser(
                    {
                        farm_Id: params.id
                    },
                    (success: any) => {
                        setFarmUserData(success.data.rows);
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
            )}
        </>;
    };

    const getDeviceDetailsByFarmId = async () => {
        dispatch(
            DeviceService.getDevice(
                {
                    device_Id: params.id
                },
                (success: any) => {
                    setFarmDeviceData(success.data.rows);
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

    const getCameraDetailsByFarmId = async () => {
        dispatch(
            CameraService.getCamera(
                {
                    camera_Id: params.id
                },
                (success: any) => {
                    setFarmCameraData(success.data.rows);
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

    const handleUpdateFarmStatus = () => {
        setIsLoading(true);
        const data = {
            status: farmData?.status === "ACTIVE" ? "BLOCK" : "ACTIVE"
        };
        dispatch(
            FarmServices.updateFarm(
                { _id: farmData?._id, data },
                (responseData: any) => {
                    toast({
                        title: responseData.message ? responseData.message : responseData?.data?.message,
                        status: "success",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                    getFarmListById();
                    onClose();
                    setIsLoading(false);
                    window.scrollTo({ top: 0 });
                },
                (errorData: any) => {
                    setIsLoading(false);
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

    useEffect(() => {
        getFarmListById();
        getUserDetailsByFarmId();
        getDeviceDetailsByFarmId();
        getCameraDetailsByFarmId();
    }, []);

    useEffect(() => {
        scrollTopFunction(), [scrollTop];
    });
    const scrollTopFunction = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "auto" });
        }, 100);
    };
    useEffect(() => {
        const tab = searchParams.get("tab");

        if (tab != openTab) {
            setOpenTab(tab);
        }
    }, [searchParams.get("tab")]);

    return (
        <>
            <Box w="4xl" bgColor={"white"} pt={4} rounded={"lg"} mt={4}>
                <Box my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                    <Stack position={"absolute"} mx={5}>
                        <ReturnButton link={"/farm-management"} />
                    </Stack>
                    <Box
                        p={0}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        width="full"
                    >
                        <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                            {t("farm_mgmt.farm_details")}
                        </Heading>
                    </Box>
                    {openTab == "0" && (
                        <Box position={"absolute"} right={0} top={"-6"}>
                            <HeadingButtonRight path={`/edit-farm/${farmData?._id}`} state={location?.state} />
                        </Box>
                    )}
                </Box>

                <Tabs index={Number(openTab)}>
                    <TabList>
                        <Tab
                            onClick={() => {
                                navigate({ search: `?tab=0` });
                                setOpenTab("0");
                            }}
                        >
                            {t("farm_mgmt.farm_view")}
                        </Tab>
                        <Box>
                            <Tab
                                onClick={() => {
                                    getUserDetailsByFarmId();
                                    navigate({ search: `?tab=1` });
                                    setOpenTab("1");
                                }}
                            >
                                {t("user_mgmt.user")}
                            </Tab>
                        </Box>
                        <Box>
                            <Tab
                                onClick={() => {
                                    getDeviceDetailsByFarmId();
                                    navigate({ search: `?tab=2` });
                                    setOpenTab("2");
                                }}
                            >
                                {t("Device")}
                            </Tab>
                        </Box>
                        <Box>
                            <Tab
                                onClick={() => {
                                    getCameraDetailsByFarmId();
                                    navigate({ search: `?tab=3` });
                                    setOpenTab("3");
                                }}
                            >
                                {t("Camera")}
                            </Tab>
                        </Box>
                    </TabList>

                    <TabPanels>
                        {/* View Farm */}
                        <TabPanel px={0}>
                            <Card boxShadow={"none"}>
                                <CardBody>
                                    <Divider />
                                    <Stack divider={<StackDivider />}>
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {"ID"}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?._id ? farmData?._id : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.farm_name")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.farm_name ? farmData?.farm_name : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={19}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.owner_name")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.owner_id?.user_name ? farmData?.owner_id?.user_name : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("common.email")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.email ? farmData?.email : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("common.contact_number")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.contact_number ? farmData?.contact_number : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />{" "}
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("common.register_date")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.register_date
                                                    ? dayjs(farmData?.register_date).format("YYYY/MM/DD")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.construction_period")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.contractStartDate
                                                    ? dayjs(farmData?.contractStartDate).format("YYYY/MM/DD")
                                                    : "--"}{" "}
                                                -{" "}
                                                {farmData?.contractEndDate
                                                    ? dayjs(farmData?.contractEndDate).format("YYYY/MM/DD")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("common.status")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                <Badge variant={farmData?.status === "ACTIVE" ? "success" : "danger"}>
                                                    {farmData?.status === "ACTIVE"
                                                        ? t("status.active")
                                                        : t("status.block")}
                                                </Badge>
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.postal_code")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.postalCode ? farmData?.postalCode : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.prefecture")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.prefecture ? farmData?.prefecture : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.city")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.city ? farmData?.city : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.sub_area")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.subArea ? farmData?.subArea : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex flex={0.2}>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("farm_mgmt.memo")}
                                            </Heading>
                                            <Text flex={0.8} whiteSpace={"pre-line"} p={3} fontSize="md">
                                                {farmData?.memo ? farmData?.memo : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                    <Stack divider={<StackDivider />} spacing="4">
                                        <Flex>
                                            <Heading
                                                w={"72"}
                                                p={3}
                                                bg={"#f9fafa"}
                                                pl={12}
                                                fontSize={20}
                                                textTransform="capitalize"
                                            >
                                                {t("user_mgmt.last_login")}
                                            </Heading>
                                            <Text p={3} fontSize="md">
                                                {farmData?.lastLoginTime
                                                    ? dayjs(farmData?.lastLoginTime).format("YYYY/MM/DD HH:mm")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </Stack>
                                    <Divider />
                                </CardBody>
                            </Card>

                            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} py={2}>
                                <Button
                                    onClick={onOpen}
                                    isLoading={isLoading}
                                    bgColor={farmData?.status === "ACTIVE" ? "red.400" : "#4299e1"}
                                    _hover={{ bgColor: farmData?.status === "ACTIVE" ? "red.300" : "blue.300" }}
                                    color={"white"}
                                    w={"36"}
                                >
                                    {farmData?.status === "ACTIVE" ? t("status.block") : t("status.active")}
                                </Button>
                            </Box>

                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent mt={"64"}>
                                    <ModalHeader>{t("common.farm_status")}</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <Box>
                                            <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                                {farmData?.status === "ACTIVE" ? (
                                                    <Text>{t("messages.suspend_message_farm")}</Text>
                                                ) : (
                                                    <Text>{t("messages.active_message_farm")}</Text>
                                                )}
                                            </FormControl>
                                        </Box>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Box
                                            w={"full"}
                                            display="flex"
                                            justifyContent={"center"}
                                            onClick={() => setModal(false)}
                                        >
                                            <Button
                                                bgColor={globalStyles.colors.mainColor}
                                                _hover={{ bgColor: "blue.300" }}
                                                isLoading={isLoading}
                                                onClick={() => {
                                                    setScrollTop(true);
                                                    handleUpdateFarmStatus();
                                                }}
                                                color={"white"}
                                                mr={3}
                                            >
                                                {t("status.yes")}
                                            </Button>
                                            <Button
                                                bgColor={"red.400"}
                                                _hover={{ bgColor: "red.300" }}
                                                color={"white"}
                                                onClick={onClose}
                                            >
                                                {t("status.no")}
                                            </Button>
                                        </Box>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </TabPanel>

                        {/* User */}
                        <TabPanel>
                            <Box rounded={"lg"} bgColor={"white"} px={5}>
                                <DataTableComponent
                                    handleSubmit={handleClick}
                                    column={columnUSer}
                                    data={farmUserData}
                                />
                            </Box>
                        </TabPanel>

                        {/* Divice */}
                        <TabPanel>
                            <Box bgColor={"white"} rounded={"lg"} px={5}>
                                <DataTableComponent
                                    handleSubmit={handleDevice}
                                    column={column2}
                                    data={farmDeviceData}
                                />
                            </Box>
                        </TabPanel>

                        {/* Camera */}
                        <TabPanel>
                            <Box bgColor={"white"} rounded={"lg"} px={5}>
                                <DataTableComponent
                                    handleSubmit={handleCamera}
                                    column={column1}
                                    data={farmCameraeData}
                                />
                            </Box>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default ViewFarm;
