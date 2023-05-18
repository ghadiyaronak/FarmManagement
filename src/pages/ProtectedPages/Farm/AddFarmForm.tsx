import { useState } from "react";
import { Box, Flex, FormLabel, Heading, Stack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useFormik } from "formik";
import DateSelect from "../../../components/select/DateSelect";
import config from "../../../utils/config";
import FormInput from "../../../components/form/FormInput";
import SaveButton from "../../../components/button/SaveButton";
import ReturnButton from "../../../components/fields/ReturnButton";
import { useDispatch } from "react-redux";
import FarmServices from "../../../services/FarmServices";
import AddFarmDate from "../../../components/fields/AddFarmDate";
import FormTextArea from "../../../components/form/FormTextArea";
import LabelTextField from "../../../components/form/LabelTextField";
import AddFormStatus from "../../../components/form/AddFormStatus";
import AddFarmMemo from "../../../components/form/AddFarmMemo";
import CustomTextArea from "../../../components/form/CustomTextArea";
import ReactDatePicker from "react-datepicker";
import { projectTypes } from "../../../types/data.types";

interface FarmFormProps {
    value?: any;
    handleChange?: any;
    handleBlur?: any;
    errors?: any;
    touched?: any;
    setFieldValue?: any;
}

const EditForm = ({}: FarmFormProps) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const toast = useToast();
    const [isLoading, setIsLoading] = useState<any>(false);
    const today = new Date();
    const [contractStartDate, setContractStartDate] = useState<Date | null>(null);
    const [contractEndDate, setContractEndDate] = useState<Date | null>(null);

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            farm_name: values.farm_name,
            email: values.email,
            AppPin: values.AppPin,
            contact_number: values.contact_number,
            register_date: values.register_date,
            status: values.status.value,
            owner_name: values.owner_name,
            subArea: values.subArea,
            subAreaNumber: values.subAreaNumber,
            contractStartDate: contractStartDate,
            contractEndDate: contractEndDate,
            construction_period: values.construction_period,
            city: values.city,
            postalCode: values.postalCode,
            prefecture: values.prefecture,
            memo: values.memo
        };

        dispatch(
            FarmServices.addFarm(
                {
                    data: data
                },
                (success: any) => {
                    toast({
                        title: success?.message ? success?.message : success.response?.data?.message,
                        status: "success",
                        variant: "solid",
                        duration: 2000,
                        position: "top-right",
                        isClosable: true
                    });

                    resetForm();
                    setIsLoading(false);
                    navigate(-1);
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

    const productSchema = yup.object().shape({
        farm_name: yup.string().required(t("messages.farm_name_is_required")),
        owner_name: yup.string().required(t("messages.owner_name_is_required")),
        email: yup.string().required(t("messages.email_field_is_required")),
        register_date: yup.string().required(t("messages.register_date_is_required")),
        // construction_period: yup.string().required(t("messages.construction_period")),
        contact_number: yup
            .string()
            .min(10, t("messages.10_digit_contact_number_is_required!"))
            .max(10, t("messages.10_digit_contact_number_is_required!"))
            .required(t("messages.contact_number_field_is_required")),
        postalCode: yup.string().required(t("messages.postal_code")),
        prefecture: yup.string().required(t("messages.prefecture")),
        city: yup.string().required(t("messages.city")),
        subArea: yup.string().required(t("messages.sub_area")),
        subAreaNumber: yup.string().required(t("messages.subarea_number")),

        AppPin: yup.string().max(4, "Maximum 4 character").required(t("messages.app_pin_is_required")),
        status: yup.object().shape({
            value: yup.string().required(t("messages.status_field_is_required"))
        })
    });

    const {
        values,
        handleChange,
        handleBlur,
        setFieldTouched,
        setFieldValue,
        resetForm,
        errors,
        touched,
        handleSubmit
    } = useFormik({
        initialValues: {
            farm_name: "",
            owner_name: "",
            register_date: "",
            startDate: "",
            endDate: "",
            construction_period: "",
            contact_number: "",
            AppPin: "",
            email: "",
            memo: "",
            city: "",
            postalCode: "",
            subAreaNumber: "",
            subArea: "",
            prefecture: "",
            status: {
                lable: "",
                value: ""
            },
            contractStartDate: "",
            contractEndDate: ""
        },
        onSubmit,
        validationSchema: productSchema
    });

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
                        <Heading justifyContent={"center"} alignItems={"center"} alignContent={"center"} size="lg">
                            {t("farm_mgmt.add_farm")}
                        </Heading>
                    </Text>
                </Box>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Flex flexDir={"column"} w={"full"} px={5} mt={7}>
                        <FormInput
                            name="farm_name"
                            Type="text"
                            values={values.farm_name}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.farm_name}
                            touched={touched.farm_name}
                            label={t("farm_mgmt.farm_name")}
                            isMandatory={true}
                        />

                        <FormInput
                            name="owner_name"
                            Type="text"
                            values={values.owner_name}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.owner_name}
                            touched={touched.owner_name}
                            label={t("farm_mgmt.owner_name")}
                            isMandatory={true}
                        />

                        <AddFarmDate
                            label={t("common.register_date")}
                            name={"register_date"}
                            type={"date"}
                            value={values.register_date}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.register_date}
                            touched={touched.register_date}
                            isMandatory={true}
                        />
                        {/* 
                        <DateSelect
                            label={t("farm_mgmt.construction_period")}
                            startDate={contractStartDate}
                            endDate={contractEndDate}
                            setStartDate={setContractStartDate}
                            setEndDate={setContractEndDate}
                            isMandatory={true}
                        /> */}

                        <Flex flex={1} fontSize={"sm"} borderTop={"1px solid #E0E0E0"} alignItems={"center"}>
                            <FormLabel fontWeight={"500"} p={5} w={"2xs"} backgroundColor={"#F9FAFA"} m={"0"}>
                                {t("farm_mgmt.construction_period")}
                                <Text color={"red"} as="span">
                                    *
                                </Text>
                            </FormLabel>
                            <Box ps={3} w={"lg"}>
                                <ReactDatePicker
                                    className={`custom ${
                                        (touched.contractStartDate && !contractStartDate) ||
                                        (touched.contractEndDate && !contractEndDate)
                                            ? "border-red"
                                            : ""
                                    }`}
                                    dateFormat="yyyy/MM/dd"
                                    selected={contractStartDate}
                                    placeholderText={String(t(""))}
                                    onChange={(dates: any) => {
                                        const [start, end] = dates;
                                        setContractStartDate(start);
                                        setContractEndDate(end);
                                    }}
                                    onChangeRaw={() => {
                                        setFieldTouched("contractStartDate", true, true);
                                        setFieldTouched("contractEndDate", true, true);
                                    }}
                                    startDate={contractStartDate}
                                    endDate={contractEndDate}
                                    selectsRange
                                    // className="custom custom-date"
                                    popperClassName="popper-class"
                                    popperPlacement="bottom-start"
                                    minDate={today}
                                    todayButton={t("common.today")}
                                    showPopperArrow={false}
                                    isClearable
                                    locale={"ja"}
                                />
                                {(touched.contractStartDate && !contractStartDate) ||
                                (touched.contractEndDate && !contractEndDate) ? (
                                    <Text fontSize={"sm"} mt={1} color={"red.300"}>
                                        {t("farm_mgmt.construction_period")}必要
                                    </Text>
                                ) : (
                                    ""
                                )}
                            </Box>
                        </Flex>

                        <FormInput
                            name="email"
                            Type="email"
                            values={values.email}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.email}
                            touched={touched.email}
                            label={t("common.email")}
                            isMandatory={true}
                        />
                        <FormInput
                            name="contact_number"
                            Type="number"
                            values={values.contact_number}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.contact_number}
                            touched={touched.contact_number}
                            maxValue={10}
                            minValue={10}
                            label={t("common.contact_number")}
                            isMandatory={true}
                        />

                        <FormInput
                            name="AppPin"
                            Type="number"
                            values={values.AppPin}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            minValue={4}
                            maxValue={4}
                            errors={errors.AppPin}
                            touched={touched.AppPin}
                            label={t("farm_mgmt.app_pin")}
                            isMandatory={true}
                        />

                        <FormInput
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

                        <FormInput
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

                        <FormInput
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
                        <Flex w={"full"} borderTop={"1px solid #E0E0E0"}>
                            <FormTextArea label={t("farm_mgmt.sub_area")} isMandatory={true} />
                            <CustomTextArea
                                name="subArea"
                                value={values.subArea}
                                handleChange={handleChange}
                                handleBlur={handleBlur}
                                errors={errors.subArea}
                                touched={touched.subArea}
                                isMandatory={false}
                                style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                            />
                        </Flex>

                        <FormInput
                            name="subAreaNumber"
                            Type="text"
                            values={values.subAreaNumber}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.subAreaNumber}
                            touched={touched.subAreaNumber}
                            label={t("farm_mgmt.subarea_number")}
                            isMandatory={true}
                        />

                        <AddFormStatus
                            touched={touched.status}
                            error={errors.status}
                            isMandatory={true}
                            value={values.status}
                            label={t("common.status")}
                            onChange={setFieldValue}
                            options={config.FARM_STATUS}
                            name="status"
                            multi={false}
                            onBlur={handleBlur}
                        />

                        <AddFarmMemo
                            name="memo"
                            Type="text"
                            values={values.memo}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.memo}
                            touched={touched.memo}
                            label={t("farm_mgmt.memo")}
                            isMandatory={true}
                        />

                        <SaveButton isLoading={isLoading} title={t("farm_mgmt.save")} />
                    </Flex>
                </form>
            </Box>
        </>
    );
};

export default EditForm;
