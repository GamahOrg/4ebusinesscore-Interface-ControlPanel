import { FC } from "react";
import { RiFilter2Fill } from "react-icons/ri";
import { useIntl } from "react-intl";
import PermissionsTable from "../permissions/toolbar/PermissionsTable";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

export const AdminPanelPermissionsDetails: FC = () => {
  const intl = useIntl();
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "UsersPermissions",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={"UsersPermissions"}
          extraTitle={serviceName || cardName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName || serviceName}
        />
        <div>
          <div className="d-flex justify-content-between align-items-center mt-3 mt-lg-0 justify-content-lg-end">
            <div
              className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder me-4 bg-light bg-opacity-10"
              data-bs-toggle="modal"
              data-bs-target="#Rega_modal_filter-permissions"
            >
              <RiFilter2Fill size={17} />{" "}
              {intl.formatMessage({ id: "Filtering" })}
            </div>
            <div
              className="btn btn-bg-white btn-active-color-primary"
              data-bs-toggle="modal"
              data-bs-target="#Rega_modal_add-user-permission"
            >
              {intl.formatMessage({ id: "AddPermission" })}
            </div>
          </div>
        </div>
      </div>

      <PermissionsTable />
    </>
  );
};
