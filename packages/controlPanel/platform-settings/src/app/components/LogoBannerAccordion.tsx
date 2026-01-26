import { ChangeEvent, FC } from "react";
import { ImageUploader } from "@4eplatform/shared/components/ImageUploader";

interface LogoBannerAccordionProps {
  image: string;
  file: File;
  scrollImage: string;
  setImageFile: (file: File) => void;
  setImage: (image: string) => void;
  setScrollCoverImageFile: (file: File) => void;
  setScrollCoverImage: (image: string) => void;
  setScrollCoverImageFileDarkMode: (file: File) => void;
  setScrollCoverImageDarkMode: (image: string) => void;
  scrollImageDarkMode: string;
  setImageFileDarkMode: (file: File) => void;
  setImageDarkMode: (image: string) => void;
  imageDarkMode: string;
  fileDarkMode: File;
  intl: {
    formatMessage: (message: { id: string }) => string;
  };
}

// Generic function to handle image change
const handleImageChange = (
  event: ChangeEvent<HTMLInputElement>,
  setFile: (file: File) => void,
  setImage: (image: string) => void
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

const LogoBannerAccordion: FC<LogoBannerAccordionProps> = ({
  image,
  file,
  scrollImage,
  setImageFile,
  setImage,
  setScrollCoverImageFile,
  setScrollCoverImage,
  setScrollCoverImageFileDarkMode,
  setScrollCoverImageDarkMode,
  scrollImageDarkMode,
  setImageFileDarkMode,
  setImageDarkMode,
  imageDarkMode,
  fileDarkMode,
  intl,
}) => {
  return (
    <>
      <div className="row mb-3 d-flex align-items-center mt-5 pt-5">
        {/* Website Image */}
        <div className="col-12 col-lg-4 col-md-4 col-sm-6">
          <ImageUploader
            label={intl.formatMessage({ id: "WebsiteImage" })}
            backgroundImage={image}
            onChange={(e) => handleImageChange(e, setImageFile, setImage)}
            file={file}
          />
        </div>

        {/* Website Scroll Image */}
        <div className="col-12 col-lg-4 col-md-4 col-sm-6">
          <ImageUploader
            label={intl.formatMessage({ id: "WebsiteImageScroll" })}
            backgroundImage={scrollImage}
            onChange={(e) =>
              handleImageChange(e, setScrollCoverImageFile, setScrollCoverImage)
            }
            file={file}
          />
        </div>
      </div>

      <div className="row mb-3 d-flex align-items-center mt-5 pt-5">
        {/* Website Image (Dark Mode) */}
        <div className="col-12 col-lg-4 col-md-4 col-sm-6">
          <ImageUploader
            label={`${intl.formatMessage({ id: "WebsiteImage" })} (${intl.formatMessage({ id: "DarkMode" })})`}
            backgroundImage={imageDarkMode}
            onChange={(e) =>
              handleImageChange(e, setImageFileDarkMode, setImageDarkMode)
            }
            file={fileDarkMode}
          />
        </div>

        {/* Website Scroll Image (Dark Mode) */}
        <div className="col-12 col-lg-4 col-md-4 col-sm-6">
          <ImageUploader
            label={`${intl.formatMessage({ id: "WebsiteImageScroll" })} (${intl.formatMessage({ id: "DarkMode" })})`}
            backgroundImage={scrollImageDarkMode}
            onChange={(e) =>
              handleImageChange(
                e,
                setScrollCoverImageFileDarkMode,
                setScrollCoverImageDarkMode
              )
            }
            file={fileDarkMode}
          />
        </div>
      </div>
    </>
  );
};

export default LogoBannerAccordion;
