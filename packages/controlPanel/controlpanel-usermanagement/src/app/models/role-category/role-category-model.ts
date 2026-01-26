export class RoleCategoryModelArray{

    data: roleCategory[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: roleCategory[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
}
export class roleCategory{

    id: string;
    nameAr:string;
    nameEn:string;
    cssClasses:string;
    constructor(
        id: string,
        nameAr:string,
        nameEn:string,
        cssClasses:string
    ) {
      this.id = id;
      this.cssClasses=cssClasses;
      this.nameAr=nameAr;
      this.nameEn=nameEn;
    }
}