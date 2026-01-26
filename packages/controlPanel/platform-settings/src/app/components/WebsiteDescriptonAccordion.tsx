import { showSuccessAlert } from "@4eplatform/shared";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { ChangeEvent, FC, useState } from "react";
import { FieldValues, FieldErrors } from "react-hook-form";
import { IntlShape } from "react-intl";

interface WebsiteDescriptonAccordionProps {
  intl: IntlShape;
  register: any;
  errors: FieldErrors<FieldValues>;
  iconTitle: string;
  setIconTitleFile: (file: File | null) => void;
  setIconTitle: (src: string) => void;
  file: File | null;
}

const WebsiteDescriptonAccordion: FC<WebsiteDescriptonAccordionProps> = ({
  intl,
  register,
  errors,
  iconTitle,
  setIconTitleFile,
  setIconTitle,
  file,
}) => {
  const [imageFormatError, setImageFormatError] = useState(false);

  const handleLogoChange = (
    event: ChangeEvent<HTMLInputElement>,
    setIconTitleFile: (file: File | null) => void,
    setIconTitle: (src: string) => void
  ) => {
    const file = event.target.files?.[0];

    // ✅ Strict check for allowed types
    const allowedTypes = ["image/png", "image/jpeg"];
    if (!allowedTypes.includes(file.type)) {
      // showSuccessAlert(false, "InvalidImageFormat", intl);
      setImageFormatError(true);
      // alert(intl.formatMessage({ id: "InvalidImageFormat" }));
      event.target.value = ""; // reset input
      return;
    }

    if (file) {
      setImageFormatError(false);
      const reader = new FileReader();
      reader.onload = () => {
        setIconTitleFile(file);
        setIconTitle(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="row mb-6">
      {/* Website Description */}
      <div className="col-12">
        <label htmlFor="description" className="mb-5 fw-semibold fs-6">
          {intl.formatMessage({ id: "WebsiteDescription" })}
        </label>
        <textarea
          {...register("websiteDescription")}
          id="description"
          rows={4}
          className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
          placeholder={intl.formatMessage({ id: "Description" })}
        ></textarea>
        {DisplayErrorMessage(errors?.websiteDescription?.message, intl)}
      </div>

      {/* Platform Title */}
      <div className="col-12 my-4">
        <label htmlFor="platformTitle" className="mb-5 fw-semibold fs-6">
          {intl.formatMessage({ id: "PlatformTitle" })}
        </label>
        <div className="input-group">
          <input
            {...register("platformTitle")}
            id="platformTitle"
            className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
            placeholder={intl.formatMessage({ id: "PlatformTitle" })}
          />
        </div>
        {DisplayErrorMessage(errors?.platformTitle?.message, intl)}
      </div>

      {/* Icon Upload */}
      <div className="col-12">
        <div className="d-flex align-items-center">
          <label className="d-inline-block mx-7">
            {intl.formatMessage({ id: "TitleLogo" })}
          </label>

          <div
            className="image-input image-input-outline"
            data-kt-image-input="true"
          >
            <div
              className="image-input-wrapper w-125px h-125px"
              style={{ backgroundImage: `url(${iconTitle})` }}
            ></div>

            <label
              className="btn btn-icon btn-circle btn-color-muted btn-active-color-primary w-25px h-25px bg-body shadow"
              data-kt-image-input-action="change"
              data-bs-toggle="tooltip"
              data-bs-dismiss="click"
              title="Change avatar"
            >
              <i className="fas fa-edit">
                <span className="path1"></span>
                <span className="path2"></span>
              </i>

              <input
                type="file"
                name="avatar"
                accept=".png, .jpg, .jpeg"
                onChange={(event) =>
                  handleLogoChange(event, setIconTitleFile, setIconTitle)
                }
              />
              {file && <input type="hidden" name="avatar_remove" />}
            </label>
          </div>
        </div>
        {imageFormatError && DisplayErrorMessage("InvalidImageFormat", intl)}
      </div>
    </div>
  );
};

export default WebsiteDescriptonAccordion;
