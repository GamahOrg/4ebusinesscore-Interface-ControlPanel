export class JobTitleArrayModel {
    data: JobTitleModel[];
    totalPages: number;
    totalItems: number;
    constructor(data: JobTitleModel[], totalPages: number, totalItems: number) {
      this.data = data;
      this.totalItems = totalItems;
      this.totalPages = totalPages;
    }
  }
  export class JobTitleModel {
    id: number;
    phoneNumber: string;
    userName: string;
    email: string | null;
    nameAr: string;
    nameEn: string;
    constructor(
      id: number,
      phoneNumber: string,
      userName: string,
      email: string | null,
      nameAr: string,
      nameEn: string
    ) {
      {
        this.id = id;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.email = email;
        this.nameAr = nameAr;
        this.nameEn = nameEn;
      }
    }
  }
  