import { Box, Stack, Flex } from "@chakra-ui/react";
import AddFarmForm from "./AddFarmForm";

const AddFarm = () => {
    return (
        <Box>
            <Flex w={"full"} flexDir={{ base: "column", md: "row" }} gap={5}>
                <Flex flexDir={"column"} w={"full"}>
                    <Stack spacing={{ base: 4, sm: 6 }} direction={"column"}>
                        <Box>
                            <AddFarmForm />
                        </Box>
                    </Stack>
                </Flex>
            </Flex>
        </Box>
    );
};

export default AddFarm;
