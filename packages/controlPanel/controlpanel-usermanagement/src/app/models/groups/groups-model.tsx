export class GroupsModelArray {
    data: GroupsModel[];
    totalPages: number;
    totalItems: number;
  
    constructor(data: GroupsModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
    }
  }
  
  export class GroupsModel {
    id: string;
    groupName: string;
    createdOn: Date;
    createdBy: string;
    updatedOn: Date;
    updatedBy: string;
    imageUrl: string;
    description : string;
  
    constructor(
        id: string,
        groupName: string,
        createdOn: Date,
        createdBy: string,
        updatedOn: Date,
        updatedBy: string,
        imageUrl: string,
        description : string,
      
      
    ) {
      this.id = id;
      this.groupName = groupName;
      this.createdOn = createdOn;
      this.createdBy = createdBy;
      this.updatedOn = updatedOn;
      this.updatedBy = updatedBy;
      this.imageUrl = imageUrl;
      this.description = description;
     
    }
  }
  
  