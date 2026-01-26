import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Dropdown } from "react-bootstrap";
import { DeletePopup } from "../partials/DeletePopup";
import { useDispatch } from "react-redux";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import {
  deleteSSOSecuritySetting,
  getAllSSOSecuritySetting,
} from "../slices/ssoSecuritySettingSlice";
import { EditSecuritySetting } from "../partials/EditSecuritySettings";

type ActionProps = {
  id: string;
  item: any;
};

export const SecuritySettingsActions: FC<ActionProps> = ({ id, item }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseEdit = () => setShowEdit(false);

  const handelDelete = async (id: string) => {
    await dispatch(deleteSSOSecuritySetting(id) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        showSuccessAlert(true, "DeletedSuccessfully", intl);
        dispatch(getAllSSOSecuritySetting({}) as any);
      } else {
        showSuccessAlert(false, "AnErrorOccured", intl);
      }
    });
  };

  return (
    <>
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

            <Dropdown.Menu className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-100px py-3">
              <Dropdown.Item onClick={() => setShowEdit(true)}>
                <div className="d-flex align-items-center">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                  </span>
                  {intl.formatMessage({ id: "Edit" })}
                </div>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setShowDelete(true)}>
                <div className="d-flex align-items-center text-danger">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="far fa-trash-alt text-danger fa-fw"></i>
                  </span>{" "}
                  {intl.formatMessage({ id: "Delete" })}
                </div>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
          id={id}
          handleDelete={handelDelete}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <EditSecuritySetting
          handleCloseEdit={handleCloseEdit}
          showEdit={showEdit}
          id={id}
          item={item}
        />
      </div>
    </>
  );
};
