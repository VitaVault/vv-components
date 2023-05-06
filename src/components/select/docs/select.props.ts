import { SelectProps } from '../select.types'

export const BaseSelectProps: SelectProps = {
  id: 'select',
  name: 'select',
  label: 'Label'
}

export const ValidatedSelectProps: SelectProps = {
  ...BaseSelectProps,
  required: true,
  value: '',
  errorMessages: {
    valueMissing: 'Value Missing'
  }
}
