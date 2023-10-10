import React from "react";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

interface InputFieldProps {
    label: string;
    name: string;
    type: any;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
    isMandatory: boolean;
    maxLength?: number;
}

const CustomInputField: React.FC<InputFieldProps> = (props) => {
    return (
        <FormControl>
            <Text as={"label"}>
                {props.label}
                {props.isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </Text>

            <Input
                mt={2}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                isInvalid={props.errors && props.touched}
                errorBorderColor="red.300"
                maxLength={props.maxLength && props.maxLength}
            />
            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default CustomInputField;
