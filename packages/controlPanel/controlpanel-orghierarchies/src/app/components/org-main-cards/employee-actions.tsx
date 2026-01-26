import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "../../popup/DeletePopup";
import { Dropdown } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

type ActionProps = {
  id: string;
  orgId: string | null;
};

export const EmployeeActions: FC<ActionProps> = ({ id, orgId }) => {
  const intl = useIntl();

  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = () => setShowDelete(true);

  return (
    <>
      <div className="card-toolbar text-center">
        <div className="me-n3">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="btn-icon btn-light p-0"
            >
              <i className="bi bi-three-dots fs-2"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold  py-3"
              style={{ width: "fit-content" }}
            >
              <Dropdown.Item
                className="menu-link fs-6 px-3 text-danger"
                onClick={handleShowDelete}
              >
                <span className="svg-icon svg-icon-3 me-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>
                {intl.formatMessage({ id: "Delete" })}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
          deleteModel={{ orgId: orgId as string, membersId: id }}
        />
      </div>
    </>
  );
};
