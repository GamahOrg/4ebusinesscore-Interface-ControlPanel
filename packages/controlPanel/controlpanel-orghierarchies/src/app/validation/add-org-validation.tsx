import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { object, string, InferType } from "yup";

export const OrgSchema = object({
  nameAr: string()
    .required("RequiredInputField")
    .matches(/^[\u0600-\u06FF\s]+$/, "OrgNameArMustBeInArabic"),
  nameEn: string()
    .required("RequiredInputField")
    .matches(/^[a-zA-Z\s]+$/, "OrgNameEnMustBeInEnglish"),
  description: string()
  // .matches(
  //   getCurrentSystemLanguage() !== "ar"
  //     ? /^[a-zA-Z\s]+$/
  //     : /^[\u0600-\u06FF\s]+$/,
  //   getCurrentSystemLanguage() != "ar"
  //     ? "DescriptionNameMustBeInEnglish"
  //     : "DescriptionNameMustBeInArabic"
  // )
  .optional().nullable()
  .test(
    "is-valid-description",
    getCurrentSystemLanguage() !== "ar"
      ? "DescriptionNameMustBeInEnglish"
      : "DescriptionNameMustBeInArabic",
    (value) => {
      if (!value) return true; // السماح بالقيم الفارغة أو null
      const regex =
        getCurrentSystemLanguage() !== "ar"
          ? /^[a-zA-Z\s]+$/
          : /^[\u0600-\u06FF\s]+$/;
      return regex.test(value);
    }
  ),

  categoryId: string()
    .required("OrgCategoryIdMustBeRequired")
    .test({
      test: (categoryId: string | any) =>
        categoryId.replace(/\s/g, "").length > 0,
      message: "OrgCategoryIdMustBeRequired",
    }),

  parentId: string().notRequired().nullable(),
});

export type OrgProps = InferType<typeof OrgSchema>;
