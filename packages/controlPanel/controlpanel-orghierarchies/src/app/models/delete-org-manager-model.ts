export class DeleteOrgManager {
  orgId: string;
  membersId: string;
  constructor(orgId: string = "", membersId: string = "") {
    this.orgId = orgId;
    this.membersId = membersId;
  }
}
