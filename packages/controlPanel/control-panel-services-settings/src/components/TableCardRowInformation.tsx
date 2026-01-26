import { FC, useEffect, useRef, useState } from "react";
import { ViewAllcardsCardActions } from "./CardActions";
import { TurnOffPopup } from "../partials/TurnOffPopup";
import { TurnOnPopup } from "../partials/TurnOnPopup";
import { WorkspaceComponentModel } from "../models/workspaceComponent-model";
import { putWorkspaceActivation } from "../slices/putWorkspaceActivation";
import { useDispatch } from "react-redux";
import { useIntl } from "react-intl";
import { getColorClass } from "@4eplatform/shared/functions/getColor";

interface Iprop {
  cardInfo: WorkspaceComponentModel;
  id: string;
  searchTerm: string;
  URL: string;
}

const ViewallcardsTableCardRowInformation: FC<Iprop> = ({
  cardInfo,
  id,
  searchTerm,
  URL,
}) => {
  const [isTurndeOn, setIsTurndeOn] = useState(cardInfo?.isActive);
  const [active, setActive] = useState(cardInfo?.isActive);

  const [showTurnOffModel, setShowTurnOffModel] = useState<boolean>(false);

  const checkRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();

  const handelstop = async (id: string) => {
    try {
      await dispatch(putWorkspaceActivation(id) as any);
      setActive((prev) => !prev);
    } catch (error) {
      // Handle error if necessary
    }
  };

  const handleSwitchActivation = () => {
    if (checkRef && checkRef.current) {
      checkRef.current.checked = !checkRef.current.checked;
      setActive((prev) => !prev);
    }
  };
  const intl = useIntl();

  return (
    <>
      <tr>
        <td className="DefaultIconSize">

          <div className="d-flex align-items-center w-100">
            <div
              className="symbol symbol-50px mb-2 toolsIcon "
              style={{ width: "20%" }}
            >
              <span
                className={`symbol-label bg-light-${getColorClass(cardInfo?.color)}`}
              >
                <span
                  className={`svg-icon svg-icon-4x mx-2 svg-icon-${getColorClass(cardInfo?.color)}`}
                  dangerouslySetInnerHTML={{ __html: cardInfo?.icon }}
                ></span>
              </span>
            </div>
            <div className="d-flex flex-column mx-2" style={{ width: "50%" }}>
              <span className={`text-${cardInfo?.color}`}>
                {intl.locale == "en"
                  ? cardInfo?.noteNameEn
                  : cardInfo?.noteNameAr}
              </span>
              <span className="text-gray-600">{cardInfo?.description}</span>
            </div>
          </div>
          {/* </Link> */}
        </td>
        <td className="text-center">
          {(intl.locale === "en"
            ? cardInfo?.lkNoteTypes?.nameEn
            : cardInfo?.lkNoteTypes?.nameAr) || "-"}
        </td>
        <td className="text-center">
          {(intl.locale === "en" ? cardInfo?.orgNameEn : cardInfo?.orgNameAr) ||
            "-"}
        </td>
        {URL === "/external-components" && (
          <td className="text-center">
            {(cardInfo?.isSinglSignOn == true
              ? intl.formatMessage({ id: "SingleSignOn" })
              : intl.formatMessage({ id: "Redirect" })) || "-"}
          </td>
        )}

        <td className="text-center">
          <ViewAllcardsCardActions
            handleSwitchActivation={handleSwitchActivation}
            id={cardInfo?.id}
            routeId={id}
            searchTerm={searchTerm}
            isActive={active}
            URL={URL}
            cardType={cardInfo?.isSinglSignOn}
            cardInfo={cardInfo}
          />
        </td>
      </tr>

      {!isTurndeOn ? (
        <div className="modal fade" aria-hidden="true">
          <TurnOffPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
            id={cardInfo?.id}
            handelstop={handelstop}
          />
        </div>
      ) : (
        <div className="modal fade" aria-hidden="true">
          <TurnOnPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
            id={cardInfo?.id}
            handelstop={handelstop}
          />
        </div>
      )}
    </>
  );
};

export { ViewallcardsTableCardRowInformation };
