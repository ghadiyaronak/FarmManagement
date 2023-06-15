import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
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

const style = {
    width: "59%",
    border: "1px solid #e6e9ed",
    marginLeft: "10px",
    borderRadius: "6px",
    paddingTop: "10px",
    paddingBottom: "10px"
};

const ReactDatePickerComponent = ({
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
    const [date, setDate] = useState(new Date());

    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    return (
        <>
            <Flex borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
                <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                    {label}
                    {isMandatory && (
                        <Text color={"red"} as="span">
                            *
                        </Text>
                    )}
                </FormLabel>
                <Box width={"full"} ps={"3"}>
                    <DatePicker
                        selected={date}
                        // style={style}
                        className="custom"
                        onChange={handleChange}
                        onCalendarClose={handleCalendarClose}
                        onCalendarOpen={handleCalendarOpen}
                    />

                    {errors && touched && (
                        <Text fontSize={"sm"} mt={1} color={"red.300"}>
                            {errors}
                        </Text>
                    )}
                </Box>
            </Flex>
        </>
    );
};

export default ReactDatePickerComponent;
