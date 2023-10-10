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

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            title: values.title,
            start_date: dayjs(values.start_date).format("YYYY-MM-DD"),
            content: values.content,
            end_date: dayjs(values.end_date).format("YYYY-MM-DD")
        };

        dispatch(
            NewsService.addNews(
                {
                    data: data
                },
                (success: any) => {
                    toast({
                        title: success.message ? success.message : success?.data?.message,
                        status: "success",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
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
        content: yup.string().max(1500, t("messages.maximum_1500_words")).required(t("messages.content_is_required")),
        start_date: yup.string().required(t("messages.start_date_is_required")).nullable(),
        end_date: yup.string().required(t("messages.end_date_is_required")).nullable()
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
            start_date: null,
            end_date: null
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
                                    className={`custom ${touched.start_date && !values.start_date ? "border-red" : ""}`}
                                    dateFormat="yyyy/MM/dd"
                                    selected={values.start_date}
                                    locale={ja}
                                    placeholderText={String(t(""))}
                                    onChange={(date: any) => {
                                        setFieldValue("start_date", date);
                                    }}
                                    onChangeRaw={() => {
                                        setFieldTouched("start_date", true, true);
                                    }}
                                    startDate={new Date()}
                                    maxDate={values.end_date ?? null}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    showPopperArrow={false}
                                />
                                {touched.start_date && errors.start_date && (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {t("messages.start_date_is_required")}
                                    </Text>
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
                                    className={`custom ${touched.end_date && errors.end_date ? "border-red" : ""}`}
                                    dateFormat="yyyy/MM/dd"
                                    selected={values.end_date}
                                    locale={ja}
                                    placeholderText={String(t(""))}
                                    minDate={values.start_date ?? null}
                                    onChange={(date: any) => {
                                        setFieldValue("end_date", date);
                                    }}
                                    onChangeRaw={() => {
                                        setFieldTouched("end_date", true, true);
                                    }}
                                    startDate={new Date()}
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    showPopperArrow={false}
                                />
                                {touched.end_date && errors.end_date && (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {t("messages.end_date_is_required")}
                                    </Text>
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
