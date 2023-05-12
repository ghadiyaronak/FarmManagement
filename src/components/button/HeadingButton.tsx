import { Button } from "@chakra-ui/button";
import { Box, Heading, Stack } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { globalStyles } from "../../theme/styles";
import { AiOutlineEdit } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
    FormControl,
    FormLabel,
    Text,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Switch,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import UserService from "../../services/UserService";

interface HeadingProps {
    path?: any;
    row?: any;
}

const HeadingButtonRight = ({ path, row }: HeadingProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [modal, setModal] = useState<any>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box>
            <Button
                size={"md"}
                fontWeight={"500"}
                onClick={() => navigate(path)}
                _hover={{
                    bgColor: "white"
                }}
            >
                <Box onClick={onOpen}>
                    <FaRegEdit size={24} color="#4299e1" onClick={() => setModal(true)} />
                </Box>
            </Button>
        </Box>
    );
};

export default HeadingButtonRight;
