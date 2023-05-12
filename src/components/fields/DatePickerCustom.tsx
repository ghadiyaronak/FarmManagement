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
}

const DatePickerCustom: React.FC<InputFieldProps> = (props) => {
    return (
        <Flex>
            <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                {props.label}
            </FormLabel>
            <Box width={"lg"} px={5} py={2} pl={3} pr={0}>
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

export default DatePickerCustom;
