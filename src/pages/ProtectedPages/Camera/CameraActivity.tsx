import { Box, Card, CardHeader, Flex, Grid, GridItem, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import CameraService from "../../../services/CameraService";
import dayjs from "dayjs";

const CameraActivity = () => {
    const { t } = useTranslation();
    const { _id } = useParams();
    const toast = useToast();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cameraData, setCameraData] = useState<any>([]);

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

    useEffect(() => {
        getCameraActivityList();
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

                    {cameraData.map((elem: any, index: any) => {
                        return (
                            <Box key={index}>
                                <Grid pb={2} gap={6} px={5} rounded={"lg"}>
                                    <GridItem w="full" boxShadow={"md"} px={4} pt={2} bg="white">
                                        <Flex py={2}>
                                            <Text fontWeight={"semibold"} flex={"0.2"}>
                                                {"ID"}
                                            </Text>
                                            <Text flex={"0.8"} fontSize="md">
                                                {elem?.cameraId ?? "--"}
                                            </Text>
                                        </Flex>

                                        <Flex py={2}>
                                            <Text fontWeight={"semibold"} flex={"0.2"}>
                                                {t("news.action")}
                                            </Text>
                                            <Text flex={"0.8"} fontSize="md">
                                                {elem?.captureVideo ? "Capture Video" : "Capture ScreenShot"}
                                            </Text>
                                        </Flex>

                                        <Flex py={2}>
                                            <Text fontWeight={"semibold"} flex={"0.2"}>
                                                {t("user_mgmt.user_name")}
                                            </Text>
                                            <Text flex={"0.8"} fontSize="md">
                                                {elem?.user?.user_name ?? "--"}
                                            </Text>
                                        </Flex>

                                        <Flex py={2}>
                                            <Text fontWeight={"semibold"} flex={"0.2"}>
                                                {"ActivityAt"}
                                            </Text>
                                            <Text flex={"0.8"} fontSize="md">
                                                {elem?.ActivityAt
                                                    ? dayjs(elem?.ActivityAt).format("YYYY/MM/DD hh:mm:ss")
                                                    : "--"}
                                            </Text>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                            </Box>
                        );
                    })}
                </Card>
            </Box>
        </>
    );
};

export default CameraActivity;
