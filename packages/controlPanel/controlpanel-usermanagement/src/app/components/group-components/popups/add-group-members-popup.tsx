import { FC, useState } from "react";
import { useIntl } from "react-intl";

const AddGroupMembersPopup: FC = () => {
  const intl = useIntl();
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "احمد محمد عبدالله خالد",
      title: "الاداره المالية",
      avatar: "blank.png",
      isChecked: true,
      isDisabled: true,
    },
    {
      id: 2,
      name: "احمد محمد عبدالله خالد",
      title: "الاداره المالية",
      avatar: "blank.png",
      isChecked: false,
      isDisabled: false,
    },
    {
      id: 3,
      name: "احمد محمد عبدالله خالد",
      title: "الاداره المالية",
      avatar: "blank.png",
      isChecked: true,
      isDisabled: false,
    },
    {
      id: 4,
      name: "احمد محمد عبدالله خالد",
      title: "الاداره المالية",
      avatar: "blank.png",
      isChecked: false,
      isDisabled: false,
    },
    {
      id: 5,
      name: "احمد محمد عبدالله خالد",
      title: "الاداره المالية",
      avatar: "blank.png",
      isChecked: true,
      isDisabled: false,
    },
  ]);

  const handleChange = () => {
    setUsers([...users]);
  };

  return (
    <div
      className="modal fade creatForm"
      id="Rega_modal_add_members_to_group"
      tabIndex={-1}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content rounded">
          <div className="modal-header pb-0 border-0 justify-content-end">
            <div
              className="btn btn-sm btn-icon btn-active-color-primary"
              data-bs-dismiss="modal"
            >
              <span className="svg-icon svg-icon-1"></span>
            </div>
          </div>
          <div className="modal-body scroll-y mx-5 mx-xl-18 pt-0 pb-15 mb-7">
            <div className="text-center fw-bolder  pb-13 border-bottom border-gray-300">
              <h1 className="mb-3">
                {intl.formatMessage({ id: "AddPeople" })}
              </h1>
            </div>

            <div className="mb-15 mt-15">
              <div>
                <div className="position-relative w-md-600px mt-5 mx-auto">
                  <input
                    type="text"
                    className="form-control form-control-solid ps-10"
                    name="search"
                    defaultValue=""
                    placeholder={intl.formatMessage({
                      id: "TypeYourSearchHere",
                    })}
                  />
                </div>
                <div className="my-8 text-center">
                  <div className="symbol position-relative  symbol-circle symbol-35px">
                    {[1, 2, 3, 4, 5].map((item) => (
                      <span
                        className="position-relative symbol position-relative  symbol-circle symbol-35px"
                        key={item}
                      >
                        <img key={item} alt="Pic" className="mx-4" src={""} />
                        <span
                          className="position-absolute bg-danger rounded-pill w-15px h-15px d-flex justify-content-center align-items-center"
                          style={{
                            right: "8px",
                            bottom: "-5px",
                          }}
                        >
                          <i className="bi bi-x text-light fa-md"></i>
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-top border-1 h-200px overflow-auto px-8">
                {users.map((user) => (
                  <div
                    className="d-flex justify-content-between my-8"
                    key={user?.id}
                  >
                    <div className="d-flex align-items-center">
                      <div className="symbol position-relative  symbol-circle symbol-35px">
                        <img alt="Pic" className="mx-4" src="" />
                      </div>

                      <div>
                        <p className="mb-0">{user.name}</p>
                        <p className="mb-0 text-muted fw-lighter">
                          {user.title}
                        </p>
                      </div>
                    </div>
                    <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                      <input
                        className="form-check-input widget-9-check xCheckBg"
                        type="checkbox"
                        defaultValue={0}
                        name="getMyToolsList"
                        checked={user.isChecked}
                        disabled={user.isDisabled}
                        onChange={() => {
                          user.isChecked = !user.isChecked;
                          handleChange();
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-center ">
              <button
                className="btn btn-secondary px-15 me-5"
                data-bs-dismiss="modal"
              >
                {intl.formatMessage({ id: "Cancel" })}
              </button>
              <button
                className="btn btn-success px-15 ms-5"
                data-bs-dismiss="modal"
              >
                {intl.formatMessage({ id: "Agree" })}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddGroupMembersPopup };
