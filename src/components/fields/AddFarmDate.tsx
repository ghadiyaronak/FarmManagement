import React from "react";
import { Box, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import dayjs from "dayjs";

interface InputFieldProps {
    label: string;
    name: string;
    type: any;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
    isMandatory?: any;
}

const AddFarmDate: React.FC<InputFieldProps> = (props, isMandatory) => {
    return (
        <Flex borderTop={"1px solid #E0E0E0"}>
            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                {props.label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <Box width={"lg"} px={5} py={3} pr={0}>
                <Input
                    size="md"
                    name={props.name}
                    type={props.type}
                    value={props.value}
                    onChange={props.handleChange}
                    // min={dayjs(new Date()).format("YYYY-MM-DD")}
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
        </Flex>
    );
};

export default AddFarmDate;
