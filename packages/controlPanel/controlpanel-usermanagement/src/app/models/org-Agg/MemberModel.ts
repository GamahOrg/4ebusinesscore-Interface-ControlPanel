export class MemberModel {
    memberId: number;
    orgId: number;
    memberName: string;
    orgName: string;
    imageUrl: string;
    isChecked: boolean;
    jobNameAr:string;
    jobNameEn:string;
    jobId:string
    constructor(memberId: number, orgId: number, memberName: string, orgName: string, imageUrl: string, isChecked: boolean,jobNameAr:string, jobNameEn:string,
      jobId:string) {
      {
        this.memberId = memberId;
        this.orgId = orgId;
        this.memberName = memberName;
        this.orgName = orgName;
        this.imageUrl = imageUrl;
        this.isChecked = isChecked;
        this.jobNameAr=jobNameAr;
        this.jobNameEn=jobNameEn;
        this.jobId=jobId;
      }
    }
  }