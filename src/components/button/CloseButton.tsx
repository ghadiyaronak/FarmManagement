import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";

interface CloseButtonProps {
    handleClose: any;
}

const CloseButton = ({ handleClose }: CloseButtonProps) => {
    const { t } = useTranslation();
    return (
        <Button bgColor={"red.500"} _hover={{ bgColor: "red.400" }} color={"white"} onClick={handleClose}>
            {t("common.cancel")}
        </Button>
    );
};

export default CloseButton;
