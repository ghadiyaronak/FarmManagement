import { Flex } from "@chakra-ui/react";
import React from "react";
import CloseButton from "../button/CloseButton";
import ConfirmButton from "../button/ConfirmButton";
import SaveButton from "../button/SaveButton";
import SaveButtonFaq from "../button/SaveButtonFaq";

interface ModalFooterProps {
    type: string;
    isLoading: any;
    handleDelete?: any;
    handleClose: any;
}

const FooterModal = ({ type, isLoading, handleClose, handleDelete }: ModalFooterProps) => {
    return (
        <Flex w={"full"} justifyContent={"flex-end"}>
            <Flex gap={3}>
                {type === "delete" ? (
                    <ConfirmButton handleDelete={handleDelete} isLoading={isLoading} />
                ) : (
                    <SaveButtonFaq isSubmitting={isLoading} />
                )}

                <CloseButton handleClose={handleClose} />
            </Flex>
        </Flex>
    );
};

export default FooterModal;
