import type { IResponse, IUniversity } from '~/types/common'
import type { SelectOption } from '~/types/index'

export interface IScholarship {
  id: number
  name: string
  money_per_period?: string
  currency?: string
  money_period?: string
  money_period_display?: string
  university: IUniversity
  edu_type?: string
}

export interface IUniversityMap {
  id: number
  name: string
  location: string
  logo: string
  latitude?: string
  longitude?: string
}

export interface IuniversitySingle {
  id: number
  view_count: number
  image_url: string
  title: string
  end_date: string
  language_of_education: {
    id: number
    name: string
  }
  website: string
  country_id: {
    id: number
    name: string
  }
  education_level_ids: {
    id: number
    name: string
  }
  description: string
  next_record_id: number
  previous_record_id: number
}

export interface IScholarshipResponse extends IResponse<IScholarship> {}

export interface Program {
  id: number
  university_id: IUniversity
  name: string
  education_level_ids: SelectOption
  course_of_study_id: SelectOption
  form_of_education: SelectOption
  language_of_education: SelectOption
  subject_count: number
  duration: number
  contract: number
  currency: SelectOption
  description: string
  slug: string
  subject_ids: SelectOption[]
}
