import React from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import CheckBoxDropDown from "../partials/CheckBoxDropDown";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AllcardsSortPopupProps = {
  show?: any;
  handleClose?: any;
};

const ViewallcardsSortPopup: React.FC<AllcardsSortPopupProps> = ({
  show,
  handleClose,
}) => {
  const intl = useIntl();

  const [categories, setCategories] = useState([]);
  const categoryOptions = [
    {
      id: 1,
      name: "Permissions",
    },
    {
      id: 2,
      name: "Permissions 2",
    },
    {
      id: 3,
      name: "Permissions 3",
    },
  ];

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
                <div className="col-md-4">
                  <div>
                    <label
                      htmlFor="cardName"
                      className="form-label px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "CardName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fa-solid fa-gear"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="cardName"
                        id="cardName"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label
                      htmlFor="cardStatus"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "CardStatus" })}
                    </label>
                    <div className="form-control form-control-solid d-flex">
                      <div>
                        <input
                          type="radio"
                          name="cardStatus"
                          id="cardStatusEnable"
                          className="form-check-input"
                          defaultChecked
                        />
                        <label htmlFor="cardStateEnable" className="mx-2">
                          {intl.formatMessage({ id: "AdminEnable" })}
                        </label>
                      </div>
                      <div className="mx-4">
                        <input
                          type="radio"
                          name="cardStatus"
                          id="cardStatusDisable"
                          className="form-check-input"
                        />
                        <label htmlFor="cardStatusDisable" className="mx-2">
                          {intl.formatMessage({ id: "AdminDisable" })}
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div>
                    <label
                      htmlFor="permissions"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "Permissions" })}
                    </label>
                    <CheckBoxDropDown
                      placeholder={intl.formatMessage({ id: "Permissions" })}
                      selectedOptions={categories}
                      setSelectedOptions={setCategories}
                      options={categoryOptions}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label
                      htmlFor="Owner"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "DepartmentNames" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-layer-group"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="Owner"
                        id="Owner"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label
                      htmlFor="filtering"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "Filtering" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-filter"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        name="filtering"
                        id="filtering"
                      />
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
                    showSuccessAlert(true, "AddedSuccessfully", intl);
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

export default ViewallcardsSortPopup;
