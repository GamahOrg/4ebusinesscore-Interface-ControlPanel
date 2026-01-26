export class UsersNotInRoleModelArray {
    data: UsersNotInRoleModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: UsersNotInRoleModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class UsersNotInRoleModel {
    roleId: string;
    id: string;
    name: string;
    imageUrl: string;
    email: string;
    isChecked:boolean;
    firstName: string | null;
    secondName: string | null;
    forthName: string | null = null;
    thirdName: string | null = null;
    userGender: number|null;
    constructor(
      roleId: string,
      id: string,
      name: string,
      imageUrl: string,
      email: string,
      firstName: string | null = null,
      secondName: string | null = null,
      forthName: string | null = null,
      thirdName: string | null = null,
      userGender: number|null
    ) {
      this.roleId = roleId;
      this.id = id;
      this.name = name;
      this.imageUrl = imageUrl;
      this.email = email;
      this.isChecked=false;
      this.firstName = firstName;
      this.secondName = secondName;
      this.forthName = forthName;
      this.thirdName = thirdName;
      this.userGender=userGender;
    }
  }
  
  