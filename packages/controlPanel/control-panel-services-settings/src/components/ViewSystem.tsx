import { FC, useEffect } from "react";
import { SystemContent } from "./SystemContent";
import { ViewSystemContent } from "./ViewSystemContent";
import { useDispatch, useSelector} from "react-redux";
import { fetchWorkSpace } from "../slices/SubsytemSettingsSlice";
import { useParams } from "react-router-dom";
import { RootState } from "../store/workspaceStore";

const ViewSystem: FC = () => {

  let workspace=useSelector((state:RootState)=>{return state?.SubsytemSettingsAggregator})
  const dispatch = useDispatch();
 let {id}=useParams();

  useEffect(()=>{
     dispatch(fetchWorkSpace(id) as any);
 },[id]);

  return (
    <>
      <div className="row gy-5">
        <div className="col-md-4">
          <SystemContent subSystemSetting={workspace.data} />
        </div>
        <div className="col-md-8">
          <ViewSystemContent subSystemSetting={workspace.data}/>
        </div>
      </div>
    </>
  );
};

export { ViewSystem };
