import { role } from "./role-model";

export class roleDetails extends role {
  countUser: number;
  // countPermision: number;
  countGroup: number;
  workSpace?:workSpace;
  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    details: string,
    code: string,
    count: number,
    countUser: number,
    // countPermision: number,
    countGroup: number,
    RoleCategoryNameEn: string,
    RoleCategoryNameAr: string,
    RoleCategoryId: string,
    workSpace?:workSpace
  ) {
    super(
      id,
      nameAr,
      nameEn,
      details,
      code,
      count,
      RoleCategoryNameEn,
      RoleCategoryNameAr,
      RoleCategoryId
    );

    this.countUser = countUser;
    //  this.countPermision = countPermision;
    this.countGroup = countGroup;
    this.workSpace=workSpace;
  }
}

export class workSpace {
  NoteNameEn?: string;
  NoteNameAr?: string;
  Id: string;
  constructor(Id: string,NoteNameEn?: string, NoteNameAr?: string) {
    this.Id = Id;
this.NoteNameAr=NoteNameAr;
this.NoteNameEn=NoteNameEn
  }
}
