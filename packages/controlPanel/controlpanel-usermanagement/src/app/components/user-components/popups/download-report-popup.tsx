import { ChangeEvent, FC } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type inputTypes = {
  id: number;
  title: string;
  name: string;
  value: string;
  type: string;
  options?: {
    id: number;
    name: string;
    svgPath: string;
  }[];
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
type DownloadReportPopupProps = {
  showDownloadReport?: any;
  handleCloseDownloadReport?: any;
};
export const DownloadReportPopup: FC<DownloadReportPopupProps> = ({
  showDownloadReport,
  handleCloseDownloadReport,
}) => {
  const intl = useIntl();

  const [inputs, setInputs] = useState<inputTypes[]>([
    {
      id: 1,
      type: "date",
      title: intl.formatMessage({
        id: "From",
      }),
      value: "",
      name: "fromDate",
      onChange: handleChange,
    },
    {
      id: 2,
      type: "date",
      title: intl.formatMessage({
        id: "To",
      }),
      value: "",
      name: "toDate",
      onChange: handleChange,
    },
    {
      id: 3,
      type: "radio",
      title: intl.formatMessage({
        id: "ChooseFileType",
      }),
      name: "fileType",
      onChange: handleChange,
      value: "PDF",
      options: [
        {
          id: 1,
          name: "PDF",
          svgPath: "/media/icons/duotune/general/gen094_PDF.svg",
        },
        {
          id: 2,
          name: "Word",
          svgPath: "/media/icons/duotune/general/gen089_word.svg",
        },
        {
          id: 3,
          name: "Power Point",
          svgPath: "/media/icons/duotune/general/gen091_powerpoint.svg",
        },
        {
          id: 4,
          name: "Excel",
          svgPath: "/media/icons/duotune/general/gen090_excel.svg",
        },
      ],
    },
  ]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setInputs((inputs) =>
      inputs.map((input) =>
        input.name === name ? { ...input, value: value } : input
      )
    );
  }

  return (
    <>
      <div className="modal-dialog modal-dialog-centered">
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showDownloadReport}
          onHide={handleCloseDownloadReport}
        >
          <div className="card">
            <Modal.Header
              closeButton
              style={{
                alignItems: intl.locale == "ar" ? "flex-start" : "center",
                flexDirection: intl.locale == "en" ? "column-reverse" : "row",
              }}
            >
              <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
                <Modal.Title>
                  <h2 className="card-title flex-column align-items-center">
                    <span className="fw-bolder mb-2 fs-3">
                      {intl.formatMessage({
                        id: "DownloadReports",
                      })}
                    </span>
                  </h2>
                  <span className="text-muted fw-lighter">
                    {intl.formatMessage({
                      id: "PleaseChooseTheData",
                    })}
                  </span>
                </Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className="row">
                {inputs.map((input) => {
                  if (input.type === "radio") {
                    return buildRatioButtons(input);
                  }

                  return (
                    <div className="col-6">
                      <div className="mb-2 pt-2 pb-3">
                        <label className="form-label px-2  fs-6 text-gray-700">
                          {input.title}
                        </label>
                        <input
                          type={input.type}
                          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                          placeholder={input.name}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="mt-8 mb-5 col-12 col-lg-7 mx-auto">
                <div className="text-center">
                  <button
                    type="reset"
                    className="btn btn-light me-3"
                    onClick={handleCloseDownloadReport}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      handleCloseDownloadReport();
                      showSuccessAlert(true, "DownloadedSuccessfully", intl);
                    }}
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Download" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "PleaseWait" })}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  </button>
                </div>
              </div>
            </Modal.Footer>
          </div>
        </Modal>
      </div>
    </>
  );
};

const buildRatioButtons = (input: any) => {
  return (
    <div className="row d-flex col-12">
      <label className="form-label px-2  fs-6 text-gray-700">
        {input.name}
      </label>
      {input?.options?.map((option: any) => (
        <div
          className="form-check form-check-success form-check-sm form-check-custom col-12 col-sm-4 col-md-3 my-3"
          key={option.id}
        >
          <input
            className="form-check-input text-danger"
            type="radio"
            name={input.name}
            value={option.name}
            id={`${input.name}${option.id}`}
            checked={input.value === option.name ? true : false}
            onChange={input.onChange}
          />
          <label
            className="form-check-label"
            htmlFor={`${input.name}${option.id}`}
          >
            {option.name}
          </label>
        </div>
      ))}
    </div>
  );
};
