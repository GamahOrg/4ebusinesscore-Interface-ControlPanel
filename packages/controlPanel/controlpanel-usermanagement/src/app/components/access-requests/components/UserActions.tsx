import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { CancelPopup } from "../popup/CancelPopup";

type ActionProps = {
  detailsLink?: string;
  id?: string | Number | number;
};

export const UserActions: FC<ActionProps> = ({ detailsLink = "#", id }) => {
  const intl = useIntl();
  const [showCancel, setShowCancel] = useState(false);
  const handleCloseCancel = () => setShowCancel(false);

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link to={`accept-request/${id}`}>
            <Dropdown.Item as="button" className="text-primary mx-2 py-2">
              {intl.formatMessage({ id: "AcceptRequest" })}
            </Dropdown.Item>
          </Link>

          <Dropdown.Item
            as="button"
            className="mx-2 py-2 text-danger"
            onClick={() => {
              setShowCancel(true);
            }}
          >
            {intl.formatMessage({ id: "Cancel" })}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <div className="modal fade" id="Rega_modal_add" aria-hidden="true">
        <CancelPopup
          show={showCancel}
          handleClose={handleCloseCancel}
          id={id}
        />
      </div>
    </>
  );
};
