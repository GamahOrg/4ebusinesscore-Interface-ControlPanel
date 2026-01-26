import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";

type AllcardsSortRolesPopupProps = {
  show?: any;
  handleClose?: any;
};
const ViewallcardsSortRolesPopup: React.FC<AllcardsSortRolesPopupProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();

  return (
    <div className="modal-dialog modal-dialog-centered mw-850px">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
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
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5">
                    {" "}
                    {intl.formatMessage({ id: "DataFiltering" })}
                  </span>
                  <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                    {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
        </div>

        <div
          className="tab-pane fade active show"
          id="REGA_table_widget_5_tab_1"
        >
          <form
            noValidate
            className="form outputForm"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <Modal.Body>
              <div className="row gy-5 pb-4">
                <div className="col-12">
                  <div>
                    <label
                      htmlFor="roleName"
                      className="form-label px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "RoleName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-user-tag"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="roleName"
                        id="roleName"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <div>
                    <span>{intl.formatMessage({ id: "Permissions" })}</span>
                    <div className="d-flex my-3">
                      <div className="d-flex justify-content-center form-check-label align-items-center mx-4">
                        <input
                          type="checkbox"
                          className="mx-2 form-check-input my-2 my-md-0"
                          name="showRo"
                          id="showRo"
                        />
                        <label htmlFor="showRo">
                          {intl.formatMessage({ id: "Show" })}
                        </label>
                      </div>
                      <div className="d-flex justify-content-center form-check-label align-items-center mx-4">
                        <input
                          type="checkbox"
                          className="mx-2 form-check-input my-2 my-md-0"
                          name="addRo"
                          id="addRo"
                        />
                        <label htmlFor="addRo">
                          {intl.formatMessage({ id: "Add" })}
                        </label>
                      </div>
                      <div className="d-flex justify-content-center form-check-label align-items-center mx-4">
                        <input
                          type="checkbox"
                          className="mx-2 form-check-input my-2 my-md-0"
                          name="editRo"
                          id="editRo"
                        />
                        <label htmlFor="editRo">
                          {intl.formatMessage({ id: "Edit" })}
                        </label>
                      </div>
                      <div className="d-flex justify-content-center form-check-label align-items-center mx-4">
                        <input
                          type="checkbox"
                          className="mx-2 form-check-input my-2 my-md-0"
                          name="deleteRo"
                          id="deleteRo"
                        />
                        <label htmlFor="deleteRo">
                          {intl.formatMessage({ id: "Delete" })}
                        </label>
                      </div>
                      <div className="d-flex justify-content-center form-check-label align-items-center mx-4">
                        <input
                          type="checkbox"
                          className="mx-2 form-check-input my-2 my-md-0"
                          name="allRo"
                          id="allRo"
                        />
                        <label htmlFor="allRo">
                          {intl.formatMessage({ id: "All" })}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="d-flex justify-content-center my-5">
                <button
                  type="reset"
                  onClick={handleClose}
                  aria-hidden="true"
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    handleClose();
                  }}
                  className="btn btn-success px-15 ms-5"
                >
                  {intl.formatMessage({ id: "Agree" })}
                </button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default ViewallcardsSortRolesPopup;
