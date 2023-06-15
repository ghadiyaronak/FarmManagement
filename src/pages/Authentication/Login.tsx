import { Flex, Box, Checkbox, Stack, Button, Text, useToast, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

//  redux
import { useDispatch, useSelector } from "react-redux";

//
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";

// service helper
import AuthService from "../../services/AuthService";

// components
import CustomInputField from "../../components/fields/CustomInputField";
import CustomPasswordField from "../../components/fields/CustomPasswordField";
import { globalStyles } from "../../theme/styles";
import TokenService from "../../services/TokenService";
import CustomAuth from "../../components/fields/CustomAuth";

const Login = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage?.getItem("user") as string) || null;
    const toast = useToast();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<any>(false);

    // submit handler
    const onSubmit = async (values: any, actions: any) => {
        setIsLoading(true);
        dispatch(
            AuthService.auth(
                { data: { email: values.email, password: values.password } },
                (responseData: any) => {
                    toast({
                        title: responseData.message ? responseData.message : responseData?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });

                    TokenService.setUser(responseData?.data);
                    navigate("/home");
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

    // form validate

    const loginSchema = yup.object().shape({
        email: yup.string().email(t("form_errors.invalid_email")).max(255).required(t("form_errors.required_fields")),
        password: yup
            .string()
            .min(6, t("form_errors.password_minimum_characters"))
            .max(255)
            .required(t("form_errors.required_fields"))
    });

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: "",
            password: ""
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
                    {t("heading")}
                </Text>
            </Box>

            {/* form  */}

            <Box rounded="lg" bg={"white"} boxShadow="lg" p={8} width="sm">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack spacing={4}>
                        <CustomAuth
                            label={t("login.email")}
                            name="email"
                            type="email"
                            value={values.email}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                        />

                        <CustomPasswordField
                            label={t("login.password")}
                            name="password"
                            value={values.password}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.password}
                            touched={touched.password}
                        />

                        <Stack spacing={10}>
                            <Button
                                bgColor={globalStyles.colors.btn.blue}
                                type={"submit"}
                                isLoading={isLoading}
                                disabled={isSubmitting}
                                color="white"
                            >
                                {t("login.login")}
                            </Button>
                        </Stack>
                    </Stack>
                </form>
            </Box>
        </Flex>
    );
};

export default Login;
