import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { HiOutlineTrash } from "react-icons/hi";
import { AddRolePopup } from "./popups/add-role-popup";
import { DeleteRoleFromUserPopup } from "./popups/DeleteRoleFromUserPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { userRoleModel } from "../../models/users/user-role-model";
import moment from "moment";
import { useParams } from "react-router-dom";
import { fetchUserRoles } from "../../features/users-slice/userRolesSlice";

type TableHeaderType = {
  id: number;
  title: string;
};

export const UserRolesTab: FC = () => {
  const intl = useIntl();
  let { id } = useParams();
  let [roleID, setRoleID] = useState<string>("");
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = (id: string) => {
    setShowDelete(true);
    setRoleID(id);
  };

  const [showAddRole, setShowAddRole] = useState(false);
  const handleCloseAddRole = () => setShowAddRole(false);
  const handleShowAddRole = () => setShowAddRole(true);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchUserRoles({
        pageSize: 1000,
        pageNumber: 1,
        id,
      }) as any
    ) as any;
  }, []);
  let userRoles = useSelector((state: RootState) => {
    return state?.userRoles;
  });

  const tableHeaders: TableHeaderType[] = [
    {
      id: 2,
      title: intl.formatMessage({ id: "Role" }),
    },
    {
      id: 3,
      title: intl.formatMessage({ id: "Date" }),
    },
    {
      id: 4,
      title: intl.formatMessage({ id: "PermissionOwner" }),
    },
    {
      id: 5,
      title: intl.formatMessage({ id: "Actions" }),
    },
  ];

  return (
    <>
      <div className="mb-10">
     
        
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div
                className="tab-pane fade active show"
                id="REGA_table_widget_5_tab_1"
              >
                <div className="d-flex justify-content-between align-items-center">
                  <h3>
                    {intl.formatMessage({
                      id: "Roles",
                    })}
                  </h3>
                  <button
                    className="btn btn-primary "
                    onClick={handleShowAddRole}
                  >
                    {intl.formatMessage({
                      id: "AddRole",
                    })}
                  </button>
                </div>
              </div>

              <div className="table-responsive fs-6 ">
                <table className="table table-borderless align-middle mt-5 text-gray-800">
                  <thead className="p-4 text-center fw-bolder border">
                    {tableHeaders.map((header) => (
                      <th
                        key={header.id}
                        className="p-5 min-w-150px text-nowrap"
                      >
                        <bdi>{header.title}</bdi>
                      </th>
                    ))}
                  </thead>
                  <tbody className="text-center border">
                    {/* {userRoles?.data?.filter((ele:any)=>{return ele?.date !="0001-01-01T00:00:00"}).map( */}
                    {userRoles?.data?.map(
                      (data: userRoleModel, index: number) => {
                        return (
                          <Fragment key={data?.roleID}>
                            <tr className="text-center fw-lighter">
                              <td className="p-5">
                                {intl.locale == "ar"
                                  ? data.roleNameAr
                                  : data.roleNameEn}
                              </td>
                              <td className="p-5">
                                {moment(data.date).format("YYYY-MM-DD")}
                              </td>
                              <td className="p-5">{data.creatorUserName}</td>
                              <td className="p-5">
                                <span
                                  role="button"
                                  className="d-flex mx-auto py-2 w-35px h-35px justify-content-center align-items-center text-muted dangerTrash"
                                >
                                  <HiOutlineTrash
                                    size={20}
                                    onClick={() => {
                                      handleShowDelete(data?.roleID);
                                    }}
                                  />
                                </span>
                              </td>
                            </tr>
                            {showDelete && roleID == data?.roleID && (
                              <div className="modal fade" aria-hidden="true">
                                <DeleteRoleFromUserPopup
                                  handleCloseDelete={handleCloseDelete}
                                  showDelete={showDelete}
                                  id={id}
                                  roleId={data?.roleID}
                                />
                              </div>
                            )}
                          </Fragment>
                        );
                      }
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
     
      </div>

      <div className="modal fade" id="rega_modal_add_role" aria-hidden="true">
        <AddRolePopup
          handleCloseAddRole={handleCloseAddRole}
          showAddRole={showAddRole}
          userRoles={userRoles.data}
        />
      </div>
    </>
  );
};
