import { FC, useEffect, useState } from "react";
import { ViewAllcardsAddCard } from "./components/AddCard";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const AdminPanelViewallcardsAddCard: FC = () => {
  const location = useLocation();
  const [URL, setURL] = useState<string>("")

  let id = location?.state?.cardId;
  let additionalId = location?.state?.additionalId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

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
      path: URL === "/external-systems" ? `/systems-services-settings/systems-settings/external-systems` 
        : URL === "/external-components" ? `/systems-services-settings/systems-settings/external-components`
        : URL === "/sso-systems" ? `/systems-services-settings/systems-settings/sso-systems`
        : `/systems-services-settings/systems-settings`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: URL === "/external-components" ? `/systems-services-settings/admin-panel-viewallcards/external-components/${additionalId}` :
      `/systems-services-settings/admin-panel-viewallcards/${additionalId}`,
      defaultName: "SystemDetails",
      name: location?.state?.systemName || partTitle,
    },
    {
      path: "",
      defaultName: "AddCard",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="AddCard"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        fixedTitle={true}
        extraState={location?.state?.systemName || partTitle}
      />
      <ViewAllcardsAddCard />
    </>
  );
};

export { AdminPanelViewallcardsAddCard };
