import { ValidityStateErrors } from '@hooks/useInputValidation.hook'
import { SelectHTMLAttributes } from 'react'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  children?: React.ReactNode[] | React.ReactNode
  label?: string
  hidden?: boolean
  errorMessages?: {
    [key in ValidityStateErrors]?: string
  }
}
