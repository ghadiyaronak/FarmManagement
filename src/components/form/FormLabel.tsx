import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";

interface CustomFormLabelProps {
    label: string;
    isMandatory?: boolean;
}

const FormFildLabel = ({ label, isMandatory }: CustomFormLabelProps) => {
    return (
        <Flex>
            <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                {label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
        </Flex>
    );
};

export default FormFildLabel;
