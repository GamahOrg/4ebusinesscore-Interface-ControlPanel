import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { AddRolePopup } from "../popup/add-role-popup";
import { HiOutlineTrash } from "react-icons/hi";

type TableHeaderType = {
  id: number;
  title: string;
};

type TableDataType = {
  id: number;
  code: number;
  role: string;
  date: string;
  permissionOwner: string;
};

export const UserRolesTab: FC = () => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);

  const [showAddRole, setShowAddRole] = useState(false);
  const handleCloseAddRole = () => setShowAddRole(false);
  const handleShowAddRole = () => setShowAddRole(true);
  const tableHeaders: TableHeaderType[] = [
    {
      id: 1,
      title: intl.formatMessage({ id: "Code" }),
    },
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
  const tableData: TableDataType[] = [
    {
      id: 1,
      code: 1,
      role: "مدير مكتب المشروعات",
      date: "2021-08-12 12:00:00",
      permissionOwner: "محمد علي",
    },
    {
      id: 2,
      code: 2,
      role: "مدير مكتب المشروعات",
      date: "2021-08-12 12:00:00",
      permissionOwner: "محمد علي",
    },
    {
      id: 3,
      code: 3,
      role: "مدير النظام",
      date: "2021-08-12 12:00:00",
      permissionOwner: "محمد علي",
    },
    {
      id: 4,
      code: 4,
      role: "اخصائي المشروعات",
      date: "2021-08-12 12:00:00",
      permissionOwner: "محمد علي",
    },
  ];

  return (
    <>
      <div className="mb-10">
        <div className="card card-xl-stretch mb-xl-0 pb-4 pt-15">
          <div className="d-flex justify-content-between p-4 align-items-center"></div>
          <div className="card-body py-3 px-3 mx-8">
            <div className="tab-content">
              <div className="tab-pane fade active show">
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
                <table className="table table-borderless align-middle mt-5">
                  <thead className="p-4 text-center fw-bolder border">
                    {tableHeaders.map((header) => (
                      <td key={header.id} className="p-5">
                        <bdi>{header.title}</bdi>
                      </td>
                    ))}
                  </thead>
                  <tbody className="text-center border">
                    {tableData.map((data) => (
                      <tr key={data.id} className="text-center fw-lighter">
                        <td className="p-5">{data.code}</td>
                        <td className="p-5">{data.role}</td>
                        <td className="p-5">{data.date}</td>
                        <td className="p-5">{data.permissionOwner}</td>
                        <td className="p-5">
                          <span
                            role="button"
                            className="d-flex mx-auto py-2 w-35px h-35px justify-content-center align-items-center text-muted dangerTrash"
                          >
                            <HiOutlineTrash
                              size={20}
                              onClick={handleShowDelete}
                            />
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="modal fade" id="rega_modal_add_role" aria-hidden="true">
        <AddRolePopup
          handleCloseAddRole={handleCloseAddRole}
          showAddRole={showAddRole}
        />
      </div>
    </>
  );
};
