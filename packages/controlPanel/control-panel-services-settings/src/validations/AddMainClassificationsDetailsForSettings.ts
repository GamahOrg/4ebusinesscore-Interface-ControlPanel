import { object, string, InferType, number} from "yup";
export const AddMainClassificationsDetailsForSettingsSchema = object({
  serviceType: number().notRequired(),
  titleForOrders: string().required("InputFieldIsRequried"),
  titleDescriptionForOrders: string().required("InputFieldIsRequried"),
  mainClassificationDescriptionForOrders: string().required("InputFieldIsRequried"),
  catalogDescriptionForOrders: string().required("InputFieldIsRequried"),
  categoryDescriptionForOrders: string().required("InputFieldIsRequried"),
  itemDescriptionForOrders: string().required("InputFieldIsRequried"),
  subjectDescriptionForOrders: string().required("InputFieldIsRequried"),
  titleForReports: string().required("InputFieldIsRequried"),
  titleDescriptionForReports: string().required("InputFieldIsRequried"),
  mainClassificationDescriptionForReports: string().required("InputFieldIsRequried"),
  catalogDescriptionForReports: string().required("InputFieldIsRequried"),
  categoryDescriptionForReports: string().required("InputFieldIsRequried"),
  itemDescriptionForReports: string().required("InputFieldIsRequried"),
  subjectDescriptionForReports: string().required("InputFieldIsRequried"),
});



export type AddMainClassificationsDetailsForSettingsProps = InferType<
  typeof AddMainClassificationsDetailsForSettingsSchema
>;
