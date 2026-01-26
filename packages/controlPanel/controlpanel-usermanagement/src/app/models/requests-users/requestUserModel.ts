export class RequestUserModel {
  id: string | number | Number;
  userName: string;
  email: string;
  firstName: string;
  secondName: string;
  thirdName: string;
  forthName: string;
  requestDate: Date;
  domainOrgName: string;
  constructor(
    id: string | number | Number,
    userName: string,
    email: string,
    firstName: string,
    secondName: string,
    thirdName: string,
    forthName: string,
    requestDate: Date,
    domainOrgName: string
  ) {
    this.id = id;
    this.userName = userName;
    this.secondName = secondName;
    this.thirdName = thirdName;
    this.email = email;
    this.firstName = firstName;
    this.forthName = forthName;
    this.requestDate = requestDate;
    this.domainOrgName = domainOrgName;
  }
}
