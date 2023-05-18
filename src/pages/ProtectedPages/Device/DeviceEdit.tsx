import React, { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { Box, CardHeader, Divider, Flex, Heading, Stack, StackDivider, Text, useToast } from "@chakra-ui/react";
import MainHeading from "../../../components/menu/MainHeading";
import { useTranslation } from "react-i18next";
import InputField from "../../../components/form/InputFild";
import FormInput from "../../../components/form/FormInput";
import DatePickerCustom from "../../../components/fields/DatePickerCustom";
import FormFildLabel from "../../../components/form/FormLabel";
import CustomTextArea from "../../../components/form/CustomTextArea";
import FarmStatusSelect from "../../../components/form/FarmStatusSelect";
import MemoFild from "../../../components/form/MemoFild";
import SaveButton from "../../../components/button/SaveButton";
import config from "../../../utils/config";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import DeviceService from "../../../services/DeviceService";
import { useNavigate, useParams } from "react-router-dom";
import { globalStyles } from "../../../theme/styles";
import { BiLinkExternal } from "react-icons/bi";
import dayjs from "dayjs";

const DeviceEdit = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();

    const toast = useToast();
    const navigate = useNavigate();
    const [deviceData, setDeviceData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getDeviceList = () => {
        dispatch(
            DeviceService.getDevice(
                {
                    deviceId: params.id
                },

                (success: any) => {
                    const device = success.data.rows[0];
                    setFieldValue("_id", device?._id);
                    setFieldValue("name", device?.name);
                    setFieldValue("deviceAccess", device?.deviceAccess);
                    setFieldValue("user_name", device?.farm_id?.owner_id?.user_name);
                    setFieldValue("current_value", device?.current_value);
                    setFieldValue("mac_address", device?.mac_address);
                    setFieldValue("location", device?.location);
                    setFieldValue("lastDateTime", dayjs(device?.lastDateTime).format("YYYY/MM/DD hh:mm:ss"));
                    setFieldValue("register_date", dayjs(device?.register_date).format("YYYY/MM/DD"));
                    setFieldValue("farm_name", device?.farm_id?.farm_name);
                    setFieldValue("memoDeveloper", device?.memoDeveloper);
                    setFieldValue("memo", device?.memo);
                    setFieldValue("status", device?.status);

                    setDeviceData(device);
                },
                (error: any) => {
                    console.log(error);
                }
            )
        );
    };

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            _id: values._id,
            memo: values.memo,
            name: values.name,
            user_name: values.user_name,
            deviceAccess: values.deviceAccess,
            location: values.location,
            farm_name: values.farm_name,
            register_date: values.register_date,
            lastDateTime: values.lastDateTime,
            mac_addresse: values.mac_address,
            current_value: values.current_value,
            memoDeveloper: values.memoDeveloper,
            status: values.status.value
        };
        dispatch(
            DeviceService.updateDevice(
                { _id: params._id, data },
                (responseData: any) => {
                    toast({
                        title: responseData?.message ? responseData.message : responseData.response?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    setIsLoading(false);
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
                    setIsLoading(false);
                }
            )
        );
        setTimeout(() => {
            navigate(`/device-view/${params._id}`);
        }, 2000);
    };

    const {
        values,
        handleChange,
        handleBlur,
        handleSubmit,
        setFieldTouched,
        setFieldValue,
        resetForm,
        errors,
        touched
    } = useFormik({
        initialValues: {
            _id: "",
            user_name: "",
            deviceAccess: "",
            memoDeveloper: "",
            register_date: "",
            current_value: "",
            mac_address: "",
            lastDateTime: "",
            location: "",
            farm_id: "",
            farm_name: "",
            name: "",
            memo: "",
            status: {
                lable: "",
                value: ""
            }
        },
        onSubmit
    });

    useEffect(() => {
        getDeviceList();
    }, []);

    return (
        <>
            <Box w={"4xl"} pt={4} bg={"white"} rounded={"lg"} mt={4}>
                <Box my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                    <Stack position={"absolute"} mx={5}>
                        <ReturnButton />
                    </Stack>
                    <Box
                        p={0}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        width="full"
                    >
                        <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                            {t("device_mgmt.device_edit")}
                        </Heading>
                    </Box>
                </Box>
                <Flex flexDir={"column"} w={"full"} px={5} mt={7}>
                    <Stack divider={<StackDivider />} borderTop={"1px solid #E0E0E0"} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                {"ID"}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?._id ? deviceData?._id : "--"}
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
                                {deviceData?.name ? deviceData?.name : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("device_mgmt.current_value")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.current_value === "OPEN" ? t("status.open") : t("status.close")}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                {t("device_mgmt.mac_address")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.mac_address ? deviceData?.mac_address : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("device_mgmt.location")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.location ? deviceData?.location : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("device_mgmt.farm_name")}
                            </Heading>
                            <Text
                                p={3}
                                fontSize="md"
                                cursor={"pointer"}
                                color={globalStyles.colors.mainColor}
                                display={"Flex"}
                                alignItems={"center"}
                                // onClick={handleChange}
                                onClick={() => navigate(`/viewfarm/${deviceData?.farm_id._id}`)}
                            >
                                {deviceData?.farm_id?.farm_name ? deviceData?.farm_id?.farm_name : "--"}{" "}
                                <BiLinkExternal />
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("farm_mgmt.owner_name")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.farm_id?.owner_id?.user_name
                                    ? deviceData?.farm_id?.owner_id?.user_name
                                    : "--"}
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
                                {/* {deviceData?.status ? deviceData?.status : "--"} */}
                                {deviceData?.status === "OPERATIONAL"
                                    ? t("status.operational")
                                    : t("status.non_operational")}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    {/* <FarmStatusSelect
                        touched={touched.status}
                        error={errors.status}
                        isMandatory={true}
                        value={values.status}
                        label={t("common.status")}
                        onChange={setFieldValue}
                        options={config.DEVICE_STATUS}
                        name="status"
                        multi={false}
                        onBlur={handleBlur}
                    />
                    <Divider /> */}

                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("device_mgmt.device_access")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.deviceAccess === "ENABLE" ? t("status.enable") : t("status.disable")}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <Flex w={"full"}>
                        <FormFildLabel label={t("farm_mgmt.memo_developer")} isMandatory={false} />
                        <CustomTextArea
                            name="memoDeveloper"
                            value={values.memoDeveloper}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.memoDeveloper}
                            touched={touched.memoDeveloper}
                            isMandatory={false}
                            style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                        />
                    </Flex>
                    <Divider />

                    <Flex w={"full"}>
                        <FormFildLabel label={t("farm_mgmt.memo")} isMandatory={false} />
                        <CustomTextArea
                            name="memo"
                            value={values.memo}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.memo}
                            touched={touched.memo}
                            isMandatory={false}
                            style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                        />
                    </Flex>

                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("common.register_date")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.register_date
                                    ? dayjs(deviceData?.register_date).format("YYYY/MM/DD")
                                    : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("farm_mgmt.last_datetime")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {deviceData?.lastDateTime
                                    ? dayjs(deviceData?.lastDateTime).format("YYYY/MM/DD HH:MM")
                                    : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                </Flex>
            </Box>

            {/* </Box> */}
        </>
    );
};

export default DeviceEdit;
