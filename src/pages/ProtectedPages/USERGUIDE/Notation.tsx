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
                <Box py={4} my={2} px={4}>
                    <Text>販売業者</Text>
                    <Text pl={"72"}>合資会社 羽生惣吾商店</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>運営統括責任者名</Text>
                    <Text pl={"72"}>羽生　惣亮</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>運営統括責任者名</Text>
                    <Text pl={"72"}>287-0001</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>住所</Text>
                    <Text pl={"72"}>千葉県香取市佐原ロ2116-9</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>商品代金以外の料金の説明</Text>
                    <Text pl={"72"} pb={4}>
                        全商品表示価格には消費税が含まれております。 2㎏まで 梱包サイズ80 送料940円（税込） 4㎏まで
                        梱包サイズ100 送料1050（税込） なお、代引手数料、振込手数料はお客様ご負担とさせていただきます。
                    </Text>
                    <Text pl={"72"} pb={4}>
                        お客様による配送会社の指定はできません。
                    </Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>申込有効期限</Text>
                    <Text pl={"72"}>
                        ご注文より7日以内にご入金がない場合は、購入の意思がないものとし注文を自動的にキャンセルとさせていただきます。
                    </Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>販売数量</Text>
                    <Text pl={"72"}>
                        数量限定商品につきましては、一度に購入できる数量を限らせていただく場合がございます。
                    </Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>引渡し時期</Text>
                    <Text pl={"72"}>【1】 銀行振込の場合 ご注文後、入金確認し1～３日以内での発送となります。</Text>
                    <Text pl={"72"}>【2】 代金引換の場合 ご注文から１～３日以内発送いたします。</Text>
                    <Text pl={"72"}>【3】 クレジットカード決済の場合 入金確認後1～３日以内での発送となります。</Text>
                    <Text pl={"72"} pb={4}>
                        【お届け時間指定について】 以下の時間帯をご指定することができます。
                        午前中、12-14時、14-16時、16-18時、18-20時
                    </Text>
                    <Text pl={"72"} pb={4}>
                        交通事情・天候等により、ご希望いただいた日時にお届けできない場合があります。
                    </Text>
                    <Text pl={"72"}>
                        代引きをご指定された場合は、配送業者でのお荷物の保管期限は7日となります。
                        保管期限を過ぎますとお戻しとなり再度発送が必要となります。
                    </Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>お支払い方法</Text>
                    <Text pl={"72"}>商品代引、後払い（LINE Pay）</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>お支払い期限</Text>
                    <Text pl={"72"}>
                        注文承諾メール到着後、7日間以内にお振込み下さい。 （後払いの場合は、請求書発行14日以内）
                    </Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>サービス名</Text>
                    <Text pl={"72"}>羽生惣吾商店</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>電話番号</Text>
                    <Text pl={"72"}>0478-52-2212</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>公開メールアドレス</Text>
                    <Text pl={"72"}>suigounomegumi@hanyusogosyoten.co.jp</Text>
                </Box>
                <Box py={4} my={2} px={4}>
                    <Text>ホームページアドレス</Text>
                    <Text pl={"72"}>https://hanyusogosyoten.co.jp/</Text>
                </Box>
            </Box>
        </>
    );
};

export default Notation;
