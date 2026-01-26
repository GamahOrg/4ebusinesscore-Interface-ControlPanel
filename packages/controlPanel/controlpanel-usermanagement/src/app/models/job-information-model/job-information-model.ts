export class jobInformationModle {
  constructor(
    public orgId: string,
    public startDate: Date,
    public endDate: Date,
    public jobTime: number,
    public hiringDate: Date,
    public jobDegreeId: string,
    public jobRoleId: string,
    public userKind: number
  ) { }
}