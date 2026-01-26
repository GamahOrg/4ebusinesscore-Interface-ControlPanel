import { FC, useState } from "react";
import { SystemContent } from "./SystemContent";
import { AddSystemContent } from "./AddSystemContent";
import { GetWorkSpaceByIdResponse } from "../Shared/models/VM/GetWorkSpaceByIdResponse";

const AddSystem: FC = () => {
  let [systemName, setSystemName] = useState<string>("");
  let [systemDescription, setSystemDescription] = useState<string>("");
  let [color, setColor] = useState<any>(0);
  let [icon, setIcon] = useState<string>("");
  let [orgName, setOrgName] = useState<string>("");
  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <SystemContent
            orgName={orgName}
            icon={icon}
            systemDescription={systemDescription}
            color={color}
            systemName={systemName}
            subSystemSetting={new GetWorkSpaceByIdResponse()}
          />
        </div>
        <div className="col-md-8">
          <AddSystemContent
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

export { AddSystem };
