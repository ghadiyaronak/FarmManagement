import {
    Badge,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    FormLabel,
    Heading,
    Stack,
    StackDivider,
    Text
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CameraService from "../../../services/CameraService";
import dayjs from "dayjs";
import { globalStyles } from "../../../theme/styles";
import { BiLinkExternal } from "react-icons/bi";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import CameraActivity from "./CameraActivity";

const CameraView = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const [cameraData, setCameraData] = useState<any>([]);

    const getCameraList = () => {
        dispatch(
            CameraService.getCamera(
                {
                    cameraId: params._id
                },
                (success: any) => {
                    setCameraData(success.data.rows[0]);
                },
                (error: any) => {
                    console.log(error);
                }
            )
        );
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getCameraList();
    }, []);

    return (
        <>
            <Box w={"4xl"} width={{ base: "full", md: "4xl" }} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton link="/camera-management" />
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
                                {t("camera_mgmt.camera_details")}
                            </Heading>

                            <Box position={"absolute"} right={"0"} top={"-3"}>
                                <HeadingButtonRight path={`/camera-edit/${cameraData?._id}`} />
                            </Box>
                        </CardHeader>
                    </Box>

                    <CardBody>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {"ID"}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {cameraData?._id ? cameraData?._id : "--"}
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
                                    {cameraData?.name ? cameraData?.name : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex flex={"0.3"}>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("camera_mgmt.link_id")}
                                </Heading>
                                <Text
                                    flex={"0.7"}
                                    p={3}
                                    as={"a"}
                                    fontSize="md"
                                    cursor={"pointer"}
                                    alignItems={"center"}
                                    color={globalStyles.colors.mainColor}
                                    href={cameraData?.live_view_link ? cameraData?.live_view_link : "--"}
                                >
                                    {cameraData?.live_view_link ? cameraData?.live_view_link : "--"}
                                    <BiLinkExternal />
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("device_mgmt.mac_address")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {cameraData?.mac_address ? cameraData?.mac_address : "--"}
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
                                    {cameraData?.location ? cameraData?.location : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("farm_mgmt.farm")}
                                </Heading>
                                <Text
                                    p={3}
                                    fontSize="md"
                                    cursor={"pointer"}
                                    display={"Flex"}
                                    alignItems={"center"}
                                    color={globalStyles.colors.mainColor}
                                    onClick={(row: any) =>
                                        cameraData?.farm_id?.farm_name
                                            ? navigate({
                                                  pathname: `/viewfarm/${cameraData?.farm_id?._id}`,
                                                  search: `?tab=0`
                                              })
                                            : ""
                                    }
                                >
                                    {cameraData?.farm_id?.farm_name ? cameraData?.farm_id?.farm_name : "--"}
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
                                    {cameraData?.farm_id?.owner_id?.user_name
                                        ? cameraData?.farm_id?.owner_id?.user_name
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
                                    <Badge variant={cameraData?.status === "OPERATIONAL" ? "success" : "danger"}>
                                        {cameraData?.status === "OPERATIONAL"
                                            ? t("status.operational")
                                            : t("status.non_operational")}
                                    </Badge>
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo")}
                                </Heading>
                                <Text whiteSpace={"pre-line"} p={3} fontSize="md">
                                    {cameraData?.memo ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.memo_developer")}
                                </Heading>
                                <Text whiteSpace={"pre-line"} p={3} fontSize="md">
                                    {cameraData?.memoDeveloper ?? "--"}
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
                                    {cameraData?.register_date
                                        ? dayjs(cameraData?.register_date).format("YYYY/MM/DD HH:mm")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                    </CardBody>
                    <Box display={"flex"} pb={4} justifyContent={"center"} alignItems={"center"}>
                        <Button
                            onClick={() => navigate(`/camera-activity/${cameraData._id}`)}
                            color={"white"}
                            bg={globalStyles.colors.mainColor}
                            _hover={{ bgColor: "blue.300" }}
                        >
                            {t("camera_mgmt.camera_activity")}
                        </Button>
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default CameraView;
