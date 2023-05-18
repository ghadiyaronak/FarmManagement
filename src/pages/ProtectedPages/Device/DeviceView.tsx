import {
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
import { useNavigate, useParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import DeviceService from "../../../services/DeviceService";
import dayjs from "dayjs";
import { BiLinkExternal } from "react-icons/bi";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import CloseEditButtonNew from "../../../components/button/CloseEditButton";

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
        getDeviceList();
    }, []);
    return (
        <>
            <Box w={"4xl"} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton link={"/device-management"} />
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
                            {deviceData ? (
                                <Box position={"absolute"} right={"0"} top={"-3"}>
                                    <HeadingButtonRight path={`/device-edit/${deviceData?._id}`} />
                                </Box>
                            ) : (
                                <Box position={"absolute"} right={"0"} top={"-3"}>
                                    <CloseEditButtonNew path={`/device-view/${deviceData?._id}`} />
                                </Box>
                            )}
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
                                    {deviceData?._id ? deviceData?._id : "--"}
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
                                    {deviceData?.name ? deviceData?.name : "--"}
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
                                    {deviceData?.current_value === "OPEN" ? t("status.open") : t("status.close")}
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
                                    {deviceData?.mac_address ? deviceData?.mac_address : "--"}
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
                                    {deviceData?.location ? deviceData?.location : "--"}
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
                                    {deviceData?.farm_id?.farm_name ? deviceData?.farm_id?.farm_name : "--"}{" "}
                                    <BiLinkExternal />
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
                                    {/* {deviceData?.status ? deviceData?.status : "--"} */}
                                    {deviceData?.status === "OPERATIONAL"
                                        ? t("status.operational")
                                        : t("status.non_operational")}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("device_mgmt.device_access")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.deviceAccess === "ENABLE" ? t("status.enable") : t("status.disable")}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {deviceData?.memo ? deviceData?.memo : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo_developer")}
                                </Heading>
                                <Text p={3} fontSize="md">
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
                                        ? dayjs(deviceData?.register_date).format("YYYY/MM/DD")
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
                                        ? dayjs(deviceData?.lastDateTime).format("YYYY/MM/DD HH:MM")
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
