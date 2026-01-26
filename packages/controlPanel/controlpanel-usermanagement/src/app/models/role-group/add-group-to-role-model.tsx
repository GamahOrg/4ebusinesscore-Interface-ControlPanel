export class AddGroupsToRoleModel {
  groupsIds: string[];
  roleId: string;
  constructor(groupsIds: string[], roleId: string) {
    this.groupsIds = groupsIds;
    this.roleId = roleId;
  }
}
