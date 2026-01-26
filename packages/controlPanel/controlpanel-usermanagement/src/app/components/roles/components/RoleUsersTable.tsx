import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RoleUsersActions } from "./RoleUsersActions";
import AddUserToRolePopup from "../popup/add-user-to-role-popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { fetchUserRoles } from "../../../features/role-user/roleUserSlice";
import moment from "moment";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { DisplayNameFourProps } from "@4eplatform/shared/functions/displayName";

interface Props {
  id: string;
}

const RoleUsersTable: FC<Props> = ({ id }) => {
  let [showAddUserToRole, setShowAddUserToRole] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);
  let role = useSelector((state: RootState) => {
    return state?.roleUser;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.roleUser?.data?.totalItems;
  });
  let totalPages = useSelector((state: RootState) => {
    return state?.roleUser?.data?.totalPages;
  });

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    if (id) {
      let myparams: any = {
        pageNumber: pageIndex,
        pageSize: pageSize,
      };
      dispatch(fetchUserRoles({ id: id, myparams }) as any);
    }
  }, [pageIndex, pageSize, dispatch, id]);

  // let userIds = useSelector((state: RootState) => {
  //   return state?.users?.data?.map((user) => {
  //     return user?.id;
  //   });
  // });
  const intl = useIntl();

  return (
    <>
      <div className="mb-10">
        <div className="card card-xl-stretch mb-xl-0 pb-4 pt-15">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <div className="position-relative w-50 ">
                    <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                    <input
                      type="text"
                      className="form-control form-control-solid ps-10"
                      name="search"
                      onChange={handleSearchChange}
                      placeholder={intl.formatMessage({
                        id: "TypeYourSearchHere",
                      })}
                    />
                  </div>
                  <button
                    className="btn btn-primary "
                    onClick={() => {
                      setShowAddUserToRole(true);
                    }}
                  >
                    {intl.formatMessage({
                      id: "AddUser",
                    })}
                  </button>
                </div>
              </div>
              <div className="table-responsive fs-6 mt-2">
                <table className="table text-center table-borderless align-middle mt-5">
                  <thead className="p-4 text-center fw-bolder border">
                    <tr className="fw-bolder text-muted">
                      <th className="fw-bolder pb-3 min-w-50px d-flex justify-contet-end px-20">
                        {intl.formatMessage({ id: "Name" })}
                      </th>
                      <th className="fw-bolder pb-3 min-w-100px">
                        {intl.formatMessage({ id: "JoiningDate" })}
                      </th>
                      <th className="fw-bolder pb-3 min-w-50px">
                        {intl.formatMessage({ id: "Actions" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="p-2  text-center border">
                    {role.data?.data
                      .filter((user) =>
                        user.userName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((user, index: number) => {
                        const fullName = DisplayNameFourProps(
                          user?.firstName,
                          user?.secondName,
                          user?.thirdName,
                          user?.forthName
                        );
                        return (
                          <tr key={index} className="align-middle ">
                            <td className="d-flex  py-2">
                              <div className="d-flex">
                                <div className="symbol symbol-45px symbol-circle ms-2">
                                  <img
                                    alt="Pic"
                                    src={
                                      user?.imageUrl
                                        ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                        : user?.userGender == 0
                                        ? toAbsoluteUrl(
                                            "/media/avatars/300-3.jpg"
                                          )
                                        : toAbsoluteUrl(
                                            "/media/avatars/300-3.jpg"
                                          )
                                    }
                                    onError={(e: any) =>
                                      (e.target.src =
                                        user?.userGender === 0
                                          ? `${toAbsoluteUrl(
                                              "/media/avatars/300-3.jpg"
                                            )}`
                                          : `${toAbsoluteUrl(
                                              "/media/avatars/300-3.jpg"
                                            )}`)
                                    }
                                  />
                                </div>
                                <div>
                                  <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                    {user?.userName}
                                  </div>
                                  <div className="fw-bold text-muted">
                                    {fullName}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="fw-bolder fs-5 ">
                              {moment(user?.createdOn).format("YYYY-MM-DD")}
                            </td>
                            <td>
                              <RoleUsersActions
                                userId={user?.userId}
                                RoleId={id}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
                <SystemPagination
                  totalPages={totalPages}
                  totalItems={totalItems}
                  pageIndex={pageIndex}
                  pageSize={pageSize}
                  setPageIndex={setPageIndex}
                  setPageSize={setPageSize}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddUserToRole && (
        <AddUserToRolePopup
          id={id}
          handleClose={() => {
            setShowAddUserToRole(false);
          }}
        />
      )}
    </>
  );
};

export default RoleUsersTable;
