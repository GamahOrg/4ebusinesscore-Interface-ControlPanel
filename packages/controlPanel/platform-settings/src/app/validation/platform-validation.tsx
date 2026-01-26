import { object, string, InferType, ref, number } from "yup";
import differenceInDays from "date-fns/differenceInDays";
const urlRegex =
  /^(\/[\w\-\/=0-9]*|https?:\/\/([\w\-]+\.)*[\w\-]+\.(sa|[a-z]{2,})(\/[\w\-;=0-9]*)*(\?[\w\-=&0-9]*)?(#[\w\-]*)?)$/;

const forbiddenRegex = /[@+\-=.]/;

export const platformSchema = object({
  // websiteTitle: string().required('websiteTitleIsRequired'),
  // websiteUrl: string()
  //   .matches(urlRegex, "InvalidUrl")
  //   .required("websiteUrlIsRequired")
  //   .typeError("InvalidUrl"),
  websiteUrl: string().nullable(),
  websiteDescription: string().required("websiteDescriptionIsRequired"),
  footerDescriptionAr: string()
    .required("RequiredInputField")
    .test("only-arabic", "FooterDescriptionMustBeInArabic", (value) => {
      if (!value) return true; // Let required handle empty values
      // Must contain at least one Arabic character AND no English letters
      const hasArabic =
        /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
          value
        );
      const hasEnglish =
        /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(value);
      return hasArabic && !hasEnglish;
    }),
  footerDescriptionEn: string()
    .required("RequiredInputField")
    .test("only-english", "FooterDescriptionMustBeInEnglish", (value) => {
      if (!value) return true; // Let required handle empty values
      // Must contain at least one English letter AND no Arabic characters
      const hasEnglish =
        /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(value);
      const hasArabic =
        /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
          value
        );
      return hasEnglish && !hasArabic;
    }),
  platformTitle: string().required("PlatformTitleIsRequired"),
  chatBotName: string().nullable(),
  newsTitleAr: string()
    .required("RequiredInputField")
    .test({
      name: "newsTitleAr",
      message: "NameMustBeInArabicLetters",
      test: function (value: any) {
        if (value) {
          return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
            value
          );
        } else {
          return true;
        }
      },
    }),
  newsTitleEn: string()
    .required("RequiredInputField")
    .test({
      name: "newsTitleEn",
      message: "NameMustBeInEnglishLetters",
      test: function (value: any) {
        if (value) {
          return /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(value);
        } else {
          return true;
        }
      },
    }),
  eventsTitleAr: string()
    .required("RequiredInputField")
    .test({
      name: "eventsTitleAr",
      message: "NameMustBeInArabicLetters",
      test: function (value: any) {
        if (value) {
          return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
            value
          );
        } else {
          return true;
        }
      },
    }),
  eventsTitleEn: string()
    .required("RequiredInputField")
    .test({
      name: "eventsTitleEn",
      message: "NameMustBeInEnglishLetters",
      test: function (value: any) {
        if (value) {
          return /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(value);
        } else {
          return true;
        }
      },
    }),
});

export const platformThemeSchema = object({
  startDate: string()
    .required("startDateIsRequired")
    .test({
      test: (startDate) => {
        if (startDate == null || startDate == "Invalid Date") return true;
        else if (differenceInDays(new Date(), new Date(startDate)) < 1)
          return true;
        else return false;
      },
      message: "startDateMustBeValid",
    }),
  endDate: string()
    .required("endDateIsRequired")
    .test({
      test: (endDate) => {
        if (endDate == null || endDate == "Invalid Date") return true;
        else if (differenceInDays(new Date(), new Date(endDate)) < 1)
          return true;
        else return false;
      },
      message: "endDateMustBeValid",
    }),
});

export const signInPlatformSchema = object({
  descriptionAr: string()
    .nullable()
    .notRequired()
    .test({
      name: "DescriptionAr",
      message: "NameMustBeInArabicLetters",
      test: function (value: any) {
        if (value) {
          return /^[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(
            value
          );
        } else {
          return true;
        }
      },
    }),
  descriptionEn: string()
    .nullable()
    .notRequired()
    .test({
      name: "descriptionEn",
      message: "NameMustBeInEnglishLetters",
      test: function (value: any) {
        if (value) {
          return /^[A-Za-z0-9\s.,;:!?#$%^&*()_{}<>/"'`~?\\|\-٪]+$/u.test(value);
        } else {
          return true;
        }
      },
    }),
});

export type platformProps = InferType<typeof platformSchema>;
export type platformThemeProps = InferType<typeof platformThemeSchema>;
