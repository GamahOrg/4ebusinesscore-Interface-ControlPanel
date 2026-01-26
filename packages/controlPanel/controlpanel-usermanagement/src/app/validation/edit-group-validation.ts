import { object, string, InferType, mixed } from "yup";

export const EditGroupSchema = object({
  GroupName: string()
    .required("GroupName")
    .test({
      test: (details: string | any) => details.replace(/\s/g, "").length > 0,
      message: "GroupName",
    }),
  managerId: string()
    .required("managerIdMustBeRequired")
    .test({
      test: (roleId: string | any) => roleId.replace(/\s/g, "").length > 0,
      message: "managerIdMustBeRequired",
    }),
  description: string()
    .required("description")
    .test({
      test: (details: string | any) => details.replace(/\s/g, "").length > 0,
      message: "description",
    }),
  MainImage: mixed().test("fileSize", "theFileIsTooLarge", function (value) {
    if (value && value.length && value.length > 0) {
      return value[0].size <= 20000000;
    } else {
      return true;
    }
  }),
});

export type EditGroupVildation = InferType<typeof EditGroupSchema>;
