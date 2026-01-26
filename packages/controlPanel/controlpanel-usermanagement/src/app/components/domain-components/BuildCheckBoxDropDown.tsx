import { FC, useState } from "react";
import CheckBoxDropDown from "./CheckBoxDropDown";


export const BuildCheckBoxDropDown :FC<any> = ({ item, className = "col-6" }) => {
   const [selectedOption, setSelectedOption] = useState<any>([]);

   return (
      <div className={className}>
         <div className="mb-2 pt-2 pb-3 ">
            <label className="form-label px-2  fs-6 text-gray-700">
               {item?.name}
            </label>

            <div className="mx-auto mt-1  ">
               <CheckBoxDropDown
                  selectedOptions={selectedOption}
                  setSelectedOptions={setSelectedOption}
                  options={item?.options}
               />
            </div>
         </div>
      </div>
   );
};
