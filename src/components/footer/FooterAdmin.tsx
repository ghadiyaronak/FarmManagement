import { ReactNode } from "react";
import { Box, chakra, Container, Stack, Text, VisuallyHidden, Flex } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";
import { customTheme } from "../../theme";
import { FOOTER_ICONS } from "../../utils/FooterConstant";
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
    const { t } = useTranslation();

    const handleClick = (href: any) => {
        window.open(href, "_blank");
    };

    const FooterItem = {
        label: "マイミル",
        href: "https://www.instagram.com/happy_lotus2212/",
        icon: <FaInstagram />
    };

    return (
        <Box
            borderTop={1}
            mt={2}
            w={"full"}
            borderStyle="solid"
            borderColor={customTheme.colors.lightMode.headerBorder}
            bg={"#ffffff"}
            color={"gray.700"}
        >
            <Container as={Stack} maxW={"6xl"} py={2}>
                <Flex alignItems={"center"} justifyContent={"space-around"}>
                    <Text fontSize={"sm"}> {"© Copyright 2023 （資）羽生惣吾商店 All rights reserved."}</Text>

                    <Flex alignItems={"center"} gap={3}>
                        <chakra.button
                            bg={"blackAlpha.100"}
                            rounded={"full"}
                            w={8}
                            h={8}
                            cursor={"pointer"}
                            as={"a"}
                            onClick={() => {
                                handleClick(FooterItem.href);
                            }}
                            display={"inline-flex"}
                            alignItems={"center"}
                            justifyContent={"center"}
                            transition={"background 0.3s ease"}
                            _hover={{
                                bg: "blackAlpha.200"
                            }}  
                        >
                            {FooterItem.icon}
                        </chakra.button>

                        <Text> {FooterItem.label}</Text>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    );
};
export default Footer;
