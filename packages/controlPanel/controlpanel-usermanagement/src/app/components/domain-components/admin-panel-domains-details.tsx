import { FC, useState } from "react";
import { DomainsTable } from "./domains/DomainsTable";
import { AddDomain } from "./popups/AddDomainPopup";
import { useIntl } from "react-intl";
import { FilterDomainPopup } from "./popups/FilterDomainPopup";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

export const AdminPanelDomainsDetails: FC = () => {
  const intl = useIntl();

  let [showAddDomain, setShowAddDomain] = useState<boolean>(false);

  let [showFilterDomain, setShowFilterDomain] = useState<boolean>(false);

  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "DomainsManagement",
      name: cardName || serviceName,
    },
  ];

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <DynamicToolbar
            defaultTitle={"DomainsManagement"}
            extraTitle={serviceName || cardName}
            breadcrumbItems={breadcrumbItems}
            showWorkspace={true}
            cardOption={cardName || serviceName}
          />
        </div>

        <div>
          <button
            className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder me-4 bg-light bg-opacity-10 me-4"
            onClick={() => {
              setShowFilterDomain(true);
            }}
          >
            {intl.formatMessage({ id: "Filtering" })}
          </button>

          <button
            className="btn btn-bg-white btn-active-color-primary"
            data-bs-toggle="modal"
            data-bs-target="#rega_modal_add_domain"
            onClick={() => {
              setShowAddDomain(true);
            }}
          >
            {intl.formatMessage({
              id: "AddDomain",
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
                <DomainsTable />
              </div>
            </div>
          </div>
        </div>
      </div>

      <AddDomain
        showAddDomain={showAddDomain}
        handleClose={() => {
          setShowAddDomain(false);
        }}
      />

      <div
        className="modal fade"
        id="rega_modal_filter_forms"
        aria-hidden="true"
      >
        <FilterDomainPopup
          showFilter={showFilterDomain}
          handleClose={() => {
            setShowFilterDomain(false);
          }}
        />
      </div>
    </>
  );
};
