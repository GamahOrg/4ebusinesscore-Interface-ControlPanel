import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { GroupsTable } from "./GroupsTable";
import { FilterFormsPopup } from "./popups/FilterFormsPopup";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

export const AdminPanelGroupsDetails: FC = () => {
  const intl = useIntl();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const navigate = useNavigate();

  let location = useLocation();

  let id = location?.state?.mainClassificationId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "GroupsList",
      name: cardName || serviceName,
    },
  ];

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <DynamicToolbar
            defaultTitle="GroupsList"
            extraTitle={cardName || serviceName}
            breadcrumbItems={breadcrumbItems}
            showWorkspace={id ? false : true}
            cardOption={cardName || serviceName}
          />
        </div>

        <div>
          <button
            className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder me-4 bg-light bg-opacity-10 me-4"
            onClick={() => {
              setShowFilter(true);
            }}
          >
            <span className="svg-icon svg-icon-5 svg-icon-gray-500 m-0"></span>
            {intl.formatMessage({ id: "Filtering" })}
          </button>
          <button
            className="btn btn-bg-white btn-active-color-primary"
            onClick={() =>
              navigate(
                "/admin-panel-users-workspace/admin-panel-users/groups/add",
                {
                  state: {
                    serviceName: cardTitle,
                  },
                }
              )
            }
          >
            {intl.formatMessage({
              id: "AddGroup",
            })}
          </button>
        </div>
      </div>

      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <GroupsTable />
              </div>
            </div>
          </div>
        </div>
      </div>
      {showFilter && (
        <FilterFormsPopup
          handleClose={() => {
            setShowFilter(false);
          }}
          showFilter={showFilter}
        />
      )}
    </>
  );
};
