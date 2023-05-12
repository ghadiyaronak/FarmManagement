import { Button, useToast } from "@chakra-ui/react";

import { useTranslation } from "react-i18next";

import * as FileServe from "file-saver";
import XLSX from "sheetjs-style";

import { CgExport } from "react-icons/cg";
import { globalStyles } from "../../theme/styles";
import dayjs from "dayjs";

interface ExportBtnProps {
    exportData: Array<any>;
    fileName: string;
    getExcelData?: any;
}

const ExportBtn: React.FC<ExportBtnProps> = ({ exportData, fileName, getExcelData }) => {
    const { t } = useTranslation();

    const toast = useToast();

    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), 1);
    const formatedDate = dayjs(date).format("YYYY/MM/DD");

    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
    const fileExtension = ".xlsx";

    const handleExportData = async () => {
        if (exportData.length === 0) {
            return toast({
                title: t("messages.please_select_rows_first"),
                status: "error",
                variant: "solid",
                duration: 2000,
                position: "top-right",
                isClosable: true
            });
        }

        let excelData;

        if (getExcelData) {
            excelData = await getExcelData();
        } else {
            excelData = exportData;
        }

        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileServe.saveAs(data, fileName + "-" + formatedDate + fileExtension);
    };
    return (
        <Button
            bgColor={globalStyles.colors.mainColor}
            color={"white"}
            size={"sm"}
            rounded={"md"}
            w={"30"}
            type="submit"
            // onClick={handleSearchData}
            // isLoading={isLoading}
            _hover={{
                bgColor: globalStyles.colors.mainColor
            }}
            leftIcon={<CgExport />}
            onClick={() => handleExportData()}
        >
            {t("common.export")}
        </Button>
    );
};

export default ExportBtn;
