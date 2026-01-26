import { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type RecordsTableDataType = {
  id: number;
  isChecked: boolean;
  badgeColor: string;
  svgIcon: any;
  iconTextColor: string;
  title: string;
  category: string;
  owner: string;
  onChange: (input: RecordsTableDataType) => void;
};

const AddServicesAndToolsToRole = () => {
  const intl = useIntl();

  const [search, setSearch] = useState("");

  const [recordsTableData, setRecordsTableData] = useState<
    RecordsTableDataType[]
  >([
    {
      id: 1,
      isChecked: false,
      onChange: handleSelectRecord,
      badgeColor: `bg-light-info`,
      svgIcon: <i className="bi bi-graph-up-arrow fs-2x"></i>,
      iconTextColor: `info`,
      title: `مؤشر`,
      category: `ادوات`,
      owner: `ادارة المستخدمين`,
    },
    {
      id: 2,
      isChecked: false,
      badgeColor: `bg-light-warning`,
      svgIcon: <i className="fad fa-tasks-alt fs-2x"></i>,
      iconTextColor: `warning`,
      title: `المهام`,
      category: `ادوات`,
      owner: `الادارة المالية`,
      onChange: handleSelectRecord,
    },
    {
      id: 3,
      isChecked: false,
      badgeColor: `bg-light-info`,
      svgIcon: <i className="fad fa-calendar-check fs-2x"></i>,
      iconTextColor: `info`,
      title: `الاجتماعات`,
      category: `خدمات`,
      owner: `ادارة تقنية المعلومات`,
      onChange: handleSelectRecord,
    },
  ]);

  function handleSelectRecord(input: RecordsTableDataType) {
    input.isChecked = !input.isChecked;
    setRecordsTableData([...recordsTableData]);
  }

  function selectAllRecord(e: ChangeEvent<HTMLInputElement>) {
    let isChecked = e.target.checked;
    let items: RecordsTableDataType[] = recordsTableData.map(
      (item: RecordsTableDataType): RecordsTableDataType => {
        item.isChecked = isChecked;
        return item;
      }
    );
    setRecordsTableData(items);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  return (
    <div
      className="modal fade creatForm"
      id="Rega_modal_add-services-and-tools-to-role"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span className="svg-icon svg-icon-1"></span>
            </div>
          </div>
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 mb-5">
            <div className="fw-bolder  pb-8">
              <h1 className="mb-3 text-center ">
                {intl.formatMessage({ id: "AddService" })}
              </h1>
            </div>

            <div className="mb-15">
              <div className="row d-flex justify-content-between align-items-center">
                <div className="col-4 mb-2">
                  <p className="text-mute">
                    {" "}
                    {intl.formatMessage({ id: "AdminstrationName" })}
                  </p>
                </div>
                <div className="col-4 mb-2 text-end">
                  <button className="btn btn-primary mt-5">
                    {intl.formatMessage({
                      id: "AddCard",
                    })}
                  </button>
                </div>
              </div>
              <div className="py-3">
                <div className="position-relative w-100 ms-md-0">
                  <span className="svg-icon svg-icon-3 svg-icon-gray-500 position-absolute top-50 translate-middle ms-6"></span>
                  <input
                    type="text"
                    className="form-control form-control-solid ps-10"
                    name="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder={intl.formatMessage({
                      id: "TypeYourSearchHere",
                    })}
                  />
                </div>
              </div>
              <div className="table-responsive fs-6 ">
                <table className="table table-borderless align-middle">
                  <thead className="p-2 text-center fw-bolder border">
                    <tr>
                      <td className="p-2">
                        <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                          <input
                            className="form-check-input widget-9-check xCheckBg"
                            type="checkbox"
                            defaultValue={0}
                            onChange={selectAllRecord}
                          />
                        </div>
                      </td>
                      <td className="p-5">
                        {intl.formatMessage({
                          id: "Servicename",
                        })}
                      </td>
                      <td className="p-5">
                        {intl.formatMessage({
                          id: "OwnerManagement",
                        })}
                      </td>
                    </tr>
                  </thead>
                  <tbody className="p-4  text-center border">
                    {recordsTableData?.map((service) => (
                      <tr key={service.id} className="text-center fw-lighter">
                        <td className="p-4">
                          <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="checkbox"
                              defaultValue={0}
                              name={service.title}
                              checked={service.isChecked}
                              onChange={() => service.onChange(service)}
                            />
                          </div>
                        </td>
                        <td>
                          <div className="d-flex justify-content-start align-items-center">
                            <div className="symbol symbol-50px mb-2 toolsIcon">
                              <span
                                className={`symbol-label ${service.badgeColor}`}
                              >
                                <span
                                  className={`svg-icon svg-icon-4x svg-icon-${service.iconTextColor}`}
                                >
                                  {service.svgIcon}
                                </span>
                              </span>
                            </div>
                            <div className="d-flex flex-column align-items-start mx-3">
                              <span className={`text-${service.iconTextColor}`}>
                                {service.title}
                              </span>
                              <span className="text-gray-600">
                                وصف الكارت, وصف الكارت, وصف الكارت,
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="fw-bolder fs-5 p-4">{service?.owner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="d-flex justify-content-center mt-5">
                  <button
                    type="reset"
                    data-bs-dismiss="modal"
                    aria-hidden="true"
                    className="btn btn-secondary px-15 me-5"
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    data-bs-dismiss="modal"
                    onClick={(event) => {
                      event.preventDefault();
                      showSuccessAlert(true, "AddedSuccessfully", intl);
                    }}
                    className="btn btn-success px-15 ms-5"
                  >
                    {intl.formatMessage({ id: "Add" })}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServicesAndToolsToRole;
