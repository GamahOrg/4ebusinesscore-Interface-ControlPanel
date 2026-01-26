import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../partials/DeletePopup";
import { ViewallcardsTableCardRowInformation } from "./TableCardRowInformation";
import { RootState } from "../store/workspaceStore";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { getWorkSpaceComponentById } from "../slices/workspaceAggregatorSlice";
import { WorkspaceComponentModel } from "../models/workspaceComponent-model";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { Dropdown } from "react-bootstrap";

const ViewAllcardsTableCards: FC = () => {
  const intl = useIntl();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const location = useLocation();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  let { id } = useParams();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  let cardId =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  const [URL, setURL] = useState<string>("");

  useEffect(() => {
    if (location?.pathname?.includes("/external-systems")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/external-components")) {
      setURL("/external-components");
    } else if (location?.pathname?.includes("/sso-systems")) {
      setURL("/sso-systems");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  let components = useSelector((state: RootState) => {
    return state?.workspaceComponent.items;
  });
  let totalPages = useSelector((state: RootState) => {
    return state?.workspaceComponent?.totalPages;
  });
  let totalItems = useSelector((state: RootState) => {
    return state?.workspaceComponent?.totalItems;
  });
  let myparams: any = {
    pageSize: pageSize,
    pageNumber: pageIndex,
    searchTerm,
  };

  useEffect(() => {
    if (id) {
      dispatch(
        getWorkSpaceComponentById({ id: id as string, myparams }) as any
      );
    }
  }, [pageSize, pageIndex, id, searchTerm]);


  const breadcrumbItems = [
    {
      path:
        URL === "/external-systems"
          ? `/systems-services-settings/systems-settings/external-systems`
          : URL === "/external-components"
            ? `/systems-services-settings/systems-settings/external-components`
            : URL === "/sso-systems"
              ? `/systems-services-settings/systems-settings/sso-systems`
              : `/systems-services-settings/systems-settings`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "SystemDetails",
      name: location?.state?.systemName || location?.state?.extraState,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={
            location?.state?.systemName ||
            intl.formatMessage({ id: "SystemDetails" })
          }
          extraTitle=""
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
          cardId={cardId}
          fixedTitle={true}
          extraState={partTitle}
          translate={false}
        />
        <div className="me-4 toolbar d-flex flex-wrap gap-4">
          {URL === "/external-components" && (
            <>
              <Dropdown className="dropDown-systems">
                <Dropdown.Toggle
                  variant="transparent"
                  id="dropdown-basic"
                  className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder px-6 btn-filter-system h-auto dropDown-systems gap-3 min-w-100px justify-content-center"
                >
                  <i className="fa-solid fa-plus fa-fw fs-5"></i>
                  {intl.formatMessage({ id: "AddCard" })}
                </Dropdown.Toggle>
                <Dropdown.Menu className="py-0 w-150px">
                  <div>
                    <Dropdown.Item className="border-bottom">
                      <Link
                        to={
                          URL === "/external-components"
                            ? `/systems-services-settings/add-card/external-components`
                            : `/systems-services-settings/add-card`
                        }
                        state={{
                          cardId: cardId,
                          cardTitle: cardName,
                          partTitle: partTitle,
                          url: URL,
                          cardType: 0,
                          additionalId: id,
                          systemName: location?.state?.systemName,
                        }}
                        className="btn-active-color-primary d-flex justify-content-center align-items-center gap-2 py-1"
                      >
                        <span className="menu-link px-3 text-primary fw-bolder">
                          <span className="svg-icon svg-icon-3 ms-2">
                            <i className="fa-solid fa-share fa-fw fs-5"></i>
                          </span>
                          {intl.formatMessage({ id: "Redirect" })}
                        </span>
                      </Link>
                    </Dropdown.Item>
                    <Dropdown.Item>
                      <Link
                        to={
                          URL === "/external-components"
                            ? `/systems-services-settings/add-card/external-components`
                            : `/systems-services-settings/add-card`
                        }
                        state={{
                          cardId: cardId,
                          cardTitle: cardName,
                          partTitle: partTitle,
                          url: URL,
                          cardType: 1,
                          additionalId: id,
                          systemName: location?.state?.systemName,
                        }}
                        className="btn-active-color-primary d-flex justify-content-center align-items-center gap-2 py-1"
                      >
                        <span className="menu-link px-3 text-primary fw-bolder">
                          <span className="svg-icon svg-icon-3 ms-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="#007479"
                              x="0px"
                              y="0px"
                              width="100"
                              height="100"
                              viewBox="0 0 50 50"
                            >
                              <path d="M 29 8.53125 C 23.785 8.53125 19.371 11.6525 17.25 16.0625 C 16.121 15.2855 14.81175 14.71875 13.34375 14.71875 C 9.61675 14.71875 6.6445 17.66775 6.4375 21.34375 C 2.7105 22.68875 5.9211895e-16 26.16375 0 30.34375 C 0 35.67175 4.32825 40 9.65625 40 L 41.09375 40 C 45.99975 40 50 35.99975 50 31.09375 C 50 26.54275 46.50775 22.92625 42.09375 22.40625 C 42.10975 22.16425 42.15625 21.9375 42.15625 21.6875 C 42.15625 14.4375 36.25 8.53125 29 8.53125 z M 31.208984 16.255859 L 34.386719 16.523438 L 34.732422 19.769531 L 33.767578 20.736328 L 33.767578 22.234375 L 32.273438 22.234375 L 32.230469 22.277344 L 32.230469 23.744141 L 30.767578 23.744141 L 30.732422 23.779297 L 30.732422 25.242188 L 29.271484 25.242188 L 28.498047 26.019531 C 28.827047 26.811531 29 27.644 29 28.5 C 29 32.084 26.084 35 22.5 35 C 18.916 35 16 32.084 16 28.5 C 16 24.916 18.916 22 22.5 22 C 23.356 22 24.190469 22.171047 24.980469 22.498047 L 31.208984 16.255859 z M 21.5 28 A 1.5 1.5 0 0 0 21.5 31 A 1.5 1.5 0 0 0 21.5 28 z"></path>
                            </svg>
                          </span>
                          {intl.formatMessage({ id: "SingleSignOn" })}
                        </span>
                      </Link>
                    </Dropdown.Item>
                  </div>
                </Dropdown.Menu>
              </Dropdown>
            </>
          )}
        </div>
      </div>
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
                          placeholder={intl.formatMessage({
                            id: "Search",
                          })}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
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
                          <th className="min-w-250px ">
                            {intl.formatMessage({ id: "CardName" })}
                          </th>
                          <th className="min-w-130px text-center">
                            {intl.formatMessage({ id: "Category" })}
                          </th>
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "Owner" })}
                          </th>
                          {URL === "/external-components" && (
                            <th className="min-w-150px text-center">
                              {intl.formatMessage({ id: "Type" })}
                            </th>
                          )}
                          <th className="min-w-150px text-center">
                            {intl.formatMessage({ id: "TheProcedures" })}
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {components?.map((card: WorkspaceComponentModel) => (
                          <ViewallcardsTableCardRowInformation
                            key={card?.id}
                            cardInfo={card}
                            id={id === undefined ? "" : id}
                            searchTerm={searchTerm}
                            URL={URL}
                          />
                        ))}
                      </tbody>
                    </table>
                    {components?.length ? (
                      <SystemPagination
                        totalPages={totalPages}
                        totalItems={totalItems}
                        pageIndex={pageIndex}
                        pageSize={pageSize}
                        setPageIndex={setPageIndex}
                        setPageSize={setPageSize}
                      />
                    ) : (
                      <div className="d-flex fw-bolder justify-content-center align-items-center">
                        {intl.formatMessage({ id: "No_data_yet" })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      </div>
    </>
  );
};

export { ViewAllcardsTableCards };
