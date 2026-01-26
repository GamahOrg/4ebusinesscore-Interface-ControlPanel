import { useState } from "react";
import { useIntl } from "react-intl";
import AddUserDelegationPopup from "./popups/AddUserDelegationPopup";
import OutgoingDelegations from "./OutgoingDelegations";
import IncomingDelegations from "./IncomingDelegations";

type ButtonTypes = {
  id: number;
  name: string;
};

const UserDelegationsTab = () => {
  const intl = useIntl();
  const [modalDShow, setModalDShow] = useState<boolean>(false);

  const closePopup = () => {
    setModalDShow(false);
  };

  // const toDelegations = useSelector((state: RootState) => {
  //   return state?.delegation?.toDelegations;
  // });
  // const fromDelegations = useSelector((state: RootState) => {
  //   return state?.delegation?.fromDelegations;
  // });

  // useEffect(() => {
  //   const body = {
  //     id,
  //     myParams: {
  //       pageNumber: 1,
  //       pageSize: 1000,
  //     },
  //   };
  //   dispatch(getAllDelegationToUserByUserId(body) as any);
  //   dispatch(getAllDelegationFromUserByUserId(body) as any);
  // }, []);

  const buttons: ButtonTypes[] = [
    {
      id: 1,
      name: intl.formatMessage({
        id: "OutgoingDelegations",
      }),
    },
    {
      id: 2,
      name: intl.formatMessage({ id: "IncomingDelegations" }),
    },
  ];

  const [activeButton, setActiveButton] = useState<ButtonTypes>(buttons[0]);

  const handleButtonClick = (button: ButtonTypes) => {
    setActiveButton(button);
  };

  const ActivatedUserDetailsTab = () => {
    switch (activeButton.id) {
      case 1:
        return <OutgoingDelegations />;
      case 2:
        return <IncomingDelegations />;
    }
  };

  return (
    <>
     
     
        <div className="card-body py-3 px-3 mx-8">
          <div className="tab-content">
            <div
              className="tab-pane fade active show"
              id="REGA_table_widget_5_tab_1"
            >
              <div className="d-flex justify-content-between align-items-center">
                <h3>
                  {intl.formatMessage({
                    id: "Delegations",
                  })}
                </h3>
                <button
                  className="btn btn-primary "
                  onClick={() => {
                    setModalDShow(true);
                  }}
                >
                  {intl.formatMessage({
                    id: "AddingDelegation",
                  })}
                </button>
              </div>
            </div>
            <div className="mb-xl-0 pb-4 w-100 w-lg-850px ms-lg-7 ms-0 position-relative"></div>
          </div>
        </div>
   

      <div className="detailsCard my-5">
        <div className="card card-xl-stretch mb-xl-8">
          <div className="card-body py-3">
            <div
              className="mb-8 mt-3 pe-5 d-flex w-100 justify-content-between"
              style={{ zIndex: 50 }}
            >
              <div>
                {buttons.map((button) => (
                  <button
                    key={button.id}
                    className={`btn btn-active-color-primary rounded-0 bg-transparent border-0 p-5 fs-6  fw-bolder  border border-bottom border-white border-2 ${
                      activeButton.id === button.id ? "text-dark active" : ""
                    } px-5`}
                    onClick={() => handleButtonClick(button)}
                  >
                    {button.name}
                  </button>
                ))}
              </div>

              {/* <button
                className="btn btn-primary "
                onClick={() => {
                  setModalDShow(true);
                }}
              >
                {intl.formatMessage({
                  id: "AddingDelegation",
                })}
              </button> */}
            </div>
            {ActivatedUserDetailsTab()}
          </div>
        </div>
      </div>
      {modalDShow && (
        <AddUserDelegationPopup
          show={modalDShow}
          handleClose={() => closePopup()}
        />
      )}
    </>
  );
};

export default UserDelegationsTab;
