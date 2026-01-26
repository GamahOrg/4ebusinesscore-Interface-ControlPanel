import { ChangeEvent, FC } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
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
};

export const AddRolePopup: FC<AddRolePopupProps> = ({
  showAddRole,
  handleCloseAddRole,
}) => {
  const intl = useIntl();

  const [rolesTableData, setRolesTableData] = useState<rolesTableDataType[]>([
    {
      id: 1,
      isChecked: false,
      isDisable: true,
      name: "1",
      code: 1,
      role: "مدير مكتب المشروعات",
      onChange: handleSelectRecord,
    },
    {
      id: 2,
      isChecked: false,
      isDisable: false,
      name: "2",
      code: 2,
      role: "اخصائي المشروعات",
      onChange: handleSelectRecord,
    },
    {
      id: 3,
      isChecked: false,
      isDisable: true,
      name: "3",
      code: 3,
      role: "مدير النظام",
      onChange: handleSelectRecord,
    },
  ]);

  function handleSelectRecord(input: rolesTableDataType) {
    input.isChecked = !input.isChecked;
    setRolesTableData([...rolesTableData]);
  }

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    let isChecked = e.target.checked;
    let items: rolesTableDataType[] = rolesTableData.map(
      (item: rolesTableDataType): rolesTableDataType => {
        item.isChecked = isChecked;
        return item;
      }
    );
    setRolesTableData(items);
  }

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
                          <table className="table table-borderless align-middle mt-5">
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
                                    id: "Code",
                                  })}
                                </td>
                                <td className="p-5">
                                  {intl.formatMessage({
                                    id: "Role",
                                  })}
                                </td>
                              </tr>
                            </thead>
                            <tbody className="p-4  text-center border">
                              {rolesTableData.map((data) => (
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
                                  <td className="p-5">
                                    <bdi>{data.code}</bdi>
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
              <div className="mt-8 mb-5 col-12 col-lg-7 mx-auto">
                <div className="text-center">
                  <button
                    type="reset"
                    className="btn btn-light me-3"
                    onClick={handleCloseAddRole}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    onClick={() => {
                      handleCloseAddRole();
                      showSuccessAlert(true, "AddedSuccessfully", intl);
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
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
};
