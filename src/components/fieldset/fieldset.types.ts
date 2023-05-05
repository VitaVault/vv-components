import { FieldsetHTMLAttributes, ReactElement } from 'react'

export type AvailableComponents = 'input' | 'select' | 'textarea' | 'fieldset'

export interface FieldsetProps
  extends FieldsetHTMLAttributes<HTMLFieldSetElement> {
  id: string
  alignment?: 'Horizontal' | 'Vertical'
  bordered?: boolean
  legend?: string
  children?: ReactElement | ReactElement[]
  footnote?: string
}
