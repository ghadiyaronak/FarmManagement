import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";
import { globalStyles } from "../../theme/styles";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface AddButtonProps {
    path?: any;
    mode?: any;
}

const CloseEditButtonNew = ({ path, mode }: AddButtonProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex justifyContent={"flex-end"}>
            <Box
                onClick={() => navigate(path)}
                position={"absolute"}
                top={"-2"}
                cursor={"pointer"}
                right={"-3"}
                w="10"
                h="10"
                bg={"red"}
                color={"red.500"}
                // _hover={{ bg: "#4299e1", color: "white" }}
                transition={"0.3s all"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderTopRightRadius={"lg"}
            >
                <IoMdClose fontSize={"22"} />
            </Box>
        </Flex>
    );
};

export default CloseEditButtonNew;
