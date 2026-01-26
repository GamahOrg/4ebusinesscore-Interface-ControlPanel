import React, { useState } from "react";
import { useIntl } from "react-intl";
import Modal from "react-bootstrap/Modal";
import { getSubSystems } from "../slices/workspaceSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type AllcardsSortPopupProps = {
  show?: any;
  handleClose?: any;
  pageIndex: number;
  pageSize: number;
  filter: any;
  setFilter: any;
  setAgreeFilter: any;
  URL?:any;
  setURL?:any;
  setSearchTerm?:any
};

const SystemsAndservicesFilterPopup: React.FC<AllcardsSortPopupProps> = ({
  show,
  handleClose,
  pageIndex,
  pageSize,
  filter,
  setFilter,
  setAgreeFilter,
  URL,
  setURL,
  setSearchTerm
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [isFilterd, setIsFilterd] = useState(false);

  const handleFilterChange = (e: any) => {
    const { name, value } = e.target;
    setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };

  const { reset } = useForm({
    mode: "all",
    reValidateMode: "onChange",
  });

  const handleApplyFilter = (e: React.FormEvent) => {
    e.preventDefault();
    setAgreeFilter(true);
    setSearchTerm("")
    const params = {
      searchTerm: filter.systemName,
      pageSize: pageSize,
      pageNumber: pageIndex,
      component: filter.cardName,
      numberofservices: filter.cardsCount,
      date: filter.establishedDate,
      subsystemType:
      URL === "/external-systems"
        ? 0
        : URL === "/systems-settings"
          ? 1
          : URL === "/external-components"
            ? 2
            : URL === "/sso-systems"
              ? 3
              : ""
    };

    dispatch(getSubSystems(params) as any);
    // Close the modal and show success alert
    handleClose();
    setIsFilterd(true);
    showSuccessAlert(true, "FilteredSuccessfully", intl);
    reset();
  };

  const handleCloseReset = (e: React.FormEvent) => {
    e.preventDefault();

    const initialFilter = {
      systemName: "",
      establishedDate: "",
      cardsCount: "",
      cardName: "",
      systemType: "all",
      accessMethod: "all",
    };

    if (isFilterd) {
      const params = {
        searchTerm: "",
        pageSize: pageSize,
        pageNumber: pageIndex,
        component: filter.cardName,
        numberofservices: filter.cardsCount,
        date: "",
        subsystemType:
          URL === "/external-systems"
            ? 0
            : URL === "/systems-settings"
            ? 1
            : URL === "/external-components"
            ? 2
            : URL === "/sso-systems"
            ? 3
            : ""
      };
      dispatch(getSubSystems(params) as any);
      setSearchTerm("");
      setFilter(initialFilter);
      setIsFilterd(false);
    } else {
      setSearchTerm("");
      setFilter(initialFilter);  
    }
    
    handleClose();
};


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
              handleApplyFilter(e);
            }}
          >
            <Modal.Body>
              <div className="row gy-5 pb-4">
                <div className="col-md-6">
                  <div>
                    <label
                      htmlFor="SystemName"
                      className="form-label px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "SystemName" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fas fa-layer-group"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={intl.formatMessage({ id: "SystemName" })}
                        className="form-control"
                        name="systemName"
                        id="SystemName"
                        value={filter.systemName}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div>
                    <label
                      htmlFor="EstablishedDate"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "EstablishedDate" })}
                    </label>

                    <input
                      type="date"
                      className="form-control"
                      name="establishedDate"
                      id="EstablishedDate"
                      value={filter.establishedDate}
                      onChange={handleFilterChange}
                    />
                  </div>
                </div>
                {(URL === "/systems-settings") && (
                <>
                <div className="col-md-6">
                  <div>
                    <label
                      htmlFor="CardsCounts"
                      className="form-label mx-2 px-2 fw-bolder"
                    >
                      {intl.formatMessage({ id: "CardsCounts" })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="special fa-solid fa-gear"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={intl.formatMessage({ id: "CardsCounts" })}
                        className="form-control"
                        name="cardsCount"
                        id="CardsCounts"
                        value={filter.cardsCount}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
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
                          <i className="fab fa-servicestack fa-lg"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        placeholder={intl.formatMessage({ id: "CardName" })}
                        className="form-control"
                        name="cardName"
                        id="cardName"
                        value={filter.cardName}
                        onChange={handleFilterChange}
                      />
                    </div>
                  </div>
                </div>
                </>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="d-flex justify-content-center my-5">
                <button
                  type="reset"
                  onClick={(e) => handleCloseReset(e)}
                  aria-hidden="true"
                  className="btn btn-secondary px-15 me-5"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  onClick={handleApplyFilter}
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

export default SystemsAndservicesFilterPopup;
