import { FC, useState } from "react";
import { ViewAllcardsCardContent } from "./CardContent";
import { ViewAllcardsAddCardContent } from "./AddCardContent";
import { GetWorkSpaceByIdResponse } from "../Shared/models/VM/GetWorkSpaceByIdResponse";

const ViewAllcardsAddCard: FC = () => {
  let [systemName, setSystemName] = useState<string>("");
  let [systemDescription, setSystemDescription] = useState<string>("");
  let [color, setColor] = useState<any>(0);
  let [icon, setIcon] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");
  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <ViewAllcardsCardContent
            orgName={orgName}
            icon={icon}
            systemDescription={systemDescription}
            color={color}
            systemName={systemName}
            subSystemSetting={new GetWorkSpaceByIdResponse()}
          />
        </div>
        <div className="col-md-8">
          <ViewAllcardsAddCardContent
            setOrg={setOrgName}
            setIcon={setIcon}
            setColor={setColor}
            setSystemName={setSystemName}
            setSystemDescription={setSystemDescription}
          />
        </div>
      </div>
    </>
  );
};

export { ViewAllcardsAddCard };
