import { object, string, InferType } from "yup";

export const addUserDelegationsSchema = object({
  alternativeId: string().required("InputFieldIsRequried"),

  startDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test({
      name: "startDate",
      message: "StartDateMustBeBeforeOrEqualToEndDate",
      test: function () {
        const endDate = this.parent.endDate;
        const startDate = this.parent.startDate;
        if (!endDate) {
          return true;
        }
        return new Date(startDate) <= new Date(endDate);
      },
    })
    .test({
      name: "startDate",
      message: "StartDateMustBeAfterOrEqualToday",
      test: function (value: any) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(value);
        startDate.setHours(0, 0, 0, 0);

        return startDate >= today;
      },
    }),

  endDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test({
      name: "endDate",
      message: "EndDateMustBeEqualToOrGreaterThanStartDate",
      test: function (value: any) {
        const startDate: any = this.parent.startDate;
        if (!startDate || !value) {
          // If either start or end date is not present, don't perform the comparison
          return true;
        }
        return new Date(value) >= new Date(startDate);
      },
    }),
});

export type AddUserDelegationValidationProps = InferType<
  typeof addUserDelegationsSchema
>;
