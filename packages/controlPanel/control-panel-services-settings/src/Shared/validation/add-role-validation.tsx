import {object, string, InferType} from 'yup'

export const addRoleSchema = object({
  nameAr: string().required("RequiredInputField").matches(/^[ء-ي ]+$/, 'RoleNameMustBeInArabic'),
  nameEn: string().required("RequiredInputField").matches(/^[a-zA-Z ]+$/, 'RoleNameMustBeInEnglish'),

 roleCategoryId: string()
                .required('roleCategoryIdMustBeRequired')
                .test({test: (roleCategoryId:string|any) => roleCategoryId.replace(/\s/g, '').length > 0,
                 message: 'roleCategoryIdMustBeRequired'}),

  details: string()
       .required('roleDeatils')
       .test({test: (details:string|any) => details.replace(/\s/g, '').length > 0,
        message: 'roleDeatils'})
})

export type addRoleProps = InferType<typeof addRoleSchema>
