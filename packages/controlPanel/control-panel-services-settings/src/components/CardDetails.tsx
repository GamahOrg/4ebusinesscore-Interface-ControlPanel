import { FC, useState } from "react";
import { ViewAllcardsCardDetailsCardContent } from "./CardDetailsCardContent";
import { ViewAllcardsCardDetailsTableEmployees } from "./CardDetailsTableEmployees";
import { ViewAllcardsCardDetailsTableGroups } from "./CardDetailsTableGroups";
import { ViewAllcardsCardDetailsTableRoles } from "./CardDetailsTableRoles";
import { useIntl } from "react-intl";

const ViewAllcardsCardDetails: FC = () => {
  const [updateSearch, setUpdateSearch] = useState("employees");
  const intl = useIntl();

  return (
    <div className="row">
      <div className="col-md-4">
        <ViewAllcardsCardDetailsCardContent updateSearch={updateSearch} />
      </div>
      <div className="col-md-8">
        <div className="card">
          <ul className="nav nav-tabs nav-line-tabs border-0 nav-line-tabs-2x card-body flex-row fs-6">
            <li className="nav-item">
              <a
                onClick={() => setUpdateSearch("employees")}
                className="nav-link text-dark text-hover-primary fs-5 mx-3 active"
                data-bs-toggle="tab"
                href="#employees"
              >
                {intl.formatMessage({ id: "Employees" })}
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => setUpdateSearch("groups")}
                className="nav-link text-dark text-hover-primary fs-5 mx-3"
                data-bs-toggle="tab"
                href="#groups"
              >
                {intl.formatMessage({ id: "Groups" })}
              </a>
            </li>
            <li className="nav-item">
              <a
                onClick={() => setUpdateSearch("roles")}
                className="nav-link text-dark text-hover-primary fs-5 mx-3"
                data-bs-toggle="tab"
                href="#roles"
              >
                {intl.formatMessage({ id: "Roles" })}
              </a>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="employees"
              role="tabpanel"
            >
              <ViewAllcardsCardDetailsTableEmployees />
            </div>
            <div className="tab-pane fade" id="groups" role="tabpanel">
              <ViewAllcardsCardDetailsTableGroups />
            </div>
            <div className="tab-pane fade" id="roles" role="tabpanel">
              <ViewAllcardsCardDetailsTableRoles />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewAllcardsCardDetails };
