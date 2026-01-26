import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { DeletePopup } from "../partials/DeletePopup";
import { useDispatch } from "react-redux";
import { deleteSubSystems } from "../slices/removeSubsystemSlice";
import { putWorkspaceActivation } from "../slices/putWorkspaceActivation";
import { Dropdown } from "react-bootstrap";
import { getWorkSpaceComponentById } from "../slices/workspaceAggregatorSlice";
import { TurnOffPopup } from "../partials/TurnOffPopup";
import { TurnOnPopup } from "../partials/TurnOnPopup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

type ActionProps = {
  id: string;
  routeId: string;
  searchTerm: string;
  URL: string;
  isActive: boolean;
  handleSwitchActivation: any;
  cardType: any;
  cardInfo?: any;
};

export const ViewAllcardsCardActions: FC<ActionProps> = ({
  id,
  routeId,
  searchTerm,
  URL,
  isActive,
  handleSwitchActivation,
  cardType,
  cardInfo,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const [showTurnOffModel, setShowTurnOffModel] = useState<boolean>(false);
  let [searchParams] = useSearchParams();

  let myparams: any = {
    pageSize: searchParams.get("pageSize"),
    pageNumber: searchParams.get("pageNumber"),
    searchTerm,
  };

  const handelDelete = (id: string) => {
    dispatch(deleteSubSystems(id) as any).then((res: any) => {
      if (res.payload.statusEnum == 1) {
        showSuccessAlert(true, "DeletedSuccessfully", intl);
        dispatch(getWorkSpaceComponentById({ id: routeId, myparams }) as any);
      } else {
        showSuccessAlert(false, "SomethingWentWrong", intl);
      }
    });
  };
  const handelstop = async (id: string) => {
    await dispatch(putWorkspaceActivation(id) as any);
    handleSwitchActivation();
  };
  let location = useLocation();
  let cardId = location?.state?.cardId;
  let cardName =
    location?.state?.cardTitle || location?.state?.serviceName || "";
  let partTitle = location?.state?.partTitle || location?.state?.extraState;

  return (
    <>
      <div className="card-toolbar text-center">
        <div className="me-n3">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              className="btn btn-sm btn-icon btn-light"
            >
              <i className="bi bi-three-dots fs-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3">
              {URL === "/external-components" ? (
                <>
                  <Dropdown.Item
                    as={Link}
                    to={cardInfo?.url || "#"}
                    target="_blank"
                    className="menu-link px-1 text-info"
                    state={{
                      cardId: cardId,
                      cardTitle: cardName,
                      partTitle: partTitle,
                    }}
                  >
                    <div className="d-flex align-items-center">
                      <span className="svg-icon svg-icon-3 mx-2">
                        <i className="fa-solid fa-arrow-up-right-from-square text-info"></i>
                      </span>{" "}
                      {intl.formatMessage({ id: "Move1" })}
                    </div>
                  </Dropdown.Item>
                </>
              ) : (
                <></>
              )}
              <Dropdown.Item
                as={Link}
                to={
                  URL === "/external-systems"
                    ? `/systems-services-settings/edit-card/external-systems${id}`
                    : URL === "/external-components"
                    ? `/systems-services-settings/edit-card/external-components/${id}`
                    : URL === "/sso-systems"
                    ? `/systems-services-settings/edit-card/sso-systems/${id}`
                    : `/systems-services-settings/edit-card/${id}`
                }
                className="menu-link px-1 text-primary"
                state={{
                  cardId: cardId,
                  cardTitle: cardName,
                  partTitle: partTitle,
                  additionalId: routeId,
                  cardType: cardType,
                  systemName: location?.state?.systemName,
                }}
              >
                <div className="d-flex align-items-center gap-1 mx-1">
                  <span className="svg-icon svg-icon-3">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>
                  {intl.formatMessage({ id: "Edit" })}
                </div>
              </Dropdown.Item>
              {URL === "" || URL === "/systems-settings" ? (
                <></>
              ) : (
                <>
                  <Dropdown.Item
                    onClick={() => setShowDelete(true)}
                    className="menu-link px-1 text-danger"
                  >
                    <div className="d-flex align-items-center">
                      <span className="svg-icon svg-icon-3 mx-2">
                        <i className="far fa-trash-alt text-danger"></i>
                      </span>{" "}
                      {intl.formatMessage({ id: "Delete" })}
                    </div>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          id={id}
          showDelete={showDelete}
          handleDelete={handelDelete}
        />
      </div>
      {isActive ? (
        <div className="modal fade" aria-hidden="true">
          <TurnOffPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
            id={id}
            handelstop={handelstop}
          />
        </div>
      ) : (
        <div className="modal fade" aria-hidden="true">
          <TurnOnPopup
            show={showTurnOffModel}
            handleClose={() => setShowTurnOffModel(false)}
            id={id}
            handelstop={handelstop}
          />
        </div>
      )}
    </>
  );
};
