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
            bgColor={globalStyles.colors.btn.success}
            _hover={{ bgColor: "green.300" }}
            color={"white"}
            type={"submit"}
            isLoading={isSubmitting}
        >
            {t("common.save")}
        </Button>
    );
};

export default SaveButtonFaq;
