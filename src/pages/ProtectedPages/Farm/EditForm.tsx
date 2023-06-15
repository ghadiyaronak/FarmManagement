import { useEffect, useState } from "react";
import { Box, Divider, Flex, FormLabel, Heading, Stack, StackDivider, Text, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import config from "../../../utils/config";
import CustomTextArea from "../../../components/form/CustomTextArea";
import FormFildLabel from "../../../components/form/FormLabel";
import FarmStatusSelect from "../../../components/form/FarmStatusSelect";
import SaveButton from "../../../components/button/SaveButton";
import MemoFild from "../../../components/form/MemoFild";
import ReturnButton from "../../../components/fields/ReturnButton";
import FarmServices from "../../../services/FarmServices";
import { useDispatch } from "react-redux";
import DatePickerCustom from "../../../components/fields/DatePickerCustom";
import HeadingButtonRight from "../../../components/button/HeadingButton";
import dayjs from "dayjs";
import FormInput from "../../../components/form/FormInput";
import EditFormInput from "../../../components/form/EditFormInput";
import FormTextArea from "../../../components/form/FormTextArea";
import * as yup from "yup";
import ReactDatePicker from "react-datepicker";
import ja from "date-fns/locale/ja";
import MainHeading from "../../../components/menu/MainHeading";

interface ProductFormProps {
    value?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    setFieldValue?: any;
}

const EditForm = ({ value }: ProductFormProps) => {
    const [farmData, setFarmData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [registerDate, setRegisterDate] = useState<Date | null>(null);
    const [contractStartDateDate, setcontractStartDateDate] = useState<Date | null>(null);
    const [contractEndDateDate, setcontractEndDateDate] = useState<Date | null>(null);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const toast = useToast();
    const navigate = useNavigate();

    const getFarmListById = () => {
        dispatch(
            FarmServices.getFarm(
                {
                    farmId: params.id
                },
                (success: any) => {
                    const farm = success.data.rows[0];

                    setFieldValue("farm_name", farm?.farm_name);
                    setFieldValue("owner_name", farm?.owner_id?.user_name);
                    setFieldValue("register_date", dayjs(farm?.register_date).format("YYYY/MM/DD"));
                    setFieldValue("memo", farm?.memo);
                    setFieldValue("email", farm?.email);
                    setFieldValue("contact_number", farm?.contact_number);
                    setFieldValue("address", farm?.address);
                    setFieldValue("postalCode", farm?.postalCode);
                    setFieldValue("prefecture", farm?.prefecture);
                    setFieldValue("city", farm?.city);
                    setFieldValue("subArea", farm?.subArea);
                    setFieldValue("subAreaNumber", farm?.subAreaNumber);
                    setFieldValue("contractStartDate", dayjs(farm?.contractStartDate).format("YYYY/MM/DD"));
                    setFieldValue("contractEndDate", dayjs(farm?.contractEndDate).format("YYYY/MM/DD"));

                    setcontractStartDateDate(new Date(farm?.contractStartDate));
                    setcontractEndDateDate(new Date(farm?.contractEndDate));

                    setFieldValue("status", {
                        label: farm?.status === "BLOCK" ? "無効 " : "有効 ",
                        value: farm?.status
                    });

                    setFarmData(farm);
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

    const productSchema = yup.object().shape({
        // register_date: yup.string().required(t("messages.register_date_is_required")),
        contact_number: yup
            .string()
            .min(10, t("messages.10_digit_contact_number_is_required!"))
            .max(10, t("messages.10_digit_contact_number_is_required!"))
            .required(t("messages.contact_number_field_is_required")),
        postalCode: yup
            .string()
            .min(7, t("messages.minimum_7_character"))
            .max(7, t("messages.maximum_7_character"))
            .required(t("messages.postal_code")),
        prefecture: yup.string().required(t("messages.prefecture")),
        city: yup.string().required(t("messages.city")),
        subArea: yup.string().required(t("messages.sub_area")),
        status: yup.object().shape({
            value: yup.string().required(t("messages.status_field_is_required"))
        })
    });

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            owner_name: values.owner_name,
            address: values.address,
            status: values.status.value,
            register_date: dayjs(values.register_date).format("YYYY-MM-DD"),
            memo: values.memo,
            contact_number: values.contact_number,
            postalCode: values.postalCode,
            prefecture: values.prefecture,
            subArea: values.subArea,
            city: values.city,
            subAreaNumber: values.subAreaNumber,
            contractStartDate: dayjs(values.contractStartDate).format("YYYY-MM-DD"),
            contractEndDate: dayjs(values.contractEndDate).format("YYYY-MM-DD")
        };
        dispatch(
            FarmServices.updateFarm(
                { _id: params.id, data },
                (responseData: any) => {
                    toast({
                        title: responseData?.message ? responseData?.message : responseData.response?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });
                    setIsLoading(false);
                    navigate(`/viewfarm/${params.id}`);
                },
                (errorData: any) => {
                    setIsLoading(false);
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
            farm_name: "",
            owner_name: "",
            register_date: "",
            contractStartDate: "",
            contractEndDate: "",
            contact_number: "",
            prefecture: "",
            postalCode: "",
            subArea: "",
            email: "",
            subAreaNumber: "",
            city: "",
            memo: "",
            address: "",
            status: {
                lable: "",
                value: ""
            },
            contactNumber: ""
        },
        onSubmit,
        validationSchema: productSchema
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, []);

    console.log({ values });

    useEffect(() => {
        getFarmListById();
    }, []);

    return (
        <>
            <Box w={"4xl"} bg={"white"} rounded={"lg"} mt={4} pt={4}>
                <Box my={3} position={"relative"} display={"flex"} alignItems={"center"}>
                    <Stack position={"absolute"} mx={5}>
                        <ReturnButton />
                    </Stack>
                    <Text
                        p={0}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        alignContent={"center"}
                        width="full"
                    >
                        <MainHeading title={t("farm_mgmt.edit_farm_details")} />
                    </Text>
                </Box>
                <Flex flexDir={"column"} px={5} w={"full"} mt={7}>
                    <Divider />
                    <Stack divider={<StackDivider />}>
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                {"ID"}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {farmData?._id ? farmData?._id : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                {t("farm_mgmt.farm_name")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {farmData?.farm_name ? farmData?.farm_name : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19}>
                                {t("farm_mgmt.owner_name")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {farmData?.owner_id?.user_name ? farmData?.owner_id?.user_name : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <Flex flex={1} fontSize={"sm"} alignItems={"center"}>
                        <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                            {t("common.register_date")}
                        </FormLabel>
                        <Box ps={3} w={"lg"}>
                            <ReactDatePicker
                                className={`custom ${touched.register_date && !registerDate}`}
                                locale={ja}
                                name="register_date"
                                placeholderText={String(t(""))}
                                minDate={new Date()}
                                onChange={(date: any) => {
                                    setFieldValue("register_date", dayjs(date).format("YYYY/MM/DD"));
                                }}
                                dateFormat={"YYYY/MM/DD"}
                                value={values.register_date}
                                popperClassName="popper-class"
                                popperPlacement="bottom-start"
                                showPopperArrow={false}
                            />
                            {/* {touched.register_date && !registerDate ? (
                                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                    {t("messages.register_date_is_required")}
                                </Text>
                            ) : (
                                ""
                            )} */}
                        </Box>
                    </Flex>

                    <Flex flex={1} fontSize={"sm"} borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
                        <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                            {t("farm_mgmt.construction_period")}
                        </FormLabel>
                        <Box ps={3} w={"lg"}>
                            <ReactDatePicker
                                className={`custom ${
                                    (touched.contractStartDate && !contractStartDateDate) ||
                                    (touched.contractEndDate && !contractEndDateDate)
                                        ? "border-red"
                                        : ""
                                }`}
                                dateFormat="yyyy/MM/dd"
                                selected={contractStartDateDate}
                                locale={ja}
                                minDate={new Date(values.register_date)}
                                placeholderText={String(t(""))}
                                onChange={(dates: any) => {
                                    const [start, end] = dates;
                                    setcontractStartDateDate(start);
                                    setcontractEndDateDate(end);

                                    setFieldValue("contractStartDate", dayjs(start).format("YYYY/MM/DD"));
                                    setFieldValue("contractEndDate", dayjs(end).format("YYYY/MM/DD"));
                                }}
                                onChangeRaw={() => {
                                    setFieldTouched("contractStartDate", true, true);
                                    setFieldTouched("contractEndDate", true, true);
                                }}
                                startDate={contractStartDateDate}
                                endDate={contractEndDateDate}
                                selectsRange
                                // className="custom custom-date"
                                popperClassName="popper-class"
                                popperPlacement="bottom-start"
                                // minDate={today}
                                // todayButton={t("common.today")}
                                showPopperArrow={false}
                                isClearable
                            />
                            {(touched.contractStartDate && !contractStartDateDate) ||
                            (touched.contractEndDate && !contractEndDateDate) ? (
                                <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                    {t("farm_mgmt.construction_period")}必要
                                </Text>
                            ) : (
                                ""
                            )}
                        </Box>
                    </Flex>
                    <Divider />

                    {/* <Flex flex={1} fontSize={"sm"} borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
                        <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                            {t("farm_mgmt.contract_start_date")}
                        </FormLabel>
                        <Box ps={3} w={"lg"}>
                            <ReactDatePicker
                                className={`custom ${touched.contractStartDate && !contractStartDateDate}`}
                                locale={ja}
                                name="contractStartDate"
                                placeholderText={String(t(""))}
                                onChange={(date: any) => {
                                    setFieldValue(
                                        "contractStartDate",
                                        dayjs(date).format("YYYY/MM/DD") ? dayjs(date).format("YYYY/MM/DD") : "--"
                                    );
                                }}
                                dateFormat={"YYYY/MM/DD"}
                                value={values.contractStartDate}
                                popperClassName="popper-class"
                                popperPlacement="bottom-start"
                                showPopperArrow={false}
                            />
                        
                        </Box>
                    </Flex>

                    <Flex flex={1} fontSize={"sm"} borderBottom={"1px solid #E0E0E0"} alignItems={"center"}>
                        <FormLabel fontWeight={"extrabold"} p={5} px={12} w={"72"} backgroundColor={"#F9FAFA"} m={"0"}>
                            {t("farm_mgmt.contract_end_date")}
                        </FormLabel>
                        <Box ps={3} w={"lg"}>
                            <ReactDatePicker
                                className={`custom ${touched.contractEndDate && !contractEndDateDate}`}
                                locale={ja}
                                name="contractEndDate"
                                placeholderText={String(t(""))}
                                onChange={(date: any) => {
                                    setFieldValue("contractEndDate", dayjs(date).format("YYYY/MM/DD"));
                                }}
                                dateFormat={"YYYY/MM/DD"}
                                value={values.contractEndDate}
                                popperClassName="popper-class"
                                popperPlacement="bottom-start"
                                showPopperArrow={false}
                            />
                           
                        </Box>
                    </Flex> */}

                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("common.email")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {farmData?.email ? farmData?.email : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <EditFormInput
                        name="contact_number"
                        Type="text"
                        values={values.contact_number}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.contact_number}
                        touched={touched.contact_number}
                        label={t("common.contact_number")}
                        isMandatory={true}
                    />

                    <FarmStatusSelect
                        touched={touched.status}
                        error={errors.status}
                        isMandatory={false}
                        value={values.status}
                        label={t("common.status")}
                        onChange={setFieldValue}
                        options={config.FARM_STATUS}
                        name="status"
                        multi={false}
                        onBlur={handleBlur}
                    />

                    <EditFormInput
                        name="postalCode"
                        Type="text"
                        values={values.postalCode}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.postalCode}
                        touched={touched.postalCode}
                        label={t("farm_mgmt.postal_code")}
                        isMandatory={true}
                    />

                    <EditFormInput
                        name="prefecture"
                        Type="text"
                        values={values.prefecture}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.prefecture}
                        touched={touched.prefecture}
                        label={t("farm_mgmt.prefecture")}
                        isMandatory={true}
                    />

                    <EditFormInput
                        name="city"
                        Type="text"
                        values={values.city}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.city}
                        touched={touched.city}
                        label={t("farm_mgmt.city")}
                        isMandatory={true}
                    />

                    <EditFormInput
                        name="subArea"
                        Type="text"
                        values={values.subArea}
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                        errors={errors.subArea}
                        touched={touched.subArea}
                        label={t("farm_mgmt.sub_area")}
                        isMandatory={true}
                    />

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

                    <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                </Flex>
            </Box>
        </>
    );
};

export default EditForm;
