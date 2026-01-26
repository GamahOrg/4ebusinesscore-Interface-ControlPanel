import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { useIntl } from "react-intl";

function ViewallcardsSortDepartmentsPopup() {
  const intl = useIntl();

  return (
    <div className="modal-dialog modal-dialog-centered mw-850px">
      <div className="modal-content">
        <div className="modal-header justify-content-end border-0 pb-0">
          <div
            className="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <KTSVG
              path="/media/icons/duotune/arrows/arr061.svg"
              className="svg-icon-1"
            />
          </div>
        </div>

        <div className="card card-xl-stretch mb-xl-0">
          <div className="text-center">
            <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
              <span className="card-label fs-4 my-5">
                {" "}
                {intl.formatMessage({ id: "DataFiltering" })}
              </span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
              </span>
            </h3>
          </div>
        </div>

        <div className="card-body py-3 px-3 mx-2 mx-md-8">
          <div className="tab-content">
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
                <div className="row gy-5 pb-4">
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="departmentNames">
                        {intl.formatMessage({ id: "DepartmentNames" })}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        name="departmentNames"
                        id="departmentNames"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div>
                      <label htmlFor="Manager">
                        {intl.formatMessage({ id: "Manager" })}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-solid"
                        name="manager"
                        id="manager"
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div>
                      <span>{intl.formatMessage({ id: "Permissions" })}</span>
                      <div className="d-flex flex-wrap my-3">
                        <div className="d-flex justify-content-center form-check-label align-items-center mx-3">
                          <input
                            type="checkbox"
                            className="mx-2 form-check-input my-2 my-md-0"
                            name="showDe"
                            id="showDe"
                          />
                          <label htmlFor="showDe">
                            {intl.formatMessage({ id: "Show" })}
                          </label>
                        </div>
                        <div className="d-flex justify-content-center form-check-label align-items-center mx-3">
                          <input
                            type="checkbox"
                            className="mx-2 form-check-input my-2 my-md-0"
                            name="addDe"
                            id="addDe"
                          />
                          <label htmlFor="addDe">
                            {intl.formatMessage({ id: "Add" })}
                          </label>
                        </div>
                        <div className="d-flex justify-content-center form-check-label align-items-center mx-3">
                          <input
                            type="checkbox"
                            className="mx-2 form-check-input my-2 my-md-0"
                            name="editDe"
                            id="editDe"
                          />
                          <label htmlFor="editDe">
                            {intl.formatMessage({ id: "Edit" })}
                          </label>
                        </div>
                        <div className="d-flex justify-content-center form-check-label align-items-center mx-3">
                          <input
                            type="checkbox"
                            className="mx-2 form-check-input my-2 my-md-0"
                            name="deleteDe"
                            id="deleteDe"
                          />
                          <label htmlFor="deleteDe">
                            {intl.formatMessage({ id: "Delete" })}
                          </label>
                        </div>
                        <div className="d-flex justify-content-center form-check-label align-items-center mx-3">
                          <input
                            type="checkbox"
                            className="mx-2 form-check-input my-2 my-md-0"
                            name="allDe"
                            id="allDe"
                          />
                          <label htmlFor="allDe">
                            {intl.formatMessage({ id: "All" })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center my-5">
                  <button
                    type="reset"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    onClick={(event) => {
                      event.preventDefault();
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Agree" })}
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

export default ViewallcardsSortDepartmentsPopup;
