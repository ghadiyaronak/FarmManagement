import { Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";
import { globalStyles } from "../../theme/styles";

interface dataProps {
    label: string;
    value: string;
}

interface MySelectProps {
    onChange: any;
    onBlur?: any;
    value: any;
    options?: any | Array<dataProps>;
    name: string;
    multi: boolean;
    handleChange?: any;
    handleBlur?: any;
    error: any;
    touched: any;
    label: string;
    defaultvalue?: any;
    isMandatory: boolean;
    datas?: Array<managerdataProps>;
}

interface managerdataProps {
    userName: string;
    _id: string;
    email: string;
}

const FarmStatusSelect = ({
    onChange,
    onBlur,
    value,
    options,
    name,
    multi,
    label,
    isMandatory,
    touched,
    defaultvalue,
    error
}: MySelectProps) => {
    const handleChange = (value: any) => {
        onChange(name, value);
    };

    const handleBlur = () => {
        onBlur(name, true);
    };

    const customStyles = {
        control: (provided: any, state: any) => ({
            ...provided,
            background: "#fff",
            borderColor: "1px solid transparent",
            // minHeight: "28px",
            // height: "28px",
            width: "30.9rem",
            // minWidth: "18em",
            // maxWidth: "30em",
            boxShadow: state.isFocused ? null : null
        }),

        valueContainer: (provided: any, state: any) => ({
            ...provided,
            // height: "28px",
            padding: "0 6px"
        }),

        input: (provided: any, state: any) => ({
            ...provided,
            margin: "0px",
            fontSize: "0.8rem"
        }),
        indicatorSeparator: (state: any) => ({
            display: "none"
        }),
        indicatorsContainer: (provided: any, state: any) => ({
            ...provided
            // height: "28px"
        })
    };
    return (
        <Flex>
            <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                {label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>

            <Box pl={3} py={3}>
                <Select
                    options={options}
                    isMulti={multi}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={value}
                    placeholder={""}
                    styles={customStyles}
                />
                {error && touched && (
                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                        {error && error.value ? error.value : error}
                    </Text>
                )}
            </Box>
        </Flex>
    );
};

export default FarmStatusSelect;
