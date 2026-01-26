export class loginPermissionModel {
  constructor(
    public isNafaz: boolean,
    public isExpired: boolean,
    public expirationDateFrom: Date,
    public expirationDateTo: Date
  ) { }
}