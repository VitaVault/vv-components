import type { ValidityStateErrors } from '@hooks/useInputValidation.hook'
import type { ChangeEvent, InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  label: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  errorMessages?: {
    [key in ValidityStateErrors]?: string
  }
}
