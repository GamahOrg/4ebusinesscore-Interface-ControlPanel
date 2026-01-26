import { ChangeEvent, FC, useEffect } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { useParams } from "react-router-dom";
import { addRoleToUser } from "../../../features/users-slice/addRoleToUser";
import { fetchUserRoles } from "../../../features/users-slice/userRolesSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type rolesTableDataType = {
  id: number;
  name: string;
  isChecked: boolean;
  isDisable: boolean;
  code: number;
  role: string;
  onChange: (input: rolesTableDataType) => void;
};

type AddRolePopupProps = {
  showAddRole?: any;
  handleCloseAddRole?: any;
  userRoles?: any;
};

export const AddRolePopup: FC<AddRolePopupProps> = ({
  showAddRole,
  handleCloseAddRole,
  userRoles,
}) => {
  const intl = useIntl();
  let { id } = useParams();
  let dispatch = useDispatch();
  let [selectedRoleIds, setSelectedRoleIds] = useState<any>(
    []
    //   () => JSON.parse(localStorage.getItem("selectedRoleIds") || "[]")
  );

  let roles = useSelector((state: RootState) => {

    return state?.roles?.data;
  });
 const lang = intl.locale;
   useEffect(() => {
    setSelectedRoleIds(userRoles?.map((role: any) => role.roleID) || []);
  }, [userRoles]);

  let [rolesTableData, setRolesTableData] = useState<any>([]);

  useEffect(() => {
    setRolesTableData(
      roles?.data?.map((role, index) => {
        return {
          index,
          id: role?.id,
          isChecked: selectedRoleIds.includes(role?.id),
          isDisable: true,
 name: lang === "en" ? role?.nameEn : role?.nameAr,          code: role?.code,
role: lang === "en" ? role?.nameEn : role?.nameAr,          onChange: handleSelectRecord,
        };
      })
    );
  }, [roles, selectedRoleIds, lang]);

  function handleSelectRecord(input: rolesTableDataType) {
    setRolesTableData((prevRolesTableData: any) =>
      prevRolesTableData.map((roleData: rolesTableDataType) =>
        roleData.id === input.id
          ? { ...roleData, isChecked: !roleData.isChecked }
          : roleData
      )
    );

    setSelectedRoleIds((prev: any) => {
      if (input.isChecked) {
        return prev.filter((id: any) => id !== input?.id);
      } else {
        return [...prev, input?.id];
      }
    });
  }

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    const isChecked = e.target.checked;

    setRolesTableData((prevRolesTableData: any) =>
      prevRolesTableData.map((roleData: rolesTableDataType) => ({
        ...roleData,
        isChecked: isChecked,
      }))
    );

    if (isChecked) {
      setSelectedRoleIds(roles?.data?.map((role) => role?.id) || []);
    } else {
      setSelectedRoleIds([]);
    }
  }

  let AddHandler = (data: any) => {
    dispatch(addRoleToUser(data) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        handleCloseAddRole();
        dispatch(
          fetchUserRoles({
            pageSize: 1000,
            pageNumber: 1,
            id,
          }) as any
        ) as any;
      }
    });
  };

  return (
    <>
      <div className="modal fade" aria-hidden="true">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showAddRole}
          onHide={handleCloseAddRole}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h2 className="card-title flex-column align-items-center py-4">
                    <span className="fw-bolder mb-2 fs-3">
                      {intl.formatMessage({
                        id: "AddRole",
                      })}
                    </span>
                  </h2>
                  <span className="text-muted fw-lighter">
                    {intl.formatMessage({
                      id: "PleaseChooseTheData",
                    })}
                  </span>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                <div className="card card-xl-stretch mb-xl-0 py-4">
                  <div className="card-body py-3 px-3 mx-8">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade active show"
                        id="REGA_table_widget_5_tab_1"
                      >
                        <div className="table-responsive fs-6 ">
                          <table className="table table-borderless align-middle mt-5 text-gray-800">
                            <thead className="p-4 text-center fw-bolder border">
                              <tr>
                                <td className="p-5">
                                  <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                                    <input
                                      className="form-check-input widget-9-check xCheckBg"
                                      type="checkbox"
                                      defaultValue={0}
                                      onChange={selectAllRecord}
                                    />
                                  </div>
                                </td>
                                <td className="p-5">
                                  {intl.formatMessage({
                                    id: "Role",
                                  })}
                                </td>
                              </tr>
                            </thead>
                            <tbody className="p-4  text-center border">
                              {rolesTableData?.map((data: any) => (
                                <tr
                                  key={data.id}
                                  className="text-center fw-lighter"
                                >
                                  <td className="p-5">
                                    <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                                      <input
                                        className="form-check-input widget-9-check xCheckBg"
                                        type="checkbox"
                                        defaultValue={0}
                                        name={data.name}
                                        checked={data.isChecked}
                                        onChange={() => data.onChange(data)}
                                      />
                                    </div>
                                  </td>
                                  <td className="p-5">{data.role}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-8 mb-5 d-flex gap-4 mx-auto">
                <button
                  type="reset"
                  className="btn btn-light px-15"
                  onClick={handleCloseAddRole}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  className="btn btn-success px-15"
                  onClick={() => {
                    AddHandler({ rolesId: selectedRoleIds, userId: id });
                  }}
                >
                  <span className="indicator-label">
                    {intl.formatMessage({ id: "Add" })}
                  </span>
                  <span className="indicator-progress">
                    {intl.formatMessage({ id: "PleaseWait" })}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
};
