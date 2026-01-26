import { FC, useEffect, useState } from "react";
import { ViewAllcardsEditCard } from "./components/EditCard";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

const AdminPanelViewallcardsEditCard: FC = () => {
  const location = useLocation();
  let id =
    location?.state?.mainClassificationId || location?.state?.cardId || "";
  let additionalId = location?.state?.additionalId || "";
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
    } else if (location?.pathname?.includes("/systems-classifications")) {
      setURL("/systems-classifications");
    } else {
      setURL("");
    }
  }, [location?.pathname]);

  const breadcrumbItems = [
    {
      path:
        URL === "/external-systems"
          ? `/systems-services-settings/systems-settings/external-systems`
          : URL === "/external-components"
            ? `/systems-services-settings/systems-settings/external-components`
            : URL === "/sso-systems"
              ? `/systems-services-settings/systems-settings/sso-systems`
              : URL === "/systems-classifications"
                ? `/systems-services-settings/systems-classifications`
                : `/systems-services-settings/systems-settings`,
      defaultName: "Cards",
      name: cardName || serviceName,
    },
    {
      path:
        URL === "/external-systems"
          ? `/systems-services-settings/admin-panel-viewallcards/external-systems/${additionalId}`
          : URL === "/external-components"
            ? `/systems-services-settings/admin-panel-viewallcards/external-components/${additionalId}`
            : URL === "/sso-systems"
              ? `/systems-services-settings/admin-panel-viewallcards/sso-systems/${additionalId}`
              : URL === "/systems-classifications"
                ? `/systems-services-settings/systems-classifications/view-system/${additionalId}`
                : `/systems-services-settings/admin-panel-viewallcards/${additionalId}`,
      defaultName: "SystemDetails",
      name: location?.state?.systemName || partTitle,
    },
    {
      path: "",
      defaultName: "EditCard",
      name: "",
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle={"EditCard"}
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
        cardId={id}
        fixedTitle={true}
        extraState={location?.state?.systemName || partTitle}
      />
      <ViewAllcardsEditCard />
    </>
  );
};

export { AdminPanelViewallcardsEditCard };
