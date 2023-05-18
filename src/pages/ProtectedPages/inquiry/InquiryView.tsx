import {
    Box,
    Card,
    CardBody,
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
import ReturnButton from "../../../components/fields/ReturnButton";
import { useTranslation } from "react-i18next";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import { useNavigate, useParams } from "react-router-dom";
import InquireService from "../../../services/InquireService";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

const InquiryView = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const navigate = useNavigate();
    const { _id } = useParams();
    const dispatch = useDispatch();
    const [inquiryData, setinquiryData] = useState<any>([]);

    const getInquiryList = () => {
        dispatch(
            InquireService.getInquiry(
                {
                    inquiryId: _id
                },
                (success: any) => {
                    setinquiryData(success.data.rows[0]);
                },
                (errorData: any) => {
                    toast({
                        title: errorData?.message ? errorData?.message : errorData.response?.data?.message,
                        status: "error",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                }
            )
        );
    };

    useEffect(() => {
        getInquiryList();
    }, []);

    return (
        <>
            <Box w={"4xl"} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton link={"/inquiry-management"} />
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
                                {t("inquiry_mgmt.inquiry_details")}
                            </Heading>

                            <Box position={"absolute"} right={"0"} top={"-3"}>
                                <HeadingButtonRight path={`/inquiry-edit/${inquiryData?._id}`} />
                            </Box>
                        </CardHeader>
                    </Box>

                    <CardBody>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("inquiry_mgmt.inquiry_id")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?._id ? inquiryData?._id : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("inquiry_mgmt.user_name")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?.user ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("farm_mgmt.farm_name")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?.farm ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("inquiry_mgmt.inquiry_title")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?.title ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("inquiry_mgmt.inquiry_description")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?.description ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("inquiry_mgmt.date_time")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {inquiryData?.dateOfContact
                                        ? dayjs(inquiryData?.dateOfContact).format("YYYY/MM/DD")
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
                                    {/* {inquiryData?.status ?? "--"} */}
                                    {inquiryData?.status === "CONFIRMED"
                                        ? t("status.confirming")
                                        : inquiryData?.status === "UNCONFIRMED"
                                        ? t("status.unconfirmed")
                                        : t("status.completed")}
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
                                    {inquiryData?.memo ? inquiryData?.memo : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                    </CardBody>
                </Card>
            </Box>
        </>
    );
};

export default InquiryView;
