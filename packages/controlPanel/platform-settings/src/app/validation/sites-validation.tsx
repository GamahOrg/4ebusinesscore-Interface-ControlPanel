import {object, string, InferType, ref, number} from 'yup'
import differenceInDays from 'date-fns/differenceInDays'

export const siteSchema = object({
  siteName: string().required('siteNameIsRequired'),
  siteUrl: string().required('siteUrlIsRequired'),
})

export type platformSitesProps = InferType<typeof siteSchema>
