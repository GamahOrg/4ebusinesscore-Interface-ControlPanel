import { FC, useEffect, useState } from "react";
import { AddSystem } from "./components/AddSystem";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const SystemsAndServicesAddSystem: FC = () => {
  const location = useLocation();
  let id = location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;
  const [URL, setURL] = useState<string>("")

  useEffect(() => {
    if (location?.pathname?.includes('/add-external-system')) {
      setURL('/external-systems')
    } else if (location?.pathname?.includes('/add-external-component')) {
      setURL('/external-components')
    } else if (location?.pathname?.includes('/add-sso-system')) {
      setURL('/sso-systems')
    } else {
      setURL('')
    }
  }, [location?.pathname])

  const breadcrumbItems = [
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
      defaultName: "AddAnInternalSystem",
      name: "",
    },
  ];

        
  return (
    <>
      <DynamicToolbar
        defaultTitle="AddAnInternalSystem"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        fixedTitle={true}
        cardId={id}
        extraState={partTitle}
      />
      <AddSystem />
    </>
  );
};

export { SystemsAndServicesAddSystem };
