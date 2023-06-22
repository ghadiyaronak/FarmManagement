import {
    Box,
    Button,
    Flex,
    GlobalStyle,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainHeading from "../../../components/menu/MainHeading";
import { useNavigate, useParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import { useTranslation } from "react-i18next";
import InputSelect from "../../../components/select/InputSelect";
import ReactDatePicker from "react-datepicker";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import DataTableComponent from "../../../components/Table/DataTable";
import { useFormik } from "formik";
import { AiOutlineDelete } from "react-icons/ai";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import NewsService from "../../../services/NewsService";
import ja from "date-fns/locale/ja";

const NewsManagement = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<any>(false);
    const dispatch = useDispatch();
    const [newsData, setNewsData] = useState<any>([]);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const today = new Date();
    const { param } = useParams();
    const [endDate, setEndDate] = useState(today);
    const [filterData, setFilterData] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [deleteData, setDeleteData] = useState<any>([]);

    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    function handleClick() {
        navigate("/add-news");
    }

    function handleNews(row: any) {
        navigate(`/news-view/${row._id}`);
    }

    const handleReset = () => {
        setNewsData([]);
        setFieldValue("start_date", null);
        setFieldValue("end_date", null);
        getNewsList(true);
        resetForm();
    };

    const handleDelete = () => {
        setIsLoading(true);
        dispatch(
            NewsService.deleteNews(
                {
                    id: deleteData
                },
                (success: any) => {
                    getNewsList(true);
                    toast({
                        title: success.message ? success.message : success?.data?.message,
                        status: "success",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setIsLoading(false);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                    setIsLoading(false);
                }
            )
        );
    };
    const column = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("news.news_title")}</Text>,
            selector: (row: any) => row?.title,
            cell: (row: any) => {
                return (
                    <Box onClick={() => navigate(`/news-view/${row._id}`, { state: row })}>
                        <Text fontWeight={"normal"} cursor={"pointer"}>
                            {row.title ?? "--"}
                        </Text>
                    </Box>
                );
            },
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("news.start_date")}</Text>,
            selector: (row: any) => row?.start_date,
            cell: (row: any) => <Text>{row?.start_date ? dayjs(row?.start_date).format("YYYY/MM/DD") : "--"}</Text>,
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("news.end_date")}</Text>,
            selector: (row: any) => row?.end_date,
            cell: (row: any) => <Text>{row?.end_date ? dayjs(row?.end_date).format("YYYY/MM/DD") : "--"}</Text>,
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 4,
            selector: (row: any) => row?.Action,
            name: (
                <Text display="flex" justifyContent="center" alignItems={"center"} fontWeight={"bold"}>
                    {t("common.delete")}
                </Text>
            ),

            cell: (row: any) => (
                <Box display={"flex"} fontSize="24" cursor={"pointer"} onClick={() => setDeleteData(row._id)}>
                    <AiOutlineDelete
                        // onClick={() => {
                        //     handleDelete(row);
                        // }}
                        onClick={onOpen}
                    />
                </Box>
            ),
            width: "150px"
        }
    ];

    const handleSearchData = () => {
        getNewsList(false);
    };

    const { values, handleChange, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty, touched } = useFormik(
        {
            initialValues: {
                title: "",
                start_date: undefined,
                end_date: undefined
            },
            onSubmit: handleSearchData
        }
    );

    const getNewsList = (isReset: boolean) => {
        setIsLoading(true);
        if (!isReset) {
            const title = values.title;
            const startDate = values.start_date;
            let formattedStartDate = "";
            if (startDate) {
                formattedStartDate = dayjs(startDate).format("YYYY-MM-DD");
            }
            const endDate = values.end_date;
            let formattedEndDate = "";
            if (endDate) {
                formattedEndDate = dayjs(endDate).format("YYYY-MM-DD");
            }

            dispatch(
                NewsService.getNews(
                    {
                        title: title ?? undefined,
                        start_date: formattedStartDate ?? undefined,
                        end_date: formattedEndDate ?? undefined,
                        limit: 5000
                    },
                    (success: any) => {
                        setNewsData(success.data.rows);
                        setIsLoading(false);
                    },
                    (errorData: any) => {
                        setIsLoading(false);
                    }
                )
            );
        } else {
            dispatch(
                NewsService.getNews(
                    {},
                    (success: any) => {
                        setNewsData(success.data.rows);

                        setIsLoading(false);
                    },
                    (errorData: any) => {
                        setIsLoading(false);
                    }
                )
            );
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getNewsList(false);
    }, []);

    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("News")} />
                <Button
                    size={"sm"}
                    rounded={"md"}
                    w={32}
                    onClick={handleClick}
                    bgColor={globalStyles.colors.btn.blue}
                    color={"white"}
                    _hover={{ bgColor: "blue.300" }}
                >
                    + {t("news.add_news")}
                </Button>
            </Flex>

            <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    {t("common.search_condition")}
                </Text>
                <Flex gap={5} w={"full"}>
                    <Flex flexDir={"column"} mt={3} gap={3} w={"sm"}>
                        <InputSelect
                            label={t("news.news_title")}
                            value={values.title}
                            handleChange={handleChange}
                            name={"title"}
                            type="text"
                        />

                        <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontSize={14}>{t("news.start_date")}</Text>
                            <Box>
                                <ReactDatePicker
                                    dateFormat="yyyy/MM/dd"
                                    className="form-date"
                                    locale={ja}
                                    selected={values.start_date}
                                    // minDate={new Date()}
                                    onChange={(date: any) => {
                                        setFieldValue("start_date", date);
                                    }}
                                />
                            </Box>
                        </Flex>

                        <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontSize={14}>{t("news.end_date")}</Text>
                            <Box>
                                <ReactDatePicker
                                    dateFormat="yyyy/MM/dd"
                                    className="form-date"
                                    locale={ja}
                                    selected={values.end_date}
                                    // minDate={new Date()}
                                    onChange={(date: any) => {
                                        setFieldValue("end_date", date);
                                    }}
                                />
                            </Box>
                        </Flex>
                    </Flex>

                    <Box w={"0.5px"} h={"32"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={3} mb={2} flexDir={"column"} ml={4}>
                        <Box w="36"></Box>
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty && disableReset} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>

            <Box rounded={"lg"} bgColor={"white"} px={5}>
                <DataTableComponent handleSubmit={handleNews} column={column} data={newsData} />
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("news.delete_news")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {t("messages.news_delete_confirm")}
                    </ModalBody>

                    <ModalFooter display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Button
                            _hover={{ bgColor: "blue.300" }}
                            bgColor={globalStyles.colors.mainColor}
                            variant="ghost"
                            color={"white"}
                            mr={3}
                            onClick={onClose}
                        >
                            {t("status.cancel")}
                        </Button>
                        <Box onClick={onClose}>
                            <Button
                                _hover={{ bgColor: "red.300" }}
                                onClick={handleDelete}
                                isLoading={isLoading}
                                bgColor={"red.500"}
                                color={"white"}
                                variant="ghost"
                            >
                                {t("common.delete")}
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default NewsManagement;
