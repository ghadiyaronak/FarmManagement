import { useState } from "react";
import { Box, Flex, Heading, Stack, useToast } from "@chakra-ui/react";
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
            start_date: values.start_date,
            content: values.content,
            end_date: values.end_date
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
        content: yup.string().max(1000, "Maximum 1000 Words").required(t("messages.content_is_required")),
        start_date: yup.string().required(t("messages.start_date_is_required")),
        end_date: yup.string().required(t("messages.end_date_is_required"))
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

                        <AddFarmDate
                            label={t("news.start_date")}
                            name={"start_date"}
                            type={"date"}
                            value={values.start_date}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.start_date}
                            touched={touched.start_date}
                            isMandatory={true}
                        />

                        <AddFarmDate
                            label={t("news.end_date")}
                            name={"end_date"}
                            type={"date"}
                            value={values.end_date}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.end_date}
                            touched={touched.end_date}
                            isMandatory={true}
                        />

                        <SaveButton isLoading={isLoading} title={t("farm_mgmt.save")} />
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default AddNews;
