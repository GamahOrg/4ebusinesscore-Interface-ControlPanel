import { BackgroundImageUploader } from "@4eplatform/shared/components/ImageUploader";
import { ChangeEvent, FC } from "react";

interface BackgroundBannerAccordionProps {
  id: number;
  intl: { formatMessage: (message: { id: string }) => string };
  setWebCoverFile: (file: File) => void;
  setWebCoverFileImage: (image: string) => void;
  webCoverFile: File | null;
  webCoverFileimage: string;
  setWebCoverFileDarkMode: (file: File) => void;
  setWebCoverFileImageDarkMode: (image: string) => void;
  webCoverFileDarkMode: File | null;
  webCoverFileimageDarkMode: string;
  setTempImage: (image: string) => void;
  setTempImageFile: (file: File) => void;
  tempImage: string;
  tempImageDarkMode: string;
  setTempImageDarkMode: (image: string) => void;
  setTempImageFileDarkMode: (file: File) => void;
  registerForTheme: any;
  valDate: string;
  setValDate: any;
}

const handleFileChange = (
  event: ChangeEvent<HTMLInputElement>,
  setFile: (file: File) => void,
  setImage: (image: string) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  }
};

const BackgroundBannerAccordion: FC<BackgroundBannerAccordionProps> = ({
  id,
  intl,
  setWebCoverFile,
  setWebCoverFileImage,
  webCoverFileimage,
  setWebCoverFileDarkMode,
  setWebCoverFileImageDarkMode,
  webCoverFileimageDarkMode,
  setTempImage,
  setTempImageFile,
  tempImage,
  tempImageDarkMode,
  setTempImageDarkMode,
  setTempImageFileDarkMode,
  registerForTheme,
  valDate,
  setValDate,
}) => {
  const maxDate = "9999-12-31";

  const handleStartDateChange = (e: any) => {
    const selectedDate = e.target.value;

    const nextDay = new Date(selectedDate);
    nextDay.setDate(nextDay.getDate() + 1);

    const formattedNextDay = nextDay.toISOString().split("T")[0];
    setValDate(formattedNextDay);
  };

  return (
    <>
      {id === 4 && (
        <div className="d-flex flex-md-row flex-column gap-20">
          {/* Main Theme */}
          <div className="w-md-50 w-100">
            <p className="fw-bolder ms-20 text-black fs-4 mb-5 d-flex justify-content-center align-items-center">
              {intl.formatMessage({ id: "MainTheme" })}
            </p>
            <BackgroundImageUploader
              label="MainTheme"
              imageSrc={webCoverFileimage}
              onChange={(e) =>
                handleFileChange(e, setWebCoverFile, setWebCoverFileImage)
              }
            />
          </div>

          <div className="w-md-50 w-100">
            <p className="fw-bolder ms-20 text-black fs-4 mb-5 d-flex justify-content-center align-items-center">
              {`${intl.formatMessage({ id: "MainTheme" })} (${intl.formatMessage({ id: "DarkMode" })})`}
            </p>
            <BackgroundImageUploader
              label="DarkMode"
              imageSrc={webCoverFileimageDarkMode}
              onChange={(e) =>
                handleFileChange(e, setWebCoverFileDarkMode, setWebCoverFileImageDarkMode)
              }
            />
          </div>
        </div>
      )}

      {id === 5 && (
        <div className="d-flex flex-md-row flex-column gap-20 mt-5">
          {/* Temporary Theme */}
          <div className="w-md-50 w-100">
            <p className="fw-bolder text-black fs-4 mb-5 d-flex justify-content-center align-items-center">
              {intl.formatMessage({ id: "TemporaryTheme" })}
            </p>
            <BackgroundImageUploader
              label="TemporaryTheme"
              imageSrc={tempImage}
              onChange={(e) =>
                handleFileChange(e, setTempImageFile, setTempImage)
              }
              showDelete={!!tempImage}
              onDelete={() => {
                setTempImage(webCoverFileimage);
                setTempImageFile(null as any);
              }}
            />
          </div>

          <div className="w-md-50 w-100">
            <p className="fw-bolder text-black fs-4 mb-5 d-flex justify-content-center align-items-center">
              {`${intl.formatMessage({ id: "TemporaryTheme" })} (${intl.formatMessage({ id: "DarkMode" })})`}
            </p>
            <BackgroundImageUploader
              label="TemporaryDarkMode"
              imageSrc={tempImageDarkMode}
              onChange={(e) =>
                handleFileChange(e, setTempImageFileDarkMode, setTempImageDarkMode)
              }
              showDelete={!!tempImageDarkMode}
              onDelete={() => {
                setTempImageDarkMode(webCoverFileimageDarkMode);
                setTempImageFileDarkMode(null as any);
              }}
            />
          </div>
        </div>
      )}

      {(id === 5) && (
        <div className="w-100 justify-content-center d-flex align-items-center">
          <div className="w-100 w-lg-50 d-flex flex-md-nowrap flex-wrap">
            <div className="w-ms-50 w-100 mx-3">
              <label className="form-label px-2 fs-6 text-gray-700 d-flex text-start">
                {intl.formatMessage({ id: "FromDate" })}
              </label>
              <input
                {...registerForTheme("startDate", {
                  onChange: handleStartDateChange,
                })}
                type="date"
                max={maxDate}
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              />
            </div>
            <div className="w-ms-50 w-100 mx-3">
              <label className="form-label px-2 fs-6 text-gray-700 d-flex text-start">
                {intl.formatMessage({ id: "ToDate" })}
              </label>
              <input
                {...registerForTheme("endDate")}
                min={valDate || ""}
                type="date"
                max={maxDate}
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BackgroundBannerAccordion