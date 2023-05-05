import { TextareaProps } from '../textarea.types'

export const BaseTextareaProps: TextareaProps = {
  id: 'textarea',
  name: 'textarea',
  label: 'Label',
  placeholder: 'Write here...'
}

export const NativeTextareaProps: TextareaProps = {
  ...BaseTextareaProps,
  rows: 10,
  cols: 5
}

export const ValidatedTextareaProps: TextareaProps = {
  ...BaseTextareaProps,
  required: true,
  minLength: 5,
  maxLength: 10,

  errorMessages: {
    valueMissing: 'Required',
    tooLong: 'Too Long',
    tooShort: 'Too Short',
    patternMismatch: 'Pattern Mismatch'
  }
}
