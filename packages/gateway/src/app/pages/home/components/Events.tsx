import { FC } from "react";
import { useIntl } from "react-intl";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Link, useNavigate } from "react-router-dom";

const Events: FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  return (
    <>
      <div className="card card-shadow2 mb-5 mb-xl-10">
        <div className="card-body pt-5">
          <h3 className="d-flex card-title align-items-start flex-column mb-5">
            <div className="d-flex w-100 flex-stack align-items-center flex-wrap mt-4">
              <span className="card-label fw-bolder fs-2 mb-1">
                {intl.formatMessage({ id: "Events1" })}
              </span>
              <button
                onClick={() => {
                  navigate("/advertisment-details");
                }}
                className="p-2 bg-light fs-5 rounded-1 border-0"
              >
                {intl.formatMessage({ id: "ViewAll" })}
              </button>
            </div>
            <span className="text-muted mt-2 fw-bold fs-6">
              {intl.formatMessage({ id: "DisplayEntityEvents" })}
            </span>
          </h3>
          <div className="row">
            <div className="col-md-6 col-12">
              <div className="d-flex flex-wrap flex-md-nowrap gap-5">
                <div className="rounded-3 w-md-auto w-100">
                  <Link to="/ad-details" className="w-100">
                    <img
                      src="/media/posts/JWAN/ad1.webp"
                      alt=""
                      className="mt-1 rounded-4 w-100 commImg1"
                    />
                    <span className="fs-6 mt-4 mb-2 lh-lg fw-bolder truncate-lines-1 text-black">
                    فعالية تمويل بنكى خلال 48 ساعة بالرياض
                    </span>
                  </Link>
                  <div className="d-flex text-muted fw-bold align-items-center">
                    <div className="text-primary d-flex align-items-center">
                      <i className="fa-solid fa-location-dot mt-1 "></i>
                    </div>
                    <span className="mx-2">صالة 7 - ارض المعارض - الرياض</span>
                  </div>
                  <div className="d-flex flex-stack mt-4 align-items-center">
                    <div className="position-relative d-flex justify-content-center align-items-center p-3 border theme-border rounded-3">
                      <div className="position-absolute theme-bg opacity-20 rounded-3 w-100 h-100"></div>
                      <a href="">
                        <KTSVG
                          path="/media/svg/icons/like.svg"
                          className="svg-icon theme-text"
                        />
                      </a>
                    </div>
                    <div className="d-flex gap-1 w-75">
                      <div className="bg-white comm-Border comm-Padding text-center rounded-3 w-100 text-muted fs-9">
                        <span>10 {intl.formatMessage({ id: "Like" })}</span>
                      </div>
                      <div className="bg-white comm-Border comm-Padding rounded-3 w-100 text-center text-muted fs-9">
                        <span>120 {intl.formatMessage({ id: "View" })}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-12">
              <div className="d-flex flex-wrap flex-md-nowrap gap-5">
                <div className="rounded-3 w-md-auto w-100">
                  <Link to="/ad-details" className="w-100">
                    <img
                      src="/media/posts/JWAN/ad9.webp"
                      alt=""
                      className="mt-1 rounded-4 w-100 commImg1"
                    />
                    <span className="fs-6 mt-4 mb-2 lh-lg fw-bolder truncate-lines-1 text-black">
                    فعالية تمويل بنكى خلال 48 ساعة بالرياض
                    </span>
                  </Link>
                  <div className="d-flex text-muted fw-bold align-items-center">
                    <div className="text-primary d-flex align-items-center">
                      <i className="fa-solid fa-location-dot mt-1 "></i>
                    </div>
                    <span className="mx-2">صالة 7 - ارض المعارض - الرياض</span>
                  </div>
                  <div className="d-flex flex-stack mt-4 align-items-center">
                    <div className="position-relative d-flex justify-content-center align-items-center p-3 border theme-border rounded-3">
                      <div className="position-absolute theme-bg opacity-20 rounded-3 w-100 h-100"></div>
                      <a href="#">
                        <KTSVG
                          path="/media/svg/icons/like.svg"
                          className="svg-icon theme-text"
                        />
                      </a>
                    </div>
                    <div className="d-flex gap-1 w-75">
                      <div className="bg-white comm-Border comm-Padding text-center rounded-3 w-100 text-muted fs-9">
                        <span>10 {intl.formatMessage({ id: "Like" })}</span>
                      </div>
                      <div className="bg-white comm-Border comm-Padding rounded-3 w-100 text-center text-muted fs-9">
                        <span>120 {intl.formatMessage({ id: "View" })}</span>
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

export default Events;
