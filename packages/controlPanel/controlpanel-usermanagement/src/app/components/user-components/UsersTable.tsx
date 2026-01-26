import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { ElementStatus } from "../domain-components/ElementStatus";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { useLocation, Link } from "react-router-dom";
import { fetchUsers } from "../../features/users-slice/usersSlice";
import { UsersModel } from "../../models/users/users";
import moment from "moment";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { UserActions } from "./components/UserActions";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { UserGender } from "../../models/users/users-enums";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";

type TableHeadersTypes = {
  name: string;
  className: string;
};
type props = {
  filter: any;
  ClickedFiltered: any;
  pageSize?: number;
  setPageSize?: any;
  pageIndex?: number;
  setPageIndex?: any;
};

export const UsersTable: FC<props> = ({
  filter,
  ClickedFiltered,
  pageSize,
  setPageSize,
  pageIndex,
  setPageIndex,
}) => {
  const intl = useIntl();

  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => {
    return state.users?.data;
  });
  let totalPages = useSelector((state: RootState) => {
    return state.users?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state.users?.totalItems;
  });

  const usersTableHeader: TableHeadersTypes[] = [
    {
      name: "Username",
      className: `ps-4 min-w-150px d-flex justify-content-start text-start`,
    },
    {
      name: "Permission",
      className: `min-w-150px `,
    },
    {
      name: "LastSignIn",
      className: `min-w-150px`,
    },
    {
      name: "Actions",
      className: `min-w-50px `,
    },
  ];

  const [headers, setHeaders] = useState<TableHeadersTypes[]>(usersTableHeader);
  useEffect(() => {
    let params: any = {
      userName: filter.name,
      isNafaz: filter.enableUnified,
      isExpired: filter.enablePermission,
      lastLoginTime: filter.date,
      // pageNumber: Object.keys(ClickedFiltered).length === 0 ? pageIndex : 1,
      // pageSize: pageSize,
      pageNumber: pageIndex,
      pageSize: pageSize,
    };
    dispatch(fetchUsers(params) as any);
  }, [pageIndex, pageSize, ClickedFiltered]);

  let location = useLocation();
  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";

  return (
    <div className="table-responsive">
      <table
        className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
        id="REGA-WS-caseList"
      >
        <thead>
          <tr className="fw-bolder text-muted ">
            {headers.map((item, index) => (
              <th
                key={index}
                className={item.className + " text-center text-muted"}
              >
                {intl.formatMessage({
                  id: item.name,
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item: UsersModel) => {
            const fullName = DisplayNameFourProps(
              item?.firstName,
              item?.secondName,
              item?.thirdName,
              item?.forthName
            );
            return (
              <tr key={`${item?.id}`}>
                <td>
                  <div>
                    <div className="ms-5 d-flex align-items-center">
                      <div className="symbol position-relative symbol-circle">
                        <img
                          alt="Pic"
                          src={
                            item?.imageUrl
                              ? `${UserManagmentRootUrl}${item?.imageUrl}`
                              : item?.userGender === UserGender.Male
                              ? toAbsoluteUrl("/media/avatars/300-3.jpg")
                              : toAbsoluteUrl("/media/avatars/300-3.jpg")
                          }
                          onError={(e: any) =>
                            (e.target.src =
                              item?.userGender === UserGender.Male
                                ? `${toAbsoluteUrl("/media/avatars/300-3.jpg")}`
                                : `${toAbsoluteUrl(
                                    "/media/avatars/300-3.jpg"
                                  )}`)
                          }
                        />
                      </div>
                      <Link
                        to={`/admin-panel-users-workspace/admin-panel-users/details/${item?.id}`}
                        state={{
                          serviceName: cardTitle,
                        }}
                        className="ms-3 d-flex justify-content-start flex-column"
                        role="button"
                      >
                        <p className={`h4 fw-bolder mb-1  `}>
                          {item?.userName}
                        </p>
                        <p className="text-muted mb-0 fw-lighter text-start">
                          {fullName}
                        </p>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="text-center">
                  <ElementStatus
                    text={intl.formatMessage({
                      id: !item?.isExpired ? "Enabled" : "Disabled",
                    })}
                    isActive={item?.isExpired}
                  />
                </td>
                <td className="text-center">
                  <span>
                    {item?.lastLoginTime ? (
                      moment(item?.lastLoginTime).format("lll")
                    ) : (
                      <span className="text-muted">
                        {intl.formatMessage({ id: "NotExist" })}
                      </span>
                    )}
                  </span>
                </td>
                <td>
                  <div className="text-center">
                    <UserActions id={item.id} userName={item?.userName} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {data?.length ? (
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
