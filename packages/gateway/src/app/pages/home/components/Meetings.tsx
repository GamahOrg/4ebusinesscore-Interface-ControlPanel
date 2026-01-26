import React, { FC } from "react";
import { useIntl } from "react-intl";
import { toAbsoluteUrl } from "../../../helpers";

const Meetings: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-10">
          <div
            id="kt_security_recent_alerts"
            className="carousel carousel-custom carousel-stretch slide"
            data-bs-ride="carousel"
            data-bs-interval="8000"
          >
            <div className="d-flex flex-stack align-items-center flex-wrap mt-4">
              <h3 className="card-title align-items-start flex-column mb-4">
                <span className="card-label fw-bolder fs-3 mb-1">
                  {intl.formatMessage({ id: "Meetings" })}{" "}
                </span>
                <br />
                <span className="text-muted mt-1 fw-bold fs-7">
                  {" "}
                  {intl.formatMessage({ id: "MeetingSchedule" })}{" "}
                </span>
              </h3>

              <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                <li
                  data-bs-target="#kt_security_recent_alerts"
                  data-bs-slide-to="0"
                  className="ms-1"
                ></li>
                <li
                  data-bs-target="#kt_security_recent_alerts"
                  data-bs-slide-to="1"
                  className="ms-1"
                ></li>
                <li
                  data-bs-target="#kt_security_recent_alerts"
                  data-bs-slide-to="2"
                  className="ms-1 active"
                  aria-current="true"
                ></li>
              </ol>
            </div>
            <div className="carousel-inner pt-13">
              <div className="carousel-item">
                <div className="carousel-wrapper">
                  <div className="d-flex flex-column flex-grow-1">
                    <a
                      href=""
                      className="fs-5 fw-bolder text-dark text-hover-primary"
                    >
                      {intl.formatMessage({ id: "FirstMeeting" })}
                    </a>
                    <p className="text-gray-600 fs-6 fw-bold pt-3 mb-0">
                      {intl.formatMessage({ id: "DescriptionMeeting" })}
                    </p>
                  </div>
                  <div className="d-flex flex-column mt-10">
                    <div className="text-dark me-2 fw-bolder pb-4">
                      {intl.formatMessage({ id: "MeetingMembers" })}
                    </div>
                    <div className="d-flex">
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Salwa Al-Omari"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Saud Alshehri"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-1"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Sarah Al-Hafiz"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Turki Al-Atallah"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/woman.webp")}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-stack mt-5">
                    <span className="badge badge-light-primary fs-7 fw-bolder me-2">
                      10 Oct 2022
                    </span>
                    <a href="" className="btn btn-sm btn-light">
                      {intl.formatMessage({ id: "Details" })}
                    </a>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
              <div className="carousel-item">
                <div className="carousel-wrapper">
                  <div className="d-flex flex-column flex-grow-1">
                    <a
                      href=""
                      className="fs-5 fw-bolder text-dark text-hover-primary"
                    >
                      {intl.formatMessage({ id: "SecondMeeting" })}
                    </a>
                    <p className="text-gray-600 fs-6 fw-bold pt-3 mb-0">
                      {intl.formatMessage({ id: "DescriptionMeeting" })}
                    </p>
                  </div>
                  <div className="d-flex flex-column mt-10">
                    <div className="text-dark me-2 fw-bolder pb-4">
                      {intl.formatMessage({ id: "MeetingMembers" })}
                    </div>
                    <div className="d-flex">
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Salwa Al-Omari"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Saud Alshehri"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Sarah Al-Hafiz"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Turki Al-Atallah"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/woman.webp")}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-stack pt-6">
                    <span className="badge badge-light-primary fs-7 fw-bolder me-2">
                      5 May 2022
                    </span>
                    <a
                      href=""
                      className="btn btn-light btn-sm btn-color-muted fs-7 fw-bolder px-5"
                    >
                      {intl.formatMessage({ id: "Details" })}
                    </a>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
              <div className="carousel-item active">
                <div className="carousel-wrapper">
                  <div className="d-flex flex-column flex-grow-1">
                    <a
                      href=""
                      className="fs-5 fw-bolder text-dark text-hover-primary"
                    >
                      {intl.formatMessage({ id: "ThirdMeeting" })}
                    </a>
                    <p className="text-gray-600 fs-6 fw-bold pt-3 mb-0">
                      {intl.formatMessage({ id: "DescriptionMeeting" })}
                    </p>
                  </div>
                  <div className="d-flex flex-column mt-10">
                    <div className="text-dark me-2 fw-bolder pb-4">
                      {intl.formatMessage({ id: "MeetingMembers" })}
                    </div>
                    <div className="d-flex">
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Salwa Al-Omari"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Saud Alshehri"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Sarah Al-Hafiz"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/300-3.webp")}
                          alt=""
                        />
                      </a>
                      <a
                        href=""
                        className="symbol symbol-35px me-2"
                        data-bs-toggle="tooltip"
                        title=""
                        data-bs-original-title="Turki Al-Atallah"
                      >
                        <img
                          src={toAbsoluteUrl("/media/avatars/woman.webp")}
                          alt=""
                        />
                      </a>
                    </div>
                  </div>
                  <div className="d-flex flex-stack pt-6">
                    <span className="badge badge-light-primary fs-7 fw-bolder me-2">
                      11 Sep 2021
                    </span>
                    <a
                      href=""
                      className="btn btn-light btn-sm btn-color-muted fs-7 fw-bolder px-5"
                    >
                      {intl.formatMessage({ id: "Details" })}
                    </a>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Meetings;
