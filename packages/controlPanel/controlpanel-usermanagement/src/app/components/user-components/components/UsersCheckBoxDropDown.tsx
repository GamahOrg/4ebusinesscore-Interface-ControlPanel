import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  selectedRoleIds: any;
  setSelectedRoleIds: any;
  options: any;
  placeholder?: string;
  defaultValuesRoles?: any;
  defaultValuesRolesId?: any;
}

const UsersCheckBoxDropDown: FC<Props> = ({
  selectedOptions,
  setSelectedOptions,
  selectedRoleIds,
  setSelectedRoleIds,
  options,
  defaultValuesRoles,
  defaultValuesRolesId,
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

      setSelectedOptions(updatedOptions);
      setSelectedRoleIds(updatedRoleIds);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setSelectedRoleIds([...selectedRoleIds, optionId]);
    }
  };

  useEffect(() => {
    if (defaultValuesRoles && defaultValuesRolesId) {
      const rolesArray = Array.isArray(defaultValuesRoles)
        ? defaultValuesRoles
        : [defaultValuesRoles];

      const roleIdsArray = Array.isArray(defaultValuesRolesId)
        ? defaultValuesRolesId
        : [defaultValuesRolesId];

      setSelectedOptions(rolesArray);
      setSelectedRoleIds(roleIdsArray);
    }
  }, [
    defaultValuesRoles,
    defaultValuesRolesId,
    intl.locale,
    setSelectedOptions,
    setSelectedRoleIds,
  ]);
  return (
    <>
      <div className="position-relative" style={{ zIndex: 100 }}>
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          {Array.isArray(selectedOptions) && selectedOptions.length > 0
            ? selectedOptions.join(" - ")
            : defaultValuesRoles}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border card custom-scrollbar border-1px p-0 border-radius position-absolute w-100 "
            style={{ zIndex: 9999, maxHeight: "300px" }}
          >
            {options.map((option: { id: number; nameAr: string }) => (
              <li key={option.id}>
                <div
                  className="w-100 btn btn-light d-flex justify-content-between form-check"
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
