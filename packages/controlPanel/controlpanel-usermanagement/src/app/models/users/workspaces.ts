import { State } from "../response-status";
import { Color } from "../role-workspace-permision/WorkspaceTreeModel";

export class WorkspacesArray {
  data: WorkspaceModel[];
  totalPages: number;
  totalItems: number;

  constructor(data: WorkspaceModel[], totalPages: number, totalItems: number) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class WorkspaceModel {
  id: string;
  noteNameAr: string;
  noteNameEn: string;
  description: string;
  icon: string;
  color: Color;
  state: State;
  isActive: boolean;
  noteTypeId: string;
  organizationHierarchyId: string;
  orgNameAr: string;
  orgNameEn: string;
 
  constructor(
    id: string,
  noteNameAr: string,
  noteNameEn: string,
  description: string,
  icon: string,
  color: Color,
  state: State,
  isActive: boolean,
  noteTypeId: string,
  organizationHierarchyId: string,
  orgNameAr: string,
  orgNameEn: string
  ) {
    this.orgNameEn = orgNameEn;
    this.orgNameAr = orgNameAr;
    this.id = id;
    this.organizationHierarchyId = organizationHierarchyId;
    this.noteTypeId = noteTypeId;
    this.isActive = isActive;
    this.state = state;
    this.color = color;
    this.icon = icon;
    this.description = description;
    this.noteNameEn = noteNameEn;
    this.noteNameAr = noteNameAr;
  }
}
