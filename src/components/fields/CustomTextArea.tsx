import React from "react";
import { FormControl, FormLabel, Input, Text, Textarea } from "@chakra-ui/react";

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
    type: any;
    isMandatory: any;
}

const CustomTextArea: React.FC<InputFieldProps> = (props, isMandatory) => {
    return (
        <FormControl>
            <FormLabel>
                {" "}
                {props.label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <Textarea
                name={props.name}
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
        </FormControl>
    );
};

export default CustomTextArea;
