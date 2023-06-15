import { useEffect, useState } from "react";
import { Box, Flex, FormLabel, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
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
import AddFarmDate from "../../../components/fields/AddFarmDate";
import ReactDatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import dayjs from "dayjs";

interface FarmFormProps {
    value?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    setFieldValue?: any;
}

const AddNews = ({ value }: FarmFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const [newsData, setNewsData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            title: values.title,
            start_date: dayjs(startDate).format("YYYY-MM-DD"),
            content: values.content,
            end_date: dayjs(endDate).format("YYYY-MM-DD")
        };

        dispatch(
            NewsService.addNews(
                {
                    data: data
                },
                (success: any) => {
                    setNewsData(success.data.rows);
                    resetForm();
                    navigate(-1);
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

    const productSchema = yup.object().shape({
        title: yup.string().required(t("messages.title_is_required")),
        content: yup.string().max(1500, t("messages.maximum_1500_words")).required(t("messages.content_is_required"))
        // start_date: yup.string().required(t("messages.start_date_is_required")),
        // end_date: yup.string().required(t("messages.end_date_is_required"))
    });

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
    return (
        <>
            <Box w={"4xl"} bg={"white"} rounded={"lg"} mt={4} pt={4}>
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
                            {t("news.add_news")}
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
                            isMandatory={true}
                        />

                        <Flex w={"full"} borderTop={"1px solid #E0E0E0"} borderBottom={"1px solid #E0E0E0"}>
                            <FormTextArea label={t("news.news_description")} isMandatory={true} />
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

                        <Flex flex={1} fontSize={"sm"} borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
                            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                                {t("news.start_date")}
                                <Text color={"red"} as="span">
                                    *
                                </Text>
                            </FormLabel>
                            <Box ps={3} w={"lg"}>
                                <ReactDatePicker
                                    className={`custom ${
                                        touched.start_date && !startDate
                                            ? // (touched.contractEndDate && !contractEndDate)
                                              "border-red"
                                            : ""
                                    }`}
                                    dateFormat="yyyy/MM/dd"
                                    selected={startDate}
                                    locale={ja}
                                    placeholderText={String(t(""))}
                                    onChange={(dates: any) => {
                                        const start = dates;
                                        setStartDate(start);
                                    }}
                                    onChangeRaw={() => {
                                        setFieldValue("start_date", dayjs(startDate).format("YYYY/MM/DD"));
                                    }}
                                    startDate={new Date()}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    // todayButton={t("common.today")}
                                    showPopperArrow={false}
                                />
                                {touched.start_date && !startDate ? (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {t("messages.start_date_is_required")}
                                    </Text>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Flex>

                        <Flex flex={1} fontSize={"sm"} borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
                            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                                {t("news.end_date")}
                                <Text color={"red"} as="span">
                                    *
                                </Text>
                            </FormLabel>
                            <Box ps={3} w={"lg"}>
                                <ReactDatePicker
                                    className={`custom ${
                                        touched.start_date && !endDate
                                            ? // (touched.contractEndDate && !contractEndDate)
                                              "border-red"
                                            : ""
                                    }`}
                                    dateFormat="yyyy/MM/dd"
                                    selected={endDate}
                                    locale={ja}
                                    placeholderText={String(t(""))}
                                    onChange={(dates: any) => {
                                        const start = dates;
                                        setEndDate(start);
                                    }}
                                    onChangeRaw={() => {
                                        setFieldValue("end_date", dayjs(endDate).format("YYYY/MM/DD"));
                                    }}
                                    startDate={new Date()}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    // todayButton={t("common.today")}
                                    showPopperArrow={false}
                                />
                                {touched.end_date && !endDate ? (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {t("messages.end_date_is_required")}
                                    </Text>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Flex>

                        <SaveButton isLoading={isLoading} title={t("farm_mgmt.save")} />
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default AddNews;
