import { ImageUploader } from "@4eplatform/shared/components/ImageUploader";
import { ChangeEvent, FC } from "react";
interface FooterSettingsAccordionProps {
  intl: { formatMessage: (message: { id: string }) => string };
  footerImage: string;
  footerImageFile: File | null;
  footerImageDarkMode: string;
  footerImageFileDarkMode: File | null;
  setFooterImageFile: (file: File | null) => void;
  setFooterImage: (src: string) => void;
  setFooterImageFileDarkMode: (file: File | null) => void;
  setFooterImageDarkMode: (src: string) => void;
  register: any;
  errors: any
}

const handleImageChange = (
  event: ChangeEvent<HTMLInputElement>,
  setFile: (file: File | null) => void,
  setImage: (src: string) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      setFile(file);
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const FooterSettingsAccordion: FC<FooterSettingsAccordionProps> = ({
  intl,
  footerImage,
  footerImageFile,
  footerImageDarkMode,
  footerImageFileDarkMode,
  setFooterImageFile,
  setFooterImage,
  setFooterImageFileDarkMode,
  setFooterImageDarkMode,
  register,
  errors
}) => {
  return (
    <>
      {/* Footer Logo Inputs */}
      <div className="row mt-5">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <div className="footer-image-uploader">
            <ImageUploader
              label={intl.formatMessage({ id: "FooterLogo" })}
              backgroundImage={footerImage}
              file={footerImageFile}
              onChange={(event) =>
                handleImageChange(event, setFooterImageFile, setFooterImage)
              }
            />
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="footer-image-uploader">
            <ImageUploader
              label={`${intl.formatMessage({ id: "FooterLogo" })} (${intl.formatMessage({ id: "DarkMode" })})`}
              backgroundImage={footerImageDarkMode}
              file={footerImageFileDarkMode}
              onChange={(event) =>
                handleImageChange(event, setFooterImageFileDarkMode, setFooterImageDarkMode)
              }
            />
          </div>
        </div>
      </div>

      {/* Footer Descriptions */}
      <div className="row mt-5 pt-8">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <label htmlFor="FooterDescAr" className="mb-5 fw-semibold fs-6">
            {intl.formatMessage({ id: "FooterDescriptionAr" })}
          </label>
          <textarea
            {...register("footerDescriptionAr")}
            id="FooterDescAr"
            rows={2}
            className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
            placeholder={intl.formatMessage({ id: "FooterDescriptionAr" })}
          ></textarea>
          {errors.footerDescriptionAr && (
                        <div className="text-danger mt-2">
                          {intl.formatMessage({
                            id: (errors.footerDescriptionAr).message,
                          })}
                        </div>
                      )}
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="FooterDescEn" className="mb-5 fw-semibold fs-6">
            {intl.formatMessage({ id: "FooterDescriptionEn" })}
          </label>
          <textarea
            {...register("footerDescriptionEn")}
            id="FooterDescEn"
            rows={2}
            className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
            placeholder={intl.formatMessage({ id: "FooterDescriptionEn" })}
          ></textarea>
          {errors.footerDescriptionEn && (
                        <div className="text-danger mt-2">
                          {intl.formatMessage({
                            id: (errors.footerDescriptionEn).message,
                          })}
                        </div>
                      )}
        </div>
      </div>
    </>
  );
};

export default FooterSettingsAccordion;