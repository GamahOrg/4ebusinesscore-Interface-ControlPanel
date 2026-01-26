import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { BuildCheckBoxDropDown } from "../BuildCheckBoxDropDown";

type FilterFormItemsType = {
  id: number;
  inputType: string;
  name: string;
  options?: {
    id: number;
    name: string;
  }[];
};

type FilterFormDataType = {
  id: number;
  name: string;
  items: FilterFormItemsType[];
};

type FilterFormsUsersPopupProps = {
  data: FilterFormDataType;
  cancelFun: () => void;
};

export const FilterFormsPopup: React.FC<FilterFormsUsersPopupProps> = ({
  data,
  cancelFun,
}) => {
  const intl = useIntl();

  const [formData, setFormData] = useState<FilterFormDataType>(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  return (
    <>
      <div
        className="modal  fade  show"
        role="dialog"
        style={{ paddingRight: "10px", display: "block" }}
      >
        <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
          <div className="modal-dialog modal-dialog-centered mw-1000px">
            <div className="modal-content">
              <div className="modal-header justify-content-end border-0 pb-0">
                <div className="btn btn-sm btn-icon btn-active-color-primary"></div>
              </div>
              <div className="card">
                <div className="card-body mx-5">
                  <div className="card-header px-1 pb-2 mb-5 flex-column">
                    <h2 className="flex-column align-items-center align-self-center mb-5">
                      <span className="fw-bolder mb-2">
                        {intl.formatMessage({
                          id: "FILTERING.DATA",
                        })}
                      </span>
                    </h2>
                    <div className="my-3">
                      <h2 className="flex-column align-items-center">
                        <span className="fw-bolder mb-2">{formData.name}</span>
                      </h2>
                      <span className="text-muted fw-lighter">
                        {intl.formatMessage({
                          id: "PleaseChooseDataClassification",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="row d-flex align-items-center">
                    {formData.items.map((item) => {
                      if (item.inputType === "radio") {
                        return buildRatioButtons(item);
                      } else if (item.inputType === "select") {
                        return <BuildCheckBoxDropDown item={item} />;
                      }

                      return (
                        <div className="col-6" key={item.id}>
                          <div className="mb-2 pt-2 pb-3">
                            <label className="form-label px-2  fs-6 text-gray-700">
                              {item.name}
                            </label>
                            {item.name ===
                            intl.formatMessage({ id: "GroupName" }) ? (
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="special fas fa-users"></i>
                                  </span>
                                </div>
                                <input
                                  type={item.inputType}
                                  className="form-control"
                                  placeholder={item.name}
                                />
                              </div>
                            ) : item.id === 1 ? (
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="special bi bi-person-circle"></i>
                                  </span>
                                </div>
                                <input
                                  type={item.inputType}
                                  className="form-control"
                                  placeholder={item.name}
                                />
                              </div>
                            ) : (
                              <input
                                type={item.inputType}
                                className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                                placeholder={item.name}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-5 mb-5 col-12 col-lg-7 mx-auto">
                    <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                      <div className="d-flex justify-content-center align-items-center w-50">
                        <div
                          onClick={cancelFun}
                          className="btn btn-secondary mx-1 text-center w-100"
                        >
                          {intl.formatMessage({ id: "Cancel" })}
                        </div>
                        <button
                          type="button"
                          data-bs-dismiss="modal"
                          className="btn btn-success mx-1 text-center w-100"
                          style={{ border: "none" }}
                        >
                          {intl.formatMessage({ id: "Agree" })}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const buildRatioButtons = (item: any) => {
  return (
    <div className="col-6">
      <label className="form-label px-2  fs-6 text-gray-700">{item.name}</label>
      <div className="row">
        {item?.options?.map((option: any) => (
          <div
            className="form-check form-check-success form-check-sm form-check-custom col-4"
            key={option.id}
          >
            <input
              className="form-check-input text-danger"
              type="radio"
              name={option.name}
              id={`${option.name}${option.id}`}
              checked={true}
            />
            <label
              className="form-check-label"
              htmlFor={`${option.name}${option.id}`}
            >
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
