import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";

interface CustomFormLabelProps {
    label: string;
    isMandatory?: boolean;
}

const FormTextArea = ({ label, isMandatory }: CustomFormLabelProps) => {
    return (
        <Flex>
            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
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

export default FormTextArea;
