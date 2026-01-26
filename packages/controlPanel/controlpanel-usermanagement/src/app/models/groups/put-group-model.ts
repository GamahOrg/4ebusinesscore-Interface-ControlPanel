export class PutGroupDTO {
    public GroupName: string;
    public OrganizationId: string;
    public ManagerId: string;
    public Description: string;
    public MainImage: File;
    public UserIds: string[];
    public RoleIds: string[];
  
    constructor(
      GroupName: string,
      OrganizationId: string,
      ManagerId: string,
      Description: string,
      MainImage: File,
      UserIds: string[],
      RoleIds: string[]
    ) {
      this.GroupName = GroupName;
      this.OrganizationId = OrganizationId;
      this.ManagerId = ManagerId;
      this.Description = Description;
      this.MainImage = MainImage;
      this.UserIds = UserIds;
      this.RoleIds = RoleIds;
    }
  }