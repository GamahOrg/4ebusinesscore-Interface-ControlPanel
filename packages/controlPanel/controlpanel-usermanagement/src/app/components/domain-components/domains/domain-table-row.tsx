import { FC } from "react";
import { useIntl } from "react-intl";
import { ElementStatus } from "../ElementStatus";
import { Actions } from "../ActionsComponent";
import { DomainsModel } from "../../../models/domain/domain-model";
import moment from "moment";

interface Iprop {
  domain: DomainsModel;
}
export const DomainsTableRow: FC<Iprop> = ({ domain }) => {
  const intl = useIntl();

  return (
    <tr key={`${domain?.id}`}>
      <td className={`${intl.locale == "ar" ? "text-start" : "text-end"}`}>
        <span className="fw-bolder">{domain?.domainName}</span>
      </td>
      <td>
        <div>
          <div className="ms-5 d-flex align-items-center">
            <div className="ms-3">
              <p className="h4 fw-bolder mb-1">{domain?.userName}</p>
              <p className="text-muted mb-0 fw-lighter">{domain?.email}</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <ElementStatus
          text={intl.formatMessage({
            id: domain?.isActive ? "Active" : "Inactive",
          })}
          isActive={domain?.isActive}
        />
      </td>
      <td>
        {domain?.updatedOn == null ? (
          <span>{moment(domain?.createdOn).format("YYYY-MM-DD")}</span>
        ) : (
          <span>{moment(domain?.updatedOn).format("YYYY-MM-DD")}</span>
        )}
      </td>
      <td>
        <div>
          <Actions
            id={domain?.id}
            enableActionView={false}
            isEditPopup={true}
          />
        </div>
      </td>
    </tr>
  );
};
