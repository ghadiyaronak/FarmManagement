import React, { useEffect, useState } from "react";
import AddSection from "../../../components/modals/AddSection";
import {
    Badge,
    Box,
    Flex,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
    Tooltip,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import MainHeading from "../../../components/menu/MainHeading";
import { globalStyles } from "../../../theme/styles";
import DataTableComponent from "../../../components/Table/DataTable";
import { useTranslation } from "react-i18next";
import { AiOutlineEdit } from "react-icons/ai";
import { BsLock, BsTrash, BsUnlock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../../store";
import FaqService from "../../../services/FaqService";
import AddButton from "../../../components/button/AddButton";
import AddFAQ from "../../../components/modals/AddFAQ";
import { setSectionList, setSelectedFaq, setSelectedSection } from "../../../store/actions/faq";
import DeleteFAQ from "../../../components/modals/DeleteFAQ";
import EnableFaqModal from "../../../components/modals/EnableFaqModal";
import { useNavigate } from "react-router-dom";

const FAQSmanagement = () => {
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [sectiondata, setSectionData] = useState<any>([]);
    const navigate = useNavigate();
    const [faqdata, setFaqData] = useState<any>([]);

    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const { isOpen: isSectionAddOpen, onOpen: onSectionAddOpen, onClose: onSectionAddClose } = useDisclosure();
    const { isOpen: isQuestionAddOpen, onOpen: onQuestionAddOpen, onClose: onQuestionAddClose } = useDisclosure();
    const { isOpen: isFaqDeleteOpen, onOpen: onFaqDeleteOpen, onClose: onFaqDeleteClose } = useDisclosure();
    const { isOpen: isFaqEnableOpen, onOpen: onFaqEnableOpen, onClose: onFaqEnableClose } = useDisclosure();

    const getAllSection = () => {
        setIsLoading(true);
        dispatch(
            FaqService.getAllSections(
                (success: any) => {
                    setSectionData(success.data.rows);
                    dispatch(setSectionList(success.data.rows));
                    setIsLoading(false);
                },
                (errorData: any) => {
                    setIsLoading(false);
                }
            )
        );
    };

    const getAllFaq = () => {
        setIsLoading(true);
        dispatch(
            FaqService.getAllFaq(
                (success: any) => {
                    setFaqData(success.data.rows);
                    setIsLoading(false);
                },
                (errorData: any) => {
                    setIsLoading(false);
                }
            )
        );
    };

    useEffect(() => {
        getAllSection();
        getAllFaq();
    }, []);

    // add Section
    const hanldeAddSection = () => {
        onSectionAddOpen();
        dispatch(setSelectedSection({ create: true }));
    };

    // Edit Section
    const handleEditSection = (row: any) => {
        onSectionAddOpen();
        dispatch(setSelectedSection({ ...row, edit: true }));
    };

    // add FAQ
    const hanldeAddFAQ = () => {
        onQuestionAddOpen();
        dispatch(setSelectedFaq({ create: true }));
    };

    //  Edit
    const handleEditFAQ = (row: any) => {
        onQuestionAddOpen();
        dispatch(setSelectedFaq({ ...row, edit: true }));
    };

    // delete FAQ
    const handleDeleteFAQ = (row: any) => {
        onFaqDeleteOpen();
        dispatch(setSelectedFaq(row));
    };

    const handleEnabledFaq = (row: any) => {
        dispatch(setSelectedFaq({ ...row }));
        onFaqEnableOpen();
        // setShowEnableFaq(true);
    };

    const sectiontableColumn = [
        {
            id: 1,
            name: "ID",
            selector: (row: any) => row?._id,
            omit: false,
            width: "100px",
            cell: (row: any) => (
                <Text as={"span"} cursor={"pointer"} color={globalStyles.colors.mainColor} fontWeight={"normal"}>
                    #{row._id && row._id?.substring(row._id.length - 5)}
                </Text>
            )
        },
        {
            id: 2,
            name: t("faq_mgmt.add_section"),
            selector: (row: any) => row.name,
            sortable: true,
            omit: false,
            grow: 2
        },
        {
            id: 4,
            name: t("faq_mgmt.priority"),
            selector: (row: any) => row?.priority,
            sortable: true,
            omit: false,
            grow: 1
        },
        {
            id: 3,
            name: t("faq_mgmt.status"),
            selector: (row: any) => row.enabled,
            sortable: true,
            cell: (row: any) =>
                row.enabled ? (
                    <Badge variant="outline" rounded={"md"} colorScheme="green">
                        {t("common.Enabled")}
                    </Badge>
                ) : (
                    <Badge variant="outline" colorScheme="red" rounded={"md"}>
                        {t("common.Disabled")}
                    </Badge>
                ),
            omit: false
        },

        {
            id: 5,
            name: t("faq_mgmt.action"),
            cell: (row: any) => (
                <HStack spacing={5}>
                    <AiOutlineEdit size={"18px"} cursor="pointer" onClick={() => handleEditSection(row)} />

                    <BsTrash
                        size={"18px"}
                        cursor="pointer"
                        onClick={() => handleDeleteFAQ({ ...row, type: "section", getAll: getAllSection })}
                    />
                    {row?.enabled ? (
                        <BsUnlock
                            size={"18px"}
                            cursor="pointer"
                            title={t("common.Enabled")}
                            onClick={() => handleEnabledFaq({ ...row, type: "section" })}
                        />
                    ) : (
                        <BsLock
                            size={"18px"}
                            cursor="pointer"
                            title={t("common.Disabled")}
                            onClick={() => handleEnabledFaq({ ...row, type: "section" })}
                        />
                    )}
                </HStack>
            )
        }
    ];

    const faqtableColumn = [
        {
            id: 1,
            name: "ID",
            selector: (row: any) => row?._id,
            omit: false,
            width: "100px",
            cell: (row: any) => (
                <Text as={"span"} cursor={"pointer"} color={globalStyles.colors.mainColor} fontWeight={"normal"}>
                    #{row._id && row._id?.substring(row._id.length - 5)}
                </Text>
            )
        },
        {
            id: 2,
            name: t("faq_mgmt.add_section"),
            selector: (row: any) => row?.faq_section?.name,
            sortable: true,
            omit: false,
            width: "200px",
            grow: 1,
            cell: (row: any) => (
                <Tooltip label={row?.faq_section?.name}>
                    <Text noOfLines={2} cursor="pointer">
                        {row?.faq_section?.name}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 3,
            name: t("faq_mgmt.priority"),
            selector: (row: any) => row?.priority,
            sortable: true,
            omit: false,
            grow: 1
        },

        {
            id: 4,
            name: t("faq_mgmt.question"),
            selector: (row: any) => row.question,
            sortable: true,
            omit: false,
            grow: 2,
            cell: (row: any) => (
                <Tooltip label={row.question}>
                    <Text noOfLines={2} cursor="pointer">
                        {row.question}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 5,
            name: t("faq_mgmt.answer"),
            selector: (row: any) => row.answer,
            sortable: true,
            omit: false,
            grow: 2,
            cell: (row: any) => (
                <Tooltip label={row.answer}>
                    <Text noOfLines={2} cursor="pointer">
                        {row.answer}
                    </Text>
                </Tooltip>
            )
        },
        {
            id: 6,
            name: t("faq_mgmt.status"),
            selector: (row: any) => row.enabled,
            sortable: true,
            cell: (row: any) =>
                row.enabled ? (
                    <Badge variant="outline" rounded={"md"} colorScheme="green">
                        {t("common.Enabled")}
                    </Badge>
                ) : (
                    <Badge variant="outline" rounded={"md"} colorScheme="red">
                        {t("common.Disabled")}
                    </Badge>
                ),
            omit: false
        },
        {
            id: 7,
            name: t("faq_mgmt.action"),
            cell: (row: any) => {
                return (
                    <HStack spacing={5}>
                        <AiOutlineEdit size={"18px"} cursor="pointer" onClick={() => handleEditFAQ(row)} />

                        <BsTrash
                            size={"18px"}
                            cursor="pointer"
                            onClick={() => handleDeleteFAQ({ ...row, type: "question", getAll: getAllFaq })}
                        />
                        {row?.enabled ? (
                            <BsUnlock
                                size={"18px"}
                                cursor="pointer"
                                title={t("common.Enabled")}
                                onClick={() => handleEnabledFaq({ ...row, type: "faq" })}
                            />
                        ) : (
                            <BsLock
                                size={"18px"}
                                cursor="pointer"
                                title={t("common.Disabled")}
                                onClick={() => handleEnabledFaq({ ...row, type: "faq" })}
                            />
                        )}
                    </HStack>
                );
            }
        }
    ];

    const tabs = [{ name: "セクション" }, { name: t("faq_mgmt.question") }];

    return (
        <>
            <AddSection isOpen={isSectionAddOpen} getAll={getAllSection} onClose={onSectionAddClose} />
            <AddFAQ isOpen={isQuestionAddOpen} onClose={onQuestionAddClose} getAll={getAllFaq} />

            <DeleteFAQ isOpen={isFaqDeleteOpen} onClose={onFaqDeleteClose} />

            <EnableFaqModal
                isOpen={isFaqEnableOpen}
                onClose={onFaqEnableClose}
                getAllFaq={getAllFaq}
                getAllSection={getAllSection}
            />

            <Box w="100%" position="relative">
                <Flex justify="space-between" align="center">
                    <MainHeading title={t("faq_mgmt.faq")} />
                    <Flex gap={3}>
                        <AddButton handleAdd={hanldeAddSection} title="セクション追加" />
                        <AddButton handleAdd={hanldeAddFAQ} title={t("faq_mgmt.add_question")} />
                    </Flex>
                </Flex>
                <Box my={5}>
                    <Tabs isFitted variant="enclosed">
                        <TabList>
                            {tabs.map((tab: any, index: number) => {
                                return (
                                    <Tab
                                        key={index}
                                        fontSize={{ base: "xs", md: "sm", lg: "md" }}
                                        _selected={{
                                            background: globalStyles.colors.mainColor,
                                            color: "gray.100"
                                        }}
                                        _hover={{ bgColor: "blue.300" }}
                                    >
                                        {tab.name}
                                    </Tab>
                                );
                            })}
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <Box w="100%">
                                    <DataTableComponent
                                        column={sectiontableColumn}
                                        data={sectiondata}
                                        handleSubmit={handleEditSection}
                                    />
                                </Box>
                            </TabPanel>
                            <TabPanel>
                                <Box w="100%">
                                    <DataTableComponent
                                        column={faqtableColumn}
                                        handleSubmit={handleEditFAQ}
                                        data={faqdata}
                                    />
                                </Box>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Box>
        </>
    );
};

export default FAQSmanagement;
