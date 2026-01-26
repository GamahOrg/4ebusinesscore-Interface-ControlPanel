import { object, string, InferType } from "yup";

export const addRoleSchema = object({
  nameAr: string()
    .required("RoleNameArMustBeRequired")
    .matches(/^[ء-ي ]+$/, "RoleNameArMustBeRequired"),
  nameEn: string()
    .required("RoleNameEnMustBeRequired")
    .matches(/^[a-zA-Z ]+$/, "RoleNameEnMustBeRequired"),

  roleCategoryId: string()
    .nullable()
    .test({
      // test: (roleCategoryId: string | null| undefined) =>
      //   roleCategoryId?.replace(/\s/g, "").length > 0
      test: (value) => {
        if (typeof value === "string" && value.replace(/\s/g, "").length > 0) {
          return true;
        }
        return false;
      },
      message: "RoleCategoryMustBeRequired",
    }),

  details: string()
    .required("RoleDeatilsMustBeRequired")
    .test({
      test: (details: string | any) => details.replace(/\s/g, "").length > 0,
      message: "RoleDeatilsMustBeRequired",
    }),
});

export type addRoleProps = InferType<typeof addRoleSchema>;
