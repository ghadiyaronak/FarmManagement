import { Text } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
interface IProps {
    // id:string,
    names?: string;
    column: any[];
    data: any[];
    progressPending?: boolean;
    onSelectedRowsChange?: any;
    handleSubmit?: any;
    isSelector?: boolean;
}

const DataTableComponent = ({
    column,
    data,
    handleSubmit,
    progressPending,
    onSelectedRowsChange,
    isSelector
}: IProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const paginationComponentOptions = {
        rowsPerPageText: t("rows_per_page")
    };

    return (
        <DataTable
            columns={column}
            data={data}
            pagination
            paginationPerPage={10}
            paginationRowsPerPageOptions={[10, 50, 100, 200, 300, 500]}
            persistTableHead
            onRowClicked={handleSubmit}
            responsive
            selectableRows={isSelector ? isSelector : false}
            dense
            onSelectedRowsChange={onSelectedRowsChange}
            progressPending={progressPending}
            selectableRowsHighlight
            highlightOnHover
            noDataComponent={t("there_are_no_records_to_display")}
            paginationComponentOptions={paginationComponentOptions}
        />
    );
};
export default DataTableComponent;
