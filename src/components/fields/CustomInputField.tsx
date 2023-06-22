// import React from "react";
// import { Box, Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
// import dayjs from "dayjs";

// interface InputFieldProps {
//     label: string;
//     name: string;
//     type: any;
//     value: string;
//     handleChange: any;
//     handleBlur: any;
//     errors: any;
//     touched: any;
//     isMandatory: any;
// }

// const CustomInputField: React.FC<InputFieldProps> = (props, isMandatory) => {
//     return (
//         <Flex>
//             <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
//                 {props.label}
//                 {isMandatory && (
//                     <Text color={"red"} as="span">
//                         *
//                     </Text>
//                 )}
//             </FormLabel>
//             <Box width={"lg"} px={5} py={3} pr={0}>
//                 <Input
//                     size="md"
//                     name={props.name}
//                     type={props.type}
//                     value={props.value}
//                     onChange={props.handleChange}
//                     min={dayjs(new Date()).format("YYYY-MM-DD")}
//                     onBlur={props.handleBlur}
//                     isInvalid={props.errors && props.touched}
//                     errorBorderColor="red.300"
//                 />
//                 {props.errors && props.touched && (
//                     <Text fontSize={"sm"} mt={1} color={"red.300"}>
//                         {props.errors}
//                     </Text>
//                 )}
//             </Box>
//         </Flex>
//     );
// };

// export default CustomInputField;

// // import { Box, Flex, FormLabel, Input, Text } from "@chakra-ui/react";
// // import { globalStyles } from "../../theme/styles";
// // interface InputsProp {
// //     placehold?: any;
// //     Type?: any;
// //     name?: any;
// //     values?: any;
// //     handleChange?: any;
// //     handleBlur?: any;
// //     errors?: any;
// //     touched?: any;
// //     label?: any;
// //     isMandatory?: any;
// //     min?: string;
// // }

// // const CustomInputField = ({
// //     placehold,
// //     Type,
// //     name,
// //     values,
// //     handleBlur,
// //     handleChange,
// //     errors,
// //     touched,
// //     label,
// //     isMandatory,
// //     min
// // }: InputsProp) => {
// //     return (
// //         <Flex borderTop={"1px solid #E0E0E0"} borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
// //             <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
// //                 {label}
// //                 {isMandatory && (
// //                     <Text color={"red"} as="span">
// //                         *
// //                     </Text>
// //                 )}
// //             </FormLabel>
// //             <Box width={"lg"} ps={"5"}>
// //                 <Input
// //                     _focus={{ borderColor: globalStyles.colors.mainColor }}
// //                     border={"1px solid #D6D6D6"}
// //                     type={Type}
// //                     name={name}
// //                     // placeholder={placehold}
// //                     _placeholder={{ color: "gray" }}
// //                     onChange={handleChange}
// //                     onBlur={handleBlur}
// //                     value={values}
// //                     min={min ?? new Date().toISOString().split("T")[0]}
// //                     isInvalid={errors && touched}
// //                     errorBorderColor="red.300"
// //                 />
// //                 {errors && touched && (
// //                     <Text fontSize={"sm"} mt={1} color={"red.300"}>
// //                         {errors}
// //                     </Text>
// //                 )}
// //             </Box>
// //         </Flex>
// //     );
// // };

// // export default CustomInputField;

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
    isMandatory: boolean;
    maxLength?: number;
}

const CustomInputField: React.FC<InputFieldProps> = (props) => {
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

            <Input
                mt={2}
                name={props.name}
                type={props.type}
                value={props.value}
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                isInvalid={props.errors && props.touched}
                errorBorderColor="red.300"
                maxLength={props.maxLength && props.maxLength}
            />
            {props.errors && props.touched && (
                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                    {props.errors}
                </Text>
            )}
        </FormControl>
    );
};

export default CustomInputField;
