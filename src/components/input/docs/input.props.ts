import { InputProps } from '../input.types'

export const BaseInputProps: InputProps = {
  id: 'input',
  name: 'input',
  label: 'Label',
  placeholder: 'Placeholder'
}

export const PasswordInputProps: InputProps = {
  ...BaseInputProps,
  type: 'password',
  required: true,
  errorMessages: {
    valueMissing: 'Required'
  }
}

export const ValidatedInputProps: InputProps = {
  ...BaseInputProps,
  required: true,
  minLength: 5,
  maxLength: 10,
  pattern: '[0-9]+',
  placeholder: 'Needs 5 to 10 digits',
  errorMessages: {
    valueMissing: 'Required',
    tooLong: 'Too Long',
    tooShort: 'Too Short',
    patternMismatch: 'Pattern Mismatch'
  }
}
