export class EditDomainModel {
  id: number | Number | string;
  domainName: string;
  domainNickName: string;
  userName: string;
  password: string;
  key?: string;
  value?: string;
  url?: string;
  actionName?: number;
  body?: string;
  isActive?: boolean;
  constructor(
    id: number | Number | string,
    domainName: string,
    domainNickName: string,
    userName: string,
    password: string,
    key?: string,
    value?: string,
    url?: string,
    actionName?: number,
    body?: string,
    isActive?: boolean
  ) {
    this.id = id;
    this.domainName = domainName;
    this.domainNickName = domainNickName;
    this.body = body;
    this.key = key;
    this.value = value;
    this.userName = userName;
    this.password = password;
    this.url = url;
    this.actionName = actionName;
    this.isActive = isActive;
  }
}
