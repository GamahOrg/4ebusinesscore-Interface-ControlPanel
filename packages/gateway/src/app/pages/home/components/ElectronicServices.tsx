import { FC } from "react";
import { useIntl } from "react-intl";
import { Link } from "react-router-dom";
import { SystemPagination } from "@4eplatform/shared/src/popups/SystemPagination";

const ElectronicServices: FC = () => {
  const intl = useIntl();

  return (
    <>
      <div className="card mb-8 p-4">
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label fw-bolder fs-3 mb-1">
              {intl.formatMessage({ id: "ElectronicServices" })}
            </span>
            <span className="text-muted fw-bold fs-7">
              {intl.formatMessage({ id: "LearnAboutOurServices" })}{" "}
            </span>
          </h3>
        </div>
        <div className="card-body d-flex flex-column p-5 pt-2">
          <div className="row g-5 g-xl-8">
            <div className="col-xl-3 col-md-4 col-12">
              {/* <Link to="/admin-panel-workspace"> */}
              <Link to="about:blank" target='_blank'>
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-primary rounded-2 mb-3">
                    <i className="fad fa-users text-primary fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "HumanResourceManagement" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 9
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({
                      id: "HumanResourceManagementServices",
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              {/* <Link to="/knowledge-workspace"> */}
              <Link to="about:blank" target='_blank'>
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card  d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-success rounded-2 mb-3">
                    <i className="fas fa-warehouse text-success fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3 ">
                    {intl.formatMessage({ id: "ProjectsManagement1" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 12
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({ id: "ProjectsManagementServices" })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              {/* <Link to="/digital-media-workspace"> */}
              <Link to="about:blank" target='_blank'>
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-info rounded-2 mb-3">
                    <i className="fas fa-people-arrows text-info fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "CRM" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 14
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({ id: "CRMSerivces" })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              {/* <Link to="/committees-workspace"> */}
              <Link to="about:blank" target='_blank'>
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-danger rounded-2 mb-3">
                    <i className="fas fa-envelope text-danger fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "CorrespondenceMangement" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 7
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({
                      id: "CorrespondenceMangementServices",
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              <Link to="/main-categories/FacilitiesManagementServices">
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-warning rounded-2 mb-3">
                    <i className="fas fa-building text-warning fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "FacilitiesManagement" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 9
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({ id: "FacilitiesManagementServices" })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              <Link to="/main-categories/ComunicationManagementServices">
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-warning rounded-2 mb-3">
                    <i className="fas fa-broadcast-tower text-warning fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "ComunicationManagement" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 9
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({
                      id: "ComunicationManagementServices",
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              <Link to="/main-categories/InformationTechnologyServices">
                <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                  <div className="p-2 w-20 text-center bg-light-success rounded-2 mb-3">
                    <i className="fas fa-chart-line text-success fs-5"></i>
                  </div>
                  <p className="fw-bolder fs-5 mb-3">
                    {intl.formatMessage({ id: "TechnicalSupportManagement1" })}
                  </p>
                  {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 10
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                  <p className="text-muted">
                    {intl.formatMessage({
                      id: "InformationTechnologyServices",
                    })}
                  </p>
                </div>
              </Link>
            </div>
            <div className="col-xl-3 col-md-4 col-12">
              {/* <Link to="/reports-workspace"> */}
              <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                <div className="d-flex justify-content-between  align-items-center ">
                  <div className="p-2 w-20 text-center bg-light-warning rounded-2 mb-3">
                    <i className="bi bi-journal-text text-warning fs-5"></i>
                  </div>
                  <p className="fs-8 text-dark bg-light-warning p-2 rounded-2 ">
                    {intl.formatMessage({
                      id: "ComingSoon",
                    })}
                  </p>
                </div>
                <p className="fw-bolder fs-5 mb-3 ">
                  {intl.formatMessage({ id: "CommitteesManagement" })}
                </p>
                {/* <div className="d-flex flex-stack">
                  <p className="fs-6 mb-0">
                    {intl.formatMessage({ id: "NumberOfCards" })} : 10
                  </p>
                  <div className="w-30px h-30px line-height-27 elec-arrow text-center border rounded-circle border-2 border-secondary">
                    <i className="bi bi-arrow-right fw-bolder text-muted fs-6"></i>
                  </div>
                </div> */}
                <p className="text-muted">
                  {intl.formatMessage({ id: "CommitteesManagementServices" })}
                </p>
              </div>
              {/* </Link> */}
            </div>
            {/* <div className="col-xl-3 col-md-4 col-12">
            
              <div className="card shadow-sm h-150px p-5 text-gray-800 border electronic-card d-flex justify-contnet-center bg-hover-light-primary">
                <div className="d-flex justify-content-between  align-items-center ">
                  <div className="p-2 w-20 text-center bg-light-primary rounded-2 mb-3">
                   

                    <i className="bi bi-lightbulb text-primary fs-5"></i>
                  </div>
                  <p className="fs-8 text-dark bg-light-primary p-2  rounded-2 ">
                    {intl.formatMessage({
                      id: "ComingSoon",
                    })}
                  </p>
                </div>
                <p className="fw-bolder fs-5 mb-3 ">
                  {intl.formatMessage({
                    id: "KnowledgeManagement1",
                  })}
                </p>
                <p className="text-muted">
                  {intl.formatMessage({
                    id: "KnowledgeManagementServices",
                  })}
                </p>
              </div>
              
            </div> */}
          </div>
          <SystemPagination />
        </div>
      </div>
    </>
  );
};

export default ElectronicServices;
