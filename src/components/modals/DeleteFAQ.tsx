import { useState } from "react";
import {
    Button,
    CloseButton,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useToast
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import FaqService from "../../services/FaqService";
import { setSelectedFaq } from "../../store/actions/faq";

import { AppDispatch } from "../../store";
import { useTranslation } from "react-i18next";
import FooterModal from "./FooterModal";
import ConfirmButton from "../button/ConfirmButton";
import SaveButton from "../button/SaveButton";
import { globalStyles } from "../../theme/styles";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
}

const DeleteFAQ = ({ isOpen, onClose }: IProps) => {
    const { t } = useTranslation();

    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const selectedDetails = useSelector((state: any) => state?.FAQ?.selectedFAQ);
    const faqDetails = useSelector((state: any) => state.FAQ?.selectedFAQ);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleConfirmDelete = () => {
        setIsLoading(true);
        if (selectedDetails?.type === "section") {
            dispatch(
                FaqService.deleteSection(
                    { id: selectedDetails?._id },
                    (responseData: any) => {
                        setIsLoading(false);
                        toast({
                            title: "セクションを削除しました。",
                            status: "success",
                            variant: "solid",
                            duration: 2000,
                            position: "top-right",
                            isClosable: true
                        });

                        selectedDetails?.getAll();
                        dispatch(setSelectedFaq({}));
                        onClose();
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
        } else {
            dispatch(
                FaqService.deleteFaq(
                    { id: faqDetails?._id },
                    (responseData: any) => {
                        setIsLoading(false);
                        toast({
                            title: "FAQーを削除しました。",
                            status: "success",
                            variant: "solid",
                            duration: 2000,
                            position: "top-right",
                            isClosable: true
                        });

                        faqDetails?.getAll();
                        dispatch(setSelectedFaq({}));
                        onClose();
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
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    {selectedDetails?.type === "section" ? t("faq_mgmt.delete_section") : t("faq_mgmt.delete_quetion")}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {/* {t("reviews_mgmt.msg")} */}
                    {selectedDetails?.type === "section"
                        ? t("faq_mgmt.delete_section")
                        : t("faq_mgmt.delete_quetion_body")}
                    <br />
                    {t("messages.this_action_is_irreversible")}
                </ModalBody>

                <ModalFooter>
                    <Button
                        bgColor={globalStyles.colors.btn.blue}
                        _hover={{ bgColor: "blue.300" }}
                        color="white"
                        mr={3}
                        onClick={onClose}
                    >
                        {t("common.cancel")}
                    </Button>
                    <Button
                        bgColor={"red.500"}
                        _hover={{ bgColor: "red.300" }}
                        color={"white"}
                        onClick={handleConfirmDelete}
                        isLoading={isLoading}
                    >
                        {t("common.delete")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteFAQ;
