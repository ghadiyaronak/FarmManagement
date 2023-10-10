import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import MainHeading from "../../../components/menu/MainHeading";

const Notation = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <>
            <Box w={"full"} mt={4} bgColor={"white"}>
                <Flex display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <MainHeading title={"特定商取引法に基づく表記"} />
                </Flex>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>販売業者</Text>
                    <Text pl={"5"}>合資会社 羽生惣吾商店</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>運営統括責任者名</Text>
                    <Text pl={"5"}>羽生　惣亮</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>運営統括責任者名</Text>
                    <Text pl={"5"}>287-0001</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>住所</Text>
                    <Text pl={"5"}>千葉県香取市佐原ロ2116-9</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>サービス名</Text>
                    <Text pl={"5"}>MYMiRUアプリ</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>電話番号</Text>
                    <Text pl={"5"}>0478-52-2212</Text>
                </Box>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>公開メールアドレス</Text>
                    <Text pl={"5"}>suigounomegumi@hanyusogosyoten.co.jp</Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>ホームページアドレス</Text>
                    <Text pl={"5"}>https://hanyusogosyoten.co.jp/</Text>
                </Box>
            </Box>
        </>
    );
};

export default Notation;
