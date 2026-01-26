import { FC } from "react";
import { useIntl } from "react-intl";
import { PermissionActions } from "./PermissionActions";
import { FilterPermissionsPopup } from "../popup/filter-permissions-popup";
import AddUserPermissionPopup from "../popup/add-user-permission-popup";

const PermissionsTable: FC = () => {
  const intl = useIntl();
  const permissions = [
    {
      id: 1,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
    {
      id: 1,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
    {
      id: 2,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
    {
      id: 3,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
    {
      id: 4,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
    {
      id: 5,
      name: "ادارة المستخدمين",
      permissionAssignedTo: [
        "Department manager",
        "developer",
        "analyst",
        "sector manager",
        "gest",
      ],
      date: "25 مارس 2023 - 5 مساء",
    },
  ];
  const getPermoiisionUsers = (users: any) => {
    return (
      <div className="d-flex justify-content-center align-items-center gap-5">
        {users?.includes("Department manager") && (
          <div className="text-primary rounded badgex badge-light-primary px-5 py-1">
            {intl.formatMessage({ id: "DepartmentManager" })}
          </div>
        )}
        {users?.includes("developer") && (
          <div className="text-danger rounded badgex badge-light-danger px-5 py-1">
            {intl.formatMessage({ id: "Developer" })}
          </div>
        )}
        {users?.includes("analyst") && (
          <div className="text-success rounded badgex badge-light-success px-5 py-1">
            {intl.formatMessage({ id: "Analyst" })}
          </div>
        )}
        {users?.includes("sector manager") && (
          <div className="text-info rounded badgex badge-light-info px-5 py-1">
            {intl.formatMessage({ id: "SectorManager" })}
          </div>
        )}
        {users?.includes("gest") && (
          <div className="text-warning rounded badgex badge-light-warning px-5 py-1">
            {intl.formatMessage({ id: "Gest" })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="card card-xl-stretch mb-xl-8">
      <div className="card-header border-0 pt-3 pb-2 mb-2 mt-4 row align-items-center justify-content-between">
        <div className="col-lg-6">
          <form className="position-relative" autoComplete="off">
            <input
              type="text"
              className="form-control form-control-solid px-15"
              name="search"
              value=""
              placeholder={intl.formatMessage({
                id: "SearchAboutPermissions",
              })}
            />
          </form>
        </div>
      </div>
      <div className="card-body py-3">
        <div className="tab-content">
          <div className="tab-pane fade active show">
            <div className="table-responsive">
              <table className="table align-middle gs-0 gy-4 text-center">
                <thead>
                  <tr className="fw-bolder text-muted">
                    <th className="fw-bolder pb-3 min-w-50px d-flex justify-contet-end px-20">
                      {intl.formatMessage({ id: "PermissionName" })}
                    </th>
                    <th className="fw-bolder pb-3 min-w-100px">
                      {intl.formatMessage({
                        id: "ThePermissionAssignedTo",
                      })}
                    </th>
                    <th className="fw-bolder pb-3 min-w-100px">
                      {intl.formatMessage({ id: "CreationDate" })}
                    </th>
                    <th className="fw-bolder pb-3 min-w-50px">
                      {intl.formatMessage({ id: "Actions" })}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {permissions?.map((permission: any) => (
                    <tr key={permission?.id} className="align-middle ">
                      <td className="d-flex  py-8">
                        <div className="fw-bolder mb-2 d-flex justify-content-start">
                          {permission?.name}
                        </div>
                      </td>
                      <td>
                        {getPermoiisionUsers(permission?.permissionAssignedTo)}
                      </td>
                      <td className="fw-bolder">{permission?.date}</td>
                      <td>
                        <PermissionActions id={permission?.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <FilterPermissionsPopup />
              <AddUserPermissionPopup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PermissionsTable;
