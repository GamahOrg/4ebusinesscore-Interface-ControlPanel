export class GroupModelArray {
    data: GroupModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: GroupModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class GroupModel {
    id: string;
    organizationId :string;
    createdOn: Date; 
    updatedOn: Date; 
    managerId :string;
    description : string;
    imageUrl: string;
    groupName: string;
    managerName :string;
    userId  :string;
    userName  :string;
    userImage  :string;
    firstName  :string;
    secondName  :string;
    thirdName  :string;
    fourthName  :string;
    roleId  :string;
    roleNameAr  :string;
    roleNameEn  :string;

     
  
    constructor(
        id: string,
        organizationId :string,
        createdOn: Date,
        updatedOn: Date, 
        managerId :string,
        description : string,
        imageUrl: string,
        groupName: string,
        managerName :string,
        userId  :string,
        userName  :string,
        userImage  :string,
        firstName  :string,
        secondName  :string,
        thirdName  :string,
        fourthName  :string,
        roleId  :string,
        roleNameAr  :string,
        roleNameEn  :string,
      
      
    ) {
      this.id = id;
      this.groupName = groupName;
      this.createdOn = createdOn;
      
      this.updatedOn = updatedOn;
      
      this.imageUrl = imageUrl;
      this.organizationId = organizationId;
      this.description = description;
      this.managerId = managerId;
      this.managerName = managerName;
      this.userId = userId;
      this.userName = userName;
      this.userImage = userImage;
      this.firstName = firstName;
      this.secondName = secondName;
      this.thirdName = thirdName;
      this.fourthName = fourthName;
      this.roleId = roleId;
      this.roleNameAr = roleNameAr;
      this.roleNameEn = roleNameEn;
    
     
    }
  }