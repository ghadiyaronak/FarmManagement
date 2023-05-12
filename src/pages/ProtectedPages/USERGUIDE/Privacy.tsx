import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import MainHeading from "../../../components/menu/MainHeading";

const Privacy = () => {
    return (
        <>
            <Box w={"full"} mt={4} bgColor={"white"}>
                <Flex display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <MainHeading title={"プライバシーポリシー"} />
                </Flex>
                <Box py={4} my={3} px={4}>
                    <Text>1.個人情報の定義</Text>
                    <Text pl={"72"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        「個人情報」とは、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日その他の記述等により特定の個人を識別することができるもの、及び他の情報と容易に照合することができ、それにより特定の個人を識別することができることとなるものをいいます。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>2.個人情報の収集</Text>

                    <Text pl={"72"} pb={4}>
                        当ショップでは商品のご購入、お問合せをされた際にお客様の個人情報を収集することがございます。
                    </Text>
                    <Text pl={"72"} pb={4}>
                        収集するにあたっては利用目的を明記の上、適法かつ公正な手段によります。
                    </Text>
                    <Text pl={"72"} pb={4}>
                        当ショップで収集する個人情報は以下の通りです。
                    </Text>

                    <Text pl={"72"}>a)お名前、フリガナ</Text>
                    <Text pl={"72"}>b)ご住所</Text>
                    <Text pl={"72"}>c)お電話番号</Text>
                    <Text pl={"72"}>d)メールアドレス</Text>
                    <Text pl={"72"}>e)パスワード</Text>
                    <Text pl={"72"}>f)配送先情報</Text>
                    <Text pl={"72"}>g)当ショップとのお取引履歴及びその内容</Text>
                    <Text pl={"72"}>h)上記を組み合わせることで特定の個人が識別できる情報</Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>3.個人情報の利用</Text>
                    <Text pl={"72"}>当ショップではお客様からお預かりした個人情報の利用目的は以下の通りです。 </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>3.個人情報の利用</Text>
                    <Text pl={"72"} pb={4}>
                        当ショップではお客様からお預かりした個人情報の利用目的は以下の通りです。{" "}
                    </Text>
                    <Text pl={"72"}>a)ご注文の確認、照会</Text>
                    <Text pl={"72"}>b)商品発送の確認、照会</Text>
                    <Text pl={"72"} pb={4}>
                        c)お問合せの返信時
                    </Text>
                    <Text pl={"72"} pb={4}>
                        当ショップでは、下記の場合を除いてはお客様の断りなく第三者に個人情報を開示・提供することはいたしません。
                    </Text>
                    <Text pl={"72"}>
                        a)法令に基づく場合、及び国の機関若しくは地方公共団体又はその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
                    </Text>
                    <Text pl={"72"}>
                        b)人の生命、身体又は財産の保護のために必要がある場合であって、本人の同意を得ることが困難である場合
                    </Text>
                    <Text pl={"72"}>c)当ショップを運営する会社の関連会社で個人データを共有する場合</Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>4.個人情報の安全管理</Text>
                    <Text pl={"72"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        お客様よりお預かりした個人情報の安全管理はサービス提供会社によって合理的、組織的、物理的、人的、技術的施策を講じるとともに、当ショップでは関連法令に準じた適切な取扱いを行うことで個人データへの不正な侵入、個人情報の紛失、改ざん、漏えい等の危険防止に努めます。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>5.個人情報の訂正、削除</Text>
                    <Text pl={"72"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        お客様からお預かりした個人情報の訂正・削除は下記の問合せ先よりお知らせ下さい。
                        また、ユーザー登録された場合、当サイトのメニュー「マイアカウント」より個人情報の訂正が出来ます。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>6.cookie(クッキー)の使用について</Text>
                    <Text pl={"72"} pb={4}>
                        当社は、お客様によりよいサービスを提供するため、cookie
                        （クッキー）を使用することがありますが、これにより個人を特定できる情報の収集を行えるものではなく、お客様のプライバシーを侵害することはございません。
                    </Text>
                    <Text pl={"72"} pb={4}>
                        ※cookie
                        （クッキー）とは、サーバーコンピュータからお客様のブラウザに送信され、お客様が使用しているコンピュータのハードディスクに蓄積される情報です。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>7.SSLの使用について</Text>
                    <Text pl={"72"} pb={4}>
                        個人情報の入力時には、セキュリティ確保のため、これらの情報が傍受、妨害または改ざんされることを防ぐ目的でSSL（Secure
                        Sockets Layer）技術を使用しております。
                    </Text>
                    <Text pl={"72"} pb={4}>
                        ※
                        SSLは情報を暗号化することで、盗聴防止やデータの改ざん防止送受信する機能のことです。SSLを利用する事でより安全に情報を送信する事が可能となります。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>8.お問合せ先</Text>
                    <Text pl={"72"} pb={4}>
                        特定商取引法に基づく表記をご覧ください。
                    </Text>
                </Box>

                <Box py={4} my={3} px={4}>
                    <Text>9.プライバシーポリシーの変更</Text>
                    <Text pl={"72"} pb={4}>
                        当ショップでは、収集する個人情報の変更、利用目的の変更、またはその他プライバシーポリシーの変更を行う際は、当ページへの変更をもって公表とさせていただきます
                    </Text>
                </Box>
            </Box>
        </>
    );
};

export default Privacy;
