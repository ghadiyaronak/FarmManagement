import React from "react";
import { Box, Flex, FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";
import CustomFormLabel from "./CustomFormLabel";

interface InputFieldProps {
    placehold?: string;
    name: string;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
    type?: any;
    label?: any;
    isMandatory?: any;
    style?: any;
}

const CustomTextArea: React.FC<InputFieldProps> = (props) => {
    return (
        <Flex flexDir={"column"} flex={"0.5"} style={props.style}>
            {props.label && <CustomFormLabel label={props.label} isMandatory={props.isMandatory} />}
            <Box py={3} pl={3} width={"lg"}>
                <Textarea
                    height={"4xs"}
                    name={props.name}
                    placeholder={props.placehold}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    // width={"max-content"}
                    isInvalid={props.errors && props.touched}
                    errorBorderColor="red.300"
                    style={props.style}
                />
            </Box>
            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} pl={3} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </Flex>
    );
};

export default CustomTextArea;
