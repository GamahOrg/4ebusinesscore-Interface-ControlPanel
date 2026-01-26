import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useIntl } from "react-intl";

function AddUserPermissionPopup() {
  const intl = useIntl();

  return (
    <div
      className="modal fade creatForm"
      id="Rega_modal_add-user-permission"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15 mb-7">
            <div className="fw-bolder  pb-8 border-bottom border-gray-300">
              <h1 className="mb-3 text-center ">
                {intl.formatMessage({ id: "AddPermission" })}
              </h1>
              <h3 className="mt-5 ">
                {intl.formatMessage({ id: "PermissionData" })}
              </h3>
              <div className="text-muted fw-bolder fs-6">
                {intl.formatMessage({ id: "PleaseEnterTheData" })}
              </div>
            </div>

            <div className="mb-15 mt-15">
              <form
                noValidate
                className="form outputForm"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="row">
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="PermissionNameInAr"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "PermissionNameInAr" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special bi bi-list-stars"></i>
                          </span>
                        </div>
                        <input
                          id="PermissionNameInAr"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "PermissionNameInAr",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="PermissionNameInEn"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "PermissionNameInEn" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special bi bi-list-stars"></i>
                          </span>
                        </div>
                        <input
                          id="PermissionNameInEn"
                          className="form-control"
                          placeholder={intl.formatMessage({
                            id: "PermissionNameInEn",
                          })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        htmlFor="PermissionRole"
                        className="form-label px-2 required fw-bolder"
                      >
                        {intl.formatMessage({ id: "PermissionRole" })}
                      </label>
                      <select
                        className="form-select form-select-solid fw-bolder"
                        data-kt-select2="true"
                        data-placeholder="Select option"
                        data-allow-clear="true"
                        data-kt-user-table-filter="role"
                        data-hide-search="true"
                      >
                        <option value="">
                          {intl.formatMessage({ id: "Choose" })}
                        </option>
                        <option value="role 1">role 1</option>
                        <option value="role 2">role 2</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="reset"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    onClick={(event) => {
                      event.preventDefault();
                      showSuccessAlert(true, "AddedSuccessfully", intl);
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddUserPermissionPopup;
