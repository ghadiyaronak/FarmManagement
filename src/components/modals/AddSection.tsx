import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    VStack,
    useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import CustomInputField from "../fields/CustomInputField";
import { AppDispatch } from "../../store";
import FaqService from "../../services/FaqService";
import FooterModal from "./FooterModal";
import { setSelectedSection } from "../../store/actions/faq";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    getAll: any;
}
const AddSection = ({ isOpen, onClose, getAll }: IProps) => {
    const { t } = useTranslation();
    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const sectionDetails = useSelector((state: any) => state?.FAQ?.selectedSection);

    const [section, setSection] = useState({
        section: "",
        order: 0
    });

    const sectionSchema = yup.object().shape({
        name: yup.string().required(t("form_errors.required_fields")),
        priority: yup.string().required(t("form_errors.required_fields"))
    });

    const handleModalClose = () => {
        dispatch(setSelectedSection({}));
        onClose();
    };

    const onSubmit = (param: any, actions: any) => {
        if (sectionDetails?.create) {
            // createSection
            dispatch(
                FaqService.createSection(
                    { data: param },
                    (responseData: any) => {
                        toast({
                            title: "セクションを登録しました",
                            status: "success",
                            variant: "solid",
                            duration: 2000,
                            position: "top-right",
                            isClosable: true
                        });

                        getAll();
                        handleModalClose();
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
        } else if (sectionDetails?.edit) {
            // updateSection
            const updateData = {
                sectionId: sectionDetails?._id,
                name: param.name,
                priority: param.priority
            };

            dispatch(
                FaqService.updateSection(
                    { data: updateData },
                    (success: any) => {
                        const section = success.data.rows;
                        setFieldValue("name", section?.name);
                        setFieldValue("priority", section?.priority);

                        toast({
                            title: "セクションを更新しました",
                            status: "success",
                            variant: "solid",
                            duration: 2000,
                            position: "top-right",
                            isClosable: true
                        });

                        getAll();
                        handleModalClose();
                        actions.resetForm();
                    },
                    (errorData: any) => {
                        toast({
                            title: "hyyy",
                            status: "error",
                            variant: "solid",
                            duration: 2000,
                            position: "top-right",
                            isClosable: true
                        });
                    }
                )
            );
        }
    };

    const {
        values,
        errors,
        touched,
        isSubmitting,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        setSubmitting,
        resetForm
    } = useFormik({
        initialValues: {
            name: "",
            priority: "",
            enabled: false
        },
        validationSchema: sectionSchema,
        onSubmit
    });

    useEffect(() => {
        if (sectionDetails?.edit) {
            setFieldValue("name", sectionDetails?.name);
            setFieldValue("priority", sectionDetails?.priority);
        } else {
            resetForm();
        }
        setSubmitting(false);
    }, [sectionDetails?.edit, sectionDetails?.create]);

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {sectionDetails?.view
                        ? t("common.View")
                        : sectionDetails?.edit
                        ? t("faq_mgmt.edit_section")
                        : "セクション追加"}
                </ModalHeader>

                <ModalCloseButton />
                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Flex flexDir={"column"} gap={3}>
                            <CustomInputField
                                label={t("faq_mgmt.section_name")}
                                name={"name"}
                                type={"string"}
                                value={values.name}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.name}
                                touched={touched.name}
                                isMandatory={true}
                            />
                            <CustomInputField
                                label={t("faq_mgmt.priority")}
                                name={"priority"}
                                type={"number"}
                                value={values.priority}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.priority}
                                touched={touched.priority}
                                isMandatory={true}
                            />
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <FooterModal type="add" isLoading={isSubmitting} handleClose={handleModalClose} />
                        {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                            {t("common.cancel")}
                        </Button>
                        <Button type="submit">{t("common.save")}</Button> */}
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddSection;
