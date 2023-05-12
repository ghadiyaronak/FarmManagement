import { EditIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton } from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { globalStyles } from "../../theme/styles";

interface AddButtonProps {
    title: string;
    mode?: any;
}

const EditButtonNew = ({ title, mode }: AddButtonProps) => {
    return (
        <Flex justifyContent={"flex-end"}>
            <Box
                onClick={mode}
                position={"absolute"}
                top={"-2"}
                cursor={"pointer"}
                right={"-3"}
                w="10"
                h="10"
                bg={"none"}
                color={globalStyles.colors.mainColor}
                _hover={{ bg: "#4299e1", color: "white" }}
                transition={"0.3s all"}
                display={"flex"}
                alignItems={"center"}
                justifyContent={"center"}
                borderTopRightRadius={"lg"}
            >
                <BiEdit fontSize={"22"} />
            </Box>
        </Flex>
    );
};

export default EditButtonNew;
