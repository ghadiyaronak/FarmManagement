import React from "react";
import { Box, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

interface InputFieldProps {
    label: string;
    name: string;
    type: any;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
}

const CustomAuth: React.FC<InputFieldProps> = (props) => {
    return (
        <Box>
            <Flex>
                <FormLabel fontWeight={"Bold"} w={"2xs"} py={2} m={"0"}>
                    {" "}
                    {props.label}
                </FormLabel>
            </Flex>
            <Box>
                <Input
                    size="md"
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={props.errors && props.touched}
                    errorBorderColor="red.300"
                />
                {props.errors && props.touched && (
                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                        {props.errors}
                    </Text>
                )}
            </Box>
        </Box>
    );
};

export default CustomAuth;
