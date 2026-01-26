export class GroupDTO {
    id: string;
    createdOn: Date;
    updatedOn: Date | null;
    groupName: string;
    organizationId: string;
    orgHierarchyNameAr: string;
    orgHierarchyNameEN: string;
    managerId: string;
    managerName: string;
    description: string;
    imageUrl: string;
    users: AllGroupUsersDTO[];
    roles: RoleGroupDTO[];
  
    constructor(
      id: string,
      createdOn: Date,
      updatedOn: Date | null,
      groupName: string,
      organizationId: string,
      orgHierarchyNameAr: string,
      orgHierarchyNameEN: string,
      managerId: string,
      managerName: string,
      description: string,
      imageUrl: string,
      users: AllGroupUsersDTO[],
      roles: RoleGroupDTO[]
    ) {
      this.id = id;
      this.createdOn = createdOn;
      this.updatedOn = updatedOn;
      this.groupName = groupName;
      this.organizationId = organizationId;
      this.orgHierarchyNameAr = orgHierarchyNameAr;
      this.orgHierarchyNameEN = orgHierarchyNameEN;
      this.managerId = managerId;
      this.managerName = managerName;
      this.description = description;
      this.imageUrl = imageUrl;
      this.users = users;
      this.roles = roles;
    }
  }
  
  export class AllGroupUsersDTO {
    userId: string;
    userName: string;
    userImage: string;
    firstName: string;
    secondName: string;
    thirdName: string;
    fourthName: string;
    orgNameAr: string;
    orgNameEn: string;
    IsChecked:boolean;
    constructor(
      userId: string,
      userName: string,
      userImage: string,
      firstName: string,
      secondName: string,
      thirdName: string,
      fourthName: string,
      orgNameAr: string,
      orgNameEn: string
    ) {
      this.userId = userId;
      this.userName = userName;
      this.userImage = userImage;
      this.firstName = firstName;
      this.secondName = secondName;
      this.thirdName = thirdName;
      this.fourthName = fourthName;
      this.orgNameAr = orgNameAr;
      this.orgNameEn = orgNameEn;
      this.IsChecked=true
    }
  }
  
  export class RoleGroupDTO {
    roleId: string;
    roleNameAr: string;
    roleNameEn: string;
  
    constructor(roleId: string, roleNameAr: string, roleNameEn: string) {
      this.roleId = roleId;
      this.roleNameAr = roleNameAr;
      this.roleNameEn = roleNameEn;
    }
  }
  