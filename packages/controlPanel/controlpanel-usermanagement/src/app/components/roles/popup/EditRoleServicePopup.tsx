import { FC, useState, useEffect } from "react";
import { useIntl } from "react-intl";
import { Modal, Row } from "react-bootstrap";
import { RootState } from "../../../features/store";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWorkspacePermissionForRole,
  postPermisionRole,
  postPermisionRoleByVerb,
} from "../../../features/role-workspace-permision/RoleWorkspacePermisionSlice";
import { PermissionModel } from "../../../models/role-workspace-permision/WorkspacePermissionForRoleModel";
import { useSearchParams } from "react-router-dom";
import { postPermisionRoleMolde } from "../../../models/role-workspace-permision/post-permision-role";
import { fetchWorkspaceTreePermision } from "../../../features/role-workspace-permision/RoleWorkspacePermisionSlice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type PopupProps = {
  show: boolean;
  handleClose: any;
  RoleId: string;
  workSpaceKey: number;
  WorkSpaceId: string;
  handleCheckboxChangeA: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChangeB: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCheckboxChangeC: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedSubsystemType?: any;
};
export const EditRoleServicePopup: FC<PopupProps> = ({
  show,
  handleClose,
  RoleId,
  WorkSpaceId,
  workSpaceKey,
  handleCheckboxChangeA,
  handleCheckboxChangeB,
  handleCheckboxChangeC,
  selectedSubsystemType,
}) => {
  const intl = useIntl();
  const [isCustomRoles, setIsCustomRoles] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const dispatch = useDispatch();

  let roleWorkspacePermision = useSelector((state: RootState) => {
    return state?.roleWorkspacePermision.PermissionForRole;
  });

  const [checkedUserIds, setCheckedUserIds] = useState<string[]>([]);
  const [permissionVerb, setPermissionVerb] = useState<number>(2);
  const [recordsTableData, setRecordsTableData] = useState<PermissionModel[]>(
    []
  );
  function handleSelectRecord(input: PermissionModel) {
    setRecordsTableData((prevData) =>
      prevData.map((permission) => {
        if (permission.permissionId === input.permissionId) {
          return {
            ...permission,
            isPermissionChecked: !permission.isPermissionChecked,
          };
        }
        return permission;
      })
    );
  }

  let [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("pageNumber")) {
      searchParams.set("pageNumber", "1");
      setSearchParams(searchParams);
    }
    if (!searchParams.get("pageSize")) {
      searchParams.set("pageSize", "10000");
      setSearchParams(searchParams);
    }
    const prams = {
      RoleId: RoleId,
      WorkSpaceKey: workSpaceKey,
      WorkSpaceId: WorkSpaceId,
      SearchTerm: searchParams.get("SearchTerm"),
    };
    dispatch(fetchWorkspacePermissionForRole({ params: prams }) as any);
  }, [searchParams.get("SearchTerm")]);

  useEffect(() => {
    const prams = {
      RoleId: RoleId,
      WorkSpaceKey: workSpaceKey,
      WorkSpaceId: WorkSpaceId,
      SearchTerm: searchParams.get("SearchTerm"),
    };
    if (isEdited) {
      dispatch(fetchWorkspacePermissionForRole({ params: prams }) as any);
    }
  }, [isEdited]);

  const roleSubmit = () => {
    var result = recordsTableData?.filter((x) => x.isPermissionChecked == true);
    var permissionIds = result?.map((peromisin: any) => peromisin.permissionId);

    const data: postPermisionRoleMolde = {
      roleId: RoleId,
      verb: permissionVerb,
      workSpaceId: WorkSpaceId,
      workSpaceKey: workSpaceKey,
      permissionId: permissionIds,
    };
    dispatch(
      isCustomRoles
        ? (postPermisionRole(data) as any)
        : (postPermisionRoleByVerb(data) as any)
    )
      .then((result: any) => {
        if (result.payload.statusEnum === 1) {
          showSuccessAlert(true, "EditSuccessfully", intl);
          setIsEdited(true);
          let params = {
            RoleId: RoleId,
            SearchTerm: searchParams.get("SearchTerm"),
            subsystemType: selectedSubsystemType,
          };
          dispatch(fetchWorkspaceTreePermision({ params }) as any);

          setTimeout(() => {
            handleClose();
          }, 50);
        } else {
          showSuccessAlert(false, result.payload.message, intl);
        }
      })
      .catch((err: any) => {});
  };

  useEffect(() => {
    const updatedRecords = recordsTableData.map((user) => ({
      ...user,
      isChecked: checkedUserIds.includes(user.permissionId),
    }));

    setRecordsTableData(updatedRecords);
  }, [checkedUserIds]);

  useEffect(() => {
    setRecordsTableData(
      roleWorkspacePermision.map((permission: any) => ({
        ...permission,
      }))
    );
  }, [roleWorkspacePermision]);

  useEffect(() => {
    if (recordsTableData.length) {
      setPermissionVerb((prev) => recordsTableData[0].verb ?? 2);
    }
  }, [recordsTableData]);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "center",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
          className="pb-0 border-bottom-0"
        >
          <div className="card-header mt-10 d-flex justify-content-center w-100 px-4 border-bottom-0">
            <Row className="justify-content-center mt-5 mb-10">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="text-center">
                  <h3> {intl.formatMessage({ id: "EditPermissions" })}</h3>
                </div>
              </Modal.Title>
            </Row>
          </div>
        </Modal.Header>

        <Modal.Body className="pb-0">
          <div className="toggle-radio">
            <input
              onChange={(e) =>
                e.target.checked && setIsCustomRoles((prev) => false)
              }
              type="radio"
              value="permissionCard"
              name="permissionType"
              id="permissionCard"
              checked={!isCustomRoles}
            />
            <input
              onChange={(e) =>
                e.target.checked && setIsCustomRoles((prev) => true)
              }
              type="radio"
              value="advanced"
              name="permissionType"
              id="advanced"
              checked={isCustomRoles}
            />
            <div className="switch">
              <label htmlFor="permissionCard">
                {intl.formatMessage({ id: "PermissionCard" })}
              </label>
              <label htmlFor="advanced">
                {intl.formatMessage({ id: "Advanced" })}
              </label>
              <i className="fa-solid fa-repeat"></i>
            </div>
          </div>
          <div className="permissions-cont">
            {isCustomRoles &&
              recordsTableData?.map((permission) => (
                <Row className="mb-5" key={permission?.permissionId}>
                  <div className="row gap-3">
                    <div className="col-12">
                      <div className="form-check form-check-success form-check-custom form-check-solid d-flex">
                        <input
                          className="form-check-input widget-9-check xCheckBg mx-2"
                          type="checkbox"
                          name={
                            intl?.locale.toLowerCase() == "ar"
                              ? permission.nameAr
                              : permission.nameEn
                          }
                          checked={permission.isPermissionChecked}
                          onClick={() => handleSelectRecord(permission)}
                        />
                        <label>
                          {intl?.locale.toLowerCase() == "ar"}
                          {permission.nameAr + " " + permission.nameEn}
                        </label>
                      </div>
                    </div>
                  </div>
                </Row>
              ))}
          </div>

          {!isCustomRoles && (
            <div className="row card-check">
              <div className="col-md-4 col-lg-4 col-sm-4">
                <label>
                  <input
                    checked={permissionVerb === 0}
                    onChange={(e) => {
                      e.target.checked && setPermissionVerb(0);
                      handleCheckboxChangeA(e);
                    }}
                    name="role"
                    type="radio"
                    className="card-input-element"
                  />

                  <div className={`card card-default card-input`}>
                    <div className="card-header">
                      <i className="fa-solid fa-paperclip"></i>
                    </div>
                    <div className="card-body">
                      {intl.formatMessage({ id: "PermissionReadOnly" })}
                    </div>
                  </div>
                </label>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-4">
                <label>
                  <input
                    checked={permissionVerb === 1}
                    onChange={(e) => {
                      e.target.checked && setPermissionVerb(1);
                      handleCheckboxChangeB(e);
                    }}
                    name="role"
                    type="radio"
                    className="card-input-element"
                  />

                  <div className="card card-default card-input">
                    <div className="card-header">
                      <i className="fa-solid fa-file-circle-check"></i>
                    </div>
                    <div className="card-body">
                      {intl.formatMessage({ id: "PermissionReadWrite" })}
                    </div>
                  </div>
                </label>
              </div>
              <div className="col-md-4 col-lg-4 col-sm-4">
                <label>
                  <input
                    checked={permissionVerb === 2}
                    onChange={(e) => {
                      e.target.checked && setPermissionVerb(2);
                      handleCheckboxChangeC(e);
                    }}
                    name="role"
                    type="radio"
                    className="card-input-element"
                  />

                  <div className="card card-default card-input">
                    <div className="card-header">
                      <i className="fa-solid fa-ban"></i>
                    </div>
                    <div className="card-body">
                      {intl.formatMessage({ id: "NoPermission" })}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          )}
        </Modal.Body>

        <div className="row">
          <div className="col-12 col-lg-7 mx-auto mb-12 mt-5">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
              <Modal.Footer className="w-100 justify-content-center pb-0 pt-2 border-top-0">
                <div className="d-flex justify-content-center align-items-center w-100">
                  <button
                    type="reset"
                    className="btn btn-secondary me-5 w-100"
                    onClick={handleClose}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      roleSubmit();
                    }}
                    className="btn btn-success me-5 w-100 "
                  >
                    {intl.formatMessage({ id: "Agree" })}
                  </button>
                </div>
              </Modal.Footer>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
