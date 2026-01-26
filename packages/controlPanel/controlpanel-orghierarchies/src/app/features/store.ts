// rootReducer.js
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import orgSlice from "./orghierarchies-slice/orgSlice";
import orgManagerSlice from "./orghierarchies-slice/org-manager-slice";
import orgCategorySlice from "./orghierarchies-slice/org-categorySlice";
import addOrgSlice from "./orghierarchies-slice/add-orgSlice";
import editOrgSlice from "./orghierarchies-slice/edit-orgSlice";
import orgMembersSlice from "./orghierarchies-slice/org-membersSlice";
import addOrgMangerSlice from "./orghierarchies-slice/post-org-managerSlice";
import PostOrgMembersSlice from "./orghierarchies-slice/org-membersSlice";
import allOrgMangersSlice from "./orghierarchies-slice/all-org-managers";
import orgPathSlice from "./orghierarchies-slice/orgpath-slice";
import usersSlice from "./orghierarchies-slice/users-slice";
import lookUpSlice from "./orghierarchies-slice/look-upSlice";
import { storeRegistry } from "@4eplatform/shared/store/storeRegistry";

const store = storeRegistry.createStore({
  orghierarchies: orgSlice,
  orgManager: orgManagerSlice,
  orgCategories: orgCategorySlice,
  addOrg: addOrgSlice,
  editOrg: editOrgSlice,
  orgMembers: orgMembersSlice,
  addOrgManager: addOrgMangerSlice,
  addOrgMembers: PostOrgMembersSlice,
  allOrgManagers: allOrgMangersSlice,
  fetchOrgPath: orgPathSlice,
  users: usersSlice,
  lookUp: lookUpSlice,
});

export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
