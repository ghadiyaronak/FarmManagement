import { Badge, Box, Flex, Text, useCallbackRef, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MainHeading from "../../../components/menu/MainHeading";
import DataTableComponent from "../../../components/Table/DataTable";
import InputSelect from "../../../components/select/InputSelect";
import ReactDatePicker from "react-datepicker";
import SmallFormLabel from "../../../components/fields/SmallFormLabel";
import MySelect from "../../../components/select/MySelect";
import { globalStyles } from "../../../theme/styles";
import ExportExcel from "../../../components/button/Excelexport";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import config from "../../../utils/config";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import InquireService from "../../../services/InquireService";
import ja from "date-fns/locale/ja";

const InquiryManagement = () => {
    const [searchForm, setSearchForm] = useState({
        userName: "",
        farmName: "",
        dateOfContact: "",
        status: ""
    });
    const params = useParams();
    const [isLoading, setIsLoading] = useState<any>(false);
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const [inquirydata, setInquiryData] = useState<any>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useToast();

    function handleClick(row: any) {
        navigate(`/inquiry-view/${row._id}`);
    }

    const handleReset = () => {
        setInquiryData([]);
        getInquiry(true);
        resetForm();
    };

    const handleSearchData = () => {
        getInquiry(false);
    };

    const { values, handleChange, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty } = useFormik({
        initialValues: {
            userName: "",
            farmName: "",
            dateOfContact: undefined,
            status: {
                label: "",
                value: ""
            }
        },
        onSubmit: handleSearchData
    });

    const getExcelData = async () => {
        const arrayOfId = inquirydata.map((data: any) => data._id);
        const excelData: any = await new Promise((resolve, reject) => {
            dispatch(
                InquireService.DownloadDeviceList(
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

    const column = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("inquiry_mgmt.user_name")}</Text>,
            selector: (row: any) => row?.user,
            cell: (row: any) => {
                return (
                    <Flex alignItems={"center"} onClick={() => navigate(`/inquiry-view/${row._id}`, { state: row })}>
                        <Text fontWeight={"normal"} cursor={"pointer"}>
                            {row.user ?? "--"}
                        </Text>
                    </Flex>
                );
            },
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("farm_mgmt.farm_name")}</Text>,
            selector: (row: any) => row?.farm,
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 3,
            name: <Text fontWeight={"bold"}>{t("inquiry_mgmt.inquiry_title")}</Text>,
            selector: (row: any) => row?.title,
            sortable: true,
            wrap: true,
            width: "250px"
        },
        {
            id: 4,
            name: <Text fontWeight={"bold"}>{t("common.register_date")}</Text>,
            selector: (row: any) => row?.dateOfContact,
            cell: (row: any) => (
                <Text>{row?.dateOfContact ? dayjs(row?.dateOfContact).format("YYYY/MM/DD") : "--"}</Text>
            ),
            sortable: true,
            wrap: true,
            width: "200px"
        },
        {
            id: 5,
            name: (
                <Text fontWeight={"bold"} w={"full"} display={"flex"} justifyContent={"center"}>
                    {t("common.status")}
                </Text>
            ),
            selector: (row: any) => row?.status,
            cell: (row: any) => (
                <Badge
                    variant={
                        row?.status === "CONFIRMED"
                            ? "blue"
                            : row?.status === "UNCONFIRMED"
                            ? "danger"
                            : row?.status === "COMPLETED"
                            ? "success"
                            : "black"
                    }
                >
                    {row?.status === "CONFIRMED"
                        ? t("status.confirming")
                        : row?.status === "UNCONFIRMED"
                        ? t("status.unconfirmed")
                        : t("status.completed")}
                </Badge>
            ),

            sortable: true,
            wrap: true,
            width: "180px"
        }
    ];

    const getInquiry = (isReset: boolean) => {
        setIsLoading(true);
        if (!isReset) {
            const userName = values.userName;
            const farmname = values.farmName;
            const dateOfContact = values.dateOfContact;
            let formatteddatetimeDate = "";
            if (dateOfContact) {
                formatteddatetimeDate = dayjs(dateOfContact).format("YYYY-MM-DD");
            }

            const status = values.status.value;
            dispatch(
                InquireService.getInquiry(
                    {
                        userName: userName ?? undefined,
                        farmName: farmname ?? undefined,
                        dateOfContact: formatteddatetimeDate ?? undefined,
                        status: status ?? undefined
                    },

                    (success: any) => {
                        setInquiryData(success.data.rows);
                        setIsLoading(false);
                    },
                    (errorData: any) => {
                        setIsLoading(false);
                    }
                )
            );
        } else {
            dispatch(
                InquireService.getInquiry(
                    {
                        inquiryId: params._id
                    },
                    (success: any) => {
                        setInquiryData(success.data.rows);
                        setIsLoading(false);
                    },
                    (errorData: any) => {
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
        getInquiry(false);
    }, []);

    return (
        <>
            <Flex display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("inquiry")} />
            </Flex>

            <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    {t("common.search_condition")}
                </Text>
                <Flex gap={5} w={"full"} flexWrap={{ base: "nowrap", xl: "wrap", lg: "wrap", md: "wrap" }}>
                    <Flex flexDir={"column"} gap={3} w={"xs"}>
                        <InputSelect
                            label={t("inquiry_mgmt.user_name")}
                            value={values.userName}
                            handleChange={handleChange}
                            name={"userName"}
                            type="text"
                        />

                        <InputSelect
                            label={t("farm_mgmt.farm_name")}
                            value={values.farmName}
                            handleChange={handleChange}
                            name={"farmName"}
                            type="text"
                        />

                        <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontSize={14}>{t("common.register_date")}</Text>​
                            <Box>
                                <ReactDatePicker
                                    dateFormat="yyyy/MM/dd"
                                    className="form-date"
                                    locale={ja}
                                    selected={values.dateOfContact}
                                    onChange={(date: any) => {
                                        setFieldValue("dateOfContact", date);
                                    }}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={3} mt={2} w={"80"}>
                        <Flex justifyContent={"space-between"}>
                            <SmallFormLabel title={t("common.status")} />
                            <MySelect
                                value={values.status}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={config.INQUIRY_STATUS}
                                name="status"
                                multi={false}
                            />
                        </Flex>
                    </Flex>
                    <Box w={"0.5px"} h={"32"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={2} mb={2} flexDir={"column"} ml={4}>
                        {/* <ExportExcel /> */}
                        <Box w="36"></Box>
                        <ExportExcel getExcelData={getExcelData} fileName={"お問い合わせ"} />
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty && disableReset} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>

            <Box rounded={"lg"} bgColor={"white"} px={5}>
                <DataTableComponent handleSubmit={handleClick} column={column} data={inquirydata} />
            </Box>
        </>
    );
};

export default InquiryManagement;
