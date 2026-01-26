import { FC } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type ChangePasswordPopupProps = {
  showChangePasswordPopup?: any;
  handleCloseChangePasswordPopup?: any;
};

export const ChangePasswordPopup: FC<ChangePasswordPopupProps> = ({
  showChangePasswordPopup,
  handleCloseChangePasswordPopup,
}) => {
  const intl = useIntl();

  return (
    <>
      <div className="modal-dialog modal-dialog-centered mw-1000px">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showChangePasswordPopup}
          onHide={handleCloseChangePasswordPopup}
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
                  <h2 className="flex-column align-items-center">
                    <span className="fw-bolder mb-2 fs-3">
                      {intl.formatMessage({
                        id: "ChangePassword",
                      })}
                    </span>
                  </h2>
                </Modal.Title>
              </div>
            </Modal.Header>

            <Modal.Body>
              <div className="row">
                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3">
                    <label className="form-label px-2  fs-6 text-gray-700">
                      {intl.formatMessage({ id: "NewPassword" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text h-100">
                          <i className="special fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "NewPassword",
                        })}
                      />
                    </div>

                    <span className="d-block text-muted">
                      {intl.formatMessage({ id: "PasswordHint" })}
                    </span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="mb-2 pt-2 pb-3">
                    <label className="form-label px-2  fs-6 text-gray-700">
                      {intl.formatMessage({
                        id: "ConfirmNewPassword",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text h-100">
                          <i className="special fas fa-key"></i>
                        </span>
                      </div>
                      <input
                        type="password"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "ConfirmNewPassword",
                        })}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <div className="mt-8 mb-5 col-12 col-lg-7 mx-auto">
                <div className="text-center">
                  <button
                    type="reset"
                    className="btn btn-light me-3"
                    onClick={handleCloseChangePasswordPopup}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => {
                      handleCloseChangePasswordPopup();
                      showSuccessAlert(true, "EditedSuccessfully", intl);
                    }}
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Edit" })}
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
