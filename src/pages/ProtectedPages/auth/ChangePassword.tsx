import {
    Flex,
    Box,
    Checkbox,
    Stack,
    Button,
    Text,
    useColorModeValue,
    useToast,
    FormControl,
    FormLabel,
    Input
} from "@chakra-ui/react";
import { useState } from "react";

//  redux
import { useDispatch } from "react-redux";

//
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";
import CustomPasswordField from "../../../components/fields/CustomPasswordField";
import { globalStyles } from "../../../theme/styles";
import AuthService from "../../../services/AuthService";
import TokenService from "../../../services/TokenService";

// service helper
// import AuthService from "../../services/AuthService";

// Icon
// import { PasswordHidden, PasswordVisible } from "../../utils/icons";

const ChangePassword = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const onSubmit = async (values: any, actions: any) => {
        dispatch(
            AuthService.changePassword(
                {
                    new_password: values.new_password,
                    old_password: values.old_password,
                    confirm_password: values.confirm_password
                },
                (responseData: any) => {
                    toast({
                        title: responseData?.message ? responseData?.message : responseData.response?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });

                    TokenService.removeUser();
                    navigate("/login");
                    actions.resetForm();
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

    const loginSchema = yup.object().shape({
        old_password: yup
            .string()
            .min(6, t("form_errors.password_minimum_characters"))
            .required(t("form_errors.required_fields")),
        new_password: yup
            .string()
            .min(6, t("form_errors.password_minimum_characters"))
            .max(255)
            .required(t("form_errors.required_fields")),
        confirm_password: yup.string().oneOf([yup.ref("new_password"), null], "Passwords must match")
        // .required(t("form_errors.required_fields"))
        // .when("new_password", {
        //     is: (val: any) => (val && val.length > 0 ? true : false),
        //     then: yup.string().oneOf([yup.ref("new_password")], t("form_errors.both_password_needs_to_be_the_same"))
        // })
    });

    const { values, errors, touched, isSubmitting, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            old_password: "",
            new_password: "",
            confirm_password: ""
        },
        validationSchema: loginSchema,
        onSubmit
    });

    return (
        <Flex minH="80vh" align="center" justify="center" bg={useColorModeValue("gray.50", "gray.800")}>
            <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
                <Stack align="center">
                    <Flex alignItems="center" direction="column">
                        <Text fontSize="3xl" fontWeight="bold">
                            {t("login.change_password")}
                        </Text>
                    </Flex>
                </Stack>
                <Box rounded="lg" bg={useColorModeValue("white", "gray.700")} boxShadow="lg" p={8} width="sm">
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <Stack spacing={4}>
                            <CustomPasswordField
                                label={t("login.old_password")}
                                name="old_password"
                                value={values.old_password}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.old_password}
                                touched={touched.old_password}
                            />

                            <CustomPasswordField
                                label={t("login.new_password")}
                                name="new_password"
                                value={values.new_password}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.new_password}
                                touched={touched.new_password}
                            />

                            <CustomPasswordField
                                label={t("login.confirm_password")}
                                name="confirm_password"
                                value={values.confirm_password}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.confirm_password}
                                touched={touched.confirm_password}
                            />

                            <Stack spacing={10}>
                                <Button
                                    bgColor={globalStyles.colors.btn.blue}
                                    type={"submit"}
                                    isLoading={isSubmitting}
                                    color="white"
                                >
                                    {t("login.change_password")}
                                </Button>
                            </Stack>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Flex>
    );
};

export default ChangePassword;
