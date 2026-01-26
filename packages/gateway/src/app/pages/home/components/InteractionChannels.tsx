import React, { FC } from "react";
import { useIntl } from "react-intl";

const InteractionChannels: FC = () => {
  const intl = useIntl();
  return (
    <>
      <div className="card card-rounded p-10 mb-15">
        <h3 className="card-title align-items-start flex-column mb-5">
          <span className="card-label fw-bolder fs-3 mb-1">
            {intl.formatMessage({ id: "InteractionChannels" })}{" "}
          </span>
          <br />
          <span className="text-muted mt-1 fw-bold fs-7">
            {" "}
            {intl.formatMessage({ id: "CommunicationInteraction" })}{" "}
          </span>
        </h3>
        {/*<h2 className="text-dark fw-bolder mb-11">قنوات التواصل </h2>*/}
        <div className="d-flex align-items-center mt-5 mb-6">
          <i className="bi bi-calendar-check text-primary fs-1 me-5"></i>
          <div className="d-flex flex-column">
            <a href="" className="link-primary fs-4">
              {intl.formatMessage({ id: "Surveys" })}
            </a>
            <div className="fw-bold">
              <span className="text-muted">
                {intl.formatMessage({ id: "LatestSurveys" })}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-6">
          <i className="bi bi-chat-square-text-fill text-primary fs-1 me-5"></i>
          <div className="d-flex flex-column">
            <a href="" className="link-primary fs-4">
              {intl.formatMessage({ id: "TechnicalSupportAndHelp" })}
            </a>
            <div className="fw-bold">
              <span className="text-muted">
                {intl.formatMessage({ id: "ContactWithSupport" })}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center mb-6">
          <i className="bi bi-pencil text-primary fs-1 me-5"></i>
          <div className="d-flex flex-column">
            <a href="" className="link-primary fs-4">
              {intl.formatMessage({ id: "Polls" })}
            </a>
            <div className="fw-bold">
              <span className="text-muted">
                {intl.formatMessage({ id: "VotesAndPolls" })}
              </span>
            </div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <i className="bi bi-check2-square text-primary fs-1 me-5"></i>
          <div className="d-flex flex-column">
            <a href="" className="link-primary fs-4">
              {intl.formatMessage({ id: "YourVoiceIsHeard" })}
            </a>
            <div className="fw-bold">
              <span className="text-muted">
                {intl.formatMessage({ id: "ReportsAndComplaints" })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InteractionChannels;
