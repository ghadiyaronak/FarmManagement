import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";

interface IProps {
    onClick?: any;
    title: string;
    isLoading?: any;
}

const SaveButton = ({ onClick, title, isLoading }: IProps) => {
    const { t } = useTranslation();

    return (
        <Flex w={"full"} justifyContent={"center"} alignItems={"center"}>
            <Button
                type="submit"
                loadingText="Submitting"
                onClick={onClick}
                fontWeight={"700"}
                fontSize={"lg"}
                mt={5}
                mb={5}
                w={"10em"}
                isLoading={isLoading}
                rounded={"2xl"}
                bgColor={globalStyles.colors.mainColor}
                _hover={{ bgColor: "blue.300" }}
                color={"#FFFFFF"}
            >
                {title}
            </Button>
        </Flex>
    );
};

export default SaveButton;
