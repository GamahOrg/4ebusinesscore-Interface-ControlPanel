import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroups } from "../../features/group-slice/Groups-slice";
import GroupTableRow from "./admin-group-card";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

type TableHeadersTypes = {
  name: string;
  className: string;
};

export const GroupsTable: FC = () => {
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let totalPages = useSelector((state: RootState) => {
    return state?.groups?.data?.totalPages;
  });

  let totalItems = useSelector((state: RootState) => {
    return state?.groups?.data?.totalItems;
  });
  let groups = useSelector((state: RootState) => {
    return state?.groups;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchGroups({
        pageNumber: pageIndex,
        pageSize: pageSize,
      }) as any
    );
  }, [pageIndex, pageSize]);

  const intl = useIntl();
  const usersTableHeader: TableHeadersTypes[] = [
    {
      name: "GroupDetails",
      className: `ps-4 min-w-300px ${localStorage.getItem("Theme") == "dark" ? "dark_mute_text" : "text-muted"}`,
    },
    {
      name: "EstablishedDate",
      className: `min-w-200px ${localStorage.getItem("Theme") == "dark" ? "dark_mute_text" : "text-muted"}`,
    },
    {
      name: "LastEditDate",
      className: `min-w-200px ${localStorage.getItem("Theme") == "dark" ? "dark_mute_text" : "text-muted"}`,
    },
    {
      name: "Actions",
      className: `min-w-50px ${localStorage.getItem("Theme") == "dark" ? "dark_mute_text" : "text-muted"}`,
    },
  ];
  const [headers, setHeaders] = useState<TableHeadersTypes[]>(usersTableHeader);
  return (
    <div className="table-responsive">
      <table
        className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        id="REGA-WS-caseList"
      >
        <thead>
          <tr className={`fw-bolder  `}>
            {headers.map((item, index) => (
              <th key={index} className={item.className}>
                {intl.formatMessage({
                  id: item.name,
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.data.data.map((item) => (
            <GroupTableRow key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      {groups.data.data ? (
        <SystemPagination
          totalPages={totalPages}
          totalItems={totalItems}
          pageIndex={pageIndex}
          pageSize={pageSize}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      ) : (
        <div className="d-flex fw-bolder justify-content-center align-items-center">
          {intl.formatMessage({ id: "No_data_yet" })}
        </div>
      )}
    </div>
  );
};
