import { ValidityStateErrors } from '@hooks/useInputValidation.hook'
import { ChangeEvent, TextareaHTMLAttributes } from 'react'

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string
  label?: string
  value?: string
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
  errorMessages?: {
    [key in ValidityStateErrors]?: string
  }
}
