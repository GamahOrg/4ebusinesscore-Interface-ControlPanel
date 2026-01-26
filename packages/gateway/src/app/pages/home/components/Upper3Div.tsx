import React, { FC } from "react";
import { useIntl } from "react-intl";

const Upper3Div: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="row gx-5 gx-xl-8 mb-5 mb-xl-8">
        {/* <div className="col-xl-12"> */}
        <div className="row gx-5 gx-xl-4 gap-4 gap-xl-0   ">
          <div className="col-xl-2">
            <a href="" className="card bg-primary">
              <div className="card-body d-flex flex-column justify-content-between p-5 mb-3">
                <span className="svg-icon svg-icon-white svg-icon-2hx ms-n1 flex-grow-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mh-50px"
                  >
                    <rect
                      y="6"
                      width="16"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                    <rect
                      opacity="0.3"
                      y="12"
                      width="8"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                    <rect
                      opacity="0.3"
                      width="12"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </span>
                <div className="d-flex flex-column">
                  <div className="text-white fw-bolder fs-1 mb-2 mt-5">54</div>
                  <div className="text-white fw-bolder fs-6 whiteSpace__noWrap">
                    {intl.formatMessage({ id: "RequestsIncoming" })}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-2">
            <a href="" className="card bg-light-success">
              <div className="card-body d-flex flex-column justify-content-between p-5 mb-3">
                <span className="svg-icon svg-icon-success svg-icon-2hx ms-n1 flex-grow-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mh-50px"
                  >
                    <rect
                      y="6"
                      width="16"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                    <rect
                      opacity="0.3"
                      y="12"
                      width="8"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                    <rect
                      opacity="0.3"
                      width="12"
                      height="3"
                      rx="1.5"
                      fill="currentColor"
                    ></rect>
                  </svg>
                </span>
                <div className="d-flex flex-column">
                  <div className="text-dark fw-bolder fs-1 mb-2 mt-5">54</div>
                  <div className="text-muted fw-bolder fs-6 whiteSpace__noWrap">
                    {intl.formatMessage({ id: "RequestsOutgoing" })}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-2">
            <a href="" className="card card-xxl-stretch bg-body">
              <div className="card-body d-flex flex-column justify-content-between p-5 mb-3">
                <span className="svg-icon svg-icon-success svg-icon-2hx ms-n1 flex-grow-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mh-50px"
                  >
                    <path
                      d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z"
                      fill="currentColor"
                    ></path>
                    <path
                      opacity="0.3"
                      d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <div className="d-flex flex-column">
                  <div className="text-dark fw-bolder fs-1 mb-2 mt-5">46</div>
                  <div className="text-muted fw-bolder fs-6">
                    {intl.formatMessage({ id: "NumberOfNews" })}
                  </div>
                </div>
              </div>
            </a>
          </div>
          <div className="col-xl-6">
            <div className="p-2 card h-175px bgi-no-repeat bgi-size-contain card-xl-stretch mb-5 mb-xl-8 d-flex flex-stack upperDiv">
              <div className="w-250px">
                <h1 className="d-flex fw-bolder my-1 fs-5 mb-5">
                  {intl.formatMessage({ id: "HomeWelcome" })}
                </h1>
                <p className="d-flex fw-bolder my-1 fs-5">
                  {intl.formatMessage({ id: "HomeWelcomePosition" })}
                </p>
              </div>
              <img
                className="home-personal"
                src={"/media/avatars/300-3.webp"}
                alt=""
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
};

export default Upper3Div;
