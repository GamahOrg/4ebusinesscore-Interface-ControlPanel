import { FC, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { EditPopup } from "../user-components/popups/EditPopup";
import { DeletePopup } from "../domain-components/popups/DeletePopup";
import { GroupHistoryPopup } from "./popups/group-history-popup";
import { AddGroupMembersPopup } from "./popups/add-group-members-popup";
import { useDispatch, useSelector } from "react-redux";
import { fetchGroupById } from "../../features/group-slice/Groupslice";
import { RootState } from "../../features/store";
import moment from "moment";
import GroupsRolesChekboxDropDown from "./GroupsRolesChekboxDropDown";
import { RoleModelArray, role } from "../../models/role/role-model";
import { ALLusersModel } from "../../models/users/all_users_agg_model";
import { EditGroupVildation } from "../../validation/edit-group-validation";
import { useForm } from "react-hook-form";
import { PutGroupDTO } from "../../models/groups/put-group-model";
import { fetchRoles } from "../../features/role/rolesSlice";
import { fetchAllUser } from "../../features/users-slice/all_users_slice";
import { fetchOrgMembers } from "../../features/org/org-slice";
import { EditGroup } from "../../features/Group/Group-slice";
import { ManagementHierarchyPopup } from "./popups/ManagementHierarchyPopup";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { UserGender } from "../../models/users/users-enums";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";

export const AdminPanelEditGroup: FC = () => {
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<EditGroupVildation>({
    mode: "all",
    reValidateMode: "onChange",
  });

  const [Role, setRole] = useState<string[]>([]);

  const [RolseOptions, setRolseOptions] = useState<RoleModelArray>();
  let [selectedRolesIds, setSelectedRolesIds] = useState<string[]>([]);

  const intl = useIntl();
  let language = intl.locale;
  let [orgName, setOrgName] = useState<string>("");
  let [orgId, setOrgId] = useState<string>("");
  let MebmersOrg = useSelector((state: RootState) => {
    return state?.orgAgg;
  });
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const [showLogs, setShowLog] = useState<boolean>(false);

  const [showEdit, setShowEdit] = useState(false);
  const parms = useParams();

  const dispatch = useDispatch();

  let group = useSelector((state: RootState) => {
    return state?.groupbyid;
  });
  let roles = useSelector((state: RootState) => {
    return state?.roles.data;
  });

  let params: any = {
    pageSize: "10000",
    pageNumber: "1",
  };

  const [dataLoaded, setDataLoaded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>("");
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  useEffect(() => {
    dispatch(fetchGroupById({ id: `${parms.id}` }) as any)
      .then(() => {
        setDataLoaded(true);
      })
      .catch((error: any) => {});
    dispatch(fetchRoles(params) as any);
  }, [`${parms.id}`]);

  let [searchParams, setSearchParams] = useSearchParams();
  const handleSearchChangePramas = (fieldName: string, value: string) => {
    setSearchParams((prevValues) => ({
      ...prevValues,
      [fieldName]: value,
    }));
  };
  useEffect(() => {
    let paramsAllUser: any = {
      pageSize: 10000,
      pageNumber: 1,
      SearchTerm: searchParams.get("search"),
    };
    dispatch(fetchAllUser({ params: paramsAllUser }) as any);
  }, [`${parms.id}`, searchParams.get("search")]);

  useEffect(() => {
    setRolseOptions(roles as any);
  }, [roles]);

  useEffect(() => {
    if (group?.data != undefined)
      dispatch(fetchOrgMembers({ id: orgId, params: params }) as any);
  }, [group, orgId]);

  const [users, setUsers] = useState<ALLusersModel[]>([]);
  let allUsers = useSelector((state: RootState) => {
    return state?.AlluserSlice.data;
  });

  useEffect(() => {
    setUsers(
      allUsers.map((element) => ({
        ...element,
        isChecked:
          group?.data?.users.map((a) => a.userId).includes(element.userId) ??
          false,
      }))
    );
  }, [group, allUsers]);

  useEffect(() => {
    var selectRolesIds = group?.data?.roles?.map((a) => a.roleId);
    var rolesFilter = roles.data?.filter((a) => selectRolesIds.includes(a.id));
    var rolesName =
      intl?.locale.toLowerCase() == "ar"
        ? rolesFilter.map((a) => a.nameAr)
        : rolesFilter.map((a) => a.nameEn);

    var rolesId = rolesFilter.map((a) => a.id);
    setRole([...rolesName]);
    setSelectedRolesIds([...rolesId]);

    setOrgId(group.data.organizationId);

    setOrgName(
      intl?.locale.toLowerCase() == "ar"
        ? group.data.orgHierarchyNameAr
        : group.data.orgHierarchyNameEN
    );
  }, [group]);

  useEffect(() => {
    if (group != null && MebmersOrg?.data?.length > 0) {
      setValue("managerId", group?.data?.managerId);
      trigger("managerId");
    }
  }, [MebmersOrg.data, group]);

  const handleChangeUser = (userId: string) => {
    setUsers((prevUsers) => {
      return prevUsers.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            isChecked: !user.isChecked,
          } as ALLusersModel;
        }
        return user;
      });
    });
  };

  let navigate = useNavigate();
  const Submit = async (formValues: EditGroupVildation) => {
    const data: PutGroupDTO = {
      RoleIds: selectedRolesIds,
      Description: formValues.description,
      ManagerId: formValues?.managerId,
      GroupName: formValues.GroupName,
      OrganizationId: orgId,
      UserIds: users.filter((a) => a.isChecked === true).map((a) => a.userId),
      MainImage: selectedImage || "",
    };
    var bodyFormData = new FormData();
    bodyFormData.append("Description", data?.Description);
    bodyFormData.append("ManagerId", data?.ManagerId);
    bodyFormData?.append("GroupName", data?.GroupName);
    bodyFormData?.append("OrganizationId", data?.OrganizationId);
    bodyFormData.append("MainImage", data?.MainImage);

    if (data?.UserIds[0] != null) {
      for (let index = 0; index < data?.UserIds.length; index++) {
        bodyFormData.append("UserIds", data?.UserIds[index]);
      }
    }
    if (data?.RoleIds[0] != null) {
      for (let index = 0; index < data?.RoleIds.length; index++) {
        bodyFormData.append("RoleIds", data?.RoleIds[index]);
      }
    }
    if (
      users.filter((a) => a.isChecked === true).map((a) => a.userId).length <= 0
    ) {
      showSuccessAlert(false, "MustChooseatleastoneuser", intl);
    } else if (selectedRolesIds.length === 0) {
      showSuccessAlert(false, "MustChooseatleastonerole", intl);
    } else {
      dispatch(EditGroup({ id: `${parms.id}`, body: bodyFormData }) as any)
        .then((result: any) => {
          if (result?.payload?.statusEnum === 1) {
            showSuccessAlert(true, "GroupEditedSuccessfully", intl);
            navigate("/admin-panel-users-workspace/admin-panel-users/groups");
          } else if (
            result?.payload?.message == '["GroupNameAlreadyExists!"]'
          ) {
            showSuccessAlert(false, "GroupNameAlreadyExists", intl);
          }
        })
        .catch((err: any) => {});
    }
  };

  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let serviceName = location?.state?.serviceName;
  const breadcrumbItems = [
    {
      path: "/admin-panel-users-workspace/admin-panel-users/groups",
      defaultName: "Groups",
      name: cardName || serviceName,
    },
    { path: "", defaultName: "EditGroup", name: "" },
  ];

  const defaultValuesRoles = useMemo(
    () => group?.data.roles.map((a) => a.roleId),
    [group?.data.roles]
  );
  return (
    <>
      <DynamicToolbar
        defaultTitle="EditGroup"
        extraTitle=""
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName || serviceName}
      />

      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8 pt-5">
              <div>
                <div className="card-header px-1 pb-2 mb-5 mt-5 px-2 px-3">
                  <p className="card-title align-items-start flex-column px-5 pb-5">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      <bdi>
                        {intl.formatMessage({
                          id: "EditTheGroup",
                        })}
                      </bdi>
                    </span>
                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({
                        id: "PleaseEnterTheData",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              {dataLoaded && (
                <form
                  noValidate
                  className="form outputForm"
                  onSubmit={handleSubmit(Submit)}
                >
                  <div className="card-body">
                    <div className="row d-flex align-items-center">
                      <div className="col-12 col-lg-1 col-md-1 col-sm-1">
                        <label
                          className="position-relative"
                          role="button"
                          htmlFor="image_file"
                        >
                          {selectedImage ? (
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Selected"
                              className="img-fluid"
                            />
                          ) : !selectedImage && group?.data?.imageUrl != "" ? (
                            <img
                              src={`${UserManagmentRootUrl}${group?.data?.imageUrl}`}
                              alt="Selected"
                              className="img-fluid"
                            />
                          ) : (
                            <i className="bi bi-file-earmark-image fa-4x text-muted"></i>
                          )}

                          <i
                            className="bi bi-plus fa-2x bg-white text-success rounded-pill shadow-sm px-1 position-absolute bottom-0"
                            style={{ right: "25px" }}
                          ></i>
                        </label>
                        <input
                          type="file"
                          id="image_file"
                          className="d-none"
                          {...register("MainImage", { required: false })}
                          onChange={handleFileChange}
                        />
                      </div>
                      <div className="col-12 col-lg-11 col-md-11 col-sm-11">
                        <div className="row">
                          <div className="col-12 col-md-4 col-lg-4">
                            <div className="mb-2 pt-2 pb-3 ">
                              <label
                                style={{
                                  width: "100%",
                                  textAlign:
                                    language == "ar" ? "right" : "left",
                                }}
                                className="form-label px-2  fs-6 text-gray-700 required"
                              >
                                {intl.formatMessage({
                                  id: "GroupName",
                                })}
                              </label>
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="special fas fa-users"></i>
                                  </span>
                                </div>
                                <input
                                  type="text"
                                  className="form-control"
                                  defaultValue={group?.data?.groupName}
                                  placeholder={intl.formatMessage({
                                    id: "GroupName",
                                  })}
                                  {...register("GroupName", { required: true })}
                                />
                                {DisplayErrorMessage(
                                  errors?.GroupName?.message as string,
                                  intl,
                                  intl.locale
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-4 col-lg-4">
                            <div className="mb-2 pt-2 pb-3 ">
                              <label
                                style={{
                                  width: "100%",
                                  textAlign:
                                    language == "ar" ? "right" : "left",
                                }}
                                className="form-label px-2  fs-6 text-gray-700"
                              >
                                {intl.formatMessage({
                                  id: "DateCreated",
                                })}
                              </label>
                              <input
                                type="date"
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                                placeholder={intl.formatMessage({
                                  id: "DateCreated",
                                })}
                                readOnly={true}
                                defaultValue={moment(
                                  group?.data?.createdOn
                                ).format("YYYY-MM-DD")}
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-3 col-md-4">
                            <div className="mb-2 pt-2 pb-3 ">
                              <label
                                className="form-label px-2  fs-6 text-gray-700 required"
                                style={{
                                  textAlign:
                                    language == "ar" ? "right" : "left",
                                  width: "100%",
                                  display: "block",
                                }}
                              >
                                {intl.formatMessage({
                                  id: "EmployeeManagement",
                                })}
                              </label>

                              <div className="mx-auto mt-1  ">
                                <div
                                  className="input-group"
                                  role="button"
                                  onClick={() => {
                                    // setShowHierarchy(true);
                                    setModalHShow(true);
                                  }}
                                >
                                  <input
                                    type="select"
                                    className="form-control form-control-solid ps-10"
                                    name="search"
                                    value={orgName}
                                    placeholder={intl.formatMessage({
                                      id: "Choose",
                                    })}
                                    role="button"
                                    readOnly={true}
                                  />

                                  <i className="bi bi-diagram-3 fs-1 input-group-text border-radius-0"></i>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 col-md-4 col-lg-4">
                        <div className="mb-2 pt-2 pb-3 ">
                          <label
                            style={{
                              width: "100%",
                              textAlign: language == "ar" ? "right" : "left",
                            }}
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({
                              id: "GroupManagerName",
                            })}
                          </label>
                          <div className="col-6 col-md-12">
                            <select
                              id="managerId"
                              className="form-select myform-control inputHeight form-select-solid select2-hidden-accessible mt-1"
                              {...register("managerId", {
                                required: intl.formatMessage({
                                  id: "ManagerIsRequired",
                                }),
                              })}
                            >
                              <option disabled selected value="">
                                {intl.formatMessage({ id: "Choose" })}
                              </option>
                              {MebmersOrg.data?.map((MebmerOrg, index) => (
                                <option
                                  key={"Manager " + index + MebmerOrg?.memberId}
                                  value={MebmerOrg?.memberId}
                                >
                                  {MebmerOrg.memberName}
                                </option>
                              ))}
                            </select>
                            {DisplayErrorMessage(
                              errors?.managerId?.message,
                              intl
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="col-12 col-md-4 col-lg-4">
                        <div className="mb-2 pt-2 pb-3 ">
                          <label
                            style={{
                              width: "100%",
                              textAlign: language == "ar" ? "right" : "left",
                            }}
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {intl.formatMessage({
                              id: "RoleName",
                            })}
                          </label>
                          <div className="mx-auto mt-1">
                            <GroupsRolesChekboxDropDown
                              selectedOptions={Role}
                              setSelectedOptions={setRole}
                              options={RolseOptions}
                              selectedRoleIds={selectedRolesIds}
                              setSelectedRoleIds={setSelectedRolesIds}
                              defaultValuesRoles={defaultValuesRoles}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-2 pt-2 pb-3 ">
                          <label
                            style={{
                              width: "100%",
                              textAlign: language == "ar" ? "right" : "left",
                            }}
                            className="form-label px-2  fs-6 text-gray-700 required"
                          >
                            {`${intl.formatMessage({
                              id: "GroupPermissions",
                            })} - ${intl.formatMessage({
                              id: "CreatingGroupPurpose",
                            })}`}
                          </label>
                          <textarea
                            className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 min-h-100px"
                            placeholder={intl.formatMessage({
                              id: "PermissionsAndCreatingPurpose",
                            })}
                            defaultValue={group?.data?.description}
                            {...register("description", { required: true })}
                          ></textarea>
                          {DisplayErrorMessage(
                            errors?.description?.message,
                            intl
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-2 pt-2 pb-3 ">
                          <label className="form-label px-2  fs-6 text-gray-700 d-flex align-items-center">
                            <i
                              className="bi bi-plus fa-2x fw-bolder text-success border-dashed border-2 border-success px-2 rounded-3 cursor-pointer"
                              data-bs-toggle="modal"
                              data-bs-target="#Rega_modal_add_members_to_group"
                            ></i>
                            <span className="mx-3">
                              {intl.formatMessage({
                                id: "AddPeopleToGroup",
                              })}
                            </span>
                          </label>
                          <label
                            className="form-label px-2 mt-8 fs-6 text-gray-700 d-flex align-items-center"
                            role="button"
                          >
                            <span className="mx-3">
                              {intl.formatMessage({
                                id: "GroupMembers",
                              })}
                            </span>
                          </label>
                          <div className="border border-1 rounded-3">
                            <div className="position-relative w-md-600px mt-5 mx-auto">
                              <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                              <input
                                type="text"
                                className="form-control form-control-solid ps-10"
                                name="search"
                                onChange={(e) =>
                                  handleSearchChangePramas(
                                    "search",
                                    e.target.value
                                  )
                                }
                                placeholder={intl.formatMessage({
                                  id: "TypeYourSearchHere",
                                })}
                              />
                            </div>
                            <div className="h-200px overflow-auto px-8">
                              {users?.map((user) => (
                                <div className="d-flex justify-content-between my-8">
                                  <div className="d-flex align-items-center">
                                    <div className="symbol position-relative  symbol-circle symbol-35px">
                                      <img
                                        alt="Pic"
                                        className="mx-4"
                                        src={
                                          user?.imageUrl
                                            ? `${UserManagmentRootUrl}${user?.imageUrl}`
                                            : user?.userGender ===
                                              UserGender.Male
                                            ? toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg"
                                              )
                                            : toAbsoluteUrl(
                                                "/media/avatars/300-3.jpg"
                                              )
                                        }
                                        onError={(e: any) =>
                                          (e.target.src =
                                            user?.userGender === UserGender.Male
                                              ? `${toAbsoluteUrl(
                                                  "/media/avatars/300-3.jpg"
                                                )}`
                                              : `${toAbsoluteUrl(
                                                  "/media/avatars/300-3.jpg"
                                                )}`)
                                        }
                                      />
                                    </div>

                                    <div>
                                      <p className="mb-0">
                                        {`${user.fisrtName ?? ""} ${
                                          user.secondName ?? ""
                                        } ${user.thirdName ?? ""} ${
                                          user.forthName ?? ""
                                        }`.trim() || user.userName}
                                      </p>
                                      <p>
                                        {` ${
                                          intl?.locale.toLowerCase() == "ar"
                                            ? user.orgNameAr ?? ""
                                            : user.orgNameEn ?? ""
                                        }`.trim() || ""}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                                    <input
                                      className="form-check-input widget-9-check xCheckBg"
                                      type="checkbox"
                                      defaultValue={0}
                                      name="getMyToolsList"
                                      checked={user.isChecked}
                                      onChange={() =>
                                        handleChangeUser(user.userId)
                                      }
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 text-center pb-5">
                      <Link
                        className="btn btn-secondary m-3 px-5 py-3"
                        style={{ width: "125px" }}
                        to="/admin-panel-users-workspace/admin-panel-users/groups"
                      >
                        {intl.formatMessage({
                          id: "Cancel",
                        })}
                      </Link>

                      <button
                        className="btn btn-primary m-3 px-5 py-3"
                        style={{ width: "125px" }}
                        type="submit"
                      >
                        {intl.formatMessage({
                          id: "Save",
                        })}
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      <AddGroupMembersPopup />
      {showLogs && (
        <GroupHistoryPopup
          groupId={`${parms.id}`}
          cancelFun={() => {
            setShowLog(false);
          }}
        />
      )}
      <div className="modal fade" aria-hidden="true">
        <EditPopup
          showEdit={showEdit}
          handleCloseEdit={() => setShowEdit(false)}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          handleCloseDelete={handleCloseDelete}
          showDelete={showDelete}
        />
      </div>
      <div
        className="modal fade"
        id="rega_modal_departmental_organizational_structure"
        aria-hidden="true"
      >
        <ManagementHierarchyPopup
          show={modalHShow}
          orgId={orgId}
          setOrgId={setOrgId}
          orgName={orgName}
          setOrgName={setOrgName}
          handleClose={() => {
            setModalHShow(false);
          }}
        />
      </div>
    </>
  );
};
