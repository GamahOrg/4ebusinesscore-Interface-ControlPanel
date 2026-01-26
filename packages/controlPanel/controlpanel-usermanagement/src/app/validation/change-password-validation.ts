import { object, string, InferType, ref } from "yup";
export const changePasswordSchema = object({
  newPassword: string()
    .required("InputFieldIsRequried")
    .matches(
      // /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=.*[a-zA-Z]).{8,}$/,
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!*])(?=.*[^\w\d\s])(?=.*[a-zA-Z]).{8,}$/,
      "PasswordMustBeAtLeast8CharactersLong,ContainAtLeastOneNumber,LowerCaseLetter,UppercaseLetterAndSpecialCharacter"
    ),
  passwordConfirmation: string()
    .required("InputFieldIsRequried")
    .oneOf([ref("newPassword"), null], "ItMustMatchTheNewPassword"),
});

export type changePasswordProps = InferType<typeof changePasswordSchema>;
