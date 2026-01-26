export class RoleNotGroupModelArray {
    data: RoleNotGroup[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: RoleNotGroup[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class RoleNotGroup {
    roleId: string;
    groupId: string;
    groupName: string;
    imageUrl: string;
    description:string;
    isChecked:boolean;

    constructor(
      roleId: string,
      groupId: string,
      groupName: string,
      imageUrl: string,
      description:string
    ) {
      this.roleId = roleId;
      this.groupId = groupId;
      this.groupName = groupName;
      this.imageUrl = imageUrl;
      this.description=description;
      this.isChecked=false;
    }
  }
  
  