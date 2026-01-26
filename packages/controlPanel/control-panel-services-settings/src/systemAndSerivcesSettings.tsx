import { FC, useEffect, useState } from "react";
import { SystemsAndservicesTable } from "./components/SystemsAndservicesTable";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { Link, useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import SystemsAndservicesFilterPopup from "./popup/SystemsAndservices-filter-popup";

const SystemAndSerivcesSettings: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [agreeFilter, setAgreeFilter] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true)};
  const [URL, setURL] = useState<string>("")
  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState({
    systemName: "",
    establishedDate: "",
    cardsCount: "",
    cardName: "",
    systemType: "all",
    accessMethod: "all",
  });

  let id = location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle || location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  const breadcrumbItems = [
    { path: "", defaultName: "Cards", name: cardName, },
  ];
  useEffect(() => {
    if (location?.pathname?.includes("/external-systems")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/external-components")) {
      setURL("/external-components");
    } else if (location?.pathname?.includes("/sso-systems")) {
      setURL("/sso-systems");
    } else if (location?.pathname?.includes("/systems-settings")) {
      setURL("/systems-settings");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle="SystemsSettings"
          extraTitle={partTitle}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName}
          cardId={id}
        />
        <div className="me-4 toolbar d-flex flex-wrap gap-4">

        {URL === "/external-systems" || URL === "/sso-systems" ? <>
          <div>
            <Link
              to={URL === "/external-systems" ? "/systems-services-settings/external-system/security-settings" :
                "/systems-services-settings/sso-system/security-settings"
               }
              state={{
                cardId: id,
                cardTitle: cardName,
                partTitle: partTitle,
                url:URL
              }}
              className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary d-flex justify-content-center align-items-center gap-2 fw-bolder px-6"
            >
              <i className="fa-solid fa-shield fa-fw fs-5"></i>
              {intl.formatMessage({ id: "SecuritySettings" })}
            </Link>
          </div>
        </> : <></>}

          {URL === "" || URL === "/systems-settings" ? <></> : <>
          <div>
            <Link
              to={URL === "/external-systems" ? `/systems-services-settings/add-external-system` 
                : URL === "/external-components" ? `/systems-services-settings/add-external-component`
                : URL === "/sso-systems" ? `/systems-services-settings/add-sso-system`
                : `/systems-services-settings/add-system`
              }
              state={{
                cardId: id,
                cardTitle: cardName,
                partTitle: partTitle,
                url:URL
              }}
              className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary d-flex justify-content-center align-items-center gap-2 fw-bolder px-6"
            >
              <i className="fa-solid fa-plus fa-fw fs-5"></i>
              {intl.formatMessage({ id: "AddSystem" })}
            </Link>
          </div>
          </>}

          <a
            className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder px-10 btn-filter-system"
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

      <div className="modal fade" aria-hidden="true">
        <SystemsAndservicesFilterPopup
          handleClose={handleClose}
          show={show}
          pageIndex={pageIndex}
          pageSize={pageSize}
          filter={filter}
          setFilter={setFilter}
          setAgreeFilter={setAgreeFilter}
          setSearchTerm={setSearchTerm}
          URL={URL}
          setURL={setURL}
        />
      </div>
      <SystemsAndservicesTable
        pageIndex={pageIndex}
        setAgreeFilter={setAgreeFilter}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        filter={filter}
        agreeFilter={agreeFilter}
        URL={URL}
        setURL={setURL}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};

export { SystemAndSerivcesSettings };
