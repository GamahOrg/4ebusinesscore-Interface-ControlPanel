import { FC, Fragment, useEffect, useState } from "react";
import { Modal, Row } from "react-bootstrap";
import { useIntl } from "react-intl";
import {
  domainProps,
  domainSchema,
} from "../../../validation/add-domain-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { editDomain } from "../../../features/domains-slice/editDomainSlice";
import { fetchDomains } from "../../../features/domains-slice/domainsSlice";
import { RootState } from "../../../features/store";
import { fetchDomain } from "../../../features/domains-slice/domainSlice";
import { fetchDomainsLookup } from "../../../features/domains-slice/domainsSliceLookup";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";

type inputTypes = {
  id: number;
  type: string;
  name: string;
  isRequired: boolean;
  inputName: string;
};
type EditDomainPopupProps = {
  showEditDomain: boolean;
  handleClose: () => void;
  id: number | string | Number;
};

export const EditDomain: FC<EditDomainPopupProps> = ({
  showEditDomain,
  handleClose,
  id,
}) => {
  const intl = useIntl();

  let dispatch = useDispatch();
  const [inputs, setInputs] = useState<inputTypes[]>([
    {
      id: 1,
      type: "text",
      name: intl.formatMessage({
        id: "DomainName",
      }),
      inputName: "domainName",
      isRequired: true,
    },
    {
      id: 2,
      type: "text",
      name: intl.formatMessage({
        id: "ShorterName",
      }),
      isRequired: false,
      inputName: "domainNickName",
    },
    {
      id: 3,
      type: "text",
      name: intl.formatMessage({
        id: "Username",
      }),
      isRequired: true,
      inputName: "userName",
    },
    {
      id: 4,
      type: "text",
      name: intl.formatMessage({
        id: "Password",
      }),
      isRequired: true,
      inputName: "password",
    },
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<domainProps>({
    resolver: yupResolver(domainSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  const EditDomain = async (formValues: domainProps) => {
    let body = {
      id,
      domainName: formValues.domainName,
      domainNickName: formValues.domainNickName,
      userName: formValues.userName,
      password: formValues.password,
      url: "a",
      value: "a",
      actionName: 0,
      body: "a",
      key: "a",
      isActive: domain.isActive,
    };
    dispatch(editDomain(body as any) as any);
  };
  let { message } = useSelector((state: RootState) => {
    return state?.editDomain;
  });
  let domain = useSelector((state: RootState) => {
    return state?.domain?.data;
  });
  useEffect(() => {
    dispatch(fetchDomain(id) as any);
  }, [id]);

  useEffect(() => {
    setValue("userName", domain?.userName);
    setValue("password", domain?.password as string);
    setValue("domainName", domain?.domainName);
    setValue("domainNickName", domain?.domainNickName);
  }, [domain]);

  useEffect(() => {
    let params: any = {
      pageSize: "10",
      pageNumber: "1",
    };
    if (message == "domainUpdatedSuccessfully") {
      showSuccessAlert(true, "ModifiedSuccessfully", intl);
      dispatch(fetchDomains(params) as any);
      dispatch(fetchDomainsLookup("") as any);
      dispatch({ type: "editDomain/domain/pending" });
      reset();
      handleClose();
    }
  }, [message]);

  return (
    <>
      <Modal centered show={showEditDomain} onHide={handleClose} size="xl">
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card">
            <div className="card-body mx-5">
              <div className="card-header px-1 pb-2 mb-5 flex-column">
                <h2 className="flex-column align-items-center align-self-center mb-5">
                  <span className="fw-bolder mb-2">
                    {intl.formatMessage({
                      id: "EditDomain",
                    })}
                  </span>
                </h2>
                <div className="my-3">
                  <h2 className="flex-column align-items-center">
                    <span className="fw-bolder mb-2">
                      {intl.formatMessage({
                        id: "DomainInformation",
                      })}
                    </span>
                  </h2>
                  <span className="text-muted fw-lighter">
                    {intl.formatMessage({
                      id: "PleaseEnterTheData",
                    })}
                  </span>
                </div>
              </div>
              <form onSubmit={handleSubmit(EditDomain)}>
                <div className="row">
                  {inputs.map((input) => (
                    <Fragment key={input.id}>
                      <div className="col-6">
                        <div className="mb-2 pt-2 pb-3">
                          <label
                            className={`form-label px-2  fs-6 text-gray-700 ${
                              input.isRequired ? "required" : ""
                            }`}
                          >
                            {input.name}
                          </label>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i
                                  className={`${
                                    input.id === 1
                                      ? "special fas fa-vector-square"
                                      : input.id === 2
                                        ? "special fas fa-clone"
                                        : input.id === 3
                                          ? "bi bi-person-circle special"
                                          : "fas fa-key special"
                                  }`}
                                ></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control"
                              placeholder={input.name}
                              {...register(`${input.inputName}` as any)}
                            />
                          </div>
                        </div>
                        {DisplayErrorMessage(
                          errors?.[input?.inputName as keyof domainProps]
                            ?.message,
                          intl,
                          intl.locale
                        )}
                      </div>
                    </Fragment>
                  ))}
                </div>
                <Row>
                  <div className="d-flex justify-content-center mt-5">
                    <button
                      type="reset"
                      aria-hidden="true"
                      className="btn btn-secondary px-15 me-5"
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-15 ms-5"
                    >
                      {intl.formatMessage({ id: "Save" })}
                    </button>
                  </div>
                </Row>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
