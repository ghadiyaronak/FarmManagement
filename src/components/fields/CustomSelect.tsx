import React from "react";
import { FormControl, FormLabel, Input, Select, Text, Textarea } from "@chakra-ui/react";

interface InputFieldProps {
    label: string;
    selectData: any;
    name: string;
    isMandatory: boolean;

    value: string;

    handleChange: any;
    handleBlur: any;

    errors: any;
    touched: any;
}

const CustomSelect: React.FC<InputFieldProps> = (props) => {
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

            <Select
                mt={2}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                name={props.name}
                value={props.value}
                isInvalid={props.errors && props.touched}
                placeholder={props.label}
            >
                {props.selectData?.map((data: any) => {
                    return (
                        <option value={data._id} key={data._id}>
                            {data.name}
                        </option>
                    );
                })}
            </Select>

            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default CustomSelect;
