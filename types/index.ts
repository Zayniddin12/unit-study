export interface IParams {
  [key: string]: string | number | boolean | undefined
}

export enum MaritalStatus {
  SINGLE = 'single',
  MARRIED = 'married',
  DIVORCED = 'divorced',
  WIDOWED = 'widowed',
}

export type Pagination = {
  page: number
  page_size?: number | string
  limit?: number | string
  domain?: [(string | number | unknown)[]]
  query?: string
}

export type SelectOption = {
  id: number | string | null
  name: string
}

export type ErrorResponse = {
  _data: {
    detail: {
      code: string
      message: string
    }
  }
}
