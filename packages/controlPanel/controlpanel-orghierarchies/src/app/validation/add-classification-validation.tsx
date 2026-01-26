import { object, string, InferType } from "yup";

export const ClassificationSchema = object({
  nameAr: string()
    .required("RequiredInputField")
    .matches(/^[\u0600-\u06FF\s]+$/, "ClassificationNameArMustBeInArabic"),
  nameEn: string()
    .required("RequiredInputField")
    .matches(/^[a-zA-Z\s]+$/, "ClassificationNameEnMustBeInEnglish"),
  color: string()
    .required("RequiredInputField")
    .matches(/^#[0-9A-Fa-f]{6}$/, "InvalidHexColorFormat"),
});

export type ClassificationProps = InferType<typeof ClassificationSchema>;
