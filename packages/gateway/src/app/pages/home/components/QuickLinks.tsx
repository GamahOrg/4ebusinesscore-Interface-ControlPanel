import React, { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { KTSVG } from "../../../helpers";

const QuickLinks: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="card card-xl-stretch mb-xl-3">
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {intl.formatMessage({ id: "QuickAccess" })}
            </span>
            <span className="text-muted fw-bold fs-7">
              {intl.formatMessage({ id: "ImportantLinks" })}{" "}
            </span>
          </h3>
        </div>
        <div className="card-body d-flex flex-column p-0">
          <div className="card-p mt-n5 position-relative">
            <div className="row g-0">
              <Link
                to={{ pathname: "/organization-profile/digital-media" }}
                className="col bg-light-warning px-6 py-8 rounded-2 me-7 mb-7 bg-hover-warning text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                  <i className="fas fa-industry fs-3x"></i>
                </span>
                <span className="text-warning fw-bold fs-6">
                  {intl.formatMessage({ id: "WhoAreWe" })}
                </span>
              </Link>
              <Link
                to={{ pathname: "/knowledge-workspace" }}
                className="col bg-light-primary px-6 py-8 rounded-2 mb-7 bg-hover-primary text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                  <KTSVG path="/media/icons/duotune/general/home-2.svg" />
                </span>
                <span className="text-primary fw-bold fs-6">
                  {intl.formatMessage({ id: "Workspace" })}
                </span>
              </Link>
            </div>
            <div className="row g-0">
              <Link
                to={{ pathname: "/managements-definition/digital-media" }}
                className="col bg-light-danger px-6 py-8 rounded-2 me-7 mb-7 bg-hover-danger text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-danger d-block my-2">
                  <i className="fas fa-sitemap fs-3x"></i>
                </span>
                <span className="text-danger fw-bold fs-7 mt-2">
                  {" "}
                  {intl.formatMessage({ id: "OrganizationalChart" })}
                </span>
              </Link>
              <Link
                to={{ pathname: "/tasks-workspace" }}
                className="col bg-light-success px-6 py-8 rounded-2 mb-7 bg-hover-success text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-success d-block my-2">
                  <KTSVG path="/media/icons/duotune/general/home-1.svg" />
                </span>
                <span className="text-success fw-bold fs-6 mt-2">
                  {" "}
                  {intl.formatMessage({ id: "Tasks" })}
                </span>
              </Link>
            </div>
            <div className="row g-0">
              <Link
                to={{ pathname: "/news-details/digital-media" }}
                className="col bg-light-primary px-6 py-8 rounded-2 me-7 bg-hover-primary text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-primary d-block my-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mh-50px"
                  >
                    <path
                      d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span className="text-primary fw-bold fs-6">
                  {intl.formatMessage({ id: "News" })}
                </span>
              </Link>
              <Link
                to={{ pathname: "/agenda-details-workspace" }}
                className="col bg-light-warning px-6 py-8 rounded-2 bg-hover-warning text-hover-white"
              >
                <span className="svg-icon svg-icon-3x svg-icon-warning d-block my-2">
                  <i className="fad fa-calendar-week fs-3x"></i>
                </span>
                <span className="text-warning fw-bold fs-6">
                  {intl.formatMessage({ id: "Agenda" })}{" "}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickLinks;
