import { useEffect, useState } from "react";
import { Box, Divider, Flex, FormLabel, Heading, Stack, useToast } from "@chakra-ui/react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/form/FormInput";
import SaveButton from "../../../components/button/SaveButton";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useDispatch } from "react-redux";
import NewsService from "../../../services/NewsService";
import FormTextArea from "../../../components/form/FormTextArea";
import LabelTextField from "../../../components/form/LabelTextField";
import dayjs from "dayjs";
import EditInputField from "../../../components/fields/EditInputField";
import DatePickerCustom from "../../../components/fields/DatePickerCustom";
import ReactDatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";

interface FarmFormProps {
    value?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    setFieldValue?: any;
}

const EditNews = ({ value }: FarmFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const params = useParams();
    const [newsData, setNewsData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [newsStartDateDate, setStartDateDate] = useState<Date | null>(null);
    const [newsEndDateDate, setEndDateDate] = useState<Date | null>(null);
    const [rangOfEndDate, setrangOfEndDate] = useState<Date | null>(null);

    const getNewsList = () => {
        dispatch(
            NewsService.getNews(
                {
                    newsId: params._id
                },

                (success: any) => {
                    const news = success.data.rows[0];
                    setrangOfEndDate(news?.end_date);
                    setFieldValue("title", news?.title);
                    setFieldValue("content", news?.content);
                    setFieldValue("start_date", dayjs(news?.start_date).format("YYYY/MM/DD "));
                    setFieldValue("end_date", dayjs(news?.end_date).format("YYYY/MM/DD "));

                    setNewsData(news);
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

    const productSchema = yup.object().shape({
        title: yup.string().required(t("messages.title_is_required")),
        content: yup.string().max(1500, t("messages.maximum_1500_words")).required(t("messages.content_is_required")),
        start_date: yup.string().required(t("messages.start_date_is_required")),
        end_date: yup.string().required(t("messages.end_date_is_required"))
    });

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            title: values.title,
            start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
            content: values.content,
            end_date: dayjs(values.end_date).format("YYYY-MM-DD")
        };
        dispatch(
            NewsService.updateNews(
                { _id: params._id, data },
                (responseData: any) => {
                    toast({
                        title: responseData?.message ?? "--",
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    navigate(`/news-view/${newsData._id}`);
                    setIsLoading(false);
                },
                (errorData: any) => {
                    setIsLoading(false);
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

    const {
        values,
        handleChange,
        handleBlur,
        setFieldTouched,
        setFieldValue,
        resetForm,
        errors,
        touched,
        handleSubmit
    } = useFormik({
        initialValues: {
            title: "",
            content: "",
            start_date: "",
            end_date: ""
        },
        onSubmit,
        validationSchema: productSchema
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getNewsList();
    }, []);

    return (
        <>
            <Box w={"4xl"} pt={4} bg={"white"} rounded={"lg"} mt={4}>
                <Box my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                    <Stack position={"absolute"} mx={5}>
                        <ReturnButton />
                    </Stack>
                    <Box
                        p={0}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        width="full"
                    >
                        <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                            {t("news.edit_news")}
                        </Heading>
                    </Box>
                </Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Flex px={5} flexDir={"column"} w={"full"} mt={7}>
                        <FormInput
                            name="title"
                            Type="text"
                            values={values.title}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.title}
                            touched={touched.title}
                            label={t("news.news_title")}
                            isMandatory={false}
                        />

                        <Flex w={"full"} borderTop={"1px solid #E0E0E0"} borderBottom={"1px solid #E0E0E0"}>
                            <FormTextArea label={t("news.news_description")} isMandatory={false} />
                            <LabelTextField
                                name="content"
                                value={values.content}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.content}
                                touched={touched.content}
                                isMandatory={false}
                                style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                            />
                        </Flex>

                        <Flex flex={1} fontSize={"sm"} borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
                            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                                {t("news.start_date")}
                            </FormLabel>
                            <Box ps={3} w={"lg"}>
                                <ReactDatePicker
                                    className={`custom ${touched.start_date && !newsStartDateDate}`}
                                    locale={ja}
                                    name="start_date"
                                    placeholderText={String(t(""))}
                                    onChange={(date: any) => {
                                        setFieldValue("start_date", dayjs(date).format("YYYY/MM/DD"));
                                    }}
                                    dateFormat={"yyyy/MM/dd"}
                                    value={values.start_date}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    showPopperArrow={false}
                                />
                                {/* {touched.contractStartDate && !contractStartDateDate ? (
                                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                    {t("messages.register_date_is_required")}
                                </Text>
                            ) : (
                                ""
                            )} */}
                            </Box>
                        </Flex>

                        <Flex flex={1} fontSize={"sm"} borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
                            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                                {t("news.end_date")}
                            </FormLabel>
                            <Box ps={3} w={"lg"}>
                                <ReactDatePicker
                                    className={`custom ${touched.end_date && !newsEndDateDate}`}
                                    locale={ja}
                                    name="end_date"
                                    placeholderText={String(t(""))}
                                    minDate={rangOfEndDate ? new Date(rangOfEndDate) : null}
                                    onChange={(date: any) => {
                                        setStartDateDate(null);
                                        setFieldValue(
                                            "end_date",
                                            dayjs(date).format("YYYY/MM/DD") ? dayjs(date).format("YYYY/MM/DD") : "--"
                                        );
                                    }}
                                    dateFormat={"yyyy/MM/dd"}
                                    value={values.end_date}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    showPopperArrow={false}
                                />
                                {/* {touched.contractStartDate && !contractStartDateDate ? (
                                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                    {t("messages.register_date_is_required")}
                                </Text>
                            ) : (
                                ""
                            )} */}
                            </Box>
                        </Flex>

                        <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default EditNews;
