import type { TStatus } from '~/types/components/status'

export interface IApplication {
  photo: {
    file: string
  }
  study_plan_univer: {
    name: string
  }
  id: number
  date: string
  stage_id: {
    name: TStatus
  }
}

export type TFile = {
  id: number
  filename: string
  file_id: string
  file_url: string
  filesize: number
  file: string
}
