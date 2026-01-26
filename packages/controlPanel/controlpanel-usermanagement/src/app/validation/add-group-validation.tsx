import { object, string, InferType, mixed } from "yup";
export const addGroupSchema = object({

  groupName: string()
    .required("groupNameMustBeRequired")
    .test({
      test: (details: string | any) => details.replace(/\s/g, "").length > 0,
      message: "groupNameMustBeRequired",
    }),
  managerId: string()
    .required("managerIdMustBeRequired")
    .test({
      test: (roleId: string | any) => roleId.replace(/\s/g, "").length > 0,
      message: "managerIdMustBeRequired",
    }),
  description: string()
    .required("descriptionMustBeRequired")
    .test({
      test: (details: string | any) => details.replace(/\s/g, "").length > 0,
      message: "descriptionMustBeRequired",
    }),
    MainImage: mixed()
    .test("fileSize", "theFileIsTooLarge", function (value) {
      if (value && value.length && value.length > 0) {
        return value[0].size <= 20000000;
      } else {
        return true;
      }
    })
    .required("MainImageIsRequired"),
  
});

export type AddGroupVildation = InferType<typeof addGroupSchema>;
