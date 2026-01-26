// statisticsModels.ts

class StatisticsModel {
    result: {
      usersCount?: number  ;
      groupsCount?: number ;
      rolesCount?: number ;
    };
    pageIndex: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;

  
    constructor(
      usersCount: number = 0,
      groupsCount: number = 0,
      rolesCount: number = 0,
      pageIndex: number = 0,
      totalPages: number = 0,
      totalItems: number = 0,
      pageSize: number = 0,

    ) {
      this.result = {
        usersCount,
        groupsCount,
        rolesCount,
      };
      this.pageIndex = pageIndex;
      this.totalPages = totalPages;
      this.totalItems = totalItems;
      this.pageSize = pageSize;

    }
  }
  
  export default StatisticsModel;
  