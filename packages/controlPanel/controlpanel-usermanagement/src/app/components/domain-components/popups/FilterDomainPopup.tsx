import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { fetchDomainsLookup } from "../../../features/domains-slice/domainsSliceLookup";
import { fetchDomains } from "../../../features/domains-slice/domainsSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type FilterFormsDomainsPopupProps = {
  showFilter: boolean;
  handleClose: () => void;
};

export const FilterDomainPopup: React.FC<FilterFormsDomainsPopupProps> = ({
  showFilter,
  handleClose,
}) => {
  const intl = useIntl();
  let [isActive, setIsActive] = useState<string>("");
  let language = intl.locale;
  let domainsLookup = useSelector((state: RootState) => {
    return state?.domainsLookup?.data;
  });
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDomainsLookup("") as any);
  }, []);

  const [filter, setFilter] = useState({
    name: "",
    domainName: "",
    isActive: "",
    updatedOn: "",
  });
  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };
  const handlePermissionChange = (value: string) => {
    setIsActive(value);
    setFilter((prevFilter) => ({ ...prevFilter, isActive: value }));
  };
  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = {
      userName: filter.name,
      domainName: filter.domainName,
      updatedOn: filter.updatedOn,
      isActive: filter.isActive,
    };

    dispatch(fetchDomains(params) as any);
    const filteredParams = Object.fromEntries(
      Object.entries(params).filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
    );
    dispatch(fetchDomains(filteredParams) as any);
    handleClose();
    showSuccessAlert(true, "FilteredSuccessfully", intl);
    setFilter({
      name: "",
      domainName: "",
      isActive: "",
      updatedOn: "",
    });
  };
  return (
    <>
      <Modal centered show={showFilter} onHide={handleClose} size="lg">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
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
                        {intl.formatMessage({ id: "DomainInformation" })}
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
                        {intl.formatMessage({ id: "Creator" })}
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
                          placeholder={intl.formatMessage({ id: "Creator" })}
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
                        {intl.formatMessage({ id: "Date" })}
                      </label>
                      <input
                        type="date"
                        value={filter.updatedOn}
                        onChange={handleFilterChange}
                        name="updatedOn"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "Date",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label
                        className="form-label px-2  fs-6 text-gray-700 "
                        style={{
                          textAlign: language == "ar" ? "right" : "left",
                          width: "100%",
                          display: "block",
                        }}
                      >
                        {intl.formatMessage({ id: "Source" })}
                      </label>

                      <div className="mx-auto mt-1  ">
                        <select
                          className="form-select form-select-solid"
                          value={filter.domainName}
                          onChange={handleFilterChange}
                          name="domainName"
                        >
                          <option value={""} selected disabled>
                            {intl.formatMessage({ id: "Choose" })}
                          </option>
                          {domainsLookup?.map((domain) => (
                            <option value={domain?.domainName} key={domain?.id}>
                              {domain?.domainName}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 ">
                        {intl.formatMessage({
                          id: "Status",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="enabled"
                            value={"true"}
                            onChange={() => handlePermissionChange("true")}
                          />
                          <label className="form-check-label" htmlFor="enabled">
                            {intl.formatMessage({ id: "Active" })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="disabled"
                            value={"false"}
                            onChange={() => handlePermissionChange("false")}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="disabled"
                          >
                            {intl.formatMessage({ id: "InActive" })}
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
