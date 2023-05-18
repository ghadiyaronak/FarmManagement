import { Box, Heading, Stack, Flex, Divider, Text, Button, StackDivider, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import FarmStatusSelect from "../../../components/form/FarmStatusSelect";
import FormFildLabel from "../../../components/form/FormLabel";
import CustomTextArea from "../../../components/form/CustomTextArea";
import SaveButton from "../../../components/button/SaveButton";
import { useFormik } from "formik";
import * as yup from "yup";
import config from "../../../utils/config";
import { useDispatch } from "react-redux";
import InquireService from "../../../services/InquireService";
import dayjs from "dayjs";

const InquiryEdit = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [inquiryData, setinquiryData] = useState<any>([]);

    const getInquiryList = () => {
        dispatch(
            InquireService.getInquiry(
                {
                    inquiryId: params._id
                },

                (success: any) => {
                    const inquiry = success.data.rows[0];
                    setFieldValue("_id", inquiry?._id);
                    setFieldValue("userName", inquiry?.userName?.user_name);
                    setFieldValue("farmName", inquiry?.farmName?.farm_name);
                    setFieldValue("title", inquiry?.title);
                    setFieldValue("description", inquiry?.description);
                    setFieldValue("dateOfContact", dayjs(inquiry?.dateOfContact).format("YYYY/MM/DD hh:mm:ss"));
                    setFieldValue("memo", inquiry?.memo);
                    setFieldValue("status", inquiry?.status);
                    setFieldValue("status", {
                        label: inquiry?.status === "UNCONFIRMED" ? "未確認 " : "CONFIRMED" ? "確認中" : "対応完了 ",
                        value: inquiry?.status
                    });
                    setinquiryData(inquiry);
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

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            _id: values._id,
            userName: values.userName,
            farmName: values.farmName,
            title: values.title,
            description: values.description,
            dateOfContact: values.dateOfContact,
            memo: values.memo,
            status: values.status.value
        };
        dispatch(
            InquireService.updateInquiry(
                { _id: params._id, data },
                (responseData: any) => {
                    toast({
                        title: responseData?.message ? responseData?.message : "--",
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    setIsLoading(false);
                    setTimeout(() => {
                        navigate(`/inquiry-view/${params._id}`);
                    }, 2000);
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
                    setIsLoading(false);
                }
            )
        );
    };
    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        resetForm,
        errors,
        touched
    } = useFormik({
        initialValues: {
            _id: "",
            userName: "",
            farmName: "",
            title: "",
            description: "",
            dateOfContact: "",
            memo: "",
            status: {
                lable: "",
                value: ""
            }
        },
        onSubmit
    });

    useEffect(() => {
        getInquiryList();
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
                            {"Inquiry Edit"}
                        </Heading>
                    </Box>
                </Box>
                <Flex flexDir={"column"} w={"full"} px={5} mt={7}>
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

                    <FarmStatusSelect
                        touched={touched.status}
                        error={errors.status}
                        isMandatory={false}
                        value={values.status}
                        label={t("common.status")}
                        onChange={setFieldValue}
                        options={config.INQUIRY_STATUS}
                        name="status"
                        multi={false}
                        onBlur={handleBlur}
                    />
                    <Divider />

                    <Flex w={"full"}>
                        <FormFildLabel label={t("farm_mgmt.memo")} isMandatory={false} />
                        <CustomTextArea
                            name="memo"
                            value={values.memo}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.memo}
                            touched={touched.memo}
                            isMandatory={false}
                            style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                        />
                    </Flex>
                    <Divider />
                    <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                </Flex>
            </Box>
        </>
    );
};

export default InquiryEdit;
