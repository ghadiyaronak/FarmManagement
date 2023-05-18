import {
    Box,
    Card,
    CardHeader,
    Divider,
    Flex,
    Heading,
    SimpleGrid,
    Stack,
    StackDivider,
    Text,
    useToast
} from "@chakra-ui/react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ReturnButton from "../../../components/fields/ReturnButton";
import DeviceService from "../../../services/DeviceService";
import dayjs from "dayjs";
import { id } from "date-fns/locale";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    plugins: {
        title: {
            display: true
            // text: "Chart.js Bar Chart - Stacked"
        }
    },
    responsive: true,
    interaction: {
        // mode: "index" as const
        // intersect: false
    },
    scales: {
        x: {
            stacked: true
        },
        y: {
            stacked: true
        }
    }
};

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const data = {
    labels,
    datasets: [
        {
            label: "OPEN",
            data: labels.map(() => faker.datatype.number({ min: 2, max: 5 })),
            backgroundColor: "rgb(75, 192, 192)",
            stack: "Stack 0"
        },
        {
            label: "CLOSE",
            data: labels.map(() => faker.datatype.number({ min: 1, max: 7 })),
            backgroundColor: "rgb(53, 162, 235)",
            stack: "Stack 1"
        }
    ]
};

const DeviceActivity = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState<any>([]);
    console.log(_id);

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

    useEffect(() => {
        getDeviceList();
    }, []);
    return (
        <>
            <Box pt={4}>
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
                            <Divider />
                            <Stack divider={<StackDivider />} spacing="4">
                                <Flex>
                                    <Heading
                                        w={"full"}
                                        p={4}
                                        bg={"#f9fafa"}
                                        textAlign={"center"}
                                        fontSize={19}
                                        textTransform="capitalize"
                                    >
                                        The Automatic OPEN/CLOSE box has been
                                    </Heading>
                                </Flex>
                            </Stack>
                            <Divider />

                            <Stack divider={<StackDivider />} spacing="4">
                                {deviceData.length > 0 ? (
                                    <>
                                        {deviceData.map((elem: any, index: any) => {
                                            return (
                                                <Flex h={"16"}>
                                                    <Heading
                                                        w={60}
                                                        p={3}
                                                        // bg={"#f9fafa"}
                                                        pl={12}
                                                        fontSize={19}
                                                        textTransform="capitalize"
                                                    >
                                                        {elem?.current_value === "OPEN"
                                                            ? t("status.open")
                                                            : t("status.close")}
                                                    </Heading>
                                                    <Text p={3} ml={5} fontSize="md">
                                                        {elem?.createdAt
                                                            ? dayjs(elem?.createdAt).format("YYYY/MM/DD HH:MM")
                                                            : "--"}
                                                    </Text>
                                                </Flex>
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
                    <Box>
                        <Box
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                width: "500px",
                                margin: "auto",
                                justifyContent: "center",
                                marginTop: "40px"
                            }}
                        >
                            <Bar options={options} data={data} />;
                        </Box>
                    </Box>
                </SimpleGrid>
            </Box>
        </>
    );
};

export default DeviceActivity;
