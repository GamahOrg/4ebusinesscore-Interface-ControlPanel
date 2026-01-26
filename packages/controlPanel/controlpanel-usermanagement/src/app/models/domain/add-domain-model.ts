export class DomainModel {
    domainName: string;
    domainNickName: string;
    userName: string;
    password: string;
    key?: string;
    value?: string;
    url?: string;
    actionName?: number;
    body?: string
    constructor(
        domainName: string,
        domainNickName: string,
        userName: string,
        password: string,
        key?: string,
        value?: string,
        url?: string,
        actionName?: number,
        body?: string
    ) {
      this.domainName=domainName
      this.domainNickName=domainNickName
      this.body=body
      this.key=key
      this.value=value
      this.userName=userName
      this.password=password
      this.url=url
      this.actionName=actionName
    }
  }