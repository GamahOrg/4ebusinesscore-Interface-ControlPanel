import { FC } from "react";
import { useIntl } from "react-intl";
import { Link, useLocation } from "react-router-dom";
import moment from "moment";

type UserManagementTableProps = {
  name: string;
  dept: string;
  title: string;
  count?: number | undefined;
  lastUpdate: string;
  lastLogin: string;
  link: string;
  icon: any;
  color: string;
  background?: string;
  isShow?: boolean;
  hasMoreActions?: boolean;
  hasCountColumn?: boolean;
  index?: any;
};

export const UserManagementTable: FC<UserManagementTableProps> = ({
  name,
  dept,
  title,
  lastUpdate,
  lastLogin,
  link,
  icon,
  color,
  isShow,
  hasMoreActions = true,
}) => {
  const intl = useIntl();
  let language = intl.locale;

  let location = useLocation();

  const cardTitle =
    location?.state?.serviceName || location?.state?.cardTitle || "";
  return (
    <>
      {isShow && (
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div
                className={` ${
                  language == "ar" ? "ms-5" : "me-5"
                } position-relative`}
              >
                <div className="symbol symbol-50px">
                  <span
                    className={
                      "symbol-label " +
                      (color == "0"
                        ? "bg-light-danger"
                        : color == "1"
                          ? "bg-light-success"
                          : color === "2"
                            ? "bg-light-warning"
                            : "bg-light-info")
                    }
                  >
                    <span
                      className={
                        "svg-icon svg-icon-3x " +
                        (color === "0"
                          ? "svg-icon-danger"
                          : color === "1"
                            ? "svg-icon-success"
                            : color === "2"
                              ? "svg-icon-warning"
                              : color === "svg-icon-info")
                        // ? "svg-icon-gblue"
                        // : color === "svg-icon-success"
                        // ? "svg-icon-success"
                      }
                      dangerouslySetInnerHTML={{ __html: icon as string }}
                    ></span>
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Link
                  to={link}
                  state={{
                    serviceName: cardTitle,
                  }}
                  className="mb-1 text-gray-800 text-hover-info"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  {title}
                </Link>
                <div className="fw-bold fs-6 text-gray-400">{name}</div>
              </div>
            </div>
          </td>
          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {dept}
          </td>

          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {moment(lastUpdate).format("YYYY-MM-DD ")}
          </td>
          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {moment(lastLogin).format("YYYY-MM-DD")}
          </td>
          <td className="text-end">
            <Link to={link} className="btn btn-light btn-sm me-2">
              {intl.formatMessage({ id: "Show" })}
            </Link>
            {hasMoreActions && (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  <span className="svg-icon svg-icon-2"></span>
                </button>
                <div
                  className="menu menu-spe menu-sub menu-sub-dropdown w-200px w-md-200px"
                  data-kt-menu="true"
                >
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder">
                      {intl.formatMessage({ id: "Properties" })}
                    </div>
                  </div>
                  <div className="separator border-gray-200"></div>
                  <div className="p-4">
                    <div className="mb-5">
                      <div className="">
                        <label className="form-check form-check-sm form-check-custom form-check-solid">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="2"
                          />
                          <span className="form-check-label">
                            {intl.formatMessage({
                              id: "AddToFavorites",
                            })}
                          </span>
                        </label>
                        <label className="form-check form-check-sm form-check-custom form-check-solid py-2">
                          <input
                            id="indicatorsCardHideInput"
                            className="form-check-input check-danger"
                            type="checkbox"
                            value="2"
                          />
                          <span className="form-check-label">
                            {intl.formatMessage({
                              id: "HideFromWorkspace",
                            })}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="form-label fw-bold">
                        {intl.formatMessage({ id: "Notifications" })}:
                      </label>
                      <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          name="notifications"
                        />
                        <label className="form-check-label">
                          {intl.formatMessage({ id: "Enable" })}
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                        data-kt-menu-dismiss="true"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        data-kt-menu-dismiss="true"
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </td>
        </tr>
      )}

      {/* {index === 2 ? (
        <tr>
          <td>
            <div className="d-flex align-items-center">
              <div
                className={` ${
                  language == "ar" ? "ms-5" : "me-5"
                } position-relative`}
              >
                <div className="symbol symbol-50px">
                  <span
                    className={
                      "symbol-label " +
                      (color == "0"
                        ? "bg-light-danger"
                        : color == "1"
                        ? "bg-light-success"
                        : color === "2"
                        ? "bg-light-warning"
                        : "bg-light-info")
                    }
                  >
                    <span
                      className={
                        "svg-icon svg-icon-3x " +
                        (color === "0"
                          ? "svg-icon-danger"
                          : color === "1"
                          ? "svg-icon-success"
                          : color === "2"
                          ? "svg-icon-warning"
                          : color === "svg-icon-info")
                      
                      }
                      dangerouslySetInnerHTML={{ __html: icon as string }}
                    >
                    
                    </span>
                  </span>
                </div>
              </div>
              <div className="d-flex flex-column justify-content-center">
                <Link
                  to="admin-panel-users/access-requests"
                  className="mb-1 text-gray-800 text-hover-info"
                  style={{ textAlign: language == "ar" ? "right" : "left" }}
                >
                  {intl.formatMessage({ id: "AccessRequests" })}
                </Link>
                <div className="fw-bold fs-6 text-gray-400">
                  {intl.formatMessage({ id: "AdminPanel" })}
                </div>
              </div>
            </div>
          </td>
          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {dept}
          </td>
          
          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {moment(lastUpdate).format("YYYY-MM-DD ")}
          </td>
          <td style={{ textAlign: language == "ar" ? "right" : "left" }}>
            {moment(lastLogin).format("YYYY-MM-DD")}
          </td>
          <td className="text-end">
            <Link
              to="admin-panel-users/access-requests"
              className="btn btn-light btn-sm me-2"
            >
              {intl.formatMessage({ id: "Show" })}
            </Link>
            {hasMoreActions && (
              <>
                <button
                  type="button"
                  className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  <span className="svg-icon svg-icon-2">
                  
                  </span>
                </button>
                <div
                  className="menu menu-spe menu-sub menu-sub-dropdown w-200px w-md-200px"
                  data-kt-menu="true"
                >
                  <div className="px-7 py-5">
                    <div className="fs-5 text-dark fw-bolder">
                      {intl.formatMessage({ id: "Properties" })}
                    </div>
                  </div>
                  <div className="separator border-gray-200"></div>
                  <div className="p-4">
                    <div className="mb-5">
                      <div className="">
                        <label className="form-check form-check-sm form-check-custom form-check-solid">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            value="2"
                          />
                          <span className="form-check-label">
                            {intl.formatMessage({
                              id: "AddToFavorites",
                            })}
                          </span>
                        </label>
                        <label className="form-check form-check-sm form-check-custom form-check-solid py-2">
                          <input
                            id="indicatorsCardHideInput"
                            className="form-check-input check-danger"
                            type="checkbox"
                            value="2"
                          />
                          <span className="form-check-label">
                            {" "}
                            {intl.formatMessage({
                              id: "HideFromWorkspace",
                            })}{" "}
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="mb-5">
                      <label className="form-label fw-bold">
                        {intl.formatMessage({ id: "Notifications" })}:
                      </label>
                      <div className="form-check form-switch form-switch-sm form-check-custom form-check-solid py-2">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          value=""
                          name="notifications"
                        />
                        <label className="form-check-label">
                          {intl.formatMessage({ id: "Enable" })}
                        </label>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="reset"
                        className="btn btn-sm btn-light btn-active-light-primary me-2"
                        data-kt-menu-dismiss="true"
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>
                      <button
                        type="submit"
                        className="btn btn-sm btn-primary"
                        data-kt-menu-dismiss="true"
                      >
                        {intl.formatMessage({ id: "Agree" })}
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </td>
        </tr>
      ) : (
        ""
      )} */}
    </>
  );
};
