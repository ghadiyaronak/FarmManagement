import { Button } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";

interface IProps {
    isSubmitting: any;
}

const SaveButtonFaq = ({ isSubmitting }: IProps) => {
    const { t } = useTranslation();

    return (
        <Button
            bgColor={globalStyles.colors.mainColor}
            _hover={{ bgColor: "blue.400" }}
            color={"white"}
            type={"submit"}
            isLoading={isSubmitting}
        >
            {t("common.save")}
        </Button>
    );
};

export default SaveButtonFaq;
