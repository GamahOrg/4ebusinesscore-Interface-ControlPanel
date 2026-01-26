import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { FC } from "react";
import { IntlShape } from "react-intl";

interface NewsEventsSettingsAccordionProps {
  intl: IntlShape;
  register: any;
  errors: any;
}

const NewsEventsSettingsAccordion: FC<NewsEventsSettingsAccordionProps> = ({
  intl,
  register,
  errors,
}) => {
  return (
    <>
      <div className="row mt-5 pt-8">
        <div className="col-6 mb-3">
          <label
            htmlFor="DigitalMediaNewsTitleAr"
            className=" mb-5 fw-semibold fs-6"
          >
            {" "}
            {intl.formatMessage({
              id: "DigitalMediaNewsTitleAr",
            })}{" "}
          </label>
          <span className="required"></span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-file-signature special h-100"></i>
              </span>
            </div>
            <input
              id="DigitalMediaNewsTitleAr"
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: "DigitalMediaNewsTitleAr",
              })}
              {...register("newsTitleAr")}
            />
            {DisplayErrorMessage(
              errors?.newsTitleAr?.message,
              intl,
              intl.locale
            )}
          </div>
        </div>
        <div className="col-6 mb-3">
          <label
            htmlFor="DigitalMediaNewsTitleEn"
            className=" mb-5 fw-semibold fs-6"
          >
            {" "}
            {intl.formatMessage({
              id: "DigitalMediaNewsTitleEn",
            })}{" "}
          </label>
          <span className="required"></span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-file-signature special h-100"></i>
              </span>
            </div>
            <input
              id="DigitalMediaNewsTitleEn"
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: "DigitalMediaNewsTitleEn",
              })}
              {...register("newsTitleEn")}
            />
            {DisplayErrorMessage(
              errors?.newsTitleEn?.message,
              intl,
              intl.locale
            )}
          </div>
        </div>
        <div className="col-6 mb-3">
          <label
            htmlFor="DigitalMediaEventsTitleAr"
            className=" mb-5 fw-semibold fs-6"
          >
            {" "}
            {intl.formatMessage({
              id: "DigitalMediaEventsTitleAr",
            })}{" "}
          </label>
          <span className="required"></span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-file-signature special h-100"></i>
              </span>
            </div>
            <input
              id="DigitalMediaEventsTitleAr"
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: "DigitalMediaEventsTitleAr",
              })}
              {...register("eventsTitleAr")}
            />
            {DisplayErrorMessage(
              errors?.eventsTitleAr?.message,
              intl,
              intl.locale
            )}
          </div>
        </div>
        <div className="col-6 mb-3">
          <label
            htmlFor="DigitalMediaEventsTitleEn"
            className=" mb-5 fw-semibold fs-6"
          >
            {" "}
            {intl.formatMessage({
              id: "DigitalMediaEventsTitleEn",
            })}{" "}
          </label>
          <span className="required"></span>
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="fas fa-file-signature special h-100"></i>
              </span>
            </div>
            <input
              id="DigitalMediaEventsTitleEn"
              type="text"
              className="form-control"
              placeholder={intl.formatMessage({
                id: "DigitalMediaEventsTitleEn",
              })}
              {...register("eventsTitleEn")}
            />
            {DisplayErrorMessage(
              errors?.eventsTitleEn?.message,
              intl,
              intl.locale
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsEventsSettingsAccordion;
