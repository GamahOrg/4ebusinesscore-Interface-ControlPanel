import { FC, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  selectedRoleIds: any;
  setSelectedRoleIds: any;
  options: any;
  placeholder?: string;
}

const UsersCheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  selectedRoleIds,
  setSelectedRoleIds,
  options,
  placeholder = "Choose",
}) => {
  const intl = useIntl();
  const [isOpen, setIsOpen] = useState(false);

  const handleIsCheck = (option: { id: number; nameAr: string }) => {
    const optionName = option.nameAr;
    const optionId = option.id;

    if (selectedOptions.includes(optionName)) {
      const updatedOptions = selectedOptions.filter(
        (value: string) => value !== optionName
      );
      const updatedRoleIds = selectedRoleIds.filter(
        (id: number) => id !== optionId
      );

      setSelectedOptions([...updatedOptions]);
      setSelectedRoleIds([...updatedRoleIds]);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setSelectedRoleIds([...selectedRoleIds, optionId]);
    }
  };

  return (
    <>
      <div className="position-relative" style={{ zIndex: 100 }}>
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOptions.length > 0
            ? selectedOptions.join(" - ")
            : intl.formatMessage({ id: placeholder })}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border border-1px p-0 border-radius position-absolute w-100 bg-white"
            style={{ zIndex: 9999 }}
          >
            {options.map((option: { id: number; nameAr: string }) => (
              <li key={option.id}>
                <div
                  className="w-100 btn btn-white d-flex justify-content-between form-check"
                  onClick={() => handleIsCheck(option)}
                >
                  <label
                    className="form-check-label"
                    htmlFor={`Checkme${option.id}`}
                  >
                    {option.nameAr}
                  </label>
                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      checked={selectedOptions.includes(option.nameAr)}
                      onChange={() => handleIsCheck(option)}
                      type="checkbox"
                      value={option.nameAr}
                      id={`Checkme${option.id}`}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      {isOpen && (
        <div
          className={"position-absolute w-100 h-100 top-0 left-0 "}
          style={{ zIndex: 10 }}
          onClick={() => {
            setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
};

export default UsersCheckBoxDropDown;
