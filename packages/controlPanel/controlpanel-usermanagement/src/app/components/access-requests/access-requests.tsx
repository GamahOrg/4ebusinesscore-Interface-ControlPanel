import AccessRequestsTable from "./components/access-requests-table";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const AccessRequests = () => {
  const location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;

  const breadcrumbItems = [
    {
      path: "",
      defaultName: "AccessRequests",
      name: cardName || serviceName,
    },
  ];
  return (
    <>
      <DynamicToolbar
        defaultTitle={"AccessRequests"}
        extraTitle={serviceName || cardName}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />

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
                <AccessRequestsTable />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccessRequests;
