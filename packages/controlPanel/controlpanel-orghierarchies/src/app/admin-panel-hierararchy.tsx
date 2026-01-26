import { FC } from "react";
import { OrganizationalChart } from "./components/org-main-cards/organizational-chart";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

const AdminPanelHierararchy: FC = () => {
  let location = useLocation();
  let id = location?.state?.mainClassificationId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      defaultName: "OrganizationalChart",
      name: cardName || serviceName,
    },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="OrganizationalChart"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={id ? false : true}
        cardOption={cardName || serviceName}
      />

      <OrganizationalChart />
    </>
  );
};

export { AdminPanelHierararchy };
