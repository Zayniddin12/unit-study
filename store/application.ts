export type UserApplication = {
  user_id?: number
  want_university_country_id?: {
    name: string
    id: number
  }
  wanted_level_education?: {
    name: string
    id: number
  }
  program?: {
    name: string
    id: number
  }
  enrollment_date?: string
  want_university_id?: {
    id?: number
    name?: string
  }
  diploma?: {
    filename?: string
    file_url?: string
  }[]
  diploma_rejected_reason?: string
  language_certificate?: {
    filename?: string
    file_url?: string
  }[]
  language_certificate_rejected_reason?: string
  other_certification?: {
    certification_name?: string
    certification_file?: string
    file_url?: string
  }[]
  other_certification_rejected_reason?: string
  links?: string
  description?: string
  status?: string
  planned_enrollment_year?: string
}
