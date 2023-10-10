import { Box, Button, Flex, Image, Link, Stack, Text, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomAuth from "../../components/fields/CustomAuth";
import { globalStyles } from "../../theme/styles";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FarmServices from "../../services/FarmServices";

const SubmitForm = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<any>(false);

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            email: values.email
        };

        dispatch(
            FarmServices.submitEmail(
                {
                    data: data
                },
                (success: any) => {
                    toast({
                        title: success?.message ? success?.message : success.response?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    resetForm();
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

    const loginSchema = yup.object().shape({
        email: yup.string().email("Please enter a valid email address").max(255).required("Required Fields")
    });

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, resetForm, handleSubmit } = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: loginSchema,
        onSubmit
    });

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <Box mt={5} flexDir={"column"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Box h={"32"} w={"20"} mb={"-8"} mt={"2"}>
                    <Image rounded={"sm"} src="./loginLOGO.png" />
                </Box>
                <Text fontSize="3xl" fontWeight="bold" my={5}>
                    Data removel request
                </Text>
            </Box>

            {/* form  */}

            <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="sm">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={4}>
                        <CustomAuth
                            label={"Enter your registered email"}
                            name="email"
                            type="email"
                            value={values.email}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <Stack spacing={10}>
                            <Button
                                bgColor={globalStyles.colors.btn.blue}
                                type={"submit"}
                                isLoading={isLoading}
                                disabled={isSubmitting}
                                color="white"
                            >
                                {t("Submit")}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
};

export default SubmitForm;
