import { FC, useEffect } from "react";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { IntlShape } from "react-intl";
import {
  FieldErrors,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
} from "react-hook-form";

import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { getSubsystemsDropdown } from "@4eplatform/control-panel-services-settings/src/slices/getAllSubsystemSlice";
import { RootState } from "../redux/store";
import { SubsystemModel } from "@4eplatform/control-panel-services-settings/src/models/subsystemsModel";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

interface AnimatedSettingsAccordionProps {
  intl: IntlShape;
  signInImgSwiper: any;
  errors: FieldErrors<any>;
  setValue: UseFormSetValue<any>;
  trigger: UseFormTrigger<any>;
  setSignInImgSwiper: React.Dispatch<React.SetStateAction<any>>;
  setFilesArray: React.Dispatch<React.SetStateAction<any[]>>;
  unregister: UseFormUnregister<any>;
  filesArray: any[];
  systemSelected?: string;
  setSystemSelected?: any;
}

const AnimatedSettingsAccordion: FC<AnimatedSettingsAccordionProps> = ({
  intl,
  signInImgSwiper,
  errors,
  setValue,
  trigger,
  setSignInImgSwiper,
  setFilesArray,
  unregister,
  filesArray,
  systemSelected,
  setSystemSelected,
}) => {
  const baseURL = (window as any)._env_?.REACT_APP_API_PlatForm_Url + "/";
  const dispatch = useDispatch();

  const { items } = useSelector((state: RootState) => {
    return state?.subsystemDropdownList;
  });

  useEffect(() => {
    let params = {
      SubsystemType: 1,
      pagesize: 1000,
      pagenumber: 1,
    };
    dispatch(getSubsystemsDropdown(params) as any);
  }, [dispatch]);

  const handleAddSignInImgs = () => {
    const isLastEntryIncomplete = signInImgSwiper.some(
      (img: any) =>
        img.id === "00000000-0000-0000-0000-000000000000" &&
        (!img.image || img.image.trim() === "") &&
        (img.fileName === "" || img.fileName == null)
    );

    if (isLastEntryIncomplete) {
      showSuccessAlert(false, "PleaseFillOutAllTheFieldsBeforeAdding", intl);
      return;
    }

    setSignInImgSwiper((prev: any) => [
      ...prev,
      {
        id: `00000000-0000-0000-0000-000000000000`,
        descriptionAr: "",
        descriptionEn: "",
        imageFile: null,
        fileName: "",
        image: "",
        subSystemId: null,
        idx: `${prev.length}`,
        fieldId: uuidv4(),
      },
    ]);
  };

  const handleUpdateSignInImgSwiper = (
    index: number,
    field: string,
    value: any,
    fieldId?: any
  ) => {
    if (field === "descriptionAr") {
      setValue(`${fieldId}_descriptionAr`, value);
    }
    if (field === "descriptionEn") {
      setValue(`${fieldId}_descriptionEn`, value);
    }
    trigger([`${fieldId}_descriptionAr`, `${fieldId}_descriptionEn`]);
    setSignInImgSwiper((prev: any) =>
      prev.map((item: any, i: any) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    handleUpdateSignInImgSwiper(index, "fileName", file.name);
    const objectUrl = URL.createObjectURL(file);

    setFilesArray((prevFilesArray: any) => {
      const updatedFiles = [...prevFilesArray];
      updatedFiles[index] = { file, preview: objectUrl };
      return updatedFiles;
    });

    const reader = new FileReader();
    reader.onload = () => {
      const preview = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteSignInImgs = (idx: string, fieldId?: string) => {
    setSignInImgSwiper((prev: any) =>
      prev?.filter((img: any) => {
        return (
          (img?.id !== "00000000-0000-0000-0000-000000000000"
            ? img?.id || img?.idx
            : img?.idx) !== idx
        );
      })
    );
    unregister([`${fieldId}_descriptionAr`, `${fieldId}_descriptionEn`]);

    setFilesArray((prevFilesArray: any) => {
      const updatedFiles = [...prevFilesArray];
      updatedFiles[+idx] = undefined;
      return updatedFiles;
    });
  };

  return (
    <>
      <div className="w-100">
        <div className="p-8 mt-8 border border-secondary rounded-1 bg-body">
          {signInImgSwiper?.map((imgSwiper: any, index: any) => (
            <div key={index}>
              <div
                className={`row rounded-1 ${
                  index === 0 ? "" : "mt-6"
                } py-8 px-3 bg-body`}
              >
                {index !== 0 && (
                  <div className="col-12 mb-3 d-flex justify-content-end">
                    <div
                      className="border border-danger px-4 rounded cursor-pointer bg-body-secondary"
                      onClick={() =>
                        handleDeleteSignInImgs(
                          imgSwiper?.id !=
                            "00000000-0000-0000-0000-000000000000"
                            ? imgSwiper?.id || index.toString()
                            : index.toString(),
                          imgSwiper?.fieldId
                        )
                      }
                    >
                      <i className="far fa-trash-alt text-danger fs-5"></i>
                    </div>
                  </div>
                )}

                {/* System Select */}
                {/* <div className="col-12 col-md-6 col-lg-4 mb-4">
                  <select
                    className="form-select form-select-solid bg-body text-dark border-secondary"
                    name="system"
                    id="system"
                    onChange={(e: any) =>
                      handleUpdateSignInImgSwiper(
                        index,
                        "subSystemId",
                        e.target.value,
                        imgSwiper?.fieldId
                      )
                    }
                    value={imgSwiper?.subSystemId}
                  >
                    <option value="">
                      {intl.formatMessage({
                        id: "AllSystems",
                      })}
                    </option>
                    {Array.isArray(items) &&
                      items?.length &&
                      items?.map((item: SubsystemModel) => (
                        <option key={item?.id} value={item?.id}>
                          {intl.locale === "ar"
                            ? item?.noteNameAr
                            : item?.noteNameEn}
                        </option>
                      ))}
                  </select>
                </div> */}

                {/* Image Upload */}
                <div className="col-12 col-md-6 col-lg-4 mb-4 d-flex flex-column align-items-center justify-content-center">
                  <label htmlFor="LoginLogo" className="fw-semibold fs-6 mb-2">
                    {intl.formatMessage({
                      id: "SignInImg",
                    })}
                  </label>
                  <div
                    className="image-input image-input-outline bg-body-secondary"
                    data-kt-image-input="true"
                  >
                    <div
                      className="image-input-wrapper w-125px h-125px bg-body-secondary"
                      style={{
                        backgroundImage: `url(${
                          filesArray[index]?.preview ||
                          baseURL + imgSwiper?.image
                        })`,
                      }}
                    ></div>
                    <label
                      className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
                      data-kt-image-input-action="change"
                      data-bs-toggle="tooltip"
                      data-bs-dismiss="click"
                      title="Change footer logo"
                    >
                      <i className="fas fa-edit">
                        <span className="path1"></span>
                        <span className="path2"></span>
                      </i>
                      <input
                        type="file"
                        name="FooterLogo"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => handleFileChange(e, index)}
                      />
                    </label>
                  </div>
                </div>

                {/* Description AR */}
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                  <label
                    htmlFor={`SignInDescAr-${index}`}
                    className="mb-1 fw-semibold fs-6"
                  >
                    {intl.formatMessage({
                      id: "DescriptionAr",
                    })}
                  </label>
                  <textarea
                    id={`SignInDescAr-${index}`}
                    rows={3}
                    onChange={(e: any) =>
                      handleUpdateSignInImgSwiper(
                        index,
                        "descriptionAr",
                        e.target.value,
                        imgSwiper?.fieldId
                      )
                    }
                    value={imgSwiper.descriptionAr}
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 bg-body  border-secondary"
                    placeholder={intl.formatMessage({
                      id: "DescriptionAr",
                    })}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.[`${imgSwiper?.fieldId}_descriptionAr`]?.message,
                    intl,
                    intl.locale
                  )}
                </div>

                {/* Description EN */}
                <div className="col-12 col-md-6 col-lg-4 mb-4">
                  <label
                    htmlFor={`SignInDescEn-${index}`}
                    className="mb-1 fw-semibold fs-6"
                  >
                    {intl.formatMessage({
                      id: "DescriptionEn",
                    })}
                  </label>
                  <textarea
                    id={`SignInDescEn-${index}`}
                    rows={3}
                    onChange={(e: any) =>
                      handleUpdateSignInImgSwiper(
                        index,
                        "descriptionEn",
                        e.target.value,
                        imgSwiper?.fieldId
                      )
                    }
                    value={imgSwiper.descriptionEn}
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2 bg-body  border-secondary"
                    placeholder={intl.formatMessage({
                      id: "DescriptionEn",
                    })}
                  ></textarea>
                  {DisplayErrorMessage(
                    errors?.[`${imgSwiper?.fieldId}_descriptionEn`]?.message,
                    intl,
                    intl.locale
                  )}
                </div>
              </div>
            </div>
          ))}

          <div className="d-flex justify-content-end mt-10">
            <div
              className="px-10 py-1 text-center border border-primary rounded-1 cursor-pointer"
              onClick={handleAddSignInImgs}
            >
              +
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimatedSettingsAccordion;
