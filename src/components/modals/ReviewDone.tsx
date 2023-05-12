import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useColorModeValue
} from "@chakra-ui/react";

interface IProps {
    setConfirmReview: any;
    setOpenConfirmReview: any;
    openConfirmReview: boolean;
}
const ReviewDone = ({ setConfirmReview, openConfirmReview, setOpenConfirmReview }: IProps) => {
    const handleClose = (type: string) => {
        if (type === "close") {
            setConfirmReview(false);
            setOpenConfirmReview(false);
        } else {
            setConfirmReview(true);
            setOpenConfirmReview(false);
        }
    };
    return (
        <Modal isOpen={openConfirmReview} onClose={() => handleClose("close")}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Confirm Reply</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    You are about to submit the reply. Once you mark as confirmed, reply has been fix and you won't be
                    able to edit the reply.
                </ModalBody>

                <ModalFooter>
                    <Button
                        bg={useColorModeValue("gray.600", "gray.600 ")}
                        color="gray.50"
                        mr={3}
                        onClick={() => handleClose("close")}
                    >
                        Close
                    </Button>
                    <Button
                        bg={useColorModeValue("blue.400", "blue.600 ")}
                        color="gray.50"
                        onClick={() => handleClose("open")}
                    >
                        Confirm
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ReviewDone;
