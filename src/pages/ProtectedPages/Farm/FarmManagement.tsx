import {
    Badge,
    Box,
    Button,
    Flex,
    Text,
    useCallbackRef,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTableComponent from "../../../components/Table/DataTable";
import { useTranslation } from "react-i18next";
import MainHeading from "../../../components/menu/MainHeading";
import { globalStyles } from "../../../theme/styles";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import InputSelect from "../../../components/select/InputSelect";
import { useFormik } from "formik";
import MySelect from "../../../components/select/MySelect";
import SmallFormLabel from "../../../components/fields/SmallFormLabel";
import config from "../../../utils/config";
import { useDispatch } from "react-redux";
import FarmServices from "../../../services/FarmServices";
import dayjs from "dayjs";
import ExportExcel from "../../../components/button/Excelexport";

const FarmManagement = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const onChange = (dates: any) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const [searchForm, setSearchForm] = useState({
        name: "",
        email: "",
        phone: "",
        status: ""
    });

    const [isLoading, setIsLoading] = useState<any>(false);
    const today = new Date();
    const [endDate, setEndDate] = useState(today);
    const [constructionStartDate, setConstructionStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [farmData, setFarmData] = useState<any>([]);
    const [constructionEndDate, setConstructionEndDate] = useState(today);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [closingDate, setClosingDate] = useState(today);
    const [tableData, setTableData] = useState<any>([]);
    const { param } = useParams();
    const [filterData, setFilterData] = useState([]);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    function handleClick() {
        navigate("/add-farm");
    }

    const handleSearchData = () => {
        getFarmList(false);
    };

    function handleFarm(row: any) {
        navigate({ pathname: `/viewfarm/${row._id}`, search: `?tab=0` });
    }

    const handleReset = () => {
        setTableData([]);
        setFieldValue("registerDate", null);
        getFarmList(true);
        resetForm();
    };

    const getExcelData = async () => {
        const arrayOfId = tableData.map((data: any) => data._id);
        const excelData: any = await new Promise((resolve, reject) => {
            dispatch(
                FarmServices.DownloadFarmList(
                    {
                        id: arrayOfId
                    },
                    (successData: any) => {
                        resolve(successData?.data?.rows);
                        toast({
                            title: successData.message ? successData.message : successData?.data?.message,
                            status: "success",
                            duration: 3 * 1000,
                            isClosable: true,
                            position: "top-right"
                        });
                    },
                    (errorData: any) => {
                        toast({
                            title: errorData.message ? errorData.message : errorData?.data?.message,
                            status: "error",
                            duration: 3 * 1000,
                            isClosable: true,
                            position: "top-right"
                        });
                        reject();
                    }
                )
            );
        });

        return excelData;
    };

    const handleDelete = () => {
        dispatch(
            FarmServices.deleteFarm(
                {
                    id: farmData._id
                },
                (success: any) => {
                    getFarmList(true);
                    toast({
                        title: success.message,
                        status: "success",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                },
                (error: any) => {
                    toast({
                        title: error.message,
                        status: "error",
                        duration: 3 * 1000,
                        isClosable: true,
                        position: "top-right"
                    });
                }
            )
        );
    };
    const dispatch = useDispatch();
    const { values, handleChange, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty, touched } = useFormik(
        {
            initialValues: {
                farm_name: "",
                email: "",
                registerDate: undefined,

                status: {
                    label: "",
                    value: ""
                },
                contact_number: ""
            },
            onSubmit: handleSearchData
        }
    );

    const column = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}> {t("farm_mgmt.farm_name")}</Text>,
            selector: (row: any) => row?.farm_name,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Box onClick={() => navigate({ pathname: `/viewfarm/${row._id}`, search: `?tab=0` })}>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.farm_name ?? "--"}
                        </Text>
                    </Box>
                );
            },
            width: "200px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}> {t("farm_mgmt.owner_name")}</Text>,
            selector: (row: any) => row?.owner_id,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Box>
                        <Text
                            // color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"capitalize"}
                            // cursor={"pointer"}
                        >
                            {row?.owner_id ? row?.owner_id?.user_name : "--"}
                        </Text>
                    </Box>
                );
            },
            width: "150px"
        },

        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("common.email")}</Text>,
            selector: (row: any) => row?.email,
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 4,
            name: <Text fontWeight={"bold"}>{t("common.contact_number")}</Text>,

            cell: (row: any) => <Text>{row?.contact_number ? row?.contact_number : "--"}</Text>,
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 5,
            name: <Text fontWeight={"bold"}>{t("common.register_date")}</Text>,
            selector: (row: any) => row?.register_date,
            cell: (row: any) => (
                <Text>{row?.register_date ? dayjs(row?.register_date).format("YYYY/MM/DD") : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "150px"
        },
        {
            id: 6,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            sortable: true,
            wrap: true,

            cell: (row: any) => (
                <Badge variant={row?.status === "ACTIVE" ? "success" : "danger"}>
                    {row?.status === "ACTIVE" ? t("status.active") : t("status.block")}
                </Badge>
            ),
            width: "200px"
        },
        {
            id: 7,
            selector: (row: any) => row?.Action,
            name: (
                <Text display="flex" justifyContent="end" fontWeight={"bold"}>
                    {t("common.delete")}
                </Text>
            ),

            cell: (row: any) => (
                <Box display={"flex"} fontSize="24" cursor={"pointer"} onClick={() => setFarmData(row)}>
                    <AiOutlineDelete
                        // onClick={() => {
                        //     handleDelete(row);
                        // }}
                        onClick={onOpen}
                    />
                </Box>
            )
        }
    ];

    const handlerSearchValue = useCallbackRef((event: any, keyName: any) => {
        const value = event.target.value;

        setSearchForm((prev) => {
            return { ...prev, [keyName]: value };
        });
    }, []);

    const getFarmList = (isReset: boolean) => {
        setIsLoading(true);
        if (!isReset) {
            const farmName = values.farm_name;
            const email = values.email;
            const registerDate = values.registerDate;
            let formattedRegisterDate = "";
            if (registerDate) {
                formattedRegisterDate = dayjs(registerDate).format("YYYY-MM-DD");
            }

            const contactNumber = values.contact_number;
            const status = values.status.value;

            dispatch(
                FarmServices.getFarm(
                    {
                        farm_name: farmName ?? undefined,
                        email: email ?? undefined,
                        contact_number: contactNumber ?? undefined,
                        status: status ?? undefined,
                        register_date: formattedRegisterDate ?? undefined
                    },
                    (success: any) => {
                        setTableData(success.data.rows);
                        setIsLoading(false);
                    },
                    (error: any) => {
                        setIsLoading(false);
                    }
                )
            );
        } else {
            dispatch(
                FarmServices.getFarm(
                    {},
                    (success: any) => {
                        setTableData(success.data.rows);
                        setIsLoading(false);
                    },
                    (error: any) => {
                        setIsLoading(false);
                    }
                )
            );
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    useEffect(() => {
        getFarmList(false);
    }, []);

    return (
        <>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("Farm")} />
                <Button
                    size={"sm"}
                    rounded={"md"}
                    w={32}
                    onClick={handleClick}
                    bgColor={globalStyles.colors.btn.blue}
                    _hover={{ bgColor: "blue.300" }}
                    color={"white"}
                >
                    + {t("farm_mgmt.add_farm")}
                </Button>
            </Flex>

            <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    {t("common.search_condition")}
                </Text>
                <Flex gap={4} w={"full"} flexWrap={{ base: "nowrap", xl: "wrap", lg: "wrap", md: "wrap" }}>
                    <Flex flexDir={"column"} gap={3} mt={2} w={"xs"}>
                        <InputSelect
                            label={t("farm_mgmt.farm_name")}
                            value={values.farm_name}
                            handleChange={handleChange}
                            name={"farm_name"}
                            type="text"
                        />
                        <InputSelect
                            label={t("common.email")}
                            value={values.email}
                            handleChange={handleChange}
                            name={"email"}
                            type="text"
                        />
                        <InputSelect
                            label={t("common.contact_number")}
                            value={values.contact_number}
                            handleChange={handleChange}
                            name={"contact_number"}
                            type="text"
                        />
                    </Flex>

                    <Flex flexDir={"column"} gap={3} mt={2} w={"80"}>
                        <Flex justifyContent={"space-between"}>
                            <SmallFormLabel title={t("common.status")} />
                            <MySelect
                                value={values.status}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={config.FARM_STATUS}
                                name="status"
                                multi={false}
                            />
                        </Flex>
                    </Flex>

                    <Box w={"0.5px"} h={"28"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={2} mb={2} flexDir={"column"} ml={4}>
                        <Box w="36"></Box>
                        <ExportExcel getExcelData={getExcelData} fileName={"Device"} />
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty && disableReset} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>

            <Box rounded={"lg"} bgColor={"white"} px={5}>
                <DataTableComponent handleSubmit={handleFarm} column={column} data={tableData} />
            </Box>

            {/* Modal */}
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{t("farm_mgmt.delete_farm")}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        {t("messages.farm_delete_confirm")}
                    </ModalBody>

                    <ModalFooter display={"flex"} justifyContent={"center"} alignItems={"center"}>
                        <Button
                            _hover={{ bgColor: "blue.300" }}
                            bgColor="#4299e1"
                            variant="ghost"
                            color={"white"}
                            mr={3}
                            onClick={onClose}
                        >
                            {t("status.cancel")}
                        </Button>
                        <Box onClick={onClose}>
                            <Button
                                _hover={{ bgColor: "red.300" }}
                                onClick={handleDelete}
                                bgColor={"red.500"}
                                color={"white"}
                                variant="ghost"
                            >
                                {t("common.delete")}
                            </Button>
                        </Box>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default FarmManagement;
