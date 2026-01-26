import { FC } from "react";
import UserRoleDetails from "../components/UserRoleDetails";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";

export const AdmimPanelRoleDetails: FC = () => {
  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/roles",
      defaultName: "Roles",
      name: cardName || serviceName,
    },
    { path: "", defaultName: "RoleDetails", name: "" },
  ];

  return (
    <>
      <DynamicToolbar
        defaultTitle="RoleDetails"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />
      <UserRoleDetails />
    </>
  );
};
