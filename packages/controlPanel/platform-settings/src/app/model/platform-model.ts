export class PlatformModel {
  id: string;
  webLogo: string;
  temporaryWebCover: string;
  webCover: string;
  webTitle: string;
  webUrl: string;
  webDescription: string;
  startDate: Date;
  endDate: Date;

  constructor(
    id: string = '',
    webLogo: string = '',
    temporaryWebCover: string = '',
    webCover: string = '',
    webTitle: string = '',
    webUrl: string = '',
    webDescription: string = '',
    startDate: Date = new Date(),
    endDate: Date = new Date()
  ) {
    this.webLogo = webLogo;
    this.temporaryWebCover = temporaryWebCover;
    this.webCover = webCover;
    this.webUrl = webUrl;
    this.webDescription = webDescription;
    this.startDate = startDate;
    this.endDate = endDate;
    this.webTitle = webTitle;
    this.id = id;
  }
}

