import { useLocation } from "react-router-dom";
import { ActionsGroupComponent } from "./ActionsGroupComponent";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserManagmentRootUrl } from "@4eplatform/shared/apis/user_management";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";

type GroupTableRowProps = {
  item: any;
};

const GroupTableRow: React.FC<GroupTableRowProps> = ({ item }) => {
  const navigate = useNavigate();

  let location = useLocation();

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <tr key={`${item.id}`}>
      <td>
        <div
          onClick={() =>
            navigate(
              `/admin-panel-users-workspace/admin-panel-users/groups/edit/${item.id}`,
              {
                state: {
                  serviceName: cardTitle,
                },
              }
            )
          }
          role="button"
        >
          <div className="ms-5 d-flex align-items-center">
            <div className="symbol position-relative  symbol-circle">
              <img
                alt="Pic"
                src={
                  item?.imageUrl && item?.imageUrl !== "null"
                    ? `${UserManagmentRootUrl}${item?.imageUrl}`
                    : `${toAbsoluteUrl("/media/avatars/300-3.jpg")}`
                }
                onError={(e: any) =>
                  (e.target.src = `${toAbsoluteUrl(
                    "/media/avatars/300-3.jpg"
                  )}`)
                }
              />
            </div>
            <div className="ms-3">
              <p className="h4 fw-bolder mb-1">{item.groupName}</p>
              <p className="text-muted mb-0 fw-lighter">{item.description}</p>
            </div>
          </div>
        </div>
      </td>
      <td>
        <span className="fw-bolder">
          {item?.createdOn != null
            ? moment(item?.createdOn).format("YYYY-MM-DD")
            : "-"}
        </span>
      </td>
      <td>
        <span className="fw-bolder">
          {item?.updatedOn != null
            ? moment(item?.updatedOn).format("YYYY-MM-DD")
            : item?.createdOn != null
            ? moment(item?.createdOn).format("YYYY-MM-DD")
            : "-"}
        </span>
      </td>
      <td>
        <div>
          <ActionsGroupComponent id={item?.id} />
        </div>
      </td>
    </tr>
  );
};

export default GroupTableRow;
