import { FC, useState } from "react";
import { useIntl } from "react-intl";
import EditUserRolePopup from "../../popup/edit-user-role-popup";
import { Link, useLocation } from "react-router-dom";
import { role } from "../../../../models/role/role-model";

interface Props {
  role: role;
}

const UserRoleCard: FC<Props> = ({ role }) => {
  const intl = useIntl();
  const [isShowAdd, setShowAdd] = useState<boolean>(false);

  let location = useLocation();

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <div className="card shadow-sm p-4 rounded pb-1">
      <div className="card-body">
        <h2 className="fw-bolder fs-4 mb-5 text-center">
          {intl?.locale.toLowerCase() == "ar" ? role.nameAr : role.nameEn}
        </h2>
        <h3 className="fs-6 my-10 pe-3 text-muted">
          {intl.formatMessage({ id: "TotalRolesUsers" })} : {role?.count ?? 0}
        </h3>
        <ul className="mb-5">
          {role?.details?.split("\n").map((item, index) => (
            <li key={index} className="my-2">
              {item}
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <Link
            to={`/admin-panel-users-workspace/admin-panel-users/roles/details/${role.id}`}
            state={{
              serviceName: cardTitle,
            }}
            className="btn btn-primary rounded w-50"
          >
            {intl.formatMessage({ id: "Details" })}
          </Link>
        </div>
      </div>
      {isShowAdd && (
        <EditUserRolePopup
          cancelFun={() => {
            setShowAdd(false);
          }}
          initlData={role}
        />
      )}
    </div>
  );
};

export default UserRoleCard;
