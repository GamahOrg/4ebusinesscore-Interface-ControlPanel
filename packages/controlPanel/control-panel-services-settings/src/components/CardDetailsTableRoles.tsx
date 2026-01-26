import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { ViewallcardsCardDetailsTableRolesSettings } from "./CardDetailsTableRolesSettings";
import ViewallcardsSortRolesPopup from "../popup/sort-roles-popup";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

const ViewAllcardsCardDetailsTableRoles: FC = () => {
  const intl = useIntl();
  const xyMark = { x: true, y: false };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div
        id="kt_Detailscontent_container"
        className="d-flex flex-column-fluid align-items-start mt-4 mt-md-0"
      >
        <div className="content flex-row-fluid" id="kt_Detailscontent">
          <div className="row">
            <div className="col-xl-12">
              <div className="card card-xl-stretch card-body pt-0">
                <div className="card-header border-0 pt-3 pb-2 mb-2">
                  <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center w-100">
                    <div className="mb-3 mb-md-0">
                      <input
                        type="search"
                        name="search"
                        className="form-control form-control-solid ps-10"
                        placeholder={intl.formatMessage({ id: "Search" })}
                      />
                    </div>
                    <div className="d-flex justify-content-end align-items-center">
                      <a
                        className="btn btn-secondary fw-bolder"
                        onClick={handleShow}
                      >
                        <span className="svg-icon svg-icon-5 svg-icon-gray-500 me-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <path
                              d="M19.0759 3H4.72777C3.95892 3 3.47768 3.83148 3.86067 4.49814L8.56967 12.6949C9.17923 13.7559 9.5 14.9582 9.5 16.1819V19.5072C9.5 20.2189 10.2223 20.7028 10.8805 20.432L13.8805 19.1977C14.2553 19.0435 14.5 18.6783 14.5 18.273V13.8372C14.5 12.8089 14.8171 11.8056 15.408 10.964L19.8943 4.57465C20.3596 3.912 19.8856 3 19.0759 3Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        {intl.formatMessage({ id: "Filtering" })}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="py-5 taskLogs">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "RoleName" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "View" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "Add" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "Edit" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "Delete" })}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <ViewallcardsCardDetailsTableRolesSettings
                          mark1={xyMark.y}
                          mark2={xyMark.x}
                          mark3={xyMark.x}
                          mark4={xyMark.y}
                        />
                        <ViewallcardsCardDetailsTableRolesSettings
                          mark1={xyMark.x}
                          mark2={xyMark.y}
                          mark3={xyMark.y}
                          mark4={xyMark.y}
                        />
                        <ViewallcardsCardDetailsTableRolesSettings
                          mark1={xyMark.x}
                          mark2={xyMark.x}
                          mark3={xyMark.x}
                          mark4={xyMark.y}
                        />
                        <ViewallcardsCardDetailsTableRolesSettings
                          mark1={xyMark.x}
                          mark2={xyMark.y}
                          mark3={xyMark.y}
                          mark4={xyMark.x}
                        />
                      </tbody>
                    </table>
                    <SystemPagination />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" aria-hidden="true">
            <ViewallcardsSortRolesPopup handleClose={handleClose} show={show} />
          </div>
        </div>
      </div>
    </>
  );
};

export { ViewAllcardsCardDetailsTableRoles };
