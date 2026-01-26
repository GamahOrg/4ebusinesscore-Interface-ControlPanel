import { FC, useState } from "react";
import { useIntl } from "react-intl";
import EditUserPermissionPopup from "../popup/edit-user-permission-popup";

type ActionProps = {
  id: Number;
};

export const PermissionActions: FC<ActionProps> = ({ id }) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);

  return (
    <div className="card-toolbar text-center">
      <div className="me-n3">
        <button
          className="btn btn-sm btn-icon btn-light"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
        >
          <i className="bi bi-three-dots fs-2"></i>
        </button>
        <div
          className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3"
          data-kt-menu="true"
        >
          <div className="menu-item px-3">
            <a
              onClick={(event) => event.preventDefault()}
              className="menu-link px-3 text-primary"
            >
              {intl.formatMessage({ id: "Edit" })}
            </a>
          </div>
          <div className="menu-item px-3">
            <a
              onClick={handleShowDelete}
              className="menu-link px-3 text-danger"
            >
              <span className="svg-icon svg-icon-3 mx-2"></span>
              {intl.formatMessage({ id: "Delete" })}
            </a>
          </div>
        </div>
      </div>
      <EditUserPermissionPopup />
    </div>
  );
};
