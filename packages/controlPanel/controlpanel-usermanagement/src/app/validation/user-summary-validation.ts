import { object, string, InferType } from "yup";
export const userSummarySchema = object({
  userName: string(),
  // .required("InputFieldIsRequried")
  // .matches(/^[a-zA-Z]+$/, "UsernameMustContainOnlyEnglishCharacters"),
  fullName: string(),
  orgId: string(),
  managerId: string().notRequired().nullable(),
  phoneNumber: string()
    .optional()
    .nullable()
    .matches(/^(\+9665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
      message: "InvalidPhone",
      excludeEmptyString: true,
    }),
  nationalId: string()
    .optional()
    .nullable()
    .matches(/^(\d{10})?$/, "InvalidNationalID"),

  address: string().optional().nullable(),
  userGender: string().required("InputFieldIsRequried"),
});

export type userSummaryProps = InferType<typeof userSummarySchema>;
