import { useEffect } from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    useToast
} from "@chakra-ui/react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

import FaqService from "../../services/FaqService";
// import { setSelectedStore, setStoreList } from "../../store/actions/store";
// import { setFaqList, setSectionList } from "../../store/actions/faq";

import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";

import _ from "lodash";
import FooterModal from "./FooterModal";
import CustomInputField from "../fields/CustomInputField";
import CustomSelect from "../fields/CustomSelect";
import CustomTextArea from "../fields/CustomTextArea";
import { setSelectedFaq } from "../../store/actions/faq";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    getAll: any;
}

const AddFAQ = ({ isOpen, onClose, getAll }: IProps) => {
    const faqDetails = useSelector((state: any) => state.FAQ?.selectedFAQ);
    const sectionList = useSelector((state: any) => state?.FAQ?.allSections);

    const toast = useToast();
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();

    const handleModalClose = () => {
        onClose();
        dispatch(setSelectedFaq({}));
    };

    const sectionSchema = yup.object().shape({
        faq_section: yup.string().required(t("form_errors.required_fields")),
        question: yup.string().required(t("form_errors.required_fields")),
        answer: yup.string().required(t("form_errors.required_fields")),
        priority: yup.string().required(t("form_errors.required_fields"))
    });

    const onSubmit = (param: any, actions: any) => {
        const data: any = {};
        data.faq_section = param?.faq_section;
        data.question = param?.question;
        data.answer = param.answer;
        data.priority = param.priority;

        if (faqDetails?.create) {
            dispatch(
                FaqService.createFaq(
                    { data: param },
                    (responseData: any) => {
                        toast({
                            title: "FAQを登録しました",
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
        } else if (faqDetails?.edit) {
            data.faq_id = faqDetails?._id;

            dispatch(
                FaqService.updateFaq(
                    { data },
                    (responseData: any) => {
                        toast({
                            title: "FAQーを更新しました",
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
            faq_section: "",
            question: "",
            answer: "",
            priority: ""
        },

        validationSchema: sectionSchema,
        onSubmit
    });

    useEffect(() => {
        if (faqDetails?.edit) {
            setFieldValue("faq_section", faqDetails?.faq_section?._id);
            setFieldValue("question", faqDetails?.question);
            setFieldValue("answer", faqDetails?.answer);
            setFieldValue("priority", faqDetails?.priority);
        } else {
            resetForm();
        }
        setSubmitting(false);
    }, [faqDetails?.edit, faqDetails?.create]);

    return (
        <Modal isOpen={isOpen} onClose={handleModalClose}>
            <ModalOverlay />

            <ModalContent>
                <ModalHeader>質問追加</ModalHeader>

                <form onSubmit={handleSubmit}>
                    <ModalBody>
                        <Stack spacing={4}>
                            <CustomSelect
                                label={t("質問名")}
                                selectData={sectionList}
                                errors={errors.faq_section}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                isMandatory={true}
                                name="faq_section"
                                touched={touched.faq_section}
                                value={values.faq_section}
                            />

                            <CustomTextArea
                                label={t("faq_mgmt.question")}
                                name="question"
                                type="text"
                                value={values.question}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.question}
                                touched={touched.question}
                                isMandatory={true}
                            />

                            <CustomTextArea
                                label={t("faq_mgmt.answer")}
                                name="answer"
                                type="text"
                                value={values.answer}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.answer}
                                touched={touched.answer}
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
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <FooterModal type="add" isLoading={isSubmitting} handleClose={handleModalClose} />
                        {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
                            {t("common.cancel")}
                        </Button>
                        <Button type="submit"> {t("common.save")}</Button> */}
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};

export default AddFAQ;
