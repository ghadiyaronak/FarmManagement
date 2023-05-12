import {
    Box,
    Flex,
    FormLabel,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Text
} from "@chakra-ui/react";
import { globalStyles } from "../../theme/styles";
interface InputsProp {
    placehold?: any;
    Type?: any;
    name?: any;
    values?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    label?: any;
    isMandatory?: any;
    min?: string;
    minValue?: any;
    maxValue?: any;
}

const FormInput = ({
    Type,
    name,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    label,
    isMandatory,
    min,
    minValue,
    maxValue
}: InputsProp) => {
    return (
        <Flex borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                {label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <Box width={"lg"} ps={"5"}>
                <Input
                    _focus={{ borderColor: globalStyles.colors.mainColor }}
                    type={Type}
                    name={name}
                    _placeholder={{ color: "gray" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    minLength={minValue}
                    maxLength={maxValue}
                    value={values}
                    min={min ?? new Date().toISOString().split("T")[0]}
                    isInvalid={errors && touched}
                    errorBorderColor="red.300"
                />

                {errors && touched && (
                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                        {errors}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default FormInput;
