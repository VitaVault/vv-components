import { OptionHTMLAttributes } from 'react'

import type { FieldsetProps } from './components/fieldset/fieldset.types'
import type { InputProps } from './components/input/input.types'
import type { SelectProps } from './components/select/select.types'
import type { TextareaProps } from './components/textarea/textarea.types'

export type InputPropsMap = {
  input: FBInputProps
  select: FBSelectProps
  textarea: FBTextareaProps
  fieldset: FBFieldsetProps
}

export type InputVariantsMap = {
  input: 'base'
  select: 'base'
  textarea: 'base'
  fieldset: 'base'
}

export type FBField = FBFieldProps<keyof InputPropsMap>

interface FBFieldControlProps {
  component: keyof InputPropsMap
}

export type FBInputProps = InputProps
export type FBTextareaProps = TextareaProps
export interface FBSelectProps extends SelectProps {
  zeroOption?: {
    value: string
    label: string
    props?: OptionHTMLAttributes<HTMLOptionElement>
  }
  datalist: Array<{
    value: string
    label: string
    props?: OptionHTMLAttributes<HTMLOptionElement>
  }>
}
export interface FBFieldsetProps extends FieldsetProps {
  fields: Array<FBField>
}

export type FBFieldProps<T extends keyof InputPropsMap> = InputPropsMap[T] &
  FBFieldControlProps & {
    component: T
    variant: InputVariantsMap[T]
  }

export type WhenClause =
  | {
      field: string
      operator: 'IN' | 'NIN'
      value: string[]
    }
  | {
      field: string
      operator: 'EQUALS' | 'NEQUALS' | 'EXISTS' | 'NEXISTS' | 'CHANGED'
      value: string
    }

export interface ThenClause {
  data: Partial<FBField>
  fetch?: true
}

export interface Rule {
  when: WhenClause[]
  then: ThenClause
}

export interface FormFormat {
  name: string
  title: string
  submitLabel: string
  fields: FBField[]
  rules: {
    [key: string]: Rule[]
  }
}