
export class LookUpModel {
    id:string;
    nameAr:string;
    nameEn:string;
    cssClasses:string;
    color:string;
    orgCount:number;
     constructor(
      id:string="",
      nameAr:string="",
      nameEn:string="",
      cssClasses:string="",
      color:string="",
      orgCount:number=0,
    ) {
      this.id=id;
      this.nameAr=nameAr;
      this.nameEn = nameEn;
      this.cssClasses=cssClasses;
      this.color=color;
      this.orgCount=orgCount;
    }
  }

  
  