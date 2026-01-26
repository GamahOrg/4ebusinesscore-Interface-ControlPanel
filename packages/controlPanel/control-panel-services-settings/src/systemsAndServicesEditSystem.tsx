import { FC, useEffect, useState } from "react";
import { EditSystem } from "./components/EditSystem";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

const SystemsAndServicesEditSystem: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  let exceptionURL = location?.state?.exceptionURL;
  const [URL, setURL] = useState<string>("");

  useEffect(() => {
    if (location?.pathname?.includes("/edit-external-system")) {
      setURL("/external-systems");
    } else if (location?.pathname?.includes("/edit-external-component")) {
      setURL("/external-components");
    } else if (location?.pathname?.includes("/edit-sso-system")) {
      setURL("/sso-systems");
    } else if (location?.pathname?.includes("/systems-settings")) {
      setURL("/systems-settings");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const breadcrumbItems = exceptionURL ? [
    {
      path: `/systems-services-settings/systems-classifications`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: `/systems-services-settings/systems-classifications/view-system/${exceptionURL}`,
      defaultName: "Systems",
      name: partTitle,
    },
    {
      path: "",
      defaultName: "EditSystem",
      name: "",
    },
  ] :
  [
    {
      path: `/systems-services-settings/systems-settings${URL}`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "EditSystem",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="EditSystem"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={partTitle}
      />
      <EditSystem />
    </>
  );
};

export { SystemsAndServicesEditSystem };
