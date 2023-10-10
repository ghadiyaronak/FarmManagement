import { Box, Card, CardHeader, Flex, Grid, GridItem, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import CameraService from "../../../services/CameraService";
import dayjs from "dayjs";

interface HeadingProps {
    name?: any;
}
const CameraActivity = ({ name }: HeadingProps) => {
    const { t } = useTranslation();
    const { _id } = useParams();
    const toast = useToast();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cameraData, setCameraData] = useState<any>([]);
    const [ActivityData, setActivityData] = useState<any>([]);

    const getCameraActivityList = () => {
        dispatch(
            CameraService.getCameraActivity(
                {
                    cameraId: _id,
                    limit: 10
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

    const getCameraList = () => {
        dispatch(
            CameraService.getCamera(
                {
                    cameraId: params._id
                },
                (success: any) => {
                    setActivityData(success.data.rows[0]);
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
        getCameraActivityList();
        getCameraList();
    }, []);
    return (
        <>
            <Box pt={4} w={"4xl"}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton />
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
                        </CardHeader>
                    </Box>

                    <Flex gap={"5"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Text fontWeight={"semibold"}>{t("common.name")}</Text>
                        <Text fontSize="md">{ActivityData?.name ?? "--"}</Text>|
                        <Text fontWeight={"semibold"}>{t("device_mgmt.location")}</Text>
                        <Text fontSize="md">{ActivityData?.location ?? "--"}</Text>
                    </Flex>

                    {cameraData.length > 0 ? (
                        <>
                            {cameraData.map((elem: any, index: any) => {
                                return (
                                    <Box key={index} px={5}>
                                        <Grid pb={3} gap={6} rounded={"lg"}>
                                            <GridItem w="full" boxShadow={"md"} px={4} pt={2} bg="#f4f7fe">
                                                <Flex py={2}>
                                                    <Text fontWeight={"semibold"} flex={"0.2"}>
                                                        {"ID"}
                                                    </Text>
                                                    <Text flex={"0.8"} fontSize="md">
                                                        {elem?.cameraId ?? "--"}
                                                    </Text>

                                                    <Text fontWeight={"semibold"} flex={"0.4"}>
                                                        {t("user_mgmt.user_name")}
                                                    </Text>
                                                    <Text flex={"0.6"} fontSize="md">
                                                        {elem?.user?.user_name ?? "--"}
                                                    </Text>
                                                </Flex>

                                                <Flex py={2}>
                                                    <Text fontWeight={"semibold"} flex={"0.2"}>
                                                        {t("news.action")}
                                                    </Text>
                                                    <Text flex={"0.8"} fontSize="md">
                                                        {elem?.captureVideo
                                                            ? t("camera_mgmt.capture_video")
                                                            : t("camera_mgmt.capture_screenShot")}
                                                    </Text>

                                                    <Text fontWeight={"semibold"} flex={"0.4"}>
                                                        {t("camera_mgmt.capture_time")}
                                                    </Text>
                                                    <Text flex={"0.6"} fontSize="md">
                                                        {elem?.ActivityAt
                                                            ? dayjs(elem?.ActivityAt).format("YYYY/MM/DD HH:mm")
                                                            : "--"}
                                                    </Text>
                                                </Flex>
                                            </GridItem>
                                        </Grid>
                                    </Box>
                                );
                            })}
                        </>
                    ) : (
                        <Text display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            {t("there_are_no_records_to_display")}
                        </Text>
                    )}
                </Card>
            </Box>
        </>
    );
};

export default CameraActivity;
