import { useEffect, useState } from "react";
import { RootState } from "../../features/store";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllDelegationFromUserByUserId } from "../../features/user-delegation-slice/user-delegation-slice";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { useIntl } from "react-intl";
import moment from "moment";
import EditUserDelegationPopup from "./popups/EditUserDelegationPopup";

const OutgoingDelegations = () => {
  const [pageIndex, setPageIndex] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [selectedDelegation, setSelectedDelegation] = useState();
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const closePopup = () => {
    setModalDShow(false);
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  let intl = useIntl();
  useEffect(() => {
    const body = {
      id,
      myParams: {
        pageNumber: pageIndex,
        pageSize: pageSize,
      },
    };
    dispatch(getAllDelegationFromUserByUserId(body) as any);
  }, [id, pageIndex, pageSize, dispatch]);

  const outgoingDelegations = useSelector((state: RootState) => {
    return state?.delegation?.fromDelegations;
  });
  const outgoingTotalItems = useSelector((state: RootState) => {
    return state?.delegation?.totalOutgoingDelegationItems;
  });
  const outgoingTotalPages = useSelector((state: RootState) => {
    return state?.delegation?.totalOutgoingDelegationPages;
  });

  return (
    <>
      <div className="table-responsive mb-3">
        <table className="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 text-center dark-table-head">
          <thead>
            <tr className="fw-bolder projectSecColor">
              <th className="px-2 pb-3 max-w-350px text-muted">
                {intl.formatMessage({ id: "Name" })}
              </th>
              <th className="px-2 pb-3 min-w-200px max-w-350px text-muted">
                {intl.formatMessage({ id: "acceptance" })}
              </th>
              <th className="px-2 pb-3 min-w-100px max-w-350px text-muted">
                {intl.formatMessage({ id: "DelegationStatus" })}
              </th>
              <th className="px-2 pb-3 min-w-100px max-w-350px text-muted">
                {intl.formatMessage({ id: "Activated" })}
              </th>
              <th className="px-2 pb-3 min-w-100px max-w-200px text-muted">
                {intl.formatMessage({ id: "StartDate" })}
              </th>
              <th className="px-2 pb-3 min-w-150px max-w-200px text-muted">
                {intl.formatMessage({ id: "EndDate" })}
              </th>
              <th className="px-2 pb-3 max-w-200px text-muted">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>
          <tbody>
            {outgoingDelegations?.map((delegation: any) => (
              <tr className="align-middle ">
                <td className="text-center">
                  <span> {delegation?.fullNameTo}</span>
                  <br />
                  <span className="text-muted">({delegation?.userNameTo})</span>
                </td>
                <td className="text-muted text-center">
                  {delegation?.statusFrom === 1 ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <span
                        className={`bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder bg-success text-success`}
                      >
                        {intl.formatMessage({ id: "AcceptanceDone" })}
                      </span>
                    </div>
                  ) : delegation?.statusFrom === 2 ? (
                    <div className="d-flex align-items-center justify-content-center">
                      <span
                        className={`bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder bg-danger text-danger`}
                      >
                        {intl.formatMessage({ id: "RejectionDone" })}
                      </span>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center justify-content-center">
                      <span className="bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder bg-warning text-warning">
                        {intl.formatMessage({ id: "UnderProcedure" })}
                      </span>
                    </div>
                  )}
                </td>
                <td className="text-muted text-center">
                  {new Date(delegation?.endDate) >= new Date() ? (
                    <div className="badgex my-2 badge-light-primary min-w-30px min-h-30px d-flex align-items-center justify-content-center">
                      {intl.formatMessage({ id: "Continue" })}
                    </div>
                  ) : (
                    <div className="badgex my-2 badge-light-danger min-w-30px min-h-30px d-flex align-items-center justify-content-center">
                      {intl.formatMessage({ id: "NotContinue" })}
                    </div>
                  )}
                  {/* <span
                    className={`bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder ${delegation.isActive ? "bg-success text-success" : "bg-danger text-danger"}`}
                  >
                    {intl.formatMessage({
                      id: delegation.isActive ? "Continue" : "InActive",
                    })}
                  </span> */}
                </td>
                <td className="text-muted text-center">
                  {delegation.isApprovedTo ||
                  delegation.isApprovedTo === null ? (
                    delegation?.isActive ? (
                      <span
                        className={`bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder ${delegation.isActive ? "bg-success text-success" : "bg-danger text-danger"}`}
                      >
                        {intl.formatMessage({ id: "Active" })}
                      </span>
                    ) : (
                      <span
                        className={`bg-opacity-10 py-1 d-inline-block text-center rounded w-100px fw-bolder ${delegation.isActive ? "bg-success text-success" : "bg-danger text-danger"}`}
                      >
                        {intl.formatMessage({ id: "NotActive" })}
                      </span>
                    )
                  ) : (
                    "---"
                  )}
                </td>
                <td className="text-center">
                  {moment(delegation?.startDate).format("YYYY-MM-DD")}
                  <div className="mt-2">
                    {moment(delegation?.startDate).format("LT")}
                  </div>
                </td>
                <td className="text-center">
                  {moment(delegation?.endDate).format("YYYY-MM-DD")}
                  <div className="mt-2">
                    {moment(delegation?.endDate).format("LT")}
                  </div>
                </td>

                <td className="text-center ">
                  <span
                    className="cursor-pointer text-primary"
                    onClick={() => {
                      setSelectedDelegation(delegation);
                      setSelectedUserId(delegation?.delegeatedToUserId);
                      setModalDShow(true);
                    }}
                  >
                    {intl.formatMessage({ id: "Edit" })}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <SystemPagination
        totalPages={outgoingTotalPages}
        totalItems={outgoingTotalItems}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />

      {modalDShow && (
        <EditUserDelegationPopup
          show={modalDShow}
          handleClose={() => closePopup()}
          selectedDelegation={selectedDelegation}
          selectedUserId={selectedUserId}
          type={"outgoing"}
        />
      )}
    </>
  );
};

export default OutgoingDelegations;
