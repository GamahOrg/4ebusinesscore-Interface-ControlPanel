export interface PostOrgModel {
    nameAr:string,
    nameEn:string,
    description:string,
    categoryId:string,
    parentId:string
  }

  export interface PutOrgModel {
    id:string
    nameAr:string,
    nameEn:string,
    description:string,
    categoryId:string,
    parentId:string |null
  }

  export interface DeleteOrgModel
  {
    id :string,
    removeReason?:string |undefined
  }