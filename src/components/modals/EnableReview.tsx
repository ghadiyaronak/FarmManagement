import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    Textarea,
    useToast,
    Text
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";

interface EnableReviewProps {
    isOpen: any;
    onClose: any;
    updateReview: any; 
}

const EnableReview = ({ isOpen, onClose, updateReview }: EnableReviewProps) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{t("reviews.enable_review")}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {t("messages.are_you_sure")} <br /> {t("messages.this_action_is_irreversible")}
                </ModalBody>
                <ModalFooter>
                    <Button
                        bgColor={globalStyles.colors.btn.success}
                        color={"white"}
                        mr={3}
                        onClick={() => {
                            updateReview();
                        }}
                    > 
                        {t("yes")}
                    </Button>
                    <Button
                        bgColor={globalStyles.colors.btn.blue}
                        color={"white"}
                        onClick={() => {
                            onClose();
                        }}
                    >
                        {t("no")}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EnableReview;
