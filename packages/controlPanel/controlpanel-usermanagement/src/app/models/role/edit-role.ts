export class edittRoleModel {
    nameAr: string;
    nameEn: string;
    details: string;
    roleCategoryId: string;
    id:string;
    constructor(
      nameAr: string,
      nameEn: string,
      details: string,
      roleCategoryId: string,
      id:string
    ) {
      this.roleCategoryId = roleCategoryId;
      this.details = details;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
    this.id=id
    }
  }
  