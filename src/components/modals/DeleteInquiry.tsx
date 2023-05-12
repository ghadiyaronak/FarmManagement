import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useToast
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

import InquiryService from "../../services/InquireService";

import dayjs from "dayjs";
import { globalStyles } from "../../theme/styles";
import { useTranslation } from "react-i18next";

interface DeleteReviewProps {
    isOpen: any;
    onClose: any;
    getInquiryByDate: any;
    deleteInquiryId: string;
}

const DeleteInquiry: React.FC<DeleteReviewProps> = ({ isOpen, onClose, getInquiryByDate, deleteInquiryId }) => {
    const disaptch = useDispatch<AppDispatch>();
    const Review = useSelector((state: any) => state?.Review?.selectedReview);

    const { t } = useTranslation();

    const toast = useToast();
    const today = new Date();

    const deleteInquiry = async () => {
        disaptch(
            InquiryService.deleteInquiry(
                { id: deleteInquiryId },
                (responseData: any) => {
                    toast({
                        title: t("messages.inquiry_delete_success"),
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    onClose();
                    getInquiryByDate(
                        dayjs(new Date(today.getFullYear(), today.getMonth(), 1)).format("YYYY/MM/DD"),
                        dayjs(today).format("YYYY/MM/DD")
                    );
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

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("inquiries.delete_inquiry")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {t("messages.inquiry_delete_confirm")} <br /> {t("messages.this_action_is_irreversible")}
                </ModalBody>

                <ModalFooter>
                    <Button bgColor={globalStyles.colors.btn.success} color={"white"} mr={3} onClick={deleteInquiry}>
                        {t("yes")}
                    </Button>
                    <Button bgColor={globalStyles.colors.btn.blue} color={"white"} onClick={onClose}>
                        {t("no")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteInquiry;
