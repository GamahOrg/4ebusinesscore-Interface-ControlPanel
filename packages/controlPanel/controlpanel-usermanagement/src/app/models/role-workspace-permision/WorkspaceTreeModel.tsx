export class WorkspaceTreeArrayModel {
  data: WorkspaceTreeModel[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: WorkspaceTreeModel[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}

export class WorkspaceTreeModel {
  id: string;
  noteNameAr: string | null;
  noteNameEn: string | null;
  description: string | null;
  url: string | null;
  icon: string | null;
  color: Color | null;
  state: State | null;
  isActive: boolean | null;
  noteTypeId: string | null;
  subsystemType: number | null;
  // organizationHierarchyId: string | null;
  parentId: string | null;
  // orgNameAr: string | null;
  // orgNameEn: string | null;
  lkNoteTypes: LK_NoteTypesDto | null;
  isRoleChecked: boolean;
  workSpaceKey: number;
  workspaceTreeDtos: WorkspaceTreeModel[];
  verb?:number;

  constructor(
    id: string,
    isRoleChecked: boolean,
    workSpaceKey: number,
    workspaceTreeDtos: WorkspaceTreeModel[],
    noteNameAr: string | null,
    noteNameEn: string | null,
    description: string | null,
    url: string | null,
    icon: string | null,
    color: Color | null,
    state: State | null,
    isActive: boolean | null,
    noteTypeId: string | null,
    subsystemType: number | null,
    // organizationHierarchyId: string | null,
    parentId: string | null,
    // orgNameAr: string | null,
    // orgNameEn: string | null,
    lkNoteTypes: LK_NoteTypesDto | null,
    verb:number=2
  ) {
    this.id = id;
    this.isRoleChecked = isRoleChecked;
    this.workSpaceKey = workSpaceKey;
    this.workspaceTreeDtos = workspaceTreeDtos;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.description = description;
    this.url = url;
    this.icon = icon;
    this.color = color;
    this.state = state;
    this.isActive = isActive;
    this.noteTypeId = noteTypeId;
    this.subsystemType = subsystemType;
    // this.organizationHierarchyId = organizationHierarchyId;
    this.parentId = parentId;
    // this.orgNameAr = orgNameAr;
    // this.orgNameEn = orgNameEn;
    this.lkNoteTypes = lkNoteTypes;
    this.verb = verb;
  }
}

export class LK_NoteTypesDto {
 
  id: string;
  nameAr: string;
  nameEn: string;
  constructor(id: string, nameAr: string, nameEn: string) {

    this.id=id;
    this.nameAr=nameAr;
    this.nameEn=nameEn
  }
}

// Define Color and State enums if not provided
export enum Color {
  Red,
  Green,
  Yellow,
}

enum State {
  NotDeleted,
  Deleted,
}
