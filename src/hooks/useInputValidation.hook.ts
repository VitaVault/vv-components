import { ChangeEvent, FocusEvent, useRef, useState } from 'react'

export type ValidityStateErrors =
  | 'valueMissing'
  | 'typeMismatch'
  | 'patternMismatch'
  | 'tooShort'
  | 'tooLong'
  | 'rangeUnderflow'
  | 'rangeOverflow'
  | 'stepMismatch'
  | 'badInput'
const SUPPORTED_INPUT_ERRORS: ValidityStateErrors[] = [
  'valueMissing',
  'typeMismatch',
  'patternMismatch',
  'tooShort',
  'tooLong',
  'rangeUnderflow',
  'rangeOverflow',
  'stepMismatch',
  'badInput'
]
type SUPPORTED_FIELD_TYPES =
  | HTMLTextAreaElement
  | HTMLInputElement
  | HTMLSelectElement

interface Args<T extends SUPPORTED_FIELD_TYPES> {
  defaultValue?: string | readonly string[] | number
  errorMessages?: { [key in ValidityStateErrors]?: string }
  onChange?: (e: ChangeEvent<T>) => void
}

/**
 * @typeParam T - HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
 * @typeParam P - If specified, then it is understood this is a "masking" input for T. see Textarea component
 * @returns
 */
export function useInputValidation<T extends SUPPORTED_FIELD_TYPES>({
  defaultValue,
  errorMessages,
  onChange
}: Args<T>) {
  const inputRef = useRef<T>(null)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [value, setValue] = useState(defaultValue ?? '')

  const changeHandler = (e: ChangeEvent<T>) => {
    e.target.setCustomValidity('')
    setValue(e.target.value)
    if (onChange) {
      onChange(e)
    }
    setErrorMessage('')
  }

  const markAsTouched = () => {
    inputRef.current?.setAttribute('data-touched', 'true')
  }

  const validateOnFocusEvent = (event: FocusEvent<T>): void => {
    const { valid } = event.currentTarget.validity
    const { currentTarget } = event
    currentTarget.setCustomValidity('')

    if (currentTarget.type === 'textarea' && valid) {
      const target = event.currentTarget as T & HTMLTextAreaElement
      if (target.minLength && target.minLength > target.value.length) {
        setErrorMessage(
          errorMessages?.tooShort ??
            `Escribe al menos ${target.minLength} caracteres`
        )
        currentTarget.setCustomValidity(
          errorMessages?.tooShort ??
            `Escribe al menos ${target.minLength} caracteres`
        )
      }
    }

    if (!valid) {
      const firstError = SUPPORTED_INPUT_ERRORS.find((key) => {
        return currentTarget.validity[key]
      })

      if (firstError && errorMessages && errorMessages[firstError]) {
        setErrorMessage(errorMessages[firstError] ?? '')
        currentTarget.setCustomValidity(errorMessages[firstError] ?? '')
      }
    }
  }

  return {
    errorMessage,
    setErrorMessage,
    validateOnFocusEvent,
    changeHandler,
    value,
    setValue,
    inputRef,
    markAsTouched
  }
}
