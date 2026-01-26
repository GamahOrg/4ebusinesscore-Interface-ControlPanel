export class PlatformModelMainSettingsArray {
  data: MainSettingsIsTheme[];
  totalPages: number;
  totalItems: number;

  constructor(
    data: MainSettingsIsTheme[],
    totalPages: number,
    totalItems: number
  ) {
    this.data = data;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
  }
}
export class MainSettingsIsTheme {
  id: string;
  IsThem: boolean;

  constructor(id: string, IsThem: boolean) {
    this.IsThem = IsThem;

    this.id = id;
  }
}
