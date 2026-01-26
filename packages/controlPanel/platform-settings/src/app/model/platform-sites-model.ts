export class MainSettingsModel {
  webLogo: string
  temporaryWebCover: string
  webCover: string
  webTitle: string
  webUrl: string
  webDescription: string
  startDate: Date
  endDate: Date
  mainSettingsDepartments: MainSettingsDepartmentItems[]
  mainSettingsDepartmentsIcons: MainSettingsDepartmentsIcons[]

  constructor(webLogo: string, temporaryWebCover: string, webCover: string, webTitle: string, webUrl: string, webDescription: string, startDate: Date, endDate: Date, mainSettingsDepartments: MainSettingsDepartmentItems[], mainSettingsDepartmentsIcons: MainSettingsDepartmentsIcons[]) {
    this.webLogo = webLogo
    this.temporaryWebCover = temporaryWebCover
    this.webCover = webCover
    this.webUrl = webUrl
    this.webDescription = webDescription
    this.startDate = startDate
    this.endDate = endDate
    this.webTitle = webTitle
    this.mainSettingsDepartments = mainSettingsDepartments
    this.mainSettingsDepartmentsIcons = mainSettingsDepartmentsIcons
  }
}

class MainSettingsDepartmentItems {
  mainSettingsId: string
  iconImg: string
  itemName: string
  itemURL: string
  constructor(mainSettingsId: string, iconImg: string, itemName: string, itemURL: string) {
    this.iconImg = iconImg
    this.itemName = itemName
    this.mainSettingsId = mainSettingsId
    this.itemURL = itemURL
  }
}
class MainSettingsDepartmentsIcons {
  mainSettingsId: string
  iconImg: string
  iconName: string
  iconURL: string
  constructor(mainSettingsId: string, iconImg: string, iconName: string, iconURL: string) {
    this.iconImg = iconImg
    this.iconName = iconName
    this.mainSettingsId = mainSettingsId
    this.iconURL = iconURL
  }
}
