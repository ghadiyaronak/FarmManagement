import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

//Chakra UI imports
import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Popover,
    Avatar,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverBody,
    VStack,
    useToast,
    HStack,
    Radio,
    RadioGroup,
    Select,
    Image,
    Img,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    FormLabel,
    Input,
    ModalFooter
} from "@chakra-ui/react";

// redux
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

// icons
import { FiMenu } from "react-icons/fi";
import { BsPlusLg, BsTranslate } from "react-icons/bs";
import { BiStoreAlt, BiUser } from "react-icons/bi";
import { FaSignOutAlt, FaExchangeAlt } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import TokenService from "../../services/TokenService";

import { useEffect, useState } from "react";
import AuthService from "../../services/AuthService";
import { useFormik } from "formik";
import HeadingButtonRight from "../button/HeadingButton";

const AuthHeader = ({ open }: any) => {
    const [name, setName] = useState<any>("");
    const navigate = useNavigate();
    const toast = useToast();
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch();

    const Email = useSelector((state: any) => state?.Auth?.profile);
    const data = useSelector((state: any) => state?.Auth);

    const [authData, setAuthData] = useState<any>([]);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleLogout = () => {
        localStorage.removeItem("user");
        TokenService.removeUser();
        navigate("/login");
        sessionStorage.removeItem("selectedtabadmin");
        toast({
            title: t("messages.logout_success"),
            status: "success",
            position: "top-right",
            duration: 2000,
            isClosable: true
        });
    };

    const user = JSON.parse(localStorage?.getItem("user") as string) || null;
    const [userName, setUserName] = useState<boolean>(true);
    const token = user?.access_token;

    const handleHome = () => {
        navigate("/home");
    };

    const handleChangePassword = () => {
        navigate("/change-password");
    };

    const getProfile = (isReset: boolean) => {
        dispatch(
            AuthService.getProfile(
                {},
                (success: any) => {
                    setAuthData(success.data);
                },
                (error: any) => {
                    console.log(error);
                }
            )
        );
    };
    const onSubmit = () => {
        const data = {
            name: name
            // accessToken: user
        };

        dispatch(
            AuthService.updateProfile(
                { data: data },

                (responseData: any) => {
                    toast({
                        title: responseData.message ?? "--",
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    onClose();
                    getProfile(false);
                },
                (errorData: any) => {
                    toast({
                        title: errorData?.message ? errorData?.message : errorData.response?.data?.message,
                        status: "error",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                }
            )
        );
    };

    useEffect(() => {
        getProfile(false);
    }, []);
    return (
        <Flex
            as="header"
            align="center"
            justify="space-between"
            w="full"
            px="4"
            position="fixed"
            top={0}
            zIndex={5}
            bg="white"
            _dark={{
                bg: "gray.900"
            }}
            borderBottomWidth="1px"
            color="inherit"
            h="14"
        >
            <IconButton
                aria-label="Menu"
                display={{
                    base: "inline-flex",
                    lg: "none"
                }}
                onClick={open}
                icon={<FiMenu />}
                size="sm"
            />

            <Box
                onClick={handleHome}
                display={"flex"}
                cursor={"pointer"}
                justifyContent={"center"}
                alignItems={"center"}
            >
                <Box rounded={"sm"} w={"32"} h={"8"} p={0} ml={"-1"}>
                    <Image src="./navLogo.png" alt="navlogo" />
                </Box>
            </Box>

            <Flex align="center">
                <Stack
                    flex={{ base: 1, md: 1 }}
                    spacing={{ base: 2, md: 5 }}
                    justify="flex-end"
                    direction="row"
                    alignItems="center"
                >
                    <Box>
                        <Popover>
                            <PopoverTrigger>
                                <Flex gap={5} justifyContent={"center"} alignItems={"center"}>
                                    {authData.name ? (
                                        <Text cursor={"pointer"} onClick={onOpen}>
                                            {authData.name}
                                        </Text>
                                    ) : (
                                        <Box
                                            display={"flex"}
                                            cursor={"pointer"}
                                            justifyContent={"center"}
                                            alignItems={"center"}
                                            onClick={onOpen}
                                        >
                                            <Text cursor={"pointer"}>
                                                <BsPlusLg />
                                            </Text>
                                            <Text pr={5}>{t("auth_header.add_name")}</Text>
                                        </Box>
                                    )}

                                    <Avatar size="sm" name={authData.name} cursor="pointer" />
                                </Flex>
                            </PopoverTrigger>
                            <PopoverContent>
                                <PopoverArrow />

                                <PopoverBody>
                                    <VStack align="flex-start">
                                        <HStack>
                                            <BiUser />
                                            <Text>{Email}</Text>
                                        </HStack>

                                        <HStack>
                                            <FaExchangeAlt />
                                            <Text onClick={handleChangePassword} cursor="pointer">
                                                {t("login.change_password")}
                                            </Text>
                                        </HStack>
                                        <HStack>
                                            <FaSignOutAlt />
                                            <Text onClick={handleLogout} cursor="pointer">
                                                {t("login.logout")}
                                            </Text>
                                        </HStack>
                                    </VStack>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    </Box>
                </Stack>
            </Flex>

            <Modal
                isOpen={isOpen}
                onClose={() => {
                    onClose();
                    setUserName(true);
                }}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody pb={6}>
                        {userName && authData.name?.length > 0 ? (
                            <>
                                <ModalCloseButton />
                                <FormControl>
                                    <Flex mt={10}>
                                        <FormLabel fontWeight={"bold"}>{t("auth_header.name")}:</FormLabel>
                                        <Text>{authData.name}</Text>
                                    </Flex>
                                    <ModalFooter>
                                        <Button mt={3} colorScheme="blue" onClick={() => setUserName(!userName)}>
                                            {t("auth_header.edit")}
                                        </Button>
                                    </ModalFooter>
                                </FormControl>
                            </>
                        ) : (
                            <FormControl>
                                <ModalCloseButton />
                                <ModalHeader pl={0}>{t("auth_header.add_your_name")}</ModalHeader>
                                <FormLabel fontWeight={"bold"}>{t("auth_header.name")}:</FormLabel>
                                <Input placeholder={authData.name} onChange={(e) => setName(e.target.value)} />
                                <ModalFooter>
                                    <Button
                                        onClick={() => {
                                            onSubmit();
                                            setUserName(true);
                                        }}
                                        colorScheme="blue"
                                        mr={3}
                                    >
                                        {t("auth_header.save")}
                                    </Button>

                                    <Button
                                        onClick={() => {
                                            onClose();
                                            setUserName(true);
                                        }}
                                    >
                                        {t("auth_header.cancel")}
                                    </Button>
                                </ModalFooter>
                            </FormControl>
                        )}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    );
};

export default AuthHeader;
