import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type FilterFormsDomainsPopupProps = {
  showFilter: boolean;
  handleClose: () => void;
  setFilter?: any;
  filter?: any;
  setClickedFiltered?: any;
  ClickedFiltered?: any;
};

export const FilterUsersPopup: React.FC<FilterFormsDomainsPopupProps> = ({
  showFilter,
  handleClose,
  setFilter,
  filter,
  setClickedFiltered,
  ClickedFiltered,
}) => {
  const intl = useIntl();
  let language = intl.locale;

  const maxDate = "9999-12-31";
  const [enablePermission, setEnablePermission] = useState<string>("");
  const [enableunified, setEnableUnified] = useState<string>("");

  const handlePermissionChange = (value: string) => {
    setEnablePermission(value);
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      enablePermission: value == "enabled" ? "false" : "true",
    }));
  };
  const handleUnifiedChange = (value: string) => {
    setEnableUnified(value);
    setFilter((prevFilter: any) => ({
      ...prevFilter,
      enableUnified: value == "enabled" ? "true" : "false",
    }));
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };
  const handleApplyFilter = (e: React.FormEvent) => {
    setClickedFiltered(filter);
    // const filteredParams = Object.fromEntries(
    //   Object.entries(params).filter(
    //     ([_, value]) => value !== undefined && value !== null && value !== ""
    //   )
    // );
    // dispatch(fetchUsers(filteredParams) as any);
    handleClose();
    // setFilter({
    //   name: "",
    //   date: "",
    //   enablePermission: "",
    //   enableUnified: "",
    // });
    showSuccessAlert(true, "FilteredSuccessfully", intl);
  };

  return (
    <>
      <Modal centered show={showFilter} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApplyFilter(e);
            }}
          >
            <div className="card">
              <div className="card-body mx-5">
                <div className="card-header px-1 pb-2 mb-5 flex-column">
                  <h2 className="flex-column align-items-center align-self-center mb-5">
                    <span className="fw-bolder mb-2">
                      {intl.formatMessage({
                        id: "FILTERING.DATA",
                      })}
                    </span>
                  </h2>
                  <div className="my-3">
                    <h2 className="flex-column align-items-center">
                      <span className="fw-bolder mb-2">
                        {intl.formatMessage({ id: "UserInformation" })}
                      </span>
                    </h2>
                    <span className="text-muted fw-lighter">
                      {intl.formatMessage({
                        id: "PleaseChooseDataClassification",
                      })}
                    </span>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                          display: "block",
                        }}
                        className="form-label px-2  fs-6 text-gray-700"
                      >
                        {intl.formatMessage({ id: "Username" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="bi bi-person special"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          name="name"
                          value={filter.name}
                          onChange={handleFilterChange}
                          placeholder={intl.formatMessage({ id: "UserName" })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        className="form-label px-2  fs-6 text-gray-700 "
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                          display: "block",
                        }}
                      >
                        {intl.formatMessage({ id: "LastSignIn" })}
                      </label>
                      <input
                        type="date"
                        max={maxDate}
                        name="date"
                        value={filter.date}
                        onChange={handleFilterChange}
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "Date",
                        })}
                      />
                    </div>
                  </div>

                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 ">
                        {intl.formatMessage({ id: "Permission" })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="enabled"
                            value="enabled"
                            checked={
                              enablePermission === "enabled" ? true : false
                            }
                            onChange={() => handlePermissionChange("enabled")}
                          />
                          <label className="form-check-label" htmlFor="enabled">
                            {intl.formatMessage({ id: "Enabled" })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="disabled"
                            value="disabled"
                            checked={
                              enablePermission === "disabled" ? true : false
                            }
                            onChange={() => handlePermissionChange("disabled")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="disabled"
                          >
                            {intl.formatMessage({ id: "Disabled" })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Row>
                <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-50">
                      <div
                        data-bs-dismiss="modal"
                        className="btn btn-secondary mx-1 text-center w-100"
                        onClick={() => {
                          if (filter !== ClickedFiltered) {
                            setFilter({
                              name: "",
                              date: "",
                              enablePermission: "",
                              enableUnified: "",
                            });
                            setClickedFiltered(filter);
                            setEnablePermission("");
                          }
                          handleClose();
                        }}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </div>
                      <button
                        className="btn btn-success mx-1 text-center w-100"
                        style={{ border: "none" }}
                        type="submit"
                        onClick={() => {
                          handleClose();
                        }}
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </button>
                    </div>
                  </div>
                </div>
              </Row>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
