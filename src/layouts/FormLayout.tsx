import { Box } from "@chakra-ui/react";
import React from "react";

interface FormLayoutProps {
    children: JSX.Element;
}

const FormLayout = ({ children }: FormLayoutProps) => {
    return (
        <Box
            w={{ base: "full", sm: "full", lg: "50%" }}
            marginX="auto"
            bgColor={"white"}
            rounded={"sm"}
            shadow={"lg"}
            p={3}
            mt={3}
            maxW={"md"}
        >
            {children}
        </Box>
    );
};

export default FormLayout;
