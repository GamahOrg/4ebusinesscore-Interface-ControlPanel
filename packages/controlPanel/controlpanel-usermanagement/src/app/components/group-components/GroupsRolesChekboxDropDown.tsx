import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { RoleModelArray } from "../../models/role/role-model";

interface Props {
  selectedOptions: any;
  setSelectedOptions: any;
  selectedRoleIds: any;
  setSelectedRoleIds: any;
  options: RoleModelArray | undefined;
  placeholder?: string;
  defaultValuesRoles?: any;
  defaultValuesRolesId?: string;
}

const GroupsRolesChekboxDropDown: FC<Props> = ({
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

  const handleIsCheck = (option: {
    id: string;
    nameAr: string;
    nameEn: string;
  }) => {
    const optionName =
      intl?.locale.toLowerCase() === "ar" ? option.nameAr : option.nameEn;
    const optionId = option.id;
    if (selectedOptions.includes(optionName)) {
      const updatedOptions = selectedOptions.filter(
        (value: string) => value !== optionName
      );
      const updatedRoleIds = selectedRoleIds.filter(
        (id: string) => id !== optionId
      );

      setSelectedOptions([...updatedOptions]);
      setSelectedRoleIds([...updatedRoleIds]);
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
      setSelectedRoleIds([...selectedRoleIds, optionId]);
    }
  };

  useEffect(() => {
    if (defaultValuesRoles) {
      setSelectedOptions([defaultValuesRoles]);
      setSelectedRoleIds([defaultValuesRolesId]);
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
      <div className="position-relative">
        <button
          className="btn btn-light w-100 d-flex justify-content-start flex-wrap btn-dropdwon"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          defaultValue={defaultValuesRoles}
        >
          {Array.isArray(selectedOptions) && selectedOptions.length > 0
            ? selectedOptions.join(" - ")
            : defaultValuesRoles}
        </button>
        {isOpen && (
          <ul
            className="list-unstyled border border-1px p-0 border-radius position-absolute w-100 bg-white"
            style={{ zIndex: 9999 }}
          >
            {options?.data?.map((option, index) => (
              <li key={index + option.id}>
                <div
                  className="w-100 btn btn-white d-flex justify-content-between form-check"
                  onClick={() =>
                    handleIsCheck({
                      id: option.id,
                      nameAr: option.nameAr,
                      nameEn: option.nameEn,
                    })
                  }
                >
                  <label
                    className="form-check-label"
                    htmlFor={`Checkme${option.id}`}
                  >
                    {intl?.locale.toLowerCase() === "ar"
                      ? option.nameAr
                      : option.nameEn}
                  </label>
                  <div className="form-check form-check-success form-check-sm form-check-custom form-check-solid form-check-md">
                    <input
                      className="form-check-input widget-9-check xCheckBg"
                      checked={selectedOptions.includes(
                        intl?.locale.toLowerCase() === "ar"
                          ? option.nameAr
                          : option.nameEn
                      )}
                      onChange={() => handleIsCheck(option)}
                      type="checkbox"
                      value={
                        intl?.locale.toLowerCase() === "ar"
                          ? option.nameAr
                          : option.nameEn
                      }
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

export default GroupsRolesChekboxDropDown;
