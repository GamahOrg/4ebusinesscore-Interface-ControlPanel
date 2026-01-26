import { FC, useEffect, useState } from "react";
import { ViewAllcardsCardDetails } from "./components/CardDetails";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const AdminPanelViewallcardsCardDetails: FC = () => {
  const location = useLocation();

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
      path: URL === "/external-systems" ? `/systems-services-settings/admin-panel-viewallcards/external-systems` 
        : URL === "/external-components" ? `/systems-services-settings/admin-panel-viewallcards/external-components`
        : URL === "/sso-systems" ? `/systems-services-settings/admin-panel-viewallcards/sso-systems`
        : `/systems-services-settings/admin-panel-viewallcards`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path: "",
      defaultName: "CardDetails",
      name: "",
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle="CardDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        fixedTitle={true}
        extraState={partTitle}
      />
      <ViewAllcardsCardDetails />
    </>
  );
};

export { AdminPanelViewallcardsCardDetails };
