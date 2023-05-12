import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Divider,
    Flex,
    FormControl,
    Heading,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Stack,
    StackDivider,
    Text,
    WrapItem,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useNavigate, useParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import { useDispatch } from "react-redux";
import UserService from "../../../services/UserService";
import dayjs from "dayjs";
import { BiLinkExternal } from "react-icons/bi";

interface EditProps {
    mode?: any;
    contractInformationData?: any;
    getContractDetails?: any;
}

const ViewFarm = ({ mode }: EditProps) => {
    const { t } = useTranslation();
    const toast = useToast();
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modal, setModal] = useState<any>(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [userData, setUserData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUserList = () => {
        dispatch(
            UserService.getUser(
                {
                    userId: params._id
                },
                (success: any) => {
                    setUserData(success.data.rows[0]);
                },
                (errorData: any) => {
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    const handleUpdateStatus = () => {
        setIsLoading(true);
        const data = {
            status: userData?.status === "ACTIVE" ? "BLOCK" : "ACTIVE"
        };
        dispatch(
            UserService.updateUser(
                { _id: userData?._id, data },
                (responseData: any) => {
                    getUserList();
                    onClose();
                    setIsLoading(false);
                },
                (errorData: any) => {
                    setIsLoading(false);
                    toast({
                        title: errorData.message ? errorData.message : errorData?.data?.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <>
            <Box w={"3xl"} pt={4}>
                <Card>
                    <Box py={4} my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                        <Stack position={"absolute"} mx={5}>
                            <ReturnButton />
                        </Stack>
                        <CardHeader
                            p={0}
                            display={"flex"}
                            justifyContent={"center"}
                            alignItems={"center"}
                            alignContent={"center"}
                            width="full"
                        >
                            <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                                {t("user_mgmt.user_details")}
                            </Heading>
                        </CardHeader>
                    </Box>

                    <WrapItem px={5} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Avatar size="2xl" borderRadius={"md"} src={userData?.profile_image?.url ?? "--"} />
                    </WrapItem>

                    <CardBody>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {"ID"}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?._id ? userData?._id : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("common.name")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.user_name ? userData?.user_name : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                    {t("farm_mgmt.farm")}
                                </Heading>
                                <Text
                                    p={3}
                                    cursor={"pointer"}
                                    color={globalStyles.colors.mainColor}
                                    onClick={(row: any) =>
                                        userData?.farm_id?.farm_name
                                            ? navigate({
                                                  pathname: `/viewfarm/${userData?.farm_id?._id}`,
                                                  search: `?tab=0`
                                              })
                                            : ""
                                    }
                                    display={"Flex"}
                                    alignItems={"center"}
                                    fontSize="md"
                                >
                                    {userData?.farm_id?.farm_name ? userData?.farm_id?.farm_name : "--"}
                                    <BiLinkExternal />
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.email")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.email ? userData?.email : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.contact_number")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.contact_number ? userData?.contact_number : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("user_mgmt.role")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.isOwner ? t("user_status.admin") : t("user_status.red_only")}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.status")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.status === "ACTIVE" ? t("status.active") : t("status.block")}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("common.register_date")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.register_date
                                        ? dayjs(userData?.register_date).format("YYYY/MM/DD")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                        <Stack divider={<StackDivider />} spacing="4">
                            <Flex>
                                <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                    {t("user_mgmt.last_login")}
                                </Heading>
                                <Text p={3} fontSize="md">
                                    {userData?.last_login
                                        ? dayjs(userData?.last_login).format("YYYY/MM/DD hh:mm:ss")
                                        : "--"}
                                </Text>
                            </Flex>
                        </Stack>
                        <Divider />
                    </CardBody>

                    <Box display={"flex"} justifyContent={"center"} alignItems={"center"} py={2}>
                        <Button
                            onClick={onOpen}
                            isLoading={isLoading}
                            bgColor={userData?.status === "ACTIVE" ? "#4299e1" : "red"}
                            _hover={{ bgColor: userData?.status === "ACTIVE" ? "#4299e1.400" : "red.400" }}
                            color={"white"}
                            w={"36"}
                        >
                            {userData?.status == "ACTIVE" ? t("status.active") : t("status.block")}
                        </Button>
                    </Box>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent mt={"64"}>
                            <ModalHeader>{t("common.action")}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Box>
                                    <FormControl gap={10} display="flex" justifyContent={"center"} mt={5}>
                                        {userData?.status === "ACTIVE" ? (
                                            <Text>{t("messages.suspend_message")}</Text>
                                        ) : (
                                            <Text>{t("messages.active_message")}</Text>
                                        )}
                                    </FormControl>
                                </Box>
                            </ModalBody>
                            <ModalFooter>
                                <Box
                                    gap={10}
                                    w={"full"}
                                    display="flex"
                                    justifyContent={"center"}
                                    onClick={() => setModal(false)}
                                >
                                    <Button
                                        bgColor={globalStyles.colors.mainColor}
                                        onClick={handleUpdateStatus}
                                        color={"white"}
                                        mr={3}
                                    >
                                        {t("status.yes")}
                                    </Button>
                                    <Button bgColor={"red.400"} color={"white"} onClick={onClose}>
                                        {t("status.no")}
                                    </Button>
                                </Box>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Card>
            </Box>
        </>
    );
};

export default ViewFarm;