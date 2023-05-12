import { Box, Text } from "@chakra-ui/react";
import React from "react";

interface MainHeadingProps {
    title: string;
}

const MainHeading = ({ title }: MainHeadingProps) => {
    return (
        <>
            <Text as="h1" fontWeight={"bold"} lineHeight="full" textAlign={"left"} fontSize={"2xl"} px={4} py={2}>
                {title}
            </Text>
        </>
    );
};

export default MainHeading;
