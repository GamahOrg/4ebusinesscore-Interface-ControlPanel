export class Permission {
    id: string;
    isNafaz: boolean;
    isExpired:any;
    expirationDateFrom: string;
    expirationDateTo: string;
    systemUserId: string;
  
    constructor(
      id: string = '',
      isNafaz: boolean = false,
      isExpired: any ,
      expirationDateFrom: string = '',
      expirationDateTo: string = '',
      systemUserId: string = ''
    ) {
      this.id = id;
      this.isNafaz = isNafaz;
      this.isExpired = isExpired;
      this.expirationDateFrom = expirationDateFrom;
      this.expirationDateTo = expirationDateTo;
      this.systemUserId = systemUserId;
    }
  }
  