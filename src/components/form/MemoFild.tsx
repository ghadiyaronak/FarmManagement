import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
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
}

const MemoFild = ({
    placehold,
    Type,
    name,
    values,
    handleBlur,
    handleChange,
    errors,
    touched,
    label,
    isMandatory,
    min
}: InputsProp) => {
    return (
        <Flex borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
            <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                {label}
            </FormLabel>
            <Box width={"lg"} ps={"5"} pl={3}>
                <Input
                    _focus={{ borderColor: globalStyles.colors.mainColor }}
                    border={"1px solid #D6D6D6"}
                    type={Type}
                    name={name}
                    // placeholder={placehold}
                    _placeholder={{ color: "gray" }}
                    onChange={handleChange}
                    onBlur={handleBlur}
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

export default MemoFild;
