import { useEffect, useState } from "react";
import { Box, Divider, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
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

    const getNewsList = () => {
        dispatch(
            NewsService.getNews(
                {
                    newsId: params._id
                },

                (success: any) => {
                    const news = success.data.rows[0];
                    setFieldValue("title", news?.title);
                    setFieldValue("content", news?.content);
                    setFieldValue("startDate", news?.startDate);
                    setFieldValue("endDate", news?.endDate);

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

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            title: values.title,
            startDate: values.startDate,
            content: values.content,
            endDate: values.endDate
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
                    navigate(`/news-view/${newsData.id}`);
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
            startDate: "",
            endDate: ""
        },
        onSubmit
    });

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

                        <EditInputField
                            label={t("news.start_date")}
                            name={"startDate"}
                            type={"date"}
                            value={dayjs(values?.startDate).format("YYYY-MM-DD")}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.startDate}
                            touched={touched.startDate}
                        />
                        <Divider />
                        <Divider />

                        <EditInputField
                            label={t("news.end_date")}
                            name={"endDate"}
                            type={"date"}
                            value={dayjs(values?.endDate).format("YYYY-MM-DD")}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.endDate}
                            touched={touched.endDate}
                        />

                        <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default EditNews;
