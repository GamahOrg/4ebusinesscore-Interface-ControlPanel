import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useNavigate } from "react-router-dom";
import { UsersTable } from "./UsersTable";
import { FilterUsersPopup } from "./popups/FilterUsersPopup";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

export const AdminPanelUsersDetails: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  let [showFilterUsers, setShowFilterUsers] = useState<boolean>(false);
  let [ClickedFiltered, setClickedFiltered] = useState({});
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageIndex, setPageIndex] = useState<number>(1);

  const [filter, setFilter] = useState({
    name: "",
    date: "",
    enablePermission: "",
    enableUnified: "",
  });

  let location = useLocation();

  let id = location?.state?.mainClassificationId || "";
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "Users",
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
            defaultTitle="UsersList"
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
              setShowFilterUsers(true);
            }}
          >
            {intl.formatMessage({ id: "Filtering" })}
          </button>
          <button
            className="btn btn-bg-white btn-active-color-primary"
            onClick={() =>
              navigate("/admin-panel-users-workspace/admin-panel-users/add", {
                state: {
                  serviceName: cardTitle,
                },
              })
            }
          >
            {intl.formatMessage({
              id: "AddUser",
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
                <UsersTable
                  filter={filter}
                  ClickedFiltered={ClickedFiltered}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="rega_modal_filter_forms"
        aria-hidden="true"
      >
        <FilterUsersPopup
          showFilter={showFilterUsers}
          handleClose={() => {
            setShowFilterUsers(false);
          }}
          filter={filter}
          setFilter={setFilter}
          ClickedFiltered={ClickedFiltered}
          setClickedFiltered={setClickedFiltered}
        />
      </div>
    </>
  );
};
