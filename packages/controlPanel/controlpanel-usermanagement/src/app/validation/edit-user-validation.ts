import { object, string, InferType, boolean } from "yup";

export const EditUserSchema = object({
  jobNameId: string().required("InputFieldIsRequried"),
  jobDegreeId: string().required("InputFieldIsRequried"),
  jobRoleId: string().required("InputFieldIsRequried"),
  startDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // .test({
  //   name: "startDate",
  //   message: "StartDateMustBeBeforeOrEqualToEndDate",
  //   test: function (value) {
  //     const endDate = this.parent.endDate;
  //     const startDate = this.parent.startDate;
  //     if (!endDate) {
  //       return true;
  //     }
  //     return new Date(startDate) <= new Date(endDate);
  //   },
  // })
  // .test({
  //   name: "startDate",
  //   message: "StartDateMustBeAfterOrEqualToday",
  //   test: function (value: any) {
  //     const today = new Date();
  //     const startDate = new Date(value);
  //     const differenceInMillis = startDate.getTime() - today.getTime();
  //     const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  //     return differenceInDays >= -1;
  //   },
  // })
  endDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  // .test({
  //   name: "endDate",
  //   message: "EndDateMustBeEqualToOrGreaterThanStartDate",
  //   test: function (value: any) {
  //     const startDate: any = this.parent.startDate;
  //     if (!startDate || !value) {
  //       // If either start or end date is not present, don't perform the comparison
  //       return true;
  //     }
  //     const differenceInMillis =
  //       new Date(value).getTime() - new Date(startDate).getTime();
  //     const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  //     return differenceInDays > -1;
  //   },
  // }),
  isExpired: boolean(),
  expirationDateFrom: string()
    .required("InputFieldIsRequried")

    .typeError("InputFieldIsRequried")
    .test({
      name: "expirationDateFrom",
      message: "ExpirationDateMustBeEqualToOrAfterToday",
      test: function (value: any) {
        const today = new Date();
        const startDate = new Date(value);
        const differenceInMillis = startDate.getTime() - today.getTime();
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        return differenceInDays >= -1;
      },
    })
    .test({
      name: "expirationDateFrom",
      message: "ExpirationDateFromMustBeBeforeOrEqualExpirationDateFrom",
      test: function (value) {
        const expirationDateFrom = this.parent.expirationDateFrom;
        const expirationDateTo = this.parent.expirationDateTo;
        if (!expirationDateTo) {
          return true;
        }

        return new Date(expirationDateFrom) <= new Date(expirationDateTo);
      },
    }),
  // .string().when("isExpired", {
  //   is: true,
  //   then:
  //   string()
  //     .required("InputFieldIsRequried")
  //     .typeError("InputFieldIsRequried")
  //     .test({
  //       name: "expirationDateFrom",
  //       message: "ExpirationDateMustBeEqualToOrAfterToday",
  //       test: function (value) {
  //         const expirationDateFrom: any = this.parent.expirationDateFrom;
  //         return new Date(expirationDateFrom) >= new Date();
  //       },
  //     })
  //     .test({
  //       name: "expirationDateFrom",
  //       message: "ExpirationDateFromMustBeBeforeOrEqualExpirationDateFrom",
  //       test: function (value) {
  //         const expirationDateFrom = this.parent.expirationDateFrom;
  //         const expirationDateTo = this.parent.expirationDateTo;
  //         if (!expirationDateTo) {
  //           return true;
  //         }

  //         return new Date(expirationDateFrom) <= new Date(expirationDateTo);
  //       },
  //     }),
  // }),
  expirationDateTo: string()
    .typeError("InputFieldIsRequried")
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("InputFieldIsRequried")
    .test({
      name: "expirationDateTo",
      message: "ExpirationDateToMustBeEqualToOrGreaterThanExpirationDateFrom",
      test: function (value) {
        const expirationDateFrom = this.parent.expirationDateFrom;
        const expirationDateTo = this.parent.expirationDateTo;
        if (!expirationDateFrom || !expirationDateTo) {
          return true;
        }
        return new Date(expirationDateTo) >= new Date(expirationDateFrom);
      },
    }),
  // .string().when(["isExpired", "expirationDateFrom"], {
  //   is: (isExpired: boolean, expirationDateFrom: string | null) =>
  //     isExpired && expirationDateFrom,
  //   then: string()
  //     .typeError("InputFieldIsRequried")
  //     .required("InputFieldIsRequried")
  //     .test({
  //       name: "expirationDateTo",
  //       message: "ExpirationDateToMustBeEqualToOrGreaterThanExpirationDateFrom",
  //       test: function (value) {
  //         const expirationDateFrom = this.parent.expirationDateFrom;
  //         const expirationDateTo = this.parent.expirationDateTo;
  //         if (!expirationDateFrom || !expirationDateTo) {
  //           return true;
  //         }
  //         return new Date(expirationDateTo) >= new Date(expirationDateFrom);
  //       },
  //     }),

  // }),
  hiringDate: string()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
});

export type EditUserProps = InferType<typeof EditUserSchema>;
