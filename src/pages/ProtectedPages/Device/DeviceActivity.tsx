import {
    Box,
    Card,
    CardHeader,
    Divider,
    Flex,
    Grid,
    GridItem,
    Heading,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useToast
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import DeviceService from "../../../services/DeviceService";
import dayjs from "dayjs";
import "chartjs-adapter-date-fns";
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend, TimeScale, CategoryScale } from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale, CategoryScale);

const DeviceActivity = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState<any>([]);
    const [chartData, setChartData] = useState<any>([]);
    const [startData, setStartData] = useState<any>([]);
    const [endData, setEndData] = useState<any>([]);

    const getDeviceList = () => {
        dispatch(
            DeviceService.getDeviceActivity(
                {
                    deviceId: _id,
                    limit: 10
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

    const emptyArray: any = [];
    chartData?.map((data: any) => {
        if (data.day === "Sun") {
            data.day = "日";
        }
        if (data.day === "Mon") {
            data.day = "月";
        }
        if (data.day === "Tue") {
            data.day = "火";
        }
        if (data.day === "Wed") {
            data.day = "水";
        }
        if (data.day === "Thu") {
            data.day = "木";
        }
        if (data.day === "Fri") {
            data.day = "金";
        }
        if (data.day === "Sat") {
            data.day = "土";
        }
        emptyArray.push({
            x: data.day,
            y: data.hours,
            r: data.count * 3
        });
    });

    const getDeviceChartList = () => {
        dispatch(
            DeviceService.getGrapgActivity(
                {
                    deviceId: _id
                },
                (success: any) => {
                    setChartData(success?.data?.GraphData);
                    setStartData(success?.data);
                    setEndData(success?.data);
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
        getDeviceChartList();
    }, []);

    const data = {
        datasets: [
            {
                label: "クローズ回数",
                data: emptyArray,
                backgroundColor: "#4299e199",
                borderWidth: 1,
                borderColor: "#084577"
            }
        ]
    };

    const options = {
        legend: {
            display: false
        },

        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: 24,
                ticks: {
                    stepSize: 3,
                    callback: function (value: any) {
                        return value + " 時";
                    }
                }
            },
            x: {
                type: "category" as const,
                labels: ["", "月", "火", "水", "木", "金", "土", "日 ", " "],
                max: 8
            }
        },

        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        const dataPoint = context.dataset.data[context.dataIndex];
                        const x = dataPoint.x;
                        const y = dataPoint.y;
                        const r = dataPoint.r / 3;
                        // Customize the tooltip label with the desired data
                        return `${y}時, 回数: ${r}`;
                    }
                }
            }
        }
    };

    return (
        <>
            <Box w={"full"} pt={4}>
                <SimpleGrid gap={{ sm: 4 }} columns={{ sm: 2 }}>
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
                                <Heading
                                    justifyContent={"center"}
                                    alignItems={"center"}
                                    alignContent={"center"}
                                    size="lg"
                                >
                                    {t("device_mgmt.device_details")}
                                </Heading>
                            </CardHeader>
                        </Box>

                        <Box pb={10} px={5}>
                            <Stack divider={<StackDivider />} spacing="4">
                                {deviceData.length > 0 ? (
                                    <>
                                        {deviceData.map((elem: any, index: any) => {
                                            return (
                                                <Box key={index} pt={2}>
                                                    <Grid pb={2} gap={6} rounded={"lg"}>
                                                        <GridItem w="full" boxShadow={"md"} px={4} pt={2} bg="#f4f7fe">
                                                            <Flex py={2}>
                                                                <Text fontWeight={"semibold"} flex={"0.2"}>
                                                                    {"ID"}
                                                                </Text>
                                                                <Text flex={"0.8"} fontSize="md">
                                                                    {elem?.deviceId?._id ?? "--"}
                                                                </Text>
                                                            </Flex>

                                                            <Flex py={2}>
                                                                <Text fontWeight={"semibold"} flex={"0.2"}>
                                                                    {t("auth_header.name")}
                                                                </Text>
                                                                <Text flex={"0.8"} fontSize="md">
                                                                    {elem?.deviceId?.name ?? "--"}
                                                                </Text>
                                                            </Flex>

                                                            <Flex py={2}>
                                                                <Text fontWeight={"semibold"} flex={"0.2"}>
                                                                    {t("device_mgmt.current_value")}
                                                                </Text>
                                                                <Text flex={"0.8"} fontSize="md">
                                                                    {/* {elem?.current_value === 0 ? t("status.open") ? t("status.close") : "--"} */}
                                                                    {elem?.deviceId?.deviceType === "CYLINDER" ? (
                                                                        <>
                                                                            {elem?.current_value === "0"
                                                                                ? t("status.open")
                                                                                : t("status.close")}
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            {elem?.current_value === "0"
                                                                                ? t("status.running")
                                                                                : t("status.stop")}
                                                                        </>
                                                                    )}
                                                                </Text>
                                                            </Flex>

                                                            <Flex py={2}>
                                                                <Text fontWeight={"semibold"} flex={"0.2"}>
                                                                    {t("camera_mgmt.activity_timt")}
                                                                </Text>
                                                                <Text flex={"0.8"} fontSize="md">
                                                                    {elem?.createdAt
                                                                        ? dayjs(elem?.createdAt).format(
                                                                              "YYYY-MM-DD HH:mm"
                                                                          )
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
                            </Stack>
                        </Box>
                    </Card>
                    <Box w={"full"} pt={5}>
                        <Heading
                            fontSize={"2xl"}
                            mb={"5"}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                        >
                            {t("device_mgmt.device_activity_graph")}
                        </Heading>
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                backgroundColor: "white",
                                borderRadius: "md",
                                margin: "auto",
                                paddingRight: "10px",
                                paddingLeft: "10px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                width: "100%",
                                justifyContent: "center",
                                marginTop: "40px"
                            }}
                        >
                            <Bubble data={data} options={options} width={"sm"} />
                        </Box>
                        <Flex display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Text p={3} fontSize="md">
                                {startData?.startOfWeekDate1
                                    ? dayjs(startData?.startOfWeekDate1).format("YYYY/MM/DD")
                                    : "--"}
                            </Text>
                            -
                            <Flex>
                                <Text p={3} fontSize="md">
                                    {endData?.endOfWeekDate ? dayjs(endData?.endOfWeekDate).format("YYYY/MM/DD") : "--"}
                                </Text>
                            </Flex>
                        </Flex>
                    </Box>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default DeviceActivity;
