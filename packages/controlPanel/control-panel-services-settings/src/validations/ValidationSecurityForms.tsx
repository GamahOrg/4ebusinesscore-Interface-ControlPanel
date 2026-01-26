import { string, InferType, number, object } from "yup";

export const ValidationSecurityFormSchema = object({
  name: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  body: string().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
  url: string().required("websiteUrlIsRequired").typeError("websiteUrlIsRequired"),
  type: number().required("InputFieldIsRequried").typeError("InputFieldIsRequried"),
});

export type ValidationSecurityFormsProps = InferType<
  typeof ValidationSecurityFormSchema
>;
