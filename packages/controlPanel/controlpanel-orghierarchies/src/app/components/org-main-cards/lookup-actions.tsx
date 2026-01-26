import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeleteLookUpPopup } from "../../popup/delete-lookUp-popup";
import { Dropdown, DropdownButton } from "react-bootstrap";
import EditClassificationPopup from "../../popup/edit-classification-popup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

type ActionProps = {
  id: string;
  lookUpNameAr?: string;
  lookUpNameEn?: string;
  lookUpColor?: string;
};
export const LookUpActions: FC<ActionProps> = ({
  id,
  lookUpNameAr,
  lookUpNameEn,
  lookUpColor,
}) => {
  const intl = useIntl();
  const [showDelete, setshowDelete] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);

  return (
    <div className="card-toolbar text-center">
      <div className="me-n3">
        <DropdownButton
          id={`dropdown-button-drop-${id}`}
          title={<i className="bi bi-three-dots fs-2"></i>}
          variant="light"
        >
          <Dropdown.Item
            className="text-primary"
            onClick={() => setShowEdit(true)}
          >
            <span className="svg-icon svg-icon-3 ms-2">
              <KTSVG path="/media/icons/duotune/general/gen087.svg" />
            </span>
            {intl.formatMessage({ id: "Edit" })}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => setshowDelete(true)}
            className="text-danger"
          >
            <span className="svg-icon svg-icon-3 mx-2">
              <KTSVG path="/media/icons/duotune/general/gen088.svg" />
            </span>
            {intl.formatMessage({ id: "Delete" })}
          </Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <DeleteLookUpPopup
          handleCloseDelete={() => setshowDelete(false)}
          showDelete={showDelete}
          id={id}
        />
      </div>
      <div className="modal fade" id="Rega_modal_Delete" aria-hidden="true">
        <EditClassificationPopup
          handleClose={() => setShowEdit(false)}
          show={showEdit}
          id={id}
          lookUpNameAr={lookUpNameAr}
          lookUpNameEn={lookUpNameEn}
          lookUpColor={lookUpColor}
        />
      </div>
    </div>
  );
};
