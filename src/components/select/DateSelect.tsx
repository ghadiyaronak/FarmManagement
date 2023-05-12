import { border, Box, Flex, FormLabel, Text } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import SmallFormLabel from "../fields/SmallFormLabel";
import { globalStyles } from "../../theme/styles";
import "../../../src/index.css";
interface DateSelectProps {
    label: string;
    startDate?: any;
    endDate?: any;
    type?: any;
    setStartDate?: any;
    setEndDate?: any;
    selected?: any;
    isMandatory?: any;
    dates?: any;
    errors?: any;
    handleChange?: any;
    handleBlur?: any;
    touched?: any;
    name?: any;
    value?: any;
}

const DateSelect = ({
    label,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    selected,
    dates,
    errors,
    isMandatory,
    handleChange,
    handleBlur,
    touched,
    name,
    value
}: DateSelectProps) => {
    const { t } = useTranslation();
    function setFieldValue(arg0: string, date: any) {
        throw new Error("Function not implemented.");
    }

    return (
        <Flex
            flex={1}
            fontSize={"sm"}
            borderTop={"1px solid #E0E0E0"}
            // borderBottom={"1px solid #E0E0E0"}
            alignItems={"center"}
        >
            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                {label}
                {isMandatory && (
                    <Text color={"red"} as="span">
                        *
                    </Text>
                )}
            </FormLabel>
            <Flex>
                <Box ps={"5"}>
                    <ReactDatePicker
                        dateFormat="yyyy/MM/dd"
                        selected={startDate}
                        // _focus={{ borderColor: globalStyles.colors.mainColor }}
                        onChange={(dates: any) => {
                            const [start, end] = dates;
                            setStartDate(start);
                            setEndDate(end);
                        }}
                        startDate={startDate}
                        endDate={endDate}
                        selectsRange
                        className="custom"
                        popperClassName="popper-class"
                        popperPlacement="bottom-start"
                        todayButton={"today"}
                        showPopperArrow={false}
                        // maxDate={new Date()}
                        popperModifiers={[
                            {
                                name: "offset",
                                options: {
                                    offset: [0, 0]
                                }
                            },
                            {
                                name: "preventOverflow",
                                options: {
                                    rootBoundary: "viewport",
                                    tether: false,
                                    altAxis: true
                                }
                            }
                        ]}
                    />
                </Box>
            </Flex>
        </Flex>
    );
};

export default DateSelect;
