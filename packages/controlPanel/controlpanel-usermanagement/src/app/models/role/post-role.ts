export class postRole {
  nameAr: string;
  nameEn: string;
  details: string;
  roleCategoryId: string;
  constructor(
    id: string,
    nameAr: string,
    nameEn: string,
    details: string,
    roleCategoryId: string
  ) {
    this.roleCategoryId = roleCategoryId;
    this.details = details;
    this.nameAr = nameAr;
    this.nameEn = nameEn;
  }
}
