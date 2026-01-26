import { FC } from "react";
import { useIntl } from "react-intl";
const TasksList: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="card card-xl-stretch mb-xl-3">
        <div className="card-header border-0">
          <h3 className="card-title fw-bolder text-dark">
            {intl.formatMessage({ id: "TaskList" })}
          </h3>
          <div className="card-toolbar">
            <button
              type="button"
              className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
              data-kt-menu-trigger="click"
              data-kt-menu-placement="bottom-end"
            >
              <span className="svg-icon svg-icon-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                >
                  <g
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <rect
                      x="5"
                      y="5"
                      width="5"
                      height="5"
                      rx="1"
                      fill="currentColor"
                    ></rect>
                    <rect
                      x="14"
                      y="5"
                      width="5"
                      height="5"
                      rx="1"
                      fill="currentColor"
                      opacity="0.3"
                    ></rect>
                    <rect
                      x="5"
                      y="14"
                      width="5"
                      height="5"
                      rx="1"
                      fill="currentColor"
                      opacity="0.3"
                    ></rect>
                    <rect
                      x="14"
                      y="14"
                      width="5"
                      height="5"
                      rx="1"
                      fill="currentColor"
                      opacity="0.3"
                    ></rect>
                  </g>
                </svg>
              </span>
            </button>
            <div
              className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold w-200px py-3"
              data-kt-menu="true"
            >
              <div className="menu-item px-3">
                <div className="menu-content text-muted pb-2 px-3 fs-7 text-uppercase">
                  {intl.formatMessage({ id: "TaskListSetting" })}
                </div>
              </div>
              <div className="menu-item px-3">
                <a href="" className="menu-link px-3">
                  {intl.formatMessage({ id: "AddNewTask" })}
                </a>
              </div>
              <div className="menu-item px-3 my-1">
                <a href="" className="menu-link px-3">
                  {intl.formatMessage({ id: "Setting" })}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pt-2">
          <div className="d-flex align-items-center mb-8">
            <span className="bullet bullet-vertical h-40px bg-success"></span>
            <div className="form-check form-check-custom form-check-solid mx-5">
              <input className="form-check-input" type="checkbox"  />
            </div>
            <div className="flex-grow-1">
              <a
                href=""
                className="text-gray-800 text-hover-primary fw-bolder fs-6"
              >
                {intl.formatMessage({ id: "FirstTask" })}
              </a>
              <span className="text-muted fw-bold d-block">
                {" "}
                {intl.formatMessage({ id: "1daysago" })}
              </span>
            </div>
            <span className="badge badge-light-success fs-8 fw-bolder">
              {intl.formatMessage({ id: "New" })}
            </span>
          </div>
          <div className="d-flex align-items-center mb-8">
            <span className="bullet bullet-vertical h-40px bg-primary"></span>
            <div className="form-check form-check-custom form-check-solid mx-5">
              <input className="form-check-input" type="checkbox"  />
            </div>
            <div className="flex-grow-1">
              <a
                href=""
                className="text-gray-800 text-hover-primary fw-bolder fs-6"
              >
                {intl.formatMessage({ id: "SecondTask" })}
              </a>
              <span className="text-muted fw-bold d-block">
                {" "}
                {intl.formatMessage({ id: "2daysago" })}
              </span>
            </div>
            <span className="badge badge-light-primary fs-8 fw-bolder">
              {intl.formatMessage({ id: "New" })}
            </span>
          </div>
          <div className="d-flex align-items-center mb-8">
            <span className="bullet bullet-vertical h-40px bg-warning"></span>
            <div className="form-check form-check-custom form-check-solid mx-5">
              <input className="form-check-input" type="checkbox"  />
            </div>
            <div className="flex-grow-1">
              <a
                href=""
                className="text-gray-800 text-hover-primary fw-bolder fs-6"
              >
                {intl.formatMessage({ id: "ThirdTask" })}
              </a>
              <span className="text-muted fw-bold d-block">
                {" "}
                {intl.formatMessage({ id: "2daysago" })}{" "}
              </span>
            </div>
            <span className="badge badge-light-warning fs-8 fw-bolder">
              {intl.formatMessage({ id: "New" })}
            </span>
          </div>
          <div className="d-flex align-items-center mb-8">
            <span className="bullet bullet-vertical h-40px bg-primary"></span>
            <div className="form-check form-check-custom form-check-solid mx-5">
              <input className="form-check-input" type="checkbox"  />
            </div>
            <div className="flex-grow-1">
              <a
                href=""
                className="text-gray-800 text-hover-primary fw-bolder fs-6"
              >
                {intl.formatMessage({ id: "FourthTask" })}
              </a>
              <span className="text-muted fw-bold d-block">
                {" "}
                {intl.formatMessage({ id: "3daysago" })}
              </span>
            </div>
            <span className="badge badge-light-primary fs-8 fw-bolder">
              {intl.formatMessage({ id: "New" })}
            </span>
          </div>
          <div className="d-flex align-items-center mb-8">
            <span className="bullet bullet-vertical h-40px bg-danger"></span>
            <div className="form-check form-check-custom form-check-solid mx-5">
              <input className="form-check-input" type="checkbox"  />
            </div>
            <div className="flex-grow-1">
              <a
                href=""
                className="text-gray-800 text-hover-primary fw-bolder fs-6"
              >
                {intl.formatMessage({ id: "FifthTask" })}
              </a>
              <span className="text-muted fw-bold d-block">
                {" "}
                {intl.formatMessage({ id: "5daysago" })}
              </span>
            </div>
            <span className="badge badge-light-danger fs-8 fw-bolder">
              {intl.formatMessage({ id: "New" })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default TasksList;
