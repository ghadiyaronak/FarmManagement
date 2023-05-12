import { Box, Spinner } from "@chakra-ui/react";

const LoaderComponent = () => {
    return (
        <Box display={"flex"} mx={"auto"} height={"80vh"} alignItems={"center"} justifyContent={"center"}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </Box>
    );
};

export default LoaderComponent;
