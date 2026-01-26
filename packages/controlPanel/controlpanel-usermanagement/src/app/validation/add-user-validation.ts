import { object, string, InferType, number, boolean } from "yup";

export const AddUserSchema = object({
  quadrupleName: string()
    .test(
      "is-quadruple-name",
      "QuadrupleNameMustConsistOfFourNamesSeparatedBySpaces",
      (value) => {
        if (!value) {
          return true;
        }

        const names = value.trim().split(" ");

        // Check if there are exactly four names
        return names.length === 4;
      }
    )
    .required("InputFieldIsRequried"),
  userName: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "UsernameMustContainOnlyEnglishCharactersAndNumbers"
    ),
  email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
  phoneNumber: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "InvalidPhone"
    ),
  mobile: string()
    .optional()
    .nullable()
    .matches(/^[0-9]{11}$/, {
      message: "InvalidPhoneNumber",
      excludeEmptyString: true,
    }),
  transactionNumber: string()
    .optional()
    .nullable()
    .matches(/^[1-9][0-9]{4}$/, {
      message: "InvalidTransactionNumber",
      excludeEmptyString: true,
    }),
  nationalId: string()
    .optional()
    .nullable()
    .matches(/^\d{10}$/, {
      message: "InvalidNationalID",
      excludeEmptyString: true,
    }),
  userType: number(),
  domainId: string().when("userType", {
    is: 1,
    then: string().required("InputFieldIsRequried"),
  }),
  jobNameId: string().required("InputFieldIsRequried"),
  address: string(),
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
  endDate: string(),
  // .required("InputFieldIsRequried")
  // .typeError("InputFieldIsRequried"),
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
  expirationDateFrom: string().nullable(),
  // .required("InputFieldIsRequried")

  // .typeError("InputFieldIsRequried")
  // .test({
  //   name: "expirationDateFrom",
  //   message: "ExpirationDateMustBeEqualToOrAfterToday",
  //   test: function (value: any) {
  //     const today = new Date();
  //     const startDate = new Date(value);
  //     const differenceInMillis = startDate.getTime() - today.getTime();
  //     const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
  //     return differenceInDays >= -1;
  //   },
  // })
  // .test({
  //   name: "expirationDateFrom",
  //   message: "ExpirationDateFromMustBeBeforeOrEqualExpirationDateFrom",
  //   test: function (value) {
  //     const expirationDateFrom = this.parent.expirationDateFrom;
  //     const expirationDateTo = this.parent.expirationDateTo;
  //     if (!expirationDateTo) {
  //       return true;
  //     }

  //     return new Date(expirationDateFrom) <= new Date(expirationDateTo);
  //   },
  // }),

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
  expirationDateTo: string().nullable(),
  // .typeError("InputFieldIsRequried")
  // .nullable()
  // .transform((value, originalValue) => (originalValue === "" ? null : value))
  // .required("InputFieldIsRequried")
  // .test({
  //   name: "expirationDateTo",
  //   message: "ExpirationDateToMustBeEqualToOrGreaterThanExpirationDateFrom",
  //   test: function (value) {
  //     const expirationDateFrom = this.parent.expirationDateFrom;
  //     const expirationDateTo = this.parent.expirationDateTo;
  //     if (!expirationDateFrom || !expirationDateTo) {
  //       return true;
  //     }
  //     return new Date(expirationDateTo) >= new Date(expirationDateFrom);
  //   },
  // }),

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

export type AddUserProps = InferType<typeof AddUserSchema>;
