import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EditUserRolePopup } from "../popup/edit-user-role-popup";
import { fetchDetailsRolesById } from "../../../features/role/rolesSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../features/store";
interface Props {
  roleId: string;
}

const UserRoleDetailsCard: FC<Props> = ({ roleId }) => {
  const [isShowAdd, setShowEdit] = useState<boolean>(false);
  const intl = useIntl();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailsRolesById({ id: roleId }) as any);
  }, []);

  let roleDetails = useSelector((state: RootState) => {
    return state?.roles.role;
  });

  return (
    <div className="card shadow-sm p-4 rounded pb-1">
      <div className="card-body d-flex align-items-center flex-column">
        <h2 className="fw-bolder fs-4 mb-5 ">
          {intl?.locale.toLowerCase() == "ar"
            ? roleDetails?.nameAr
            : roleDetails?.nameEn}
        </h2>
        <h3 className="fs-6 my-10  text-muted">
          {intl.formatMessage({ id: "TotalRolesUsers" })} :{" "}
          {roleDetails?.count ?? 0}
        </h3>
        <ul className="mb-5 d-flex align-items-center flex-column">
          <li className="my-1">{roleDetails?.details}</li>
        </ul>
        <div
          className="btn btn-primary rounded w-50 mt-5"
          data-bs-toggle="modal"
          data-bs-target="#Rega_modal_edit-user-role"
          onClick={() => {
            setShowEdit(true);
          }}
        >
          {intl.formatMessage({ id: "RoleEdit" })}
        </div>
      </div>

      {isShowAdd && (
        <>
          <EditUserRolePopup
            cancelFun={() => {
              setShowEdit(false);
            }}
            initlData={roleDetails}
          />
        </>
      )}
    </div>
  );
};
export default UserRoleDetailsCard;
