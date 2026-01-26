import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import {  toAbsoluteUrl } from "../../../helpers";
import { Link } from "react-router-dom";

const LatestNews: FC = () => {
  const [active, setActive] = useState<number>(1);
  const intl = useIntl();
  return (
    <>
      <div className="row gx-5 gx-xl-8 mb-5 mb-xl-8">
        <div className="col-xl-12">
          <div className="card card-xxl-stretch-50">
            <div className="card-body pt-5">
              <div
                id="kt_security_guidelines"
                className="carousel carousel-custom carousel-stretch slide myCarousel"
                data-bs-ride="carousel"
                data-bs-interval="8000"
              >
                <div className="d-flex flex-stack align-items-center flex-wrap">
                  <span className="card-label fw-bolder fs-3">
                    {intl.formatMessage({ id: "LatestNews" })}
                  </span>
                  <Link to="/news-details/digital-media">
                    <button
                      className="border border-0 d-flex align-items-center justify-content-between"
                      style={{
                        backgroundColor: "transparent",
                        outline: "none",
                      }}
                    >
                      <span className="text-primary">
                        {intl.formatMessage({ id: "More" })}
                      </span>
                      <i className="bi bi-arrow-left fw-bolder text-muted fs-5"></i>
                    </button>
                  </Link>
                </div>
                <div className="d-flex flex-stack align-items-center flex-wrap">
                  <h3 className="card-title align-items-start flex-column">
                    <span className="text-muted fw-bold fs-7">
                      {intl.formatMessage({ id: "ShowLatestNews" })}{" "}
                    </span>
                  </h3>
                  <ol className="p-0 m-0 carousel-indicators carousel-indicators-dots">
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="0"
                      className="ms-1 active"
                      aria-current="true"
                    ></li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="1"
                      className="ms-1"
                    ></li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="2"
                      className="ms-1"
                    ></li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="3"
                      className="ms-1"
                    ></li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="4"
                      className="ms-1"
                    ></li>
                  </ol>
                </div>
                <div className="row gx-5 gx-xl-8 ps-0">
                  <ul
                    className="list-group col-sm-4 p-0 mb-4 mb-sm-0 home__ul"
                    style={{ borderRadius: "10px" }}
                  >
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="0"
                      onClick={() => setActive(1)}
                      className={`list-group-item cursor-pointer flex-grow-1  ${
                        active === 1 ? "active" : ""
                      }`}
                    >
                      <h4 className="truncate-lines mb-0">
                        {intl.formatMessage({
                          id: "JwanNews1",
                          // id: "IDSCNews1",
                          // id: "ITINews1",
                          // id: "PPWNews1",
                          // id:"NCVCNews1"
                        })}
                      </h4>
                    </li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="1"
                      onClick={() => setActive(2)}
                      className={`list-group-item cursor-pointer flex-grow-1 ${
                        active === 2 ? "active" : ""
                      }`}
                    >
                      <h4 className="truncate-lines mb-0">
                        {intl.formatMessage({
                          id: "JwanNews2",
                          // id: "IDSCNews2",
                          // id: "ITINews2",
                          // id: "PPWNews2",
                          // id:"NCVCNews2"
                        })}
                      </h4>
                    </li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="2"
                      onClick={() => setActive(3)}
                      className={`list-group-item cursor-pointer flex-grow-1 ${
                        active === 3 ? "active" : ""
                      }`}
                    >
                      <h4 className="truncate-lines mb-0">
                        {intl.formatMessage({
                          id: "JwanNews3",
                          // id: "IDSCNews3",
                          // id: "ITINews3",
                          // id: "PPWNews3",
                          // id:"NCVCNews3"
                        })}
                      </h4>
                    </li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="3"
                      onClick={() => setActive(4)}
                      className={`list-group-item cursor-pointer flex-grow-1 ${
                        active === 4 ? "active" : ""
                      }`}
                    >
                      <h4 className="truncate-lines mb-0">
                        {intl.formatMessage({
                          id: "JwanNews4",
                          // id: "IDSCNews4",
                          // id: "ITINews4",
                          // id: "PPWNews4",
                          // id:"NCVCNews4"
                        })}
                      </h4>
                    </li>
                    <li
                      data-bs-target="#kt_security_guidelines"
                      data-bs-slide-to="4"
                      onClick={() => setActive(5)}
                      className={`list-group-item cursor-pointer flex-grow-1 ${
                        active === 5 ? "active" : ""
                      }`}
                    >
                      <h4 className="truncate-lines mb-0">
                        {intl.formatMessage({
                          id: "JwanNews5",
                          //id: "IDSCNews5",
                          // id: "ITINews5",
                          // id: "PPWNews5",
                          // id:"NCVCNews5"
                        })}
                      </h4>
                    </li>
                  </ul>
                  <div className="col-sm-8 ps-0">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="carousel-wrapper">
                          <img
                            src={toAbsoluteUrl("/media/News/JWAN/news1.webp")}
                            alt="img1"
                            className="LatestNews-home"
                          />
                          <div className="carousel-caption">
                            <a href="#">
                              {intl.formatMessage({
                                id: "JwanNews1",
                                // id: "ITINews1",
                                // id: "PPWNews1",
                                // id: "IDSCNews1",
                                // id:"NCVCNews1"
                              })}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-wrapper">
                          <img
                            src={toAbsoluteUrl("/media/News/JWAN/news2.webp")}
                            alt=""
                            className="LatestNews-home"
                          />
                          <div className="carousel-caption">
                            <a href="#">
                              {intl.formatMessage({
                                id: "JwanNews2",
                                // id: "ITINews2",
                                // id: "IDSCNews2",
                                // id: "PPWNews2",
                                // id:"NCVCNews2"
                              })}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-wrapper">
                          <img
                            src={toAbsoluteUrl("/media/News/JWAN/news3.webp")}
                            alt=""
                            className="LatestNews-home"
                          />
                          <div className="carousel-caption">
                            <a href="#">
                              {intl.formatMessage({
                                id: "JwanNews3",
                                // id: "ITINews3",
                                //id: "IDSCNews3",
                                // id: "PPWNews3",
                                // id:"NCVCNews3"
                              })}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-wrapper">
                          <img
                            src={toAbsoluteUrl("/media/News/JWAN/news4.webp")}
                            alt=""
                            className="LatestNews-home"
                          />
                          <div className="carousel-caption">
                            <a href="#">
                              {intl.formatMessage({
                                id: "JwanNews4",
                                // id: "IDSCNews4",
                                // id: "ITINews4",
                                // id: "PPWNews4",
                                // id:"NCVCNews4"
                              })}
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="carousel-wrapper">
                          <img
                            src={toAbsoluteUrl("/media/News/JWAN/news5.webp")}
                            alt=""
                            className="LatestNews-home"
                          />
                          <div className="carousel-caption">
                            <a href="#">
                              {intl.formatMessage({
                                id: "JwanNews5",
                                //id: "IDSCNews5",
                                // id: "ITINews5",
                                // id: "PPWNews5",
                                // id:"NCVCNews5"
                              })}
                            </a>
                          </div>
                        </div>
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

export default LatestNews;
