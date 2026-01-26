import React, { useState } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { fetchGroups } from "../../../features/group-slice/Groups-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type FilterFormsDomainsPopupProps = {
  showFilter: boolean;
  handleClose: () => void;
};

export const FilterFormsPopup: React.FC<FilterFormsDomainsPopupProps> = ({
  showFilter,
  handleClose,
}) => {
  const maxDate = "9999-12-31";

  const intl = useIntl();
  let [searchParams, setSearchParams] = useSearchParams();
  let [groupName, setGroupName] = useState<string | null>(
    searchParams?.get("groupName") || ""
  );
  let [date, setDate] = useState<any | null>(
    searchParams?.get("createdOn") || ""
  );
  let [updatedOn, setupdatedOn] = useState<any | null>(
    searchParams?.get("updatedOn") || ""
  );

  let dispatch = useDispatch();

  let handleFilter = () => {
    if (groupName !== "") {
      searchParams.set("groupName", groupName as unknown as string);
    } else {
      searchParams.set("groupName", "");
    }
    if (date != "") {
      const currentDate = new Date(date);
      const formattedDate = currentDate.toISOString().split("T")[0];
      searchParams.set("createdOn", formattedDate);
    } else {
      searchParams.set("createdOn", "");
    }
    if (updatedOn != "") {
      const currentDate = new Date(updatedOn);
      const formattedDate = currentDate.toISOString().split("T")[0];
      searchParams.set("updatedOn", formattedDate);
    } else {
      searchParams.set("updatedOn", "");
    }
    setSearchParams(searchParams);
    dispatch(
      fetchGroups({
        pageSize: 1000,
        pageNumber: 1,
        groupName: searchParams.get("groupName"),
        createdOn: searchParams.get("createdOn"),
        updatedOn: searchParams.get("updatedOn"),
      }) as any
    );
    handleClose();
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
              handleFilter();
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
                        {intl.formatMessage({ id: "GroupInforamtion" })}
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
                          width: "100%",
                          display: "block",
                        }}
                        className="form-label px-2  fs-6 text-gray-700"
                      >
                        {intl.formatMessage({ id: "GroupName" })}
                      </label>
                      <div className="input-group">
                        <div className="input-group-prepend">
                          <span className="input-group-text">
                            <i className="special fas fa-users"></i>
                          </span>
                        </div>
                        <input
                          type="text"
                          className="form-control"
                          onChange={(e) => {
                            setGroupName(e.target.value);
                          }}
                          value={groupName || ""}
                          placeholder={intl.formatMessage({ id: "GroupName" })}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        className="form-label px-2  fs-6 text-gray-700 "
                        style={{
                          width: "100%",
                          display: "block",
                        }}
                      >
                        {intl.formatMessage({ id: "EstablishedDate" })}
                      </label>
                      <input
                        type="date"
                        max={maxDate}
                        onChange={(e) => {
                          setDate(e.target.value);
                        }}
                        value={date || ""}
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "EstablishedDate",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-6">
                    <div className="mb-2 pt-2 pb-3">
                      <label
                        className="form-label px-2  fs-6 text-gray-700 "
                        style={{
                          width: "100%",
                          display: "block",
                        }}
                      >
                        {intl.formatMessage({ id: "LastEditDate" })}
                      </label>
                      <input
                        type="date"
                        max={maxDate}
                        onChange={(e) => {
                          setupdatedOn(e.target.value);
                        }}
                        value={updatedOn || ""}
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "LastEditDate",
                        })}
                      />
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
                          handleFilter();
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
