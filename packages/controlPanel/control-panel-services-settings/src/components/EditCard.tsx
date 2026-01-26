import { FC, useEffect, useState } from "react";
import { ViewAllcardsCardContent } from "./CardContent";
import { ViewAllcardsEditCardContent } from "./EditCardContent";
import { useDispatch, useSelector } from "react-redux";
import { fetchWorkSpace } from "../slices/SubsytemSettingsSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../store/workspaceStore";

const ViewAllcardsEditCard: FC = () => {
  let workspace = useSelector((state: RootState) => {
    return state?.SubsytemSettingsAggregator;
  });
  const dispatch = useDispatch();
  let { id } = useParams();

  useEffect(() => {
    dispatch(fetchWorkSpace(id) as any);
  }, [id]);
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
            subSystemSetting={workspace.data}
          />
        </div>
        <div className="col-md-8">
          <ViewAllcardsEditCardContent
            setOrg={setOrgName}
            setIcon={setIcon}
            setColor={setColor}
            setSystemName={setSystemName}
            setSystemDescription={setSystemDescription}
            subSystemSetting={workspace.data}
          />
        </div>
      </div>
    </>
  );
};

export { ViewAllcardsEditCard };
