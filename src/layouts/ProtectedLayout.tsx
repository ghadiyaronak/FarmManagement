import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

//chakra
import {
    Box,
    Drawer,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Text,
    useBreakpointValue,
    useDisclosure
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import TokenService from "../services/TokenService";
import AuthService from "../services/AuthService";

import { NAV_ITEMS } from "../utils/SidebarConstant";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../theme/styles";

// icons
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

// components
import AuthHeader from "../components/ProtectedComponent/AuthHeader";
import Footer from "../components/footer/FooterAdmin";

const NavItem = (props: any) => {
    const { icon, children, selected, label, path, ...rest } = props;
    const { t } = useTranslation();

    const currentTab = window.location.pathname;

    return (
        <Flex
            align="center"
            p={3}
            role="group"
            fontWeight="semibold"
            transition=".25s all linear"
            bg={currentTab?.includes(path) && globalStyles.colors.btn.blue}
            color={currentTab?.includes(path) && "white"}
            {...rest}
        >
            {/* {icon && <Icon boxSize="4" as={icon} />} */}
            {icon && icon(currentTab?.includes(path) ? "white" : "black")}

            <Text ml={2} fontSize={"sm"} color={currentTab?.includes(path) ? "white" : "black"}>
                {children}
            </Text>
        </Flex>
    );
};

const SidebarContent = ({ setExpandSideBar, expandSideBar, ...props }: any) => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleRedirection = ({ path, label }: any) => {
        if (label === t("analytics")) {
            window.open("https://analytics.google.com/", "_blank");
            props.onClose();
        } else if (label === t("line")) {
            window.open("https://manager.line.biz/account/@206bdpty/", "_blank");
            props.onClose();
        } else {
            navigate(path);
            sessionStorage.setItem("selectedtabadmin", path);
            props.onClose();
        }
    };

    return (
        <Box
            pos="fixed"
            h="-webkit-fill-available"
            left="0"
            zIndex="sticky"
            bg={"white"}
            borderRightWidth="1px"
            transition=".20s all linear"
            w={expandSideBar ? "40" : "12"}
            {...props}
        >
            <Flex
                direction="column"
                as="nav"
                fontSize="sm"
                aria-label="Main Navigation"
                justifyContent="space-between"
                h="full"
            >
                <Box>
                    {/* NAV_ITEMS */}
                    {NAV_ITEMS.map((nav: any) => {
                        return (
                            <NavItem
                                key={nav.id}
                                icon={nav.icon}
                                onClick={() => handleRedirection({ path: nav.path, label: t(nav.label) })}
                                cursor="pointer"
                                label={t(nav.label)}
                                path={nav.path}
                            >
                                {useBreakpointValue({ base: t(nav.label), lg: expandSideBar && t(nav.label) })}
                            </NavItem>
                        );
                    })}
                </Box>
                <IconButton
                    icon={expandSideBar ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    aria-label="icon"
                    variant="ghost"
                    onClick={() => setExpandSideBar(!expandSideBar)}
                />
            </Flex>
        </Box>
    );
};

const ProtectedLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [expandSideBar, setExpandSideBar] = useState(true);

    const getProfile = () => {
        dispatch(
            AuthService.getProfile(
                {},
                (responseData: any) => {},
                (errorData: any) => {}
            )
        );
    };

    const handleSidebar = () => {
        sessionStorage.setItem("selectedtabadmin", window.location.pathname);
    };

    useEffect(() => {
        const token = TokenService.getLocalAccessToken();

        if (token) {
            handleSidebar();
            return getProfile();
        }
        navigate("/login");
        sessionStorage.removeItem("selectedtabadmin");
    }, []);

    useEffect(() => {
        return () => {
            handleSidebar();
        };
    }, [navigate]);

    return (
        <Box minHeight="100vh" pos={"relative"} overflowX={"hidden"}>
            <AuthHeader open={onOpen} />

            <Box minH={"90vh"} mt={"14"}>
                <Box>
                    {/* sidebar which will be seen after lg breakpoint */}
                    <SidebarContent
                        display={{
                            base: "none",
                            lg: "unset"
                        }}
                        setExpandSideBar={setExpandSideBar}
                        expandSideBar={expandSideBar}
                        onClose={onClose}
                    />
                    {/* drawer for sm and md screen */}
                    <Drawer isOpen={isOpen} onClose={onClose} placement="left">
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerCloseButton />
                            <SidebarContent
                                w="full"
                                borderRight="none"
                                onClose={onClose}
                                display={{ base: "inline-block", lg: "none" }}
                            />
                        </DrawerContent>
                    </Drawer>
                    <Box
                        ml={useBreakpointValue({ base: "0", lg: expandSideBar ? "32" : "12" })}
                        transition=".20s all linear"
                        pt={3}
                        px={12}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </Box>

            <Box
                ml={useBreakpointValue({ base: "0", lg: expandSideBar ? "32" : "12" })}
                transition=".20s all linear"
                position={"sticky"}
                bottom={0}
            >
                <Footer />
            </Box>
        </Box>
    );
};

export default ProtectedLayout;
