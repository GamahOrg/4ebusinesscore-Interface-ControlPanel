export class SubCategoryModel {
  id: string;
  noteNameAr: string;
  noteNameEn: string;
  icon: string;

  constructor(
    id: string = "",
    noteNameAr: string = "",
    noteNameEn: string = "",
    icon: string = ""
  ) {
    this.id = id;
    this.noteNameAr = noteNameAr;
    this.noteNameEn = noteNameEn;
    this.icon = icon;
  }
}
