import { Avatar, Badge, Box, Flex, Image, Text, WrapItem, useCallbackRef, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import DataTableComponent from "../../../components/Table/DataTable";
import { useTranslation } from "react-i18next";
import MainHeading from "../../../components/menu/MainHeading";
import { globalStyles } from "../../../theme/styles";
import SearchButton from "../../../components/button/SearchButton";
import ResetButton from "../../../components/button/ResetButton";
import ReactDatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import InputSelect from "../../../components/select/InputSelect";
import { useFormik } from "formik";
import MySelect from "../../../components/select/MySelect";
import SmallFormLabel from "../../../components/fields/SmallFormLabel";
import config from "../../../utils/config";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import UserService from "../../../services/UserService";
import FarmServices from "../../../services/FarmServices";
import ExportExcel from "../../../components/button/Excelexport";

const UserManagement = () => {
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
    const [disableReset, setDisableReset] = useState<boolean>(true);
    const today = new Date();
    const [endDate, setEndDate] = useState(today);
    const [constructionStartDate, setConstructionStartDate] = useState(
        new Date(today.getFullYear(), today.getMonth(), 1)
    );
    const [constructionEndDate, setConstructionEndDate] = useState(today);
    const [startDate, setStartDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
    const [closingDate, setClosingDate] = useState(today);
    const [userData, setUserData] = useState<any>([]);
    const dispatch = useDispatch();

    const [farmName, setFarmName] = useState<any>([]);
    const toast = useToast();
    function handleClick(row: any) {
        navigate(`/user-view/${row._id}`);
    }
    const handleReset = () => {
        setUserData([]);
        setFieldValue("registerDate", null);
        getUserList(true);
        resetForm();
    };
    const handleSearchData = () => {
        getUserList(false);
    };

    const getExcelData = async () => {
        const arrayOfId = userData.map((data: any) => data._id);

        const excelData: any = await new Promise((resolve, reject) => {
            dispatch(
                UserService.DownloadUSerList(
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

    const { values, handleChange, handleSubmit, setFieldValue, resetForm, setFieldTouched, dirty } = useFormik({
        initialValues: {
            name: "",
            farm_id: {
                label: "",
                value: ""
            },
            email: "",
            registerDate: undefined,
            status: {
                label: "",
                value: ""
            },
            role: {
                label: "",
                value: ""
            },
            contact_number: ""
        },
        onSubmit: handleSearchData
    });

    const column = [
        {
            id: 1,
            name: <Text fontWeight={"bold"}>{t("common.name")}</Text>,
            selector: (row: any) => row?.user_name,
            sortable: true,
            wrap: true,
            cell: (row: any) => {
                return (
                    <Flex alignItems={"center"} onClick={() => navigate(`/user-view/${row._id}`, { state: row })}>
                        <WrapItem pr={2}>
                            <Avatar src={row?.profile_image?.url} name={row?.user_name} />
                        </WrapItem>
                        <Text
                            color={globalStyles.colors.mainColor}
                            fontWeight={"normal"}
                            textTransform={"uppercase"}
                            cursor={"pointer"}
                        >
                            {row.user_name?.toString().substring(row.user_name, row?.user_name.length)}
                        </Text>
                    </Flex>
                );
            },
            width: "250px"
        },
        {
            id: 2,
            name: <Text fontWeight={"bold"}>{t("device_mgmt.farm_name")}</Text>,
            selector: (row: any) => (row?.farm_id?.farm_name ? row?.farm_id?.farm_name : "--"),
            sortable: true,
            wrap: true,
            width: "130px"
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
            selector: (row: any) => row?.contact_number,
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

            width: "180px"
        }
    ];
    const handlerSearchValue = useCallbackRef((event: any, keyName: any) => {
        const value = event.target.value;
        setSearchForm((prev) => {
            return { ...prev, [keyName]: value };
        });
    }, []);

    const getFarmName = () => {
        dispatch(
            FarmServices.getFarm(
                {},
                (success: any) => {
                    let newArray: any = [];
                    success?.data?.rows.map((farmDetails: any, index: any) => {
                        newArray.push({
                            label: farmDetails.farm_name,
                            value: farmDetails._id
                        });
                        setFarmName(newArray);
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
                }
            )
        );
    };

    const getUserList = (isReset: boolean) => {
        setIsLoading(true);
        if (!isReset) {
            const userName = values.name;
            const email = values.email;
            const farm = values.farm_id.value;
            const registerDate = values.registerDate;
            let formattedRegisterDate = "";
            if (registerDate) {
                formattedRegisterDate = dayjs(registerDate).format("YYYY-MM-DD");
            }
            const contactNumber = values.contact_number;
            const status = values.status.value;
            const role = values.role.value;
            dispatch(
                UserService.getUser(
                    {
                        user_name: userName ?? undefined,
                        farm_id: farm ?? undefined,
                        email: email ?? undefined,
                        contact_number: contactNumber ?? undefined,
                        status: status ?? undefined,
                        register_date: formattedRegisterDate ?? undefined,
                        role: role ?? undefined
                    },
                    (success: any) => {
                        setUserData(success.data.rows);
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
        } else {
            dispatch(
                UserService.getUser(
                    {},
                    (success: any) => {
                        setUserData(success.data.rows);
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
        }
    };

    useEffect(() => {
        getUserList(false), getFarmName();
    }, []);
    return (
        <>
            <Flex display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <MainHeading title={t("user_mgmt.user")} />
            </Flex>

            <Box bgColor={"white"} p={4} rounded={"lg"} my={3} mt={2}>
                <Text display={"flex"} fontWeight={"bold"} mb={3}>
                    {t("common.search_condition")}
                </Text>
                <Flex gap={5} w={"full"}>
                    <Flex flexDir={"column"} gap={3} w={"xs"}>
                        <InputSelect
                            label={t("user_mgmt.user_name")}
                            value={values.name}
                            handleChange={handleChange}
                            name={"name"}
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
                        <Flex justifyContent={"space-between"} gap={3}>
                            <Text fontSize={14}>{t("common.register_date")}</Text>​
                            <Box>
                                <ReactDatePicker
                                    dateFormat="yyyy/MM/dd"
                                    className="form-date"
                                    selected={values.registerDate}
                                    onChange={(date: any) => {
                                        setFieldValue("registerDate", date);
                                    }}
                                />
                            </Box>
                        </Flex>
                    </Flex>
                    <Flex flexDir={"column"} gap={3} mt={2} w={"80"}>
                        <Flex justifyContent={"space-between"}>
                            <SmallFormLabel title={t("device_mgmt.farm_name")} />
                            <MySelect
                                value={values.farm_id}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={farmName}
                                name={"farm_id"}
                                multi={false}
                            />
                        </Flex>
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
                        <Flex justifyContent={"space-between"}>
                            <SmallFormLabel title={t("user_mgmt.role")} />
                            <MySelect
                                value={values.role}
                                onChange={setFieldValue}
                                onBlur={setFieldTouched}
                                options={config.USER_ROLE}
                                name="role"
                                multi={false}
                            />
                        </Flex>
                    </Flex>
                    <Box w={"0.5px"} h={"32"} bgColor={globalStyles.colors.mainColor} />
                    <Flex gap={2} mb={2} flexDir={"column"} ml={4}>
                        <Box w="36"></Box>
                        <ExportExcel getExcelData={getExcelData} fileName={"User"} />
                        <SearchButton isLoading={isLoading} handleSearchData={handleSubmit} />
                        <ResetButton isDisabled={!dirty && disableReset} handleReset={handleReset} />
                    </Flex>
                </Flex>
            </Box>
            <Box rounded={"lg"} bgColor={"white"} px={5}>
                <DataTableComponent handleSubmit={handleClick} column={column} data={userData} />
            </Box>
        </>
    );
};
export default UserManagement;
