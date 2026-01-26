import { useIntl } from "react-intl";
import { UserActions } from "./UserActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { Fragment, useEffect, useState } from "react";
import { fetchRequestsUsers } from "../../../features/requests-users-slice/requestsUsersSlice";
import { RequestsUsersModel } from "../../../models/requests-users/requestsUsersModel";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import moment from "moment";

const AccessRequestsTable = () => {
  const intl = useIntl();

  const AccessRequests = [
    {
      name: "Username",
      className: `ps-4 min-w-100px d-flex justify-content-start text-start`,
    },

    {
      name: "Management",
      className: `min-w-100px `,
    },
    {
      name: "LastSignIn",
      className: `min-w-100px`,
    },
    {
      name: "Actions",
      className: `min-w-50px `,
    },
  ];

  let dispatch = useDispatch();
  let data = useSelector((state: RootState) => {
    return state.requestsUsers?.data;
  });
  let totalPages = useSelector((state: RootState) => {
    return state.requestsUsers?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state.requestsUsers?.totalItems;
  });
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  useEffect(() => {
    let params: any = {
      pageNumber: pageIndex,
      pageSize: pageSize,
    };
    dispatch(fetchRequestsUsers(params) as any);
  }, [pageIndex, pageSize]);
  return (
    <>
      <div className="table-responsive">
        <table
          className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 pb-10"
          id="REGA-WS-caseList"
        >
          <thead>
            <tr className="fw-bolder text-muted ">
              {AccessRequests?.map((item, index) => (
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
            {data?.map((user: RequestsUsersModel) => {
              return (
                <Fragment key={user?.id as string}>
                  <tr>
                    <td>
                      <div>
                        <div className="ms-5 d-flex align-items-center">
                          <div className="symbol position-relative  symbol-circle">
                            <img alt="Pic" src="/media/avatars/300-3.jpg" />
                            {/* <img src={`${UserManagmentRootUrl}${user?.}`}/> */}
                          </div>
                          <div className="ms-3 d-flex justify-content-start flex-column">
                            <p className={`h4 fw-bolder mb-1  `}>
                              {user?.email}
                            </p>
                            <p className="text-muted mb-0 fw-lighter">
                              {user?.firstName} {} {user?.secondName} {}{" "}
                              {user?.thirdName} {} {user?.forthName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center">{user?.domainOrgName}</td>
                    <td className="text-center">
                      <span>
                        {user?.requestDate ? (
                          moment(user?.requestDate).format("lll")
                        ) : (
                          <span className="text-muted">
                            {intl.formatMessage({ id: "NotExist" })}
                          </span>
                        )}
                      </span>
                    </td>
                    <td>
                      <div className="text-center">
                        <UserActions id={user?.id} />
                      </div>
                    </td>
                  </tr>
                </Fragment>
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
    </>
  );
};

export default AccessRequestsTable;
