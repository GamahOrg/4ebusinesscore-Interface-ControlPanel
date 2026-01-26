import { object, string, InferType } from "yup";
export const domainSchema = object({
  userName: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z]+$/, "UsernameMustContainOnlyEnglishCharacters"),
  domainName: string().required("InputFieldIsRequried"),
  domainNickName: string().required("InputFieldIsRequried"),
  password: string().required("InputFieldIsRequried"),
  body: string().notRequired(),
  key: string().notRequired(),
  value: string().notRequired(),
  url: string().notRequired(),
  actionName: string().notRequired(),
});

export type domainProps = InferType<typeof domainSchema>;
