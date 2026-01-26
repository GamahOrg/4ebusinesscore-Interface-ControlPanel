import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import { OrgHierarchyModel } from "../../models/org-model";
import { fetchOrgManager } from "../../features/orghierarchies-slice/org-manager-slice";
import { EmployeeHierarchyPopup } from "../../popup/EmployeeHierarchyPopup";
import { UserGender } from "../../models/response-status";
import {
  fetchOrgPath,
  setOrgPathData,
} from "../../features/orghierarchies-slice/orgpath-slice";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { Actions } from "./Actions";

interface props {
  org: OrgHierarchyModel | undefined;
}

export const ManagerCard: FC<props> = ({ org }) => {
  const intl = useIntl();
  const [modalHShow, setModalHShow] = useState<boolean>(false);

  const dispatch = useDispatch();

  let manager: any = useSelector((state: RootState) => {
    return state?.orgManager.data;
  });
  let users: any = useSelector((state: RootState) => {
    return state?.users?.data?.map((user) => {
      return user?.userName;
    });
  });
  let language = intl.locale;
  useEffect(() => {
    if (org) {
      dispatch(fetchOrgManager(org?.id) as any);
    }
  }, [org]);

  const getTruncatedName = (name: any) => {
    if (!name) return "";
    const names = name.split(" ");
    const truncatedNames = [names[0], names[names.length - 1]];
    return truncatedNames.join(" ");
  };
  useEffect(() => {
    if (org) {
      dispatch(fetchOrgPath(org?.id) as any);
    } else {
      dispatch(setOrgPathData([]));
    }
  }, [org]);

  var orgPathData = useSelector((state: RootState) => state.fetchOrgPath.data);

  return (
    <div>
      <p className="fw-bolder fs-4 mb-3 d-flex text-start">
        {orgPathData?.length > 0 ? orgPathData : ""}
      </p>

      <p className="fw-bolder fs-4 mb-3 my-5 text-primary d-flex text-start">
        {intl.formatMessage({
          id: "ManagerDataa",
        })}{" "}
        {language == "ar" ? org?.nameAr : org?.nameEn}
      </p>
      <div className="d-flex flex-column mb-6">
        <label className="fs-6 fw-bold mb-5" htmlFor="classNameification">
          {intl.formatMessage({ id: "ManagerName" })}{" "}
        </label>

        <div className="input-group ">
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-user-cog special"></i>
            </span>
          </div>
          <input
            className="form-control"
            placeholder={intl.formatMessage({
              id: "ManagerName",
            })}
            defaultValue={getTruncatedName(manager?.managerUserName)}
          />
          <div className="h-110 d-flex" role="button">
            <span
              className="input-group-text"
              onClick={() =>
                org != undefined
                  ? setModalHShow(true)
                  : showSuccessAlert(false, "PleaseChooseOrg", intl)
              }
            >
              <i className="bi bi-diagram-3 fs-3 text-muted"></i>
            </span>
          </div>
        </div>
      </div>

      <div style={{ paddingBottom: "50px" }} className="table-responsive">
        <table className="table table-rounded border table-row-gray-200 align-middle gs-0 gy-4 text-center dark-table-head">
          <thead>
            <tr className="fw-bold bg-light">
              <th className="min-w-100px text-center  border-end border-bottom">
                ID
              </th>
              <th className="min-w-150px text-center  border-end border-bottom">
                {intl.formatMessage({ id: "ManagerData" })}{" "}
              </th>
              <th className="min-w-100px text-center border-end border-bottom">
                {intl.formatMessage({
                  id: "Date",
                })}{" "}
              </th>
              <th className="min-w-150px text-center border-end border-bottom">
                {intl.formatMessage({ id: "Options" })}{" "}
              </th>
            </tr>
          </thead>

          <tbody>
            <Fragment key={Math.random()}>
              {manager != null &&
              manager != undefined &&
              users?.includes(manager?.userName) ? (
                <tr>
                  <td className="text-center border-end border-bottom ">
                    {" "}
                    {1}
                  </td>
                  <td className="text-center border-end border-bottom">
                    <div className="d-flex align-items-center">
                      <div className=" ms-1 symbol symbol-50 symbol-light mr-4">
                        <span className="symbol-label d-flex justify-center align-center">
                          <img
                            alt="manager pic."
                            src={
                              manager?.imgUrl != null &&
                              manager?.imgUrl !== "" &&
                              manager?.imgUrl !== "null"
                                ? `${UserManagmentRootUrl}${manager?.imgUrl}`
                                : manager?.managerUserGender == UserGender.Male
                                ? toAbsoluteUrl("/media/avatars/300-3.jpg")
                                : toAbsoluteUrl("/media/avatars/300-3.jpg")
                            }
                            onError={(e: any) =>
                              (e.target.src =
                                manager?.userGender === 1
                                  ? `${toAbsoluteUrl(
                                      "/media/avatars/300-3.jpg"
                                    )}`
                                  : `${toAbsoluteUrl(
                                      "/media/avatars/300-3.jpg"
                                    )}`)
                            }
                            className="h-75 w-75 align-self-end rounded-circle mb-2 "
                          />
                        </span>
                      </div>
                      <div
                        className="cursor-pointer "
                        onClick={() => {
                          window.location.href =
                            (window as any)._env_?.REACT_APP_Base_Url +
                            "/secmanagement" +
                            `/admin-panel-users/users/admin-panel-users/details/${manager?.managerId}`;
                        }}
                        // to={`/admin-panel-users-workspace/admin-panel-users/details/${manager?.managerId}`}
                      >
                        <div>
                          <span className="text-dark-75 d-flex text-start font-weight-bolder text-hover-primary mb-1 font-size-lg">
                            {manager?.userName}
                          </span>
                          <span className="text-muted font-weight-bold d-block">
                            {getTruncatedName(manager?.managerUserName)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-center border-end border-bottom">
                    {manager?.fromAppointmentDay && (
                      <span className="text-muted font-weight-bold d-block">
                        {new Date(
                          manager.fromAppointmentDay
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </td>

                  <td className="text-center border-end border-bottom">
                    <Actions
                      orgId={org?.id as string}
                      id={manager?.managerId as string}
                      // id={org?.managerId as string}
                      parentId={org?.parentId as string}
                    />
                  </td>
                </tr>
              ) : (
                ""
              )}
            </Fragment>
          </tbody>
        </table>
      </div>
      {modalHShow && org != undefined ? (
        <EmployeeHierarchyPopup
          manager={manager}
          org={org}
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};
