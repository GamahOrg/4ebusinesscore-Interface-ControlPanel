export class RoleGroupModelArray {
    data: RoleGroup[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: RoleGroup[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class RoleGroup {
    roleId: string;
    groupId: string;
    createdOn: Date;
    groupName: string;
    imageUrl: string;
    LastUpdated: Date;
    description:string;
  
    constructor(
      roleId: string,
      groupId: string,
      createdOn: Date,
      groupName: string,
      imageUrl: string,
      LastUpdated: Date,
      description:string,

    ) {
      this.roleId = roleId;
      this.groupId = groupId;
      this.createdOn = createdOn;
      this.groupName = groupName;
      this.imageUrl = imageUrl;
      this.LastUpdated=LastUpdated;
      this.description=description;
    }
  }
  
  