import { UserGender } from "./response-status";

export class ManagerModel {
  id: string;
  organizationId: string;
  orgNameAr: string;
  orgNameEn: string;
  managerId: string;
  managerUserName: string;
  userName: string;
  imgUrl: string;
  jobNameAr: string;
  jobNameEn: string;
  jobId: string
  fromAppointmentDay: Date;
  toAppointmentDay: Date;
  managerUserGender: UserGender
  constructor(id: string, organizationId: string, orgNameAr: string, orgNameEn: string, managerId: string,userName: string, managerUserName: string, imgUrl: string, jobNameAr: string, jobNameEn: string, jobId: string, fromAppointmentDay: Date, toAppointmentDay: Date, managerUserGender: UserGender) {
      this.id = id;
      this.organizationId = organizationId;
      this.orgNameAr = orgNameAr;
      this.orgNameEn = orgNameEn;
      this.managerId = managerId;
      this.managerUserName = managerUserName;
      this.userName = userName;
      this.imgUrl = imgUrl;
      this.fromAppointmentDay = fromAppointmentDay;
      this.toAppointmentDay = toAppointmentDay;
      this.jobNameAr = jobNameAr;
      this.jobNameEn = jobNameEn;
      this.jobId = jobId;
      this.managerUserGender = managerUserGender;
    }
}
