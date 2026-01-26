import { UserGender } from "./response-status";

export class MemberModel {
  memberId: string;
  orgId: string;
  memberName: string;
  userName: string;
  orgName: string;
  imageUrl: string;
  isChecked: boolean;
  jobNameAr:string;
  jobNameEn:string;
  jobId:string;
  userGender:UserGender;
  imgUrl?:string

  constructor(memberId: string, orgId: string,userName:string, memberName: string, orgName: string, imageUrl: string, isChecked: boolean,jobNameAr:string, jobNameEn:string,
    jobId:string,gender:UserGender,imgUrl?:string) {
    {
      this.memberId = memberId;
      this.orgId = orgId;
      this.memberName = memberName;
      this.userName = userName;
      this.orgName = orgName;
      this.imageUrl = imageUrl;
      this.isChecked = isChecked;
      this.jobNameAr=jobNameAr;
      this.jobNameEn=jobNameEn;
      this.jobId=jobId;
      this.userGender = gender;
      this.imgUrl=imgUrl
    }
  }
}
