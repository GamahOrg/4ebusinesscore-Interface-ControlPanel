import { FC } from "react";
interface Iprop {
  mark1: boolean;
  mark2: boolean;
  mark3: boolean;
  mark4: boolean;
}
const ViewallcardsCardDetailsTableGroupsSettings: FC<Iprop> = ({
  mark1,
  mark2,
  mark3,
  mark4,
}) => {
  return (
    <tr>
      <td className="text-center">
        <span className="text-primary">اسم المجموعة</span>
      </td>
      {mark1 ? (
        <>
          {" "}
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-check fa-fw fa-lg text-success"></i>
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-times fa-fw fa-lg text-danger"></i>
              </div>
            </div>
          </td>
        </>
      )}

      {mark2 ? (
        <>
          {" "}
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-check fa-fw fa-lg text-success"></i>
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-times fa-fw fa-lg text-danger"></i>
              </div>
            </div>
          </td>
        </>
      )}
      {mark3 ? (
        <>
          {" "}
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-check fa-fw fa-lg text-success"></i>
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-times fa-fw fa-lg text-danger"></i>
              </div>
            </div>
          </td>
        </>
      )}
      {mark4 ? (
        <>
          {" "}
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-check fa-fw fa-lg text-success"></i>
              </div>
            </div>
          </td>
        </>
      ) : (
        <>
          <td className="text-center">
            <div className="d-flex justify-content-center">
              <div className="mx-1 p-1">
                <i className="fas fa-times fa-fw fa-lg text-danger"></i>
              </div>
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export { ViewallcardsCardDetailsTableGroupsSettings };
