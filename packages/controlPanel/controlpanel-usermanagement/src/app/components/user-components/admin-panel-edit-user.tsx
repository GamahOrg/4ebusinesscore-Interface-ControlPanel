import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { AddNewItemToolbar } from "./popups/AddNewItemToolbar";
import CheckBoxDropDown from "../domain-components/CheckBoxDropDown";
import { Actions } from "../domain-components/ActionsComponent";
import { DepartmentalOrganizationalStructurePopup } from "./popups/DepartmentalOrganizationalStructurePopup";
import { SavePopup } from "./popups/SavePopup";

export const AdminPanelEditUser: FC<any> = () => {
  const [modalVShow, setModalVShow] = useState<boolean>(false);

  const intl = useIntl();
  const [jobDegree, setJobDegree] = useState([]);
  const [jobTitle, setJobTitle] = useState([]);

  const jobDegreeOptions = [
    {
      id: 1,
      name: "الدرجة الاولي",
    },
    {
      id: 2,
      name: "الدرجة الثانية",
    },
    {
      id: 3,
      name: "الدرجة الثالثة",
    },
  ];

  const jobTitleOptions = [
    {
      id: 1,
      name: "الوظيفه الاولي",
    },
    {
      id: 2,
      name: "الوظيفه الثانية",
    },
    {
      id: 3,
      name: "الوظيفه الثالثة",
    },
  ];

  return (
    <>
      <AddNewItemToolbar title="EditUser" />

      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8 pt-5">
              <div>
                <div className="card-header px-1 pb-2 mb-5 mt-5 px-2 px-3">
                  <p className="card-title align-items-start flex-column px-5 pb-5">
                    <span className="card-label fw-bolder fs-3 mb-2 ">
                      {intl.formatMessage({
                        id: "EditUser",
                      })}
                    </span>
                    <span className="mt-1 fw-semibold fs-5 text-muted">
                      {intl.formatMessage({
                        id: "PleaseEnterTheData",
                      })}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <h3 className="h1 mb-8">
                    {intl.formatMessage({ id: "BasicData" })}
                  </h3>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "Username" })}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "Username",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "Email" })}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "Email",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "PhoneNumber" })}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "PhoneNumber",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "Gender",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="gender"
                            id="male_gender"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="male_gender"
                          >
                            {intl.formatMessage({
                              id: "Male",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="gender"
                            id="female_gender"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="female_gender"
                          >
                            {intl.formatMessage({
                              id: "Female",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {`${intl.formatMessage({
                          id: "IDNumber",
                        })}
                                    /${intl.formatMessage({
                                      id: "Residence",
                                    })}`}
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={`${intl.formatMessage({
                          id: "IDNumber",
                        })}/${intl.formatMessage({
                          id: "Residence",
                        })}`}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "UserType" })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="userType"
                            id="systemUser"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="systemUser"
                          >
                            {intl.formatMessage({
                              id: "SystemUser",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="userType"
                            id="domainUser"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="domainUser"
                          >
                            {intl.formatMessage({
                              id: "DomainUser",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700">
                        {intl.formatMessage({ id: "Address" })}
                      </label>
                      <textarea
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "Address",
                        })}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <h3 className="h1 mb-8">
                    {intl.formatMessage({ id: "JobInformation" })}
                  </h3>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "JobDegree" })}
                      </label>

                      <div className="mx-auto mt-1  ">
                        <CheckBoxDropDown
                          selectedOptions={jobDegree}
                          setSelectedOptions={setJobDegree}
                          options={jobDegreeOptions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "JobTitle" })}
                      </label>
                      <div className="mx-auto mt-1  ">
                        <CheckBoxDropDown
                          selectedOptions={jobTitle}
                          setSelectedOptions={setJobTitle}
                          options={jobTitleOptions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "JobPosition",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="jobPosition"
                            id="managerPosition"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="managerPosition"
                          >
                            {intl.formatMessage({
                              id: "Manager",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="jobPosition"
                            id="employeePosition"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="employeePosition"
                          >
                            {intl.formatMessage({
                              id: "Employee",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3 ">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "EmployeeManagement",
                        })}
                      </label>

                      <div className="mx-auto mt-1  ">
                        <button
                          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#rega_modal_departmental_organizational_structure"
                        >
                          {intl.formatMessage({
                            id: "Choose",
                          })}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "DateFrom" })}
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "DateFrom",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "DateTo" })}
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "DateTo",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "JobPeriod",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="JobPeriod"
                            id="main"
                            checked={true}
                          />
                          <label className="form-check-label" htmlFor="main">
                            {intl.formatMessage({
                              id: "Main",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="JobPeriod"
                            id="delegated"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="delegated"
                          >
                            {intl.formatMessage({
                              id: "Delegated",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({ id: "HiringDate" })}
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "HiringDate",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3 d-flex flex-column"></div>
                  </div>
                  <div className="col-12">
                    <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                      <div className="table-responsive px-2  fs-6 ">
                        <table className="table table-borderless align-middle">
                          <thead className="bg-light p-4 text-center fw-lighter border">
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "AffiliatedManagementAndJob",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "DateFrom",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "DateTo",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "HiringDate",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "WorkPeriod",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "Actions",
                              })}
                            </td>
                          </thead>
                          <tbody className="text-center border">
                            <tr className="text-center fw-lighter">
                              <td className="p-5">
                                الادارة الاولي
                                <span className="d-block text-center fa-sm text-muted mt-3">
                                  عالم
                                </span>
                              </td>
                              <td className="p-5">01/01/2021</td>
                              <td className="p-5">01/01/2021</td>
                              <td className="p-5">01/01/2021</td>
                              <td className="p-5">اساسي</td>
                              <td className="p-5">
                                <div>
                                  <Actions id={1} enableActionView={false} />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-5">
                  <h3 className="h1 mb-8">
                    {intl.formatMessage({ id: "Permissions" })}
                  </h3>
                </div>
                <div className="row d-flex justify-content-between">
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "UnifiedEntry",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="unifiedEntry"
                            id="unifiedEntryEnabled"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="unifiedEntryEnabled"
                          >
                            {intl.formatMessage({
                              id: "Enabled",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="unifiedEntry"
                            id="unifiedEntryDisabled"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="unifiedEntryDisabled"
                          >
                            {intl.formatMessage({
                              id: "Disabled",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3 d-flex flex-column"></div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "EnablePermission",
                        })}
                      </label>
                      <div className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 d-flex">
                        <div className="form-check form-check-success form-check-sm form-check-custom">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="disabled"
                            checked={true}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="disabled"
                          >
                            {intl.formatMessage({
                              id: "Enabled",
                            })}
                          </label>
                        </div>
                        <div className="form-check form-check-success form-check-sm form-check-custom me-8">
                          <input
                            className="form-check-input text-danger"
                            type="radio"
                            name="enablePermission"
                            id="enabled"
                          />
                          <label className="form-check-label" htmlFor="enabled">
                            {intl.formatMessage({
                              id: "Disabled",
                            })}
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "PermissionPeriodFrom",
                        })}
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "PermissionPeriodFrom",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12 col-sm-3 col-md-4">
                    <div className="mb-2 pt-2 pb-3">
                      <label className="form-label px-2  fs-6 text-gray-700 required">
                        {intl.formatMessage({
                          id: "PermissionPeriodTo",
                        })}
                      </label>
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                        placeholder={intl.formatMessage({
                          id: "PermissionPeriodTo",
                        })}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="mb-2 pt-2 pb-3 d-flex flex-column">
                      <div className="table-responsive px-2  fs-6 ">
                        <table className="table table-borderless align-middle">
                          <thead className="bg-light p-4 text-center fw-lighter border">
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "UnifiedEntry",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "EnablePermission",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "PermissionPeriodFrom",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "PermissionPeriodTo",
                              })}
                            </td>
                            <td className="p-5">
                              {intl.formatMessage({
                                id: "Actions",
                              })}
                            </td>
                          </thead>
                          <tbody className="text-center border">
                            <tr className="text-center fw-lighter">
                              <td className="p-5">الادارة الاولي</td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "Enabled",
                                })}
                              </td>
                              <td className="p-5">
                                {intl.formatMessage({
                                  id: "Disabled",
                                })}
                              </td>
                              <td className="p-5">01/01/2021</td>
                              <td className="p-5">
                                <div>
                                  <Actions id={1} enableActionView={false} />
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-3 text-center pb-5">
                <Link
                  className="btn btn-secondary m-3 px-5 py-3"
                  style={{ width: "125px" }}
                  to="/admin-panel-users-workspace/admin-panel-users/users"
                >
                  {intl.formatMessage({
                    id: "Cancel",
                  })}
                </Link>

                <button
                  className="btn btn-primary m-3 px-5 py-3"
                  style={{ width: "125px" }}
                  onClick={(event) => {
                    event.preventDefault();
                    setModalVShow(true);
                  }}
                >
                  {intl.formatMessage({
                    id: "Save",
                  })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="Rega_modal_edit" aria-hidden="true">
        <SavePopup show={modalVShow} handleClose={() => setModalVShow(false)} />
      </div>
      <div
        className="modal fade"
        id="rega_modal_departmental_organizational_structure"
        aria-hidden="true"
      >
        <DepartmentalOrganizationalStructurePopup />
      </div>
    </>
  );
};
