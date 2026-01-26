export class postPermisionRoleMolde {
  workSpaceId: string;
  roleId: string;
  verb?:number|null;
  workSpaceKey: number;
  permissionId?: string[] 
  constructor(roleId: string,verb:number, workSpaceId: string, workSpaceKey: number,permissionId:string[]) {
    this.workSpaceId = workSpaceId;
    this.roleId = roleId;
    this.workSpaceKey = workSpaceKey;
    this.permissionId=permissionId
    this.verb=verb
   
  }
}
