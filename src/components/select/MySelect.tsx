import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import Select from "react-select";
import { globalStyles } from "../../theme/styles";
import SmallFormLabel from "../fields/SmallFormLabel";

interface dataProps {
    label: string;
    value: string | boolean;
}

interface MySelectProps {
    onChange: any;
    onBlur?: any;
    value: any;
    options?: any | Array<dataProps>;
    name: string;
    multi: boolean;
    label?: string;
}

const MySelect = ({ onChange, onBlur, value, options, name, multi, label }: MySelectProps) => {
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
            borderColor: "2px solid transparent",
            minHeight: "28px",
            // height: "15px",
            width: "13em",
            // minWidth: "18em",
            // maxWidth: "30em",
            boxShadow: state.isFocused ? null : null
        }),
        valueContainer: (provided: any, state: any) => ({
            ...provided,
            height: "28px"
        }),
        input: (provided: any, state: any) => ({
            ...provided,
            height: "28px",
            margin: "0px",
            fontSize: "0.8rem"
        }),
        indicatorSeparator: (state: any) => ({
            display: "none"
        }),
        indicatorsContainer: (provided: any, state: any) => ({
            ...provided,
            height: "28px"
        })
    };

    return (
        <Box flexDir={"row"}>
            {/* <SmallFormLabel title={label} /> */}
            <Select
                styles={customStyles}
                options={options}
                isMulti={multi}
                onChange={handleChange}
                onBlur={handleBlur}
                value={value}
            />
        </Box>
    );
};

export default MySelect;
