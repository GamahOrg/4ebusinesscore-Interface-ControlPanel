export class ALLusersModel {
  userId: string;
  isChecked: boolean;
  orgId?: string;
  imgUrl?: string | null;
  userName?: string | null;
  orgNameAr?: string | null;
  orgNameEn?: string | null;
  forthName?: string | null;
  thirdName?: string | null;
  fisrtName?: string | null;
  secondName?: string | null;
  imageUrl?: string | null;
  email?: string | null;
  userGender?:number|null;
 
  constructor(userId: string , data?: Partial<ALLusersModel>) {
    if (data) {
      Object.assign(this, data);
    }
    this.userId = userId;
    this.isChecked = false  ;
 
  }
 

   
  
}
