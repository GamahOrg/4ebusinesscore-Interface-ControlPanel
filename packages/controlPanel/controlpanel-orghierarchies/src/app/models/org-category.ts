export class OrgCategoryModel {
  id: string;
  nameAr: string;
  nameEn: string;
  cssClasses: string;
  constructor(id: string, nameAr: string, cssClasses: string, nameEn: string) {
    {
      this.id = id;
      this.nameAr = nameAr;
      this.nameEn = nameEn;
      this.cssClasses = cssClasses;
    }
  }
}
