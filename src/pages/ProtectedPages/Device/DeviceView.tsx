import {
    Badge,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    Flex,
    Heading,
    Stack,
    StackDivider,
    Text,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import DeviceService from "../../../services/DeviceService";
import dayjs from "dayjs";
import { BiLinkExternal } from "react-icons/bi";
import HeadingButtonRight from "../../../components/button/HeadingButton";

const DeviceView = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState<any>([]);

    const getDeviceList = () => {
        dispatch(
            DeviceService.getDevice(
                {
                    deviceId: params._id
                },
                (success: any) => {
                    setDeviceData(success.data.rows[0]);
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

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getDeviceList();
    }, []);

    const [navigatePath, setNavigatePath] = useState<any>(-1);
    const location = useLocation();
    return (
        <>
            <Box w={"4xl"} width={{ base: "full", md: "4xl" }} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton link={location?.state ?? -1} />
                        </Stack>
                        <CardHeader
                            p={0}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            alignContent={"center"}
                            width="full"
                        >
                            <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                                {t("device_mgmt.device_details")}
                            </Heading>

                            <Box position={"absolute"} right={"0"} top={"-3"}>
                                <HeadingButtonRight path={`/device-edit/${deviceData?._id}`} state={location?.state} />
                            </Box>
                        </CardHeader>
                    </Box>

                    <Box pb={10} px={5}>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {"ID"}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?._id ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("common.name")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.name ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("device_mgmt.device_type")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.deviceType === "CYLINDER"
                                        ? t("status.cylinder")
                                        : "SENSOR"
                                        ? t("status.sensor")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("device_mgmt.client_id")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.client_id ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("device_mgmt.pubTopic")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.pubTopic ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("device_mgmt.SubTopic")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.subTopic ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("device_mgmt.current_value")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData.deviceType === "CYLINDER" ? (
                                        <>{deviceData?.current_value === "0" ? t("status.open") : t("status.close")}</>
                                    ) : (
                                        <>
                                            {deviceData?.current_value === "0" ? t("status.running") : t("status.stop")}
                                        </>
                                    )}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("device_mgmt.mac_address")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.mac_address ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("device_mgmt.location")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.location ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("device_mgmt.farm_name")}
                                </Heading>
                                <Text
                                    p={3}
                                    fontSize="md"
                                    cursor={"pointer"}
                                    color={globalStyles.colors.mainColor}
                                    display={"Flex"}
                                    alignItems={"center"}
                                    onClick={() =>
                                        navigate({ pathname: `/viewfarm/${deviceData?.farm_id._id}`, search: `?tab=0` })
                                    }
                                >
                                    {deviceData?.farm_id?.farm_name ?? "--"} <BiLinkExternal />
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.owner_name")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.farm_id?.owner_id?.user_name
                                        ? deviceData?.farm_id?.owner_id?.user_name
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.status")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    <Badge variant={deviceData?.status === "OPERATIONAL" ? "success" : "danger"}>
                                        {deviceData?.status === "OPERATIONAL"
                                            ? t("status.operational")
                                            : t("status.non_operational")}
                                    </Badge>
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex flex={0.2}>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo")}
                                </Heading>
                                <Text flex={0.8} whiteSpace={"pre-line"} p={3} fontSize="md">
                                    {deviceData?.memo ? deviceData?.memo : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex flex={0.2}>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo_developer")}
                                </Heading>
                                <Text flex={0.8} whiteSpace={"pre-line"} p={3} fontSize="md">
                                    {deviceData?.memoDeveloper ? deviceData?.memoDeveloper : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.register_date")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.register_date
                                        ? dayjs(deviceData?.register_date).format("YYYY/MM/DD HH:mm")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.last_datetime")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.lastDateTime
                                        ? dayjs(deviceData?.lastDateTime).format("YYYY/MM/DD HH:mm")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                    </Box>
                    <Box display={"flex"} pb={4} justifyContent={"center"} alignItems={"center"}>
                        <Button
                            onClick={() => navigate(`/device-activity/${deviceData._id}`)}
                            color={"white"}
                            bg={globalStyles.colors.mainColor}
                            _hover={{ bgColor: "blue.300" }}
                        >
                            {t("device_mgmt.view_activity")}
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default DeviceView;
