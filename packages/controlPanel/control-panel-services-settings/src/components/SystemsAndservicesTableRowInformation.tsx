import { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { SystemsAndServicesActions } from "./SystemsAndServicesActions";
import { SubsystemModel } from "../models/subsystemsModel";
import moment from "moment";
import { useIntl } from "react-intl";
import { getColorClass } from "@4eplatform/shared/functions/getColor";

interface Iprop {
  cardInfo: SubsystemModel;
  searchTerm: string;
  URL: string;
}

const SystemsAndservicesTableRowInformation: FC<Iprop> = ({
  cardInfo,
  searchTerm,
  URL,
}) => {
  const intl = useIntl();
  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  return (
    <tr>
      <td className="DefaultIconSize">
        <Link
          to={
            URL === "/external-systems"
              ? `#`
              : URL === "/external-components"
                ? `/systems-services-settings/admin-panel-viewallcards/external-components/${cardInfo?.id}`
                : URL === "/sso-systems"
                  ? `#`
                  : `/systems-services-settings/admin-panel-viewallcards/${cardInfo?.id}`
          }
          state={{
            cardId: cardId,
            cardTitle: cardName,
            systemName:
              intl.locale == "en" ? cardInfo?.noteNameEn : cardInfo?.noteNameAr,
            partTitle: partTitle,
          }}
          className={
            URL === "/external-systems" || URL === "/sso-systems"
              ? "cursor-default"
              : ""
          }
        >
          <div className="d-flex mx-10">
            <div className="symbol symbol-50px mb-2 toolsIcon">
              <span
                className={`symbol-label bg-light-${getColorClass(cardInfo?.color)}`}
              >
                <span
                  className={`svg-icon svg-icon-4x svg-icon-${getColorClass(cardInfo?.color)}`}
                  dangerouslySetInnerHTML={{ __html: cardInfo?.icon }}
                ></span>
              </span>
            </div>
            <div className="d-flex flex-column mx-3 justify-content-center align-items-center">
              <span>
                {intl.locale == "en"
                  ? cardInfo?.noteNameEn
                  : cardInfo?.noteNameAr}
              </span>
            </div>
          </div>
        </Link>
      </td>
      <td className="text-center">
        {moment(cardInfo?.createdOn).format("YYYY-MM-DD")}
      </td>
      {URL === "/external-systems" || URL === "/sso-systems" ? (
        <></>
      ) : (
        <td className="text-center">{cardInfo?.numberOfServices}</td>
      )}
      <td className="text-center">
        {cardInfo?.isExternal
          ? intl.formatMessage({ id: "External" })
          : intl.formatMessage({ id: "Internal" })}
      </td>
      {URL === "" || URL === "/systems-settings" ? (
        <></>
      ) : (
        <td className="text-center">
          {cardInfo?.isExternal
            ? cardInfo?.isSinglSignOn
              ? intl.formatMessage({ id: "SingleSignOn" })
              : intl.formatMessage({ id: "Redirect" })
            : "-"}
        </td>
      )}
      <td className="text-center">
        <SystemsAndServicesActions
          id={cardInfo.id}
          searchTerm={searchTerm}
          URL={URL}
          cardInfo={cardInfo}
        />
      </td>
    </tr>
  );
};

export { SystemsAndservicesTableRowInformation };
