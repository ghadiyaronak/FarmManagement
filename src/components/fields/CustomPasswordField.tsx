import React from "react";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text } from "@chakra-ui/react";

// Icon
import { PasswordHidden, PasswordVisible } from "../../utils/icons";

interface InputFieldProps {
    label: string;
    name: string;
    value: string;
    handleChange: any;
    handleBlur: any;
    errors: any;
    touched: any;
}

const CustomPasswordField: React.FC<InputFieldProps> = (props) => {
    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl>
            <FormLabel> {props.label}</FormLabel>
            <InputGroup size="md">
                <Input
                    name={props.name}
                    type={show ? "text" : "password"}
                    value={props.value}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    isInvalid={props.errors && props.touched}
                    errorBorderColor="red.300"
                />
                <InputRightElement width="4.5rem">
                    {show ? (
                        <Box onClick={handleClick} cursor={"pointer"}>
                            <PasswordVisible />
                        </Box>
                    ) : (
                        <Box onClick={handleClick} cursor={"pointer"}>
                            <PasswordHidden />
                        </Box>
                    )}
                </InputRightElement>
            </InputGroup>

            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default CustomPasswordField;
