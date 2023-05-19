import { ValidityStateErrors } from '../../hooks/useInputValidation.hook'

import type {
  ChangeEvent,
  HTMLInputTypeAttribute,
  InputHTMLAttributes
} from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  label: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  type?: Exclude<HTMLInputTypeAttribute, 'number'>
  errorMessages?: {
    [key in ValidityStateErrors]?: string
  }
}
