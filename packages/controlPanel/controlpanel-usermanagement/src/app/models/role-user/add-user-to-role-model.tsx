export class AddUsersToRoleModel {
  userIDs: string[];
  roleId: string;
  constructor(userIDs: string[], roleId: string) {
    this.userIDs = userIDs;
    this.roleId = roleId;
  }
}
