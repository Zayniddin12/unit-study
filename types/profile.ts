export interface EducationDegrees {
  id: number
  name: string
}

export interface EducationDegrees {
  id: number
  name: string
}

export interface IEducationDirections {
  id: number
  name: string
}

export interface ImageUploader {
  id: string
  file: string
}

export interface ICountryResponse {
  id: number
  code: string
  name: string
}

export interface IUserFallback {
  phone: string
  email: string
  telegram: string
  instagram: string
  whatsapp: string
  facebook: string
}

export interface ProfileUpdate {
  edu_degree: number
  edu_country: number
  edu_place: string
  edu_place_display: string
  edu_finished_year: string
  edu_started_year: string
  native_lang: number
  english_level: number
}

export interface ProfileInfos {
  photo: boolean
  name: boolean
  lastname: boolean
  date: boolean
  gender: boolean
  country: boolean
  marital: boolean
}

export interface IUser extends IUserFallback {
  id: number
  photo: string | ImageUploader
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  country_id: number
  passport_number: string
  address: string
  country_name: string
  gender: string
  country: number | ICountryResponse
  contact_email: string
  contact_phone: string
  contact_telegram: string
  contact_whatsapp: string
  edu_degree: number
  edu_country: number
  edu_place: string
  edu_finished_year: number | string
  edu_started_year: number | string
  native_lang: string
  native_lang_text: string
  english_level: string | number
  study_plan_degree: number | string
  study_plan_degree_extra: number | string
  study_plan_year: number
  study_plan_univer_direction: number
  study_plan_univer: number
  study_plan_form: number
  motivational_letter: string
  image_1920: string
  image_1920_url: string
}

export interface IPersonalInfo {
  photo: string | ImageUploader
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  country: number | ICountryResponse
}

export interface ICabinetContactForm {
  contact_email: string
  contact_phone: string
  contact_telegram: string
  contact_whatsapp: string
}

export interface ICabinetEducationForm {
  edu_degree: number
  edu_country: number
  edu_place: string
  edu_finished_year: number | string
  edu_started_year: number | string
  native_lang: string
  native_lang_text: string
  english_level: string
}

export interface IFormOfTrainingForm {
  study_plan_univer_direction: number
  study_plan_univer: number
  study_plan_form: number
}

export interface IWhereWantToStudyForm {
  study_plan_degree: number
  study_plan_degree_extra: number
  study_plan_year: number
}

export interface ICabinetMoverLetterForm {
  motivational_letter: string
}

export type IProfileFeatures =
  | ICabinetContactForm
  | ICabinetEducationForm
  | IPersonalInfo
  | IFormOfTrainingForm
  | ICabinetMoverLetterForm
  | IWhereWantToStudyForm
