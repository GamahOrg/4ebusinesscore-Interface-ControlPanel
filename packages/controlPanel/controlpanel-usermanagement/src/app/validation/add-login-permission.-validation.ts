import { object, string, InferType } from "yup";

export const AddUserLoginPermissionSchema = object({
  expirationDateFrom: string().nullable(),
  expirationDateTo: string().nullable(),
  enablePermission: string(),
});

export type AddUserLoginPermissionProps = InferType<
  typeof AddUserLoginPermissionSchema
>;
