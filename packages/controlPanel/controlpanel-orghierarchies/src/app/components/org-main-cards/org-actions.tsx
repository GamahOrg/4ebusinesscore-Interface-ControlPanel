import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import AddItemPopup from "../../popup/AddItemPopup";
import { DeleteDepartmentPopup } from "../../popup/DeleteDepartmentPopup";
import EditItemPopup from "../../popup/EditItemPopup";
import { Dropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrgs } from "../../features/orghierarchies-slice/orgSlice";
import { RootState } from "../../features/store";
import { fetchOrgMembers } from "../../features/orghierarchies-slice/org-membersSlice";
import { RenderAgreedPopup } from "../../popup/RenderAgreedPopup";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";

interface Iprops {
  id: string;
  parentId: string;
}

export const OrgActions: FC<Iprops> = ({ id, parentId }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const [show, setMainShow] = useState(false);
  const [secondryShow, setSecondryShow] = useState(false);
  const [showAgreed, setShowAgreed] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const handleClose = () => {
    dispatch(fetchOrgs({}) as any);
    setMainShow(false);
    setSecondryShow(false);
  };

  const [showEdit, setShowEdit] = useState(false);

  const handleCloseEdit = () => {
    setShowEdit(false);
  };
  const handleShowEdit = () => {
    setShowEdit(true);
  };
  const orgHasMembers = useSelector((state: RootState) => {
    return state?.orgMembers.orgHasMembers;
  });

  useEffect(() => {
    let myparams = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(fetchOrgMembers({ id: id as string, myparams }) as any);
  }, [id, pageSize, pageIndex]);
  const [showDelete, setShowDelete] = useState(false);
  const handleCloseDelete = () => {
    setShowDelete(false);
    dispatch(fetchOrgs({}) as any);
  };
  const handleShowDelete = () => {
    if (orgHasMembers.includes(id)) setShowDelete(true);
    else setShowAgreed(true);
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

            <Dropdown.Menu
              className="menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold  py-3"
              style={{ width: "fit-content" }}
            >
              <Dropdown.Item
                className="menu-link fs-6 px-3 text-success"
                onClick={() => {
                  setMainShow(true);
                }}
              >
                <i className="bi bi-plus-lg fs-4 mx-1"></i>
                {intl.formatMessage({ id: "AddMainItem" })}
              </Dropdown.Item>

              <Dropdown.Item
                className="menu-link fs-6 px-3 text-muted"
                onClick={() => {
                  setSecondryShow(true);
                }}
              >
                <i className="bi bi-plus-lg fs-3 mx-1"></i>{" "}
                {intl.formatMessage({ id: "AddSecondaryItem" })}
              </Dropdown.Item>
              <Dropdown.Item
                className="menu-link fs-6 px-3 text-primary"
                onClick={handleShowEdit}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Edit" })}
              </Dropdown.Item>
              <Dropdown.Item
                className="menu-link fs-6 px-3 text-danger"
                onClick={handleShowDelete}
              >
                <span className="svg-icon svg-icon-3 mx-2">
                  <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                </span>{" "}
                {intl.formatMessage({ id: "Delete" })}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {showAgreed && (
        <div className="modal fade" aria-hidden="true">
          <RenderAgreedPopup
            handleClose={() => {
              setShowAgreed(false);
            }}
            show={showAgreed}
            orgid={id}
          />
        </div>
      )}
      {showDelete && (
        <DeleteDepartmentPopup
          OrgId={id}
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      )}
      {show && (
        <AddItemPopup
          handleClose={handleClose}
          show={show}
          parentId={parentId}
        />
      )}
      {secondryShow && (
        <AddItemPopup
          handleClose={handleClose}
          show={secondryShow}
          parentId={id}
        />
      )}
      <EditItemPopup
        handleCloseEdit={handleCloseEdit}
        showEdit={showEdit}
        orgId={id}
      />
    </>
  );
};
