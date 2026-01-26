import { object, string, InferType, number } from "yup";
export const userProtectionSchema = object({
  email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
  password: string().notRequired(),
  role: number().notRequired(),
});

export type userProtectionProps = InferType<typeof userProtectionSchema>;
