export class PostGroupModel {
    GroupName: string;
    organizationId: string;
    ManagerId: string;
    Description: string;
    MainImage: File;
    UserIds: string[];
    RoleIds: string[];
  
    constructor(
      groupName: string,
      organizationId: string,
      managerId: string,
      description: string,
       MainImage: File,
      userIds: string[],
      roleIds: string[]
    ) {
      this.GroupName = groupName;
      this.organizationId = organizationId;
      this.ManagerId = managerId;
      this.Description = description;
     this.MainImage = MainImage;
      this.UserIds = userIds;
      this.RoleIds = roleIds;
    }
  }
  