import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { SystemsAndservicesTableRowInformation } from "./SystemsAndservicesTableRowInformation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/workspaceStore";
import { getSubSystems } from "../slices/workspaceSlice";
import { SubsystemModel } from "../models/subsystemsModel";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";

type tableProps = {
  pageIndex: number;
  pageSize: number;
  setPageIndex: any;
  setPageSize: any;
  filter: any;
  agreeFilter: any;
  URL?:any;
  setURL?:any;
  setSearchTerm?:any;
  searchTerm?:any;
  setAgreeFilter?:any
};
const SystemsAndservicesTable: FC<tableProps> = ({
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  filter,
  agreeFilter,
  URL,
  setURL,
  setSearchTerm,
  searchTerm,
  setAgreeFilter
}) => {
  const intl = useIntl();

  let subsystems = useSelector((state: RootState) => {
    return state?.subsystem?.items;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.subsystem?.taotalItems;
  });
  let totalPages = useSelector((state: RootState) => {
    return state?.subsystem?.totalpages;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (URL === "") {
      return;
    }
    if(searchTerm=="" && agreeFilter){
      return;
    }
    const debounceTimer = setTimeout(() => {
      const params: any = {
        pageSize: pageSize,
        pageNumber: pageIndex,
        searchTerm,
        subsystemType:
          URL === "/external-systems"
            ? 0
            : URL === "/systems-settings"
            ? 1
            : URL === "/external-components"
            ? 2
            : URL === "/sso-systems"
            ? 3
            : "",
      };
      dispatch(getSubSystems(params) as any);
    }, 500)
    return () => clearTimeout(debounceTimer);
  }, [pageSize, pageIndex, searchTerm, URL]);

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start  mt-4"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-12">
              <div className="card card-xl-stretch mb-xl-8 card-body">
                <div className="card-header border-0 pt-3 pb-2 mb-2">
                  <div className="d-flex flex-column flex-md-row justify-content-center justify-content-md-between align-items-start align-items-md-center w-100">
                    <div className="w-lg-50 w-md-50 w-sm-50 w-100 mb-3 mb-md-0">
                      <div className="w-100 position-relative">
                        <input
                          type="text"
                          name="search"
                          className="form-control form-control-solid ps-12 pr-12"
                          placeholder={intl.formatMessage({ id: "Search" })}
                          value={searchTerm}
                          onChange={(e) => {setSearchTerm(e.target.value);setAgreeFilter(false)}}
                        />
                        <i className="fa-solid fa-light fa-magnifying-glass my-magnify fs-3 text-muted fa-fw position-absolute"></i>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="py-5 taskLogs">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head">
                      <thead>
                        <tr className="fw-bolder text-muted">
                          <th className="w-25 text-center">
                            {intl.formatMessage({ id: "SystemName" })}
                          </th>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "EstablishedDate" })}
                          </th>
                          {URL === "/external-systems" || URL === "/sso-systems" ? <></> : <>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "CardsCounts" })}
                          </th>
                          </>}
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "SystemType" })}
                          </th>
                          {URL === "" || URL === "/systems-settings" ? <></> : <>
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "AccessMethod" })}
                          </th>
                          </>}
                          <th className="min-w-100px text-center">
                            {intl.formatMessage({ id: "TheProcedures" })}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {subsystems?.map((card: SubsystemModel) => (
                          <SystemsAndservicesTableRowInformation
                            key={card?.id}
                            cardInfo={card}
                            searchTerm={searchTerm}
                            URL={URL}
                          />
                        ))}
                      </tbody>
                    </table>
                    <SystemPagination
                      pageIndex={pageIndex}
                      pageSize={pageSize}
                      setPageIndex={setPageIndex}
                      setPageSize={setPageSize}
                      totalPages={totalPages}
                      totalItems={totalItems}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      </div> */}
    </>
  );
};

export { SystemsAndservicesTable };
