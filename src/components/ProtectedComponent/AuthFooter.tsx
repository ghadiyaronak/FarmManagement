import { useEffect, useState } from "react";

//chakra import
import { Box, Flex, HStack, Text, useColorModeValue } from "@chakra-ui/react";

//theme import
import { customTheme } from "../../theme";

const AuthFooter = () => {
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        let timer = setInterval(() => setDate(new Date()), 1000);
        return () => {
            clearInterval(timer);
        };
    });

    return (
        <Box
            background={useColorModeValue(
                customTheme.colors.lightMode.bgPrimary,
                customTheme.colors.darkMode.bgPrimary
            )}
            color={useColorModeValue(customTheme.colors.lightMode.headerText, customTheme.colors.darkMode.headerText)}
            bottom="0"
            position="fixed"
        >
            <HStack
                py={3}
                px={3}
                // width="full"
                direction={{ base: "column", md: "row" }}
                spacing={4}
                justify={{ base: "center", md: "space-between" }}
                align={{ base: "center", md: "center" }}
            >
                <Flex direction="column">
                    {/* here "hi" means Hindi language  */}
                    <Text>{date.toLocaleDateString("hi", { day: "2-digit", month: "2-digit", year: "numeric" })}</Text>
                    <Text>{date.toLocaleTimeString()}</Text>
                </Flex>
            </HStack>
        </Box>
    );
};

export default AuthFooter;
