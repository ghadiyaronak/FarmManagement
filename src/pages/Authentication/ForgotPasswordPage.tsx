import { useState } from "react";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Text,
    useToast,
    useColorModeValue,
    FormErrorMessage,
    Image
} from "@chakra-ui/react";

// services
import AuthService from "../../services/AuthService";

import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Formik } from "formik";
import { ForgotPasswordSchema } from "../../validation/login.validation";

import LoginButton from "../../components/button/LoginButton";
import AdminHeader from "../../components/header/AdminHeader";
import CustomInputLogin from "../../components/form/CustomInputLogin";
import MainLoader from "../../components/loader/MainLoader";

interface IForm {
    email: string;
}

const ForgotPasswordPage = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useDispatch();
    const toast = useToast();
    const [form, setForm] = useState<IForm>({ email: "" });

    const handleSubmit = (param: any) => {
        setIsLoading(true);
        dispatch(
            AuthService.ForgotPassword(
                { data: { email: param.email } },
                (responseData: any) => {
                    setIsLoading(false);
                    toast({
                        title: responseData?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    setForm({ email: "" });
                    navigate("/login");
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

    return (
        <Flex align="center" mt={5} flexDir={"column"}>
            <AdminHeader />

            {isLoading ? (
                <Flex minH={"70vh"} w="full" alignItems={"center"} justifyContent={"center"}>
                    <MainLoader />
                </Flex>
            ) : (
                <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="md">
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            email: form.email
                        }}
                        validationSchema={ForgotPasswordSchema(t)}
                        onSubmit={(values, { setSubmitting }) => {
                            handleSubmit(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ handleBlur, handleChange, handleSubmit, errors, touched, values }: any) => (
                            <Box rounded={"lg"} as="form" onSubmit={handleSubmit} w={"full"} maxW={"md"}>
                                <Stack spacing={4}>
                                    <Text fontWeight="bold">{t("login.forgot_password")}?</Text>

                                    <Text
                                        fontSize={{ base: "sm", sm: "md" }}
                                        color={useColorModeValue("gray.800", "gray.400")}
                                    >
                                        {t("login.get_an_email")}
                                    </Text>

                                    <CustomInputLogin
                                        label={String(t("login.email"))}
                                        name="email"
                                        Type="email"
                                        values={values.email}
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        errors={errors.email}
                                        touched={touched.email}
                                        isMandatory={true}
                                    />
                                    {/* </FormControl> */}

                                    <Stack spacing={6}>
                                        <Stack
                                            direction={{ base: "column", sm: "row" }}
                                            align="start"
                                            justify="space-between"
                                        >
                                            {/* <Link color="blue.400" textDecoration="none" onClick={() => navigate("/login")}>
                                    {t("login.back")}
                                </Link> */}
                                        </Stack>

                                        <LoginButton label={"login.request_reset"} />
                                    </Stack>
                                </Stack>
                            </Box>
                        )}
                    </Formik>
                </Box>
            )}
        </Flex>
    );
};

export default ForgotPasswordPage;
