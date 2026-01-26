export class AddPlatformMainSettingsModel {
  mainSettingsDTO: MainSettingsDTO
  constructor(mainSettingsDTO: MainSettingsDTO) {
    this.mainSettingsDTO = mainSettingsDTO
  }
}
export class MainSettingsDTO {
  webLogo: File | undefined
  temporaryWebCover: File | undefined
  webCover: File | undefined
  webTitle: string
  webUrl: string
  webDescription: string
  startDate: Date
  endDate: Date
  constructor(webLogo: File | undefined, temporaryWebCover: File | undefined, webCover: File | undefined, webTitle: string, webUrl: string, webDescription: string, startDate: Date, endDate: Date) {
    this.webLogo = webLogo
    this.temporaryWebCover = temporaryWebCover
    this.webCover = webCover
    this.webUrl = webUrl
    this.webDescription = webDescription
    this.startDate = startDate
    this.endDate = endDate
    this.webTitle = webTitle
  }
}
