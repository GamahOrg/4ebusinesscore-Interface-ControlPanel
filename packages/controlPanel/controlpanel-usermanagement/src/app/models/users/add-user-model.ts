import { jobInformationModle } from "../job-information-model/job-information-model";
import { loginPermissionModel } from "../login-permission/login-permission-model";

export class UserModel {
  constructor(
    public userName: string,
    public email: string,
    public firstName: string,
    public secondName: string,
    public thirdName: string,
    public forthName: string,
    public phoneNumber: string,
    public address: string,
    public nationalId: string,
    public userGender: number,
    public userType: number,
    public domainId: string,
    public jobNameId: string,
    public informationJobs: jobInformationModle[],
    public loginPermission: loginPermissionModel[],
    public roleIds: string[]
  ) {}
}
