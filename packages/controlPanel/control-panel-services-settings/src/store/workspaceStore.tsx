import { configureStore } from "@reduxjs/toolkit";
import SubsystemReducer from "../slices/workspaceSlice";
import addWorkSpaceSlice from "../slices/addWorkspaceSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import subsytemSettingsSlice from "../slices/SubsytemSettingsSlice";
import orgHierarchySlice from "../slices/orgHierarchySlice";
import SubsystemDropdownListSlice from "../slices/getAllSubsystemSlice";
import NoteTypeIdSlice from "../slices/getLookUpsSlice";
import WorkSpaceComponentReducer from "../slices/workspaceAggregatorSlice";
import removesubsystemReducer from "../slices/removeSubsystemSlice";
import putWorkspaceActivationReducer from "../slices/putWorkspaceActivation";
import addWorkSpaceCardSlice from "../slices/addCardsystemsSlice";
import getAllMyComponentsSlice from "../slices/getAllMyComponentsSlice";
import getAllHiddenWorkspacesSlice from "../slices/getAllHiddenWorkspacesSlice";
import favouritesListSlice from "../slices/favouritesListSlice";
import postHiddenWorkspacesSlice from "../slices/postHiddenWorkspacesSlice";
import deleteHiddenWorkspacesSlice from "../slices/deleteHiddenWorkspacesSlice";
import userProfileViewSlice from "../slices/user-profile-view-slice";
import AllTypesWithParentSlice from "../slices/getAllTypesWithParent";
import SubsystemSettingsMainClassification from "../slices/getAllSubsytemSettingsMainClassification";
import SubsystemSettingsClassification from "../slices/subsytemSettingsMainClassification";
import GetSubsytemSettingsMainClassificationAgg from "../slices/subsytemSettingsMainClassificationSlice";
import getAllSubsystemMainLookUpSlice from "@4eplatform/control-panel-services-settings/src/slices/getAllSubsytemMainLookUpSlice";
import systemSettingsPartsSlice from "../slices/systemSettingsPartsSlice";
import getAllSubsytemSettingsbyMainClassificationid from "../slices/subsytemSettingsMainClassification";
import ssoSecuritySettingSlice from '@4eplatform/control-panel-services-settings/src/slices/ssoSecuritySettingSlice';
import EditClassificationSlice from './../slices/editClassificationSlice';

export const store = configureStore({
  reducer: {
    subsystem: SubsystemReducer,
    addWorkspace: addWorkSpaceSlice,
    SubsytemSettingsAggregator: subsytemSettingsSlice,
    workspaceComponent: WorkSpaceComponentReducer,
    removesubsystem: removesubsystemReducer,
    orgHierarchy: orgHierarchySlice,
    subsystemDropdownList: SubsystemDropdownListSlice,
    NoteTypeId: NoteTypeIdSlice,
    putWorkspaceActivation: putWorkspaceActivationReducer,
    addWorkspaceCard: addWorkSpaceCardSlice,
    myComponents: getAllMyComponentsSlice,
    hiddenWorkspaces: getAllHiddenWorkspacesSlice,
    getFavouriteList: favouritesListSlice,
    postHiddenWorkspaces: postHiddenWorkspacesSlice,
    deleteHiddenWorkspaces: deleteHiddenWorkspacesSlice,
    userView: userProfileViewSlice,
    AllTypesWithParents: AllTypesWithParentSlice,
    subSystemSettingsMainClassification: SubsystemSettingsMainClassification,
    subsystemSettingsClassification: SubsystemSettingsClassification,
    subsytemSettingsMainClassificationAggSlice:
      GetSubsytemSettingsMainClassificationAgg,
    allSubSystemMainLookUp: getAllSubsystemMainLookUpSlice,
    ssoSecuritySetting: ssoSecuritySettingSlice,
    systemSettingsParts: systemSettingsPartsSlice,
    editClassification: EditClassificationSlice,
    allSubsytemByClassificationId: getAllSubsytemSettingsbyMainClassificationid,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
