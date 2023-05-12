import { useEffect, useState } from "react";
import ReturnButton from "../../../components/fields/ReturnButton";
import { Box, Divider, Flex, Heading, Stack, StackDivider, Text, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import FormFildLabel from "../../../components/form/FormLabel";
import CustomTextArea from "../../../components/form/CustomTextArea";
import FarmStatusSelect from "../../../components/form/FarmStatusSelect";
import SaveButton from "../../../components/button/SaveButton";
import config from "../../../utils/config";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CameraService from "../../../services/CameraService";
import dayjs from "dayjs";
import { globalStyles } from "../../../theme/styles";
import { BiLinkExternal } from "react-icons/bi";

const CameraEdit = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const params = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const [cameraData, setCameraData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getCameraList = () => {
        dispatch(
            CameraService.getCamera(
                {
                    cameraId: params._id
                },

                (success: any) => {
                    const camera = success.data.rows[0];
                    setFieldValue("_id", camera?._id);
                    setFieldValue("name", camera?.name);
                    setFieldValue("live_view_link", camera?.live_view_link);
                    setFieldValue("mac_address", camera?.mac_address);
                    setFieldValue("location", camera?.location);
                    setFieldValue("lastDateTime", dayjs(camera?.lastDateTime).format("YYYY/MM/DD hh:mm:ss"));
                    setFieldValue("farm_name", camera?.farm_id?.farm_name);
                    setFieldValue("cameraAccess", camera?.cameraAccess);
                    setFieldValue("user_name", camera?.farm_id?.owner_id?.user_name);
                    setFieldValue("memo_developer", camera?.memo_developer);
                    setFieldValue("memo", camera?.memo);
                    setFieldValue("register_date", dayjs(camera?.register_date).format("YYYY/MM/DD"));
                    setFieldValue("status", camera?.status);

                    setCameraData(camera);
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

    const onSubmit = () => {
        setIsLoading(true);
        const data = {
            _id: values._id,
            name: values.name,
            live_view_link: values.live_view_link,
            mac_address: values.mac_address,
            location: values.location,
            farm_name: values.farm_name,
            user_name: values.user_name,
            cameraAccess: values.cameraAccess,
            register_date: values.register_date,
            memo: values.memo,
            memo_developer: values.memo_developer,
            status: values.status.value
        };
        dispatch(
            CameraService.updateCamera(
                { _id: params._id, data },
                (responseData: any) => {
                    toast({
                        title: t("messages.password_update_success"),
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
            navigate(`/camera-view/${params._id}`);
        }, 2000);
    };

    const productSchema = yup.object().shape({});
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
            name: "",
            live_view_link: "",
            mac_address: "",
            location: "",
            farm_name: "",
            user_name: "",
            cameraAccess: "",
            register_date: "",
            memo_developer: "",
            memo: "",
            status: {
                lable: "",
                value: ""
            }
        },
        onSubmit,
        validationSchema: productSchema
    });

    useEffect(() => {
        getCameraList();
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
                            {t("camera_mgmt.camera_edit")}
                        </Heading>
                    </Box>
                </Box>
                <Flex flexDir={"column"} w={"full"} px={5} mt={7}>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={19} textTransform="capitalize">
                                {"ID"}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {cameraData?._id ? cameraData?._id : "--"}
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
                                {cameraData?.name ? cameraData?.name : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("camera_mgmt.link_id")}
                            </Heading>
                            <Text
                                p={3}
                                as={"a"}
                                fontSize="md"
                                cursor={"pointer"}
                                display={"Flex"}
                                alignItems={"center"}
                                color={globalStyles.colors.mainColor}
                                href={cameraData?.live_view_link ? cameraData?.live_view_link : "--"}
                                target="_blank"
                            >
                                {cameraData?.live_view_link ? cameraData?.live_view_link : "--"}
                                <BiLinkExternal />
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("device_mgmt.mac_address")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {cameraData?.mac_address ? cameraData?.mac_address : "--"}
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
                                {cameraData?.location ? cameraData?.location : "--"}
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
                                fontSize="md"
                                cursor={"pointer"}
                                display={"Flex"}
                                alignItems={"center"}
                                color={globalStyles.colors.mainColor}
                                onClick={() => navigate(`/viewfarm/${cameraData?.farm_id._id}`)}
                            >
                                {cameraData?.farm_id?.farm_name ? cameraData?.farm_id?.farm_name : "--"}
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
                                {cameraData?.farm_id?.owner_id?.user_name
                                    ? cameraData?.farm_id?.owner_id?.user_name
                                    : "--"}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <FarmStatusSelect
                        touched={touched.status}
                        error={errors.status}
                        isMandatory={false}
                        value={values.status}
                        label={t("common.status")}
                        onChange={setFieldValue}
                        options={config.CAMERA_STATUS}
                        name="status"
                        multi={false}
                        onBlur={handleBlur}
                    />
                    <Divider />
                    <Stack divider={<StackDivider />} spacing="4">
                        <Flex>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("camera_mgmt.camera_access")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {cameraData?.cameraAccess === "ENABLE" ? t("status.enable") : t("status.disable")}
                            </Text>
                        </Flex>
                    </Stack>
                    <Divider />

                    <Flex w={"full"}>
                        <FormFildLabel label={t("farm_mgmt.memo_developer")} isMandatory={false} />
                        <CustomTextArea
                            name="memo_developer"
                            // placehold={String(t("contract.up_to_500_characters"))}
                            value={values.memo_developer}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            errors={errors.memo_developer}
                            touched={touched.memo_developer}
                            isMandatory={false}
                            style={{ flex: "0.86", paddingTop: "7px", paddingBottom: "7px" }}
                        />
                    </Flex>
                    <Divider />

                    <Flex w={"full"}>
                        <FormFildLabel label={t("farm_mgmt.memo")} isMandatory={false} />
                        <CustomTextArea
                            name="memo"
                            // placehold={String(t("contract.up_to_500_characters"))}
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
                        <Flex borderBottom={"1px solid #E0E0E0"}>
                            <Heading w={"72"} p={3} bg={"#f9fafa"} pl={12} fontSize={20} textTransform="capitalize">
                                {t("common.register_date")}
                            </Heading>
                            <Text p={3} fontSize="md">
                                {cameraData?.register_date
                                    ? dayjs(cameraData?.register_date).format("YYYY/MM/DD")
                                    : "--"}
                            </Text>
                        </Flex>
                    </Stack>

                    <SaveButton isLoading={isLoading} title={t("farm_mgmt.update")} onClick={handleSubmit} />
                </Flex>
            </Box>
        </>
    );
};

export default CameraEdit;
