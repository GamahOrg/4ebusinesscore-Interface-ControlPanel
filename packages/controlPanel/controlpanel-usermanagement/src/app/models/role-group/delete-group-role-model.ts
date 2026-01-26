export class DeleteGroupRoleModel {
  id: string;
  GroupId : string;
  constructor(id: string, GroupId : string) {
    this.id = id;
    this.GroupId  = GroupId ;
  }
}