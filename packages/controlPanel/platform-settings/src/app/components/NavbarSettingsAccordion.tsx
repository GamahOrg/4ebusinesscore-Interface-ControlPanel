import { ChangeEvent, FC } from "react";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import { deleteMainSettingsHeader } from "../redux/main-settings-header";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

interface InputField {
  id: string;
  nameAr: string;
  nameEn: string;
  url?: string;
  isHide?: boolean;
  canDelete: boolean;
}

interface NavbarSettingsAccordionProps {
  intl: { formatMessage: (message: { id: string }) => string };
  inputs: InputField[];
  clickedId: any;
  showDelete: any;
  setShowDelete: (value: boolean) => void;
  setClickedId: (id: string) => void;
  handleInputChange: (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => void;
  handleAdd: () => void;
}

const NavbarSettingsAccordion: FC<NavbarSettingsAccordionProps> = ({
  intl,
  inputs,
  showDelete,
  clickedId,
  setShowDelete,
  setClickedId,
  handleInputChange,
  handleAdd,
}) => {
  const dispatch = useDispatch();

  const handleDelete = async (id: string) => {
    let res = await dispatch(deleteMainSettingsHeader(id) as any);
    if (res.payload.statusEnum === 1) {
      showSuccessAlert(true, "DeletedSuccessfully", intl, () => {
        window.location.reload();
      });
    } else showSuccessAlert(false, res.payload.message, intl);
  };

  return (
    <div className="p-8 border border-primary rounded-1">
      {inputs?.map((input: any, index: number) => (
        <div key={index}>
          <div
            className={`row ${
              index <= 2 ? "bg-light-danger" : ""
            } position-relative p-6 ${
              localStorage.getItem("Theme") == "light" ? "platform-bg" : ""
            } rounded-1 mb-6`}
          >
            {input.canDelete &&
              input.id !== "00000000-0000-0000-0000-000000000000" && (
                <div className="d-flex justify-content-end">
                  <div
                    className="border border-danger px-4 rounded cursor-pointer"
                    onClick={() => {
                      setShowDelete(true);
                      setClickedId(input.id);
                    }}
                  >
                    <i className="far fa-trash-alt text-danger fs-5"></i>
                  </div>
                </div>
              )}
            <div className="col-lg-6">
              <label
                htmlFor="outputName"
                className="form-label px-2 fontSz-6 pt"
              >
                {index <= 2 ? (
                  <>
                    {intl.formatMessage({
                      id: "AddTitle",
                    })}
                    {index == 0 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "Home",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {index == 1 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "DigitalServices",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {index == 2 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "DigitalTransformationSolutions",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}

                    {intl.formatMessage({
                      id: "TheFavourite",
                    })}
                  </>
                ) : (
                  <>
                    {intl.formatMessage({
                      id: "NameInArabic",
                    })}
                  </>
                )}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-file-signature special h-100"></i>
                  </span>
                </div>
                <input
                  id="outputName"
                  name="nameAr"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "NameInArabic" })}
                  value={input.nameAr}
                  onChange={(event) => handleInputChange(index, event)}
                  onBeforeInput={(e) => {
                    const char = e.data;
                    const currentValue = e.target.value || "";

                    // 2) Check character limit (200 characters)
                    if (currentValue.length >= 200) {
                      e.preventDefault();
                      showSuccessAlert(
                        false,
                        "MaximumCharacterLimitExceeded",
                        intl
                      );
                      return;
                    }

                    // 3) Allow only Arabic letters + spaces
                    const arabicAllowed =
                      /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u;
                    if (!arabicAllowed.test(char)) {
                      e.preventDefault();
                      showSuccessAlert(
                        false,
                        "OnlyArabicCharactersAllowed",
                        intl
                      );
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <label htmlFor="outputName" className="form-label px-2 fontSz-6">
                {/* {intl.formatMessage({
                                        id: "NameInEnglish",
                                      })} */}
                {index <= 2 ? (
                  <>
                    {intl.formatMessage({
                      id: "AddTitle",
                    })}
                    {index == 0 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "Home",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {index == 1 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "DigitalServices",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}
                    {index == 2 ? (
                      <>
                        {" "}
                        (
                        {intl.formatMessage({
                          id: "DigitalTransformationSolutions",
                        })}
                        ){" "}
                      </>
                    ) : (
                      <></>
                    )}

                    {intl.formatMessage({
                      id: "TheFavourite",
                    })}
                  </>
                ) : (
                  <>
                    {intl.formatMessage({
                      id: "NameInEnglish",
                    })}
                  </>
                )}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-file-signature special h-100"></i>
                  </span>
                </div>
                <input
                  id="outputName"
                  name="nameEn"
                  type="text"
                  className="form-control"
                  placeholder={intl.formatMessage({ id: "NameInEnglish" })}
                  value={input.nameEn}
                  onChange={(event) => handleInputChange(index, event)}
                  onBeforeInput={(e) => {
                    const char = e.data; // correct way to get input value in onBeforeInput
                    const currentValue = e.target.value || "";

                    // 2) Check character limit (200 characters)
                    if (currentValue.length >= 200) {
                      e.preventDefault();
                      showSuccessAlert(
                        false,
                        "MaximumCharacterLimitExceeded",
                        intl
                      );
                      return;
                    }

                    // 3) Allow only English letters, spaces, and allowed punctuation
                    const englishAllowed =
                      /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u;
                    if (!englishAllowed.test(char)) {
                      e.preventDefault();
                      showSuccessAlert(
                        false,
                        "OnlyEnglishCharactersAllowed",
                        intl
                      );
                    }
                  }}
                />
              </div>
            </div>
            {index == 1 || index == 2 ? (
              <>
                <div className="col-lg-6">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex">
                      <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="radio"
                          name={`isHide-${index}`}
                          id={`Hide-${index}`}
                          // value={input.isHide}
                          checked={input.isHide}
                          onChange={(event) => handleInputChange(index, event)}
                          // onChange={() => setisHide(true)}
                        />
                      </div>
                      <label className="form-check-label ms-3" htmlFor="Hide">
                        {intl.formatMessage({
                          id: "Hide",
                        })}
                      </label>
                    </div>
                    <div className="d-flex">
                      <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="radio"
                          name={`isHide-${index}`}
                          id={`Show-${index}`}
                          // value={input.isHide}
                          checked={!input.isHide}
                          onChange={(event) => handleInputChange(index, event)}
                          // checked={!isHide}
                          // onChange={() =>
                          //   setisHide(false)
                          // }
                        />
                      </div>
                      <label className="form-check-label ms-3" htmlFor="Show">
                        {intl.formatMessage({
                          id: "Show",
                        })}
                      </label>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
            {input.canDelete && (
              <>
                <div className="col-lg-6 mt-15 d-flex">
                  <div className="d-flex align-items-center gap-4">
                    <div className="d-flex">
                      <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="radio"
                          name={`isHide-${index}`}
                          id={`Hide-${index}`}
                          // value={input.isHide}
                          checked={input.isHide}
                          onChange={(event) => handleInputChange(index, event)}
                          // onChange={() => setisHide(true)}
                        />
                      </div>
                      <label className="form-check-label ms-3" htmlFor="Hide">
                        {intl.formatMessage({
                          id: "Hide",
                        })}
                      </label>
                    </div>
                    <div className="d-flex">
                      <div className="form-check form-check-success form-check-custom form-check-solid form-check-md">
                        <input
                          className="form-check-input widget-9-check xCheckBg"
                          type="radio"
                          name={`isHide-${index}`}
                          id={`Show-${index}`}
                          // value={input.isHide}
                          checked={!input.isHide}
                          onChange={(event) => handleInputChange(index, event)}
                          // checked={!isHide}
                          // onChange={() =>
                          //   setisHide(false)
                          // }
                        />
                      </div>
                      <label className="form-check-label ms-3" htmlFor="Show">
                        {intl.formatMessage({
                          id: "Show",
                        })}
                      </label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 mt-4">
                  <label htmlFor="Link" className="form-label px-2 fontSz-6">
                    {intl.formatMessage({
                      id: "Link",
                    })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-link special h-100"></i>
                      </span>
                    </div>
                    <input
                      id="Link"
                      name="url"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({
                        id: "Link",
                      })}
                      value={input.url}
                      onChange={(event) => handleInputChange(index, event)}
                    />
                  </div>
                </div>
                {/* <div className="col-lg-6">
                  <label
                    htmlFor="outputName"
                    className="form-label px-2 fontSz-6 pt"
                  >
                    {index <= 2 ? (
                      <>
                        {intl.formatMessage({
                          id: "AddTitle",
                        })}
                        {index == 0 ? (
                          <>
                            {" "}
                            (
                            {intl.formatMessage({
                              id: "Home",
                            })}
                            ){" "}
                          </>
                        ) : (
                          <></>
                        )}
                        {index == 1 ? (
                          <>
                            {" "}
                            (
                            {intl.formatMessage({
                              id: "DigitalServices",
                            })}
                            ){" "}
                          </>
                        ) : (
                          <></>
                        )}
                        {index == 2 ? (
                          <>
                            {" "}
                            (
                            {intl.formatMessage({
                              id: "DigitalTransformationSolutions",
                            })}
                            ){" "}
                          </>
                        ) : (
                          <></>
                        )}

                        {intl.formatMessage({
                          id: "TheFavourite",
                        })}
                      </>
                    ) : (
                      <>
                        {intl.locale == "en"
                          ? intl.formatMessage({
                              id: "WorkspaceKey",
                            })
                          : intl.formatMessage({
                              id: "WorkspaceKey",
                            }) +
                            " " +
                            "(Workspace Key)"}
                      </>
                    )}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-key special special h-100"></i>
                      </span>
                    </div>
                    <input
                      id="outputName"
                      name="workspaceKey"
                      type="text"
                      className="form-control"
                      placeholder={intl.formatMessage({ id: "WorkspaceKey" })}
                      value={input.workspaceKey}
                      onChange={(event) => handleInputChange(index, event)}
                      onBeforeInput={(e) => {
                        const char = e.data;
                        const currentValue = e.target.value || "";

                        // Allow only numbers (0–9)
                        const numberAllowed = /^[0-9]$/;
                        if (!numberAllowed.test(char)) {
                          e.preventDefault();
                          showSuccessAlert(false, "TheInputIsIncorrect", intl);
                        }
                      }}
                    />
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-end mt-10">
        <div
          className="px-10 py-1 text-center border border-primary rounded-1 cursor-pointer"
          onClick={handleAdd}
        >
          +
        </div>
      </div>
      {showDelete ? (
        <>
          <div className="modal fade" aria-hidden="true">
            <DeletePopup
              showDelete={showDelete}
              handleCloseDelete={() => setShowDelete(false)}
              handleDelete={() => handleDelete(clickedId)}
            />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavbarSettingsAccordion;
