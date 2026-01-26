import { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { SecuritySettingsContent } from "./components/SecuritySettingsContent";
import { useIntl } from 'react-intl';

const SecuritySettings: FC = () => {
  const location = useLocation();
  const intl = useIntl();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let locationURL = location?.state?.url;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  const [URL, setURL] = useState<string>("");
  const [modalShow, setModalShow] = useState<boolean>(false);

  useEffect(() => {
    if (location?.pathname?.includes("/external-system")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/sso-system")) {
      setURL("/sso-systems");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const breadcrumbItems = [
    {
      path: `/systems-services-settings/systems-settings${locationURL || URL}`,
      defaultName: "SystemsSettings",
      name: cardName,
    },
    {
      path: "",
      defaultName: "SecuritySettings",
      name: "",
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle="SecuritySettings"
          extraTitle=""
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
          fixedTitle={true}
          cardId={id}
          extraState={partTitle}
        />
        <div className="me-4 toolbar d-flex flex-wrap gap-4">
          {URL === "/external-systems" || URL === "/sso-systems" ? (
            <>
              <div>
                <div
                  onClick={() => setModalShow(true)}
                 className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary d-flex justify-content-center align-items-center gap-2 fw-bolder px-6">
                  <i className="fa-solid fa-plus fa-fw fs-5"></i>
                  {intl.formatMessage({ id: "AddSecuritySetting" })}
                </div>
              </div>
                  {/* <i className="fas fa-cog special fa-fw fs-5"></i> */}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
      <SecuritySettingsContent setModalShow={setModalShow} modalShow={modalShow}  />
    </>
  );
};

export { SecuritySettings };
