import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { ChangeEvent, useState } from "react";
import { useIntl } from "react-intl";

type RecordsTableDataType = {
  id: number;
  name: string;
  isChecked: boolean;
  avatar: string;
  description: string;
  onChange: (input: RecordsTableDataType) => void;
};

const AddGroupToRolePopup = () => {
  const intl = useIntl();

  const [recordsTableData, setRecordsTableData] = useState<
    RecordsTableDataType[]
  >([
    {
      id: 1,
      isChecked: false,
      avatar: "300-3.jpg",
      name: "تقيم العقارات",
      description: "التفتيش علي العقارات والابنية القديمة",
      onChange: handleSelectRecord,
    },
    {
      id: 2,
      isChecked: false,
      avatar: "300-3.jpg",
      name: "مديرين الادارات",
      description: "التفتيش علي العقارات والابنية القديمة",
      onChange: handleSelectRecord,
    },
    {
      id: 3,
      isChecked: false,
      name: "تقيم العقارات",
      description: "التفتيش علي العقارات والابنية القديمة",
      avatar: "arab.png",
      onChange: handleSelectRecord,
    },
  ]);

  const [search, setSearch] = useState("");
  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

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

  return (
    <div
      className="modal fade creatForm"
      id="Rega_modal_add-group-to-role"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            ></div>
          </div>
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0">
            <div className="fw-bolder  pb-8">
              <h1 className="mb-3 text-center ">
                {intl.formatMessage({ id: "AddGroup" })}
              </h1>
            </div>

            <div className="mb-15">
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
                          id: "Name",
                        })}
                      </td>
                    </tr>
                  </thead>
                  <tbody className="p-4  text-center border">
                    {recordsTableData?.map((group) => (
                      <tr key={group.id} className="text-center fw-lighter">
                        <td className="p-2">
                          <div className="form-check form-check-success form-check-lg form-check-custom form-check-solid form-check-md d-flex align-items-center text-center justify-content-center">
                            <input
                              className="form-check-input widget-9-check xCheckBg"
                              type="checkbox"
                              defaultValue={0}
                              name={group.name}
                              checked={group.isChecked}
                              onChange={() => group.onChange(group)}
                            />
                          </div>
                        </td>
                        <td className="d-flex  py-4">
                          <div className="d-flex">
                            <div className="symbol symbol-45px symbol-circle ms-2">
                              <img alt="Pic" src={""} />
                            </div>
                            <div>
                              <div className="fs-5 fw-bolder mb-2 d-flex justify-content-start">
                                {group?.name}
                              </div>
                              <div className="fw-bold text-muted">
                                {group?.description}
                              </div>
                            </div>
                          </div>
                        </td>
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

export default AddGroupToRolePopup;
