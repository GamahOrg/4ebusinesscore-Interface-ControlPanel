import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Dropdown } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "../../popup/DeletePopup";

type ActionProps = {
  id: string;
  orgId: string;
  parentId: string;
};

export const Actions: FC<ActionProps> = ({ id, orgId, parentId }) => {
  const intl = useIntl();

  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="card-toolbar text-center">
      <div className="me-n3">
        <Dropdown>
          <Dropdown.Toggle
            variant="light"
            size="sm"
            className="btn-icon btn-light"
          >
            <i className="bi bi-three-dots fs-2"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu
            className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold  py-3"
            style={{ width: "fit-content" }}
          >
            <Dropdown.Item
              className="menu-link fs-6 px-3 text-danger"
              onClick={() => {
                setShowDelete(true);
              }}
            >
              <span className="svg-icon svg-icon-3 me-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>
              {intl.formatMessage({ id: "Delete" })}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      {showDelete && (
        <div className="modal fade" aria-hidden="true">
          <DeletePopup
            showDelete={showDelete}
            handleCloseDelete={() => setShowDelete(false)}
            deleteModel={{ orgId: orgId as string, managerId: id }}
            comeFrom="manager"
          />
        </div>
      )}
    </div>
  );
};
