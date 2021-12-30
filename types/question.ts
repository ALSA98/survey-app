export enum QuestionMode {
  Checkbox,
  Radio,
  Text,
  Info,
}

export interface QuestionOption {
  id: string // it's Question id plus "-{optionNumber}"
  text: string
}

export interface Question {
  id: string
  page: number | 'welcome' | 'end'
  title: string
  description?: string
  mode: QuestionMode
  options?: QuestionOption[]
}
