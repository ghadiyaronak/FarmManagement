import { Button, Flex, Text } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Flex direction="column" height={"100vh"} alignItems={"center"} justifyContent={"center"} gap={2}>
            <Text> {t("messages.404error")}</Text>
            <Button bg={"blue.500"} color="gray.50" onClick={() => navigate(-1)}>
                {t("common.return")}
            </Button>
        </Flex>
    );
};

export default NotFound;
