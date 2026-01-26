import { FC, Fragment, useEffect, useState } from "react";
import { EmployeeActions } from "./employee-actions";
import { useIntl } from "react-intl";
import { OrgHierarchyModel } from "../../models/org-model";
import { useDispatch } from "react-redux";
import { fetchOrgMembers } from "../../features/orghierarchies-slice/org-membersSlice";
import { UserGender } from "../../models/response-status";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { Link } from "react-router-dom";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

interface props {
  org: OrgHierarchyModel | undefined;
}

export const OrgUsers: FC<props> = ({ org }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  let language = intl.locale;

  let [members, setOrgMembers] = useState<any>([]);
  const [name, setName] = useState<string>("");
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (org?.id) {
      let myparams = {
        pageSize: pageSize,
        pageNumber: pageIndex,
        search: name,
      };
      dispatch(fetchOrgMembers({ id: org?.id as string, myparams }) as any)
        .then((data: any) => {
          setOrgMembers(data);
        })
        .catch((error: any) => {
          console.error("Error fetching org members", error);
        });
    }
  }, [org?.id, pageSize, pageIndex, name]);

  let totalPages = members?.payload?.totalPages;
  let totalItems = members?.payload?.totalItems;

  const getTruncatedName = (name: any) => {
    if (!name) return "";
    const names = name.split(" ");
    const truncatedNames = [names[0], names[names.length - 1]];
    return truncatedNames.join(" ");
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <p className="fw-bolder fs-4 my-5 text-primary ">
          {intl.formatMessage({
            id: "MembersDataa",
          })}{" "}
          {language == "ar" ? org?.nameAr : org?.nameEn}/ (
          {members?.payload?.totalItems})
        </p>
        <div className="card-toolbar card-diff-toolbar">
          <div className="mx-auto mt-1">
            <input
              type="text"
              name="search"
              className="form-control form-control-solid ps-10 pr-2"
              placeholder={intl.formatMessage({ id: "Search" })}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive pb-20">
        <table className="table table-rounded border  table-row-gray-200 align-middle gs-0 gy-4 text-center dark-table-head">
          <thead>
            <tr className="fw-bold bg-light">
              <th className="min-w-100px text-center  border-end border-bottom">
                ID
              </th>
              <th className="min-w-150px text-center  border-end border-bottom">
                {intl.formatMessage({ id: "EmployeesData" })}{" "}
              </th>

              <th className="min-w-100px text-center border-end border-bottom">
                {intl.formatMessage({ id: "Options" })}{" "}
              </th>
            </tr>
          </thead>

          <tbody>
            {members?.payload?.result
              // ?.filter(
              //   (item: any) =>
              //     item.userName.toLowerCase().includes(name.toLowerCase()) ||
              //     item.memberName.toLowerCase().includes(name.toLowerCase())
              // )
              ?.map((item: any, index: any) => {
                let { memberId, memberName, userName, imgUrl, userGender } =
                  item;
                return (
                  <Fragment key={memberId}>
                    <tr>
                      <td className="text-center border-end border-bottom ">
                        {index + 1}
                      </td>
                      <td className="text-center border-end border-bottom">
                        <div className="d-flex align-items-center">
                          <div className="ms-1 symbol symbol-50 symbol-light mr-4">
                            <span className="symbol-label">
                              <img
                                alt="user pic."
                                src={
                                  imgUrl
                                    ? `${UserManagmentRootUrl}${imgUrl}`
                                    : userGender === UserGender.Male
                                    ? toAbsoluteUrl("/media/avatars/300-3.jpg")
                                    : toAbsoluteUrl("/media/avatars/300-3.jpg")
                                }
                                onError={(e: any) =>
                                  (e.target.src =
                                    item?.userGender === UserGender.Male
                                      ? `${toAbsoluteUrl(
                                          "/media/avatars/300-3.jpg"
                                        )}`
                                      : `${toAbsoluteUrl(
                                          "/media/avatars/300-3.jpg"
                                        )}`)
                                }
                                className="h-75 w-75 align-self-end rounded-circle mb-2"
                              />
                            </span>
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              window.location.href =
                                (window as any)._env_?.REACT_APP_Base_Url +
                                "/secmanagement" +
                                `/admin-panel-users/users/admin-panel-users/details/${memberId}`;
                            }}
                          >
                            <div>
                              <span className="text-dark-75 d-flex text-start font-weight-bolder text-hover-primary mb-1 font-size-lg">
                                {userName}
                              </span>
                              <span className="text-muted font-weight-bold d-block">
                                {getTruncatedName(memberName)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center border-end border-bottom">
                        <EmployeeActions
                          id={memberId}
                          orgId={org?.id as string}
                        />
                      </td>
                    </tr>
                  </Fragment>
                );
              })}
          </tbody>
        </table>
        {members?.payload?.result?.length ? (
          <SystemPagination
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
            totalPages={totalPages}
            totalItems={totalItems}
          />
        ) : (
          <div className="d-flex fw-bolder justify-content-center align-items-center">
            {intl.formatMessage({ id: "No_data_yet" })}
          </div>
        )}
      </div>
    </div>
  );
};
