export class ModelMainSettingsHeader {
  data: MainSettingsHeader;

  constructor(data: MainSettingsHeader) {
    this.data = data;
  }
}

export type MainSettingHeadersValues = {
  id: string;
  nameAr: string;
  nameEn: string;
  url: string;
  workspaceKey: number;
  isDropdown: boolean;
};
export class MainSettingsHeader {
  MainSettingId: string;
  MainSettingHeaders: MainSettingHeadersValues[];

  constructor(MainSettingId: string, MainSettingHeaders: []) {
    this.MainSettingId = MainSettingId;
    this.MainSettingHeaders = MainSettingHeaders;
  }
}
