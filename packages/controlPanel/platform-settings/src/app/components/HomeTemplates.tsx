import { FC } from "react";
import {  ThemMode } from "../enums/enums-platform-settings";
import { IntlShape } from "react-intl";

interface HomeTemplatesTabProps {
  intl: IntlShape;
  setIsTemplateSelected:any;
  isTemplateSelected:any;
}

const HomeTemplatesTab: FC<HomeTemplatesTabProps> = ({
  intl,
  setIsTemplateSelected,
  isTemplateSelected
}) => {

  const handleSelectChange = (e: any) => {
    const selectedOption = e.target.value;
    setIsTemplateSelected(selectedOption);
  };
  return (
    <>
      <div className="w-100">
        <div className="row mt-10 pb-5">
          <div className="col-6">
            <label htmlFor="selectedTemplate" className="fw-semibold fs-6">
              {intl.formatMessage({
                id: "HomeTemplates",
              })}
            </label>
            <div className="d-flex">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fad fa-eye fs-3"></i>
                  </span>
                </div>
                <select
                  className="form-select form-select-solid px-4 py-0 m-0"
                  id="selectedTemplate"
                  value={isTemplateSelected}
                  onChange={handleSelectChange}
                  defaultValue={ThemMode.Development.toString()}
                >
                  <option value={ThemMode.Standard.toString()}>
                    {intl.formatMessage({ id: "Standard" })}
                  </option>
                  <option value={ThemMode.Development.toString()}>
                    {intl.formatMessage({ id: "Development1" })}
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeTemplatesTab;
