export interface IResponse<T = unknown> {
  length: number
  next?: string | null
  previous?: null | string
  records: T[]
  current?: number
  currency?: number
}

export interface ICountry {
  id: number
  name: string
  code: string
}

export interface ILanguages {
  code: string
  name: string
}

export interface IFooter {
  id: number
  title: string
  url: string
  links: []
}

export interface INews {
  id: number
  create_date: string
  visits: number
  subtitle: string
  name: string
  university_id: {
    id: number
    name: string
  }
  image_url: string
  tag_ids: [
    {
      id: number
      name: string
    }
  ]
  next_record_id: number
  previous_record_id: number
}

export interface IGrants {
  id: number
  title: string
  short_description: string
  banner: string
  published_at: string
  views_count: number
}

export interface ILivingCondition {
  id: number
  title: string
  short_description: string
  icon_url: string
  banner: string
  body_html: string
}

export interface INewsResponse extends IResponse<INews> {}

export interface ICommonPageSingle {
  body_editorjs: {
    time: number
    blocks: [
      {
        id: number
        data: {
          text: string
        }
        type: string
      }
    ]
    version: string
  }
  body_html: string
  next_record_id: number
  previous_record_id: number
}

export interface INewsSingle extends INews, ICommonPageSingle {}

export interface IStaticPageSingle {
  id: number
  title: string
  banner: string
  body_editorjs: {
    time: number
    blocks: [
      {
        id: number
        data: {
          text: string
        }
        type: string
      }
    ]
    version: string
  }
  body_html: string
}

export interface IProfile {
  first_name: string
  last_name: string
  birth_date: string
  passport_number: string
  gender: string
  marital_status_id: string
  country_id: number
  phone: string
  user_email: string
  telegram: string
  instagram: string
  whatsapp: string
  facebook: string
  education_ids: unknown
  avatar: string
}

export interface IUniversity {
  id?: number
  name?: string
  logo_url?: string
  image_url?: string
  country_id?: {
    id?: number
    name?: string
  }
  city_id?: {
    id?: number
    name?: string
  }
  location?: string
  website?: string
  establishment?: string
  local_student_count?: number
  foreign_student_count?: number
  all_student_count?: number
  description?: string
  programs_count: number
  faculty_ids?: []
  faculty_counts?: number
  speciality_ids?: []
  department_ids?: []
  department_counts?: number
  form_of_education_id?: [
    {
      id?: number
      name?: string
    }
  ]
  professor_count?: number
  doctor_count?: number
  teacher_count?: number
  full_location?: string
  phone?: string
  email?: string
  candidate_count?: number
  associate_professor_count?: number
  all_teacher_count?: number
  bachelor_count?: number
  speciality_count?: number
  higher_personal_count?: number
  master_count?: number
}

export interface IProfileAndCabinet {
  user_id: number
  photo: string
  first_name: string
  last_name: string
  middle_name: string
  birth_date: string
  gender: string
  country: number
  contact_email: string
  contact_phone: string
  contact_telegram: string
  contact_whatsapp: string
  edu_degree: string
  edu_country: number
  edu_place: string
  edu_finished_year: number
  edu_started_year: number | string
  native_lang: string
  native_lang_text: string
  english_level: string
  english_level_display: string
  study_plan_degree: string
  study_plan_degree_extra: string
  study_plan_year: string
  study_plan_univer: string
  study_plan_univer_direction: string
  study_plan_form: string
  study_plan_form_display: string
  motivational_letter: string
}

export interface IWhyUzbSlider {
  id: number
  title: string
  short_description: string
  banner: string
  url: string
}

export interface IStats {
  universities_count: number
  migrant_students_count: number
  universities_with_high_ranking_count: number
}

export interface IReview {
  id: number
  author_name: string
  author_country: string
  author_region: string
  photo: string
  content: string
}

export interface IMoveList {
  id: number
  title: string
  short_description: string
  icon: string
  url: string
}

export interface IMenistryTeam {
  id: number
  full_name: string
  photo: string
  ministry: string
  position: string
  phone: string
  email: string
  about: string
  body_html: string
  latitude: number
  region_id: number
  ustav: string
}

export interface IExplorePlaces {
  id: number
  title: string
  type: string
  type_display: string
  phone: string
  tg_whatsapp_phone: string
  email: string
  website: string
  region: {
    id: number
    name: string
  }
  address: string
  latitude: number
  longitude: number
  logo: string
  banner: string
  foundation_year: number
  students_count: number
  migrant_students_count: number
  faculties_count: number
  departments_count: number
  study_forms: number[]
  study_forms_display: string
  teachers_count: number
  professors_count: number
  associate_professors_count: number
  science_doctors_count: number
  science_candidates_count: number
  foreign_teachers_count: number
  main_programs: {
    count: number
    by_degree: {
      degree: string
      count: number
    }[]
  }
  extra_programs: {
    count: number
    by_type: {
      type: string
      count: number
    }[]
  }
  about_editorjs: any
  student_success_text: string
  conditions_for_foreign_students_editorjs: any
  international_partnership_editorjs: any
  media: string[]
  airports_count: number
  libraries_count: number
  museums_count: number
  population: number
  universities_count: number
  railway_stations_count: number
}

export interface IBanner {
  id: number
  title: string
  description: string
  image_url: string
}

export interface ISteps {
  step_title: string
  step_description: string
  step_url: string
  step1_title: string
  step1_description: string
  step1_url: string
  step2_title: string
  step2_description: string
  step2_url: string
  step3_title: string
  step3_description: string
  step3_url: string
  step4_title: string
  step4_description: string
  step4_url: string
  step5_title: string
  step5_description: string
  step5_url: string
}

export interface IStudyType {
  id: number
  name: string
}

export interface IStudyPeriod {
  id: number
  name: string
}

export interface IgetTitles {
  uzbekistan_text: string
  uzbekistan_subtext: string
  uzbekistan_learning: string
}

export interface IService {
  id: number
  price: number
  title: string
  tab: {
    title: string
    subtitle: string
    service: {
      id: 1
      title: string
    }[]
  }[]
}

export interface IContactInfos {
  id: number
  phone: string
  mobile: string
  email: string
  website: string
  facebook: string
  linkedin: string
  instagram: string
  youtube: string
  telegram: string
  branches: Branch[]
}

export type Branch = {
  id: number
  street: string
  city: string
  country_id: {
    id: number
    name: string
  }
  latitude: number
  longitude: number
  contact_id: IContactInfos
  complete_address: string
}

export type StaticPage = {
  title: string
  body: string
}
