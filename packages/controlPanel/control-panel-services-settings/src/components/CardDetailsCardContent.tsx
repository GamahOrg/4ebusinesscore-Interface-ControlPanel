import { FC } from "react";
import { useIntl } from "react-intl";

interface Iprop {
  updateSearch: string;
}

const ViewAllcardsCardDetailsCardContent: FC<Iprop> = ({ updateSearch }) => {
  const intl = useIntl();

  if (updateSearch == "employees") {
    updateSearch = `EmployeeAuthorities`;
  } else if (updateSearch == "departments") {
    updateSearch = `AdministrativeAuthorities`;
  } else if (updateSearch == "groups") {
    updateSearch = `GroupAuthorities`;
  } else if (updateSearch == "roles") {
    updateSearch = `RoleAuthorities`;
  }

  return (
    <div className="card">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bolder text-dark fs-6">
            {" "}
            اسم الادارة
          </span>
          <span className="text-muted mt-2 fw-bold fs-6">
            {" "}
            الادارة الرئيسية
          </span>
        </h3>
      </div>

      <div className="card-body d-flex flex-center flex-column">
        <div className="symbol symbol-75px mb-2 toolsIcon">
          <span className="symbol-label bg-light-info">
            <span className="svg-icon svg-icon-4x svg-icon-info">
              <i className="bi bi-graph-up-arrow fs-3x"></i>
            </span>
            <span className="top-icon">
              <i className="bi bi-tools"></i>
            </span>
          </span>
        </div>

        <span className="fs-5 text-gray-800 fw-bolder">اسم الخدمة</span>

        <div className="fw-bold text-gray-400 mb-6">وصف البطاقة</div>

        <div className="d-flex flex-center flex-wrap">
          <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
            <div className="fs-7 fw-bolder text-gray-700">20/04/2022</div>
            <div className="fw-bold text-gray-400 text-center fs-9">
              {intl.formatMessage({ id: "LastUpdate" })}
            </div>
          </div>

          <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
            <div className="fs-7 fw-bolder text-gray-700">15/05/2022</div>
            <div className="fw-bold text-gray-400 text-center fs-9">
              {intl.formatMessage({ id: "LastVisit" })}
            </div>
          </div>
        </div>

        <div className="w-100 mt-5 pt-3">
          <div className="d-flex flex-column mb-4">
            <h4 className="mb-4 text-gray-700">
              {intl.formatMessage({ id: "Permissions" })}
            </h4>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">ادارة المستخدمين</span>
            </span>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">الادارة المالية</span>
            </span>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">ادارة المستخدمين</span>
            </span>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">الادارة المالية</span>
            </span>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">ادارة المستخدمين</span>
            </span>
          </div>
          <div className="d-flex flex-column mb-2">
            <h4 className="mb-4 text-gray-700">
              {intl.formatMessage({ id: "CardOwner" })}
            </h4>
            <span className="text-primary mb-3 d-flex ">
              <i className="fas fa-window-minimize fa-fw"></i>{" "}
              <span className="mx-2">ادارة المستخدمين</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ViewAllcardsCardDetailsCardContent };
