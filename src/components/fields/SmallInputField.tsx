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
}

const SmallInputField: React.FC<InputFieldProps> = (props) => {
    return (
        <FormControl my={4}>
            <Input
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                isInvalid={props.errors && props.touched}
                errorBorderColor="red.300"
                placeholder={props.label}
            />
            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default SmallInputField;
