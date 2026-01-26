import { FC } from "react";
import { DomainsTableHeader } from "./domain-table-header";
import { DomainsTableRows } from "./domain-table-rows";
import { useIntl } from "react-intl";
import { RootState } from "../../../features/store";
import { useSelector } from "react-redux";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

export const DomainsTable: FC = () => {
  const intl = useIntl();
  let domains = useSelector((state: RootState) => {
    return state?.domains?.data;
  });

  let totalPages = useSelector((state: RootState) => {
    return state?.domains?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.domains?.totalItems;
  });
  return (
    <div className="table-responsive">
      <table
        className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        id="REGA-WS-caseList"
      >
        <DomainsTableHeader />
        <DomainsTableRows />
      </table>
      {domains?.length ? (
        <SystemPagination totalPages={totalPages} totalItems={totalItems} />
      ) : (
        <div className="d-flex fw-bolder justify-content-center align-items-center">
          {intl.formatMessage({ id: "No_data_yet" })}
        </div>
      )}
    </div>
  );
};
