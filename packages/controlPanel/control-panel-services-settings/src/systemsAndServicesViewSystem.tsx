import { FC, useEffect, useState } from "react";
import { ViewSystem } from "./components/ViewSystem";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

const SystemsAndServicesViewSystem: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  const [URL, setURL] = useState<string>("")

  useEffect(() => {
    if (location?.pathname?.includes('/external-systems')) {
      setURL('/external-systems')
    } else if (location?.pathname?.includes('/external-components')) {
      setURL('/external-components')
    } else if (location?.pathname?.includes('/sso-systems')) {
      setURL('/sso-systems')
    } else {
      setURL('')
    }
  }, [location?.pathname])

  const breadcrumbItems = [
    {
      path: "/systems-services-settings/dynamic-workspace",
      defaultName: "Workspace",
      name: "",
    },
    {
      path: URL === "/external-systems" ? `/systems-services-settings/systems-settings/external-systems` 
        : URL === "/external-components" ? `/systems-services-settings/systems-settings/external-components`
        : URL === "/sso-systems" ? `/systems-services-settings/systems-settings/sso-systems`
        : `/systems-services-settings/systems-settings`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "Viewsystem",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="Viewsystem"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={false}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={partTitle}
      />
      <ViewSystem />
    </>
  );
};

export { SystemsAndServicesViewSystem };
