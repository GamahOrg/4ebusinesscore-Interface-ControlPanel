import { FC } from "react";
import { useIntl } from "react-intl";
import { SystemsClassificationsTable } from "./components/SystemsClassificationsTable";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { Link, useLocation } from "react-router-dom";

const SystemsClassifications: FC = () => {
  const intl = useIntl();
  const location = useLocation();

  let id = location?.state?.mainClassificationId || location?.state?.cardId || "";
  let cardName = location?.state?.cardTitle;
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  const breadcrumbItems = [
    { path: "", defaultName: "Cards", name: cardName, },
  ];
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={intl.formatMessage({ id: "SystemClassifications" })}
          extraTitle={cardName}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardOption={cardName}
          cardId={id}
        />
        <div className="toolbar">
          <Link
            to="/systems-services-settings/systems-classifications/add-system"
            state={{
              cardId: id,
              cardTitle: cardName,
              partTitle: partTitle,
            }}
          >
            <button className="btn btn-custom btn-active-white btn-flex btn-color-white btn-active-color-primary fw-bolder">
              {intl.formatMessage({ id: "AddAClassification" })}
            </button>
          </Link>
        </div>
      </div>
      <SystemsClassificationsTable />
    </>
  );
};

export { SystemsClassifications };
