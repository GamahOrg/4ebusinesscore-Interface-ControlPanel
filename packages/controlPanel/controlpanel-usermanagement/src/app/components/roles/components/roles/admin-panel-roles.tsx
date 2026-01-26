import { FC, useState } from "react";
import UserRoles from "./roles-cards";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import AddUserRolePopup from "../../popup/add-user-role-popup";
import { useIntl } from "react-intl";

export const AdminPanelRolesDetails: FC = () => {
  const [isShowAdd, setShowAdd] = useState<boolean>(false);
  const intl = useIntl();
  let location = useLocation();

  let id = location?.state?.mainClassificationId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "RoleList",
      name: cardName || serviceName,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle="RoleList"
          extraTitle={cardName || serviceName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={id ? false : true}
          cardOption={cardName || serviceName}
        />

        <button
          onClick={() => {
            setShowAdd(true);
          }}
          className="btn btn-bg-white btn-active-color-primary"
        >
          {intl.formatMessage({ id: "AddRole" })}
        </button>
      </div>

      {isShowAdd && (
        <AddUserRolePopup
          cancelFun={() => {
            setShowAdd(false);
          }}
        />
      )}
      <UserRoles />
    </>
  );
};
