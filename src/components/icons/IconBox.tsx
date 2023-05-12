import { Flex } from "@chakra-ui/react";

export default function IconBox({ icon, ...rest }: any) {
    return (
        <Flex alignItems={"center"} justifyContent={"center"} borderRadius={"50%"} {...rest}>
            {icon}
        </Flex>
    );
}
