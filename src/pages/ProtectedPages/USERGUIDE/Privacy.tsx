import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import MainHeading from "../../../components/menu/MainHeading";

const Privacy = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    return (
        <>
            <Box w={"full"} mt={4} bgColor={"white"}>
                <Flex display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    <MainHeading title={"プライバシーポリシー"} />
                </Flex>
                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報の定義</Text>
                    <Text>
                        「個人情報とは、個人情報の保護に関する法律に規定される生存する個人に関する情報（氏名、生年月日
                        、その他の特定の個人を識別することができる情報）、ならびに特定の個人と結びついて使用されるメ
                        ールアドレス、ユーザーＩＤ、パスワード、クレジットカードなどの情報、および個人情報と一体とな
                        った趣味、家族構成、年齢その他の個人に関する属性情報であると認識しています。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>クッキーおよびIPアドレス情報</Text>
                    <Text>
                        クッキーおよびＩＰアドレス情報については、それら単独では特定の個人を識別することができないた
                        め、個人情報とは考えておりません。ただしこれら情報と個人情報が一体となって使用される場合には
                        これら情報も個人情報とみなします。
                        弊社の運営するメディアにおいては、たとえ特定の個人を識別することができなくとも、クッキー及び
                        ＩＰアドレス情報を利用する場合には、その目的と方法を開示してまいります。また、クッキー情報に
                        ついては、ブラウザの設定で拒否することが可能です。クッキーを拒否するとサービスが受けられない
                        場合は、その旨も公表します。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>本サイトへのアクセス記録</Text>
                    <Text>
                        弊社では、よりよいサービスの提供を実現するため、本サイトの各コンテンツへのアクセス状況を分析
                        しています。アクセスログは、アクセスされた方のドメイン名やIPアドレス、使用しているブラウザの
                        種類、アクセス日時などが含まれますが、通常は個人を特定できる情報を含むものではありません。
                        お客様が本サイトにアクセスいただいた際に蓄積される情報は、 弊社において、統計的な処理をする以
                        外の利用は行いません。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報利用の制限</Text>
                    <Text>
                        弊社では、あらかじめご本人の同意を得ず、利用目的の達成に必要な範囲を超えて個人情報を取扱うこ
                        とはありません。合併その他の理由により個人情報を取得した場合にも、あらかじめご本人の同意を得
                        ないで、承継前の利用目的の範囲を超えて取扱うことはありません。
                        ただし、次の場合はこの限りではありません。
                        <br />
                        &nbsp; （１）法令に基づく場合 <br /> &nbsp;
                        （２）人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが
                        困難であるとき
                        <br /> &nbsp;
                        （３）公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の
                        同意を得ることが困難であるとき
                        <br />
                        &nbsp;
                        （４）国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに
                        対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼ
                        すおそれがあるとき
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報の適正な取得</Text>
                    <Text>
                        弊社は、個人情報の利用目的を変更する場合には、変更前の利用目的と相当の関連性を有すると合理的
                        に認められる範囲を超えては行わず、変更された利用目的について、ご本人に通知し、または公表しま
                        す。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報取得に際する利用目的の通知</Text>
                    <Text>
                        弊社は、個人情報を取得するにあたり、あらかじめその利用目的を公表します。ただし、次の場合はこ
                        の限りではありません。
                        <br />
                        &nbsp;
                        （１）利用目的をご本人に通知し、または公表することによりご本人または第三者の生命、身体、財産
                        その他の権利利益を害するおそれがある場合
                        <br />
                        &nbsp;
                        （２）利用目的をご本人に通知し、または公表することにより弊社の権利または正当な利益を害するお
                        それがある場合
                        <br />
                        &nbsp;
                        （３）国の機関もしくは地方公共団体が法令の定める事務を遂行することに対して協力する必要がある
                        場合であって、利用目的をご本人に通知し、または公表することにより当該事務の遂行に支障を及ぼす
                        おそれがあるとき
                        <br />
                        &nbsp;（４）取得の状況からみて利用目的が明らかであると認められる場合
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報利用目的の変更</Text>
                    <Text>
                        弊社は、個人情報の利用目的を変更する場合には、変更前の利用目的と相当の関連性を有すると合理的
                        に認められる範囲を超えては行わず、変更された利用目的について、ご本人に通知し、または公表しま
                        す。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報の安全管理、従業員の監督</Text>
                    <Text>
                        弊社は、個人情報の漏洩、滅失またはき損の防止その他の個人情報の安全管理が図られるよう、情報セ
                        キュリティ基本方針および情報セキュリティポリシーを掲げ、従業員に対する必要かつ適切な監督を行
                        います。
                        <br />
                        &nbsp;
                        弊社は、従業員に個人情報を取り扱わせるにあたっては、個人情報の安全管理が図られるよう、従業員
                        に対する必要かつ適切な監督を行います。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>委託先の監督</Text>
                    <Text>
                        弊社は、個人情報の取扱いの全部又は一部を委託する場合は、委託先と機密保持を含む契約の締結、ま
                        たは、弊社が定める約款に合意を求め、委託先において個人情報の安全管理が図られるよう、必要かつ
                        適切な監督を行います。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>第三者提供の制限</Text>
                    <Text>
                        弊社は、次に掲げる場合を除くほか、あらかじめご本人の同意を得ないで、個人情報を第三者に提供し
                        ません。
                        <br />
                        &nbsp; （１）法令に基づく場合 <br />
                        &nbsp;（２）人の生命、身体または財産の保護のために必要がある場合であって、ご本人の同意を得ることが
                        困難であるとき <br />
                        &nbsp;（３）公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、ご本人の
                        同意を得ることが困難であるとき <br />
                        &nbsp;（４）国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに
                        対して協力する必要がある場合であって、ご本人の同意を得ることにより当該事務の遂行に支障を及ぼ
                        すおそれがあるとき <br />
                        （５）予め次の事項を告知あるいは公表をしている場合 <br />
                        &nbsp;１）利用目的に第三者への提供を含むこと <br />
                        &nbsp;２）第三者に提供されるデータの項目
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>委託先の監督</Text>
                    <Text>
                        弊社は、ご本人から、個人情報の開示を求められたときは、ご本人に対し、遅滞なく開示します。ただ
                        し、開示することにより次のいずれかに該当する場合は、その全部または一部を開示しないこともあり
                        、開示しない決定をした場合には、その旨を遅滞なく通知します。 <br />
                        &nbsp;（１）ご本人または第三者の生命、身体、財産その他の権利利益を害するおそれがある場合 <br />
                        &nbsp;（２）弊社の業務の適正な実施に著しい支障を及ぼすおそれがある場合 <br />
                        &nbsp;（３）他の法令に違反することとなる場合 <br />
                        なお、アクセスログなどの個人情報以外の情報については、原則として開示いたしません。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>個人情報の利用停止等</Text>
                    <Text>
                        弊社は、ご本人から、ご本人の個人情報が、あらかじめ公表された利用目的の範囲を超えて取り扱われ
                        ているという理由、または偽りその他不正の手段により取得されたものであるという理由により、その
                        利用の停止または消去（以下「利用停止等」といいます）を求められた場合には、遅滞なく必要な調査
                        を行い、その結果に基づき、個人情報の利用停止等を行い、その旨ご本人に通知します。
                        ただし、個人情報の利用停止等に多額の費用を有する場合その他利用停止等を行うことが困難な場合で
                        あって、ご本人の権利利益を保護するために必要なこれに代わるべき措置をとれる場合は、この代替策
                        を講じます。
                    </Text>
                </Box>

                <Box py={2} px={4}>
                    <Text fontWeight={"bold"}>理由の説明</Text>
                    <Text>
                        弊社は、ご本人からの要求にもかかわらず、 <br />
                        &nbsp;（１）利用目的を通知しない <br />
                        &nbsp;（２）個人情報の全部または一部を開示しない <br />
                        &nbsp;（３）個人情報の利用停止等を行わない <br />
                        &nbsp;（４）個人情報の第三者提供を停止しない <br />
                        のいずれかを決定する場合、その旨ご本人に通知する際に理由を説明するよう努めます。
                    </Text>
                </Box>
            </Box>
        </>
    );
};

export default Privacy;
