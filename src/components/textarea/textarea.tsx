import { useInputValidation } from '../../hooks/useInputValidation.hook'
import { CSSClassGenerator } from '../../styles/css-class-name-gen'

import clsx from 'clsx'
import { FC, useEffect } from 'react'

import './textarea.scss'
import type { TextareaProps } from './textarea.types'

const componentName = 'textarea'

export const Textarea: FC<TextareaProps> = ({
  id,
  label,
  errorMessages,
  value: initialValue,
  onChange,
  rows = 3,
  hidden = false,
  ...props
}) => {
  const css = new CSSClassGenerator(componentName)

  const {
    errorMessage,
    validateOnFocusEvent,
    changeHandler,
    value,
    setValue,
    inputRef,
    markAsTouched
  } = useInputValidation<HTMLTextAreaElement>({
    errorMessages,
    defaultValue: initialValue ?? '',
    onChange
  })

  useEffect(() => {
    setValue(initialValue ?? '')
  }, [initialValue, setValue])

  return (
    <div className={clsx(css.elementClass('container'), { hidden })}>
      <textarea
        {...props}
        id={id}
        ref={inputRef}
        rows={rows}
        value={value}
        onChange={changeHandler}
        onBlur={validateOnFocusEvent}
        onFocus={markAsTouched}
        aria-hidden={hidden}
      ></textarea>
      {label && <label htmlFor={id}>{label}</label>}
      <p className={css.elementClass('error')} role="alert">
        {errorMessage}
      </p>
    </div>
  )
}
