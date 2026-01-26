import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { OrgCategoryModel } from "../../models/org-category";

interface Props {
  selectedOptions: OrgCategoryModel[];
  setSelectedOptions: any;
  options: any;
}

const CheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  options,
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);
  const [checkall, setCheckall] = useState(false);

  // Update search params when selectedOptions change

  const handleIsCheck = (option: any) => {
    const isSelected = selectedOptions.some(
      (selected: any) => selected.id === option.id
    );

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selected: any) => selected.id !== option.id)
      );
      setCheckall(false);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
    if (selectedOptions.length === options.length - 1) {
      setCheckall(true);
    }
  };
  const checkAll = () => {
    if (!checkall) {
      setSelectedOptions(options);
    } else {
      setSelectedOptions([]);
    }
    setCheckall((prev) => !prev);
  };

  return (
    <>
      <div className="position-relative">
        <button
          className={`btn btn-light w-200px d-flex justify-content-start flex-wrap btn-dropdwon ${
            intl.locale == "en" ? "" : "rtl"
          }`}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions?.length > 0
            ? selectedOptions.map((item) => item.nameAr).join(" - ")
            : intl.formatMessage({ id: "All" })}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border bg-light border-1px p-0 border-radius position-absolute w-200px bg-white mh-300px scroll-y"
            style={{ zIndex: 9999 }}
          >
            <li>
              <button
                className="w-200px btn btn-white d-flex justify-content-between form-check bg-transparent"
                onClick={() => checkAll()}
              >
                <label className="form-check-label" htmlFor="Checkme1">
                  {intl.formatMessage({
                    id: "All",
                  })}
                </label>
                <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                  <input
                    className="form-check-input widget-9-check xCheckBg"
                    checked={checkall}
                    type="checkbox"
                    value="all"
                  />
                </div>
              </button>
            </li>
            {options?.map((option: any) => (
              <li  key={option?.id}>
                <button
                  className="w-200px btn btn-white d-flex justify-content-between form-check bg-transparent"
                  onClick={() => handleIsCheck(option)}
                >
                  <label className="form-check-label" htmlFor="Checkme1">
                    {intl.locale === "ar" ?option?.nameAr : option?.nameEn}
                  </label>
                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      checked={selectedOptions.some(
                        (selected: any) => selected.id === option.id
                      )}
                      type="checkbox"
                      value={option?.id}
                      id={`Checkme${option.id}`}
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen ? (
        <div
          className={"position-fixed vw-100 vh-100 top-0 left-0"}
          style={{ zIndex: 10 }}
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      ) : (
        ""
      )}
    </>
  );
};

export default CheckBoxDropDown;
