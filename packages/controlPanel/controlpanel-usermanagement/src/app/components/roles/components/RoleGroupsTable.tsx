import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AddGroupToRolePopup from "../popup/add-group-to-role-popup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { fetchGroupRoles } from "../../../features/role-group/roleGroup";
import moment from "moment";
import { RoleGroupsActions } from "./RoleGroupActions";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

interface Props {
  id: string;
}

const RoleGroupsTable: FC<Props> = ({ id }) => {
  const intl = useIntl();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  let [showAddUserToRole, setShowAddGroupToRole] = useState<boolean>(false);
  let groupRoles = useSelector((state: RootState) => {
    return state?.groupRole;
  });
  let totalPages = useSelector((state: any) => {
    return state?.groupRole?.data?.totalPages;
  });

  let totalItems = useSelector((state: any) => {
    return state?.groupRole?.data?.totalItems;
  });

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState("");
  const handleSearchChange = (e: any) => {
    setSearchText(e.target.value);
  };
  useEffect(() => {
    let params: any = {
      pageSize: pageSize,
      pageNumber: pageIndex,
      searchText: searchText,
    };
    dispatch(fetchGroupRoles({ id, params }) as any);
  }, [searchText, pageSize, pageIndex, dispatch]);
  return (
    <>
      <div className="mb-10">
        <div className="card card-xl-stretch mb-xl-0 pb-4 pt-15">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div className="tab-pane fade active show">
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
                    data-bs-toggle="modal"
                    data-bs-target="#Rega_modal_add-group-to-role"
                    onClick={() => {
                      setShowAddGroupToRole(true);
                    }}
                  >
                    {intl.formatMessage({
                      id: "AddGroup",
                    })}
                  </button>
                </div>
              </div>
              <div className="table-responsive fs-6 mt-2">
                <table className="table text-center table-borderless align-middle mt-5">
                  <thead className="p-4 text-center fw-bolder border">
                    <tr className="fw-bolder text-muted">
                      <th className="fw-bolder pb-3 min-w-50px d-flex justify-contet-end px-20">
                        {intl.formatMessage({ id: "GroupDetails" })}
                      </th>
                      <th className="fw-bolder pb-3 min-w-100px">
                        {intl.formatMessage({ id: "EstablishedDate" })}
                      </th>
                      <th className="fw-bolder pb-3 min-w-100px">
                        {intl.formatMessage({ id: "LastEditDate" })}
                      </th>
                      <th className="fw-bolder pb-3 min-w-50px">
                        {intl.formatMessage({ id: "Actions" })}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="p-4  text-center border">
                    {groupRoles.data?.data
                      .filter((group) =>
                        group.groupName
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                      )
                      .map((group, index: number) => (
                        <tr key={index} className="align-middle ">
                          <td>
                            <div>
                              <div className="ms-5 d-flex align-items-center">
                                <div className="symbol position-relative  symbol-circle">
                                  <img
                                    alt="Pic"
                                    src={`${UserManagmentRootUrl}${group?.imageUrl}`}
                                  />
                                </div>
                                <div className="d-flex flex-column align-items-start mx-3">
                                  <p className="h4 fw-bolder mb-1">
                                    {group.groupName}
                                  </p>
                                  <p className="text-muted mb-0 fw-lighter">
                                    {group.description}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className="fw-bolder">
                              {moment(group?.createdOn).format("YYYY-MM-DD")}
                            </span>
                          </td>
                          <td>
                            <span className="fw-bolder">
                              {moment(group?.LastUpdated).format("YYYY-MM-DD")}
                            </span>
                          </td>
                          <td>
                            <div>
                              <RoleGroupsActions
                                groupId={group.groupId}
                                RoleId={id}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                {groupRoles.data && (
                  <SystemPagination
                    totalPages={totalPages}
                    totalItems={totalItems}
                    pageIndex={pageIndex}
                    pageSize={pageSize}
                    setPageIndex={setPageIndex}
                    setPageSize={setPageSize}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddUserToRole && (
        <AddGroupToRolePopup
          id={id}
          handleClose={() => {
            setShowAddGroupToRole(false);
          }}
        />
      )}
    </>
  );
};

export default RoleGroupsTable;
