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
import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useTranslation } from "react-i18next";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import { globalStyles } from "../../../theme/styles";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import NewsService from "../../../services/NewsService";
import dayjs from "dayjs";

const NewsView = () => {
    const { t } = useTranslation();
    const toast = useToast();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [newsData, setNewsData] = useState<any>([]);

    const getNewsList = () => {
        dispatch(
            NewsService.getNews(
                {
                    newsId: params._id
                },
                (success: any) => {
                    setNewsData(success.data.rows[0]);
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
        getNewsList();
    }, []);

    return (
        <>
            <Box w={"4xl"} width={{ base: "full", md: "4xl" }} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton link={"/news-management"} />
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
                                {t("news.news_view")}
                            </Heading>

                            <Box position={"absolute"} right={"0"} top={"-2"}>
                                <HeadingButtonRight path={`/edit-news/${newsData._id}`} />
                            </Box>
                        </CardHeader>
                    </Box>

                    <Box pb={10} px={5}>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading
                                    flex={"0.3"}
                                    w={"72"}
                                    p={3}
                                    bg={"#f9fafa"}
                                    pl={12}
                                    fontSize={19}
                                    textTransform="capitalize"
                                >
                                    {t("news.news_id")}
                                </Heading>
                                <Text p={3} flex={"0.7"} fontSize="md">
                                    {newsData?._id ? newsData?._id : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex flex={0.2}>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("news.news_title")}
                                </Heading>
                                <Text p={3} flex={"0.2"} fontSize="md">
                                    {newsData?.title ? newsData?.title : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />

                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading
                                    w={"72"}
                                    flex={"0.3"}
                                    p={3}
                                    bg={"#f9fafa"}
                                    pl={12}
                                    fontSize={19}
                                    textTransform="capitalize"
                                >
                                    {t("news.news_description")}
                                </Heading>
                                <Text whiteSpace={"pre-line"} p={3} flex={"0.7"} fontSize="md">
                                    {newsData?.content ?? "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading
                                    w={"72"}
                                    flex={"0.3"}
                                    p={3}
                                    bg={"#f9fafa"}
                                    pl={12}
                                    fontSize={19}
                                    textTransform="capitalize"
                                >
                                    {t("news.start_date")}
                                </Heading>
                                <Text p={3} flex={"0.7"} fontSize="md">
                                    {newsData?.start_date ? dayjs(newsData?.start_date).format("YYYY/MM/DD") : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading
                                    w={"72"}
                                    flex={"0.3"}
                                    p={3}
                                    bg={"#f9fafa"}
                                    pl={12}
                                    fontSize={19}
                                    textTransform="capitalize"
                                >
                                    {t("news.end_date")}
                                </Heading>
                                <Text p={3} flex={"0.7"} fontSize="md">
                                    {newsData?.end_date ? dayjs(newsData?.end_date).format("YYYY/MM/DD") : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                    </Box>
                </Card>
            </Box>
        </>
    );
};

export default NewsView;
