import { useInputValidation } from '@hooks/useInputValidation.hook'
import { CSSClassGenerator } from '@styles/css-class-name-gen'
import clsx from 'clsx'
import { FC, useEffect } from 'react'

import type { SelectProps } from './select.types'

import './select.scss'

const componentName = 'select'

export const Select: FC<SelectProps> = ({
  id,
  label,
  defaultValue,
  value: propValue,
  errorMessages,
  onChange,
  hidden = false,
  children,
  ...props
}) => {
  const css = new CSSClassGenerator(componentName)
  const {
    errorMessage,
    changeHandler,
    validateOnFocusEvent,
    value,
    setValue,
    inputRef,
    markAsTouched
  } = useInputValidation({
    errorMessages,
    onChange,
    defaultValue: defaultValue || propValue || ''
  })

  useEffect(() => {
    setValue(defaultValue || propValue || '')
  }, [defaultValue, propValue, setValue])

  return (
    <div className={clsx(css.elementClass('container'), { hidden })}>
      <select
        {...props}
        ref={inputRef}
        id={id}
        onChange={changeHandler}
        value={value}
        onBlur={validateOnFocusEvent}
        onFocus={markAsTouched}
        aria-hidden={hidden}
      >
        {children}
      </select>
      {label && <label htmlFor={id}>{label}</label>}
      <p className={css.elementClass('error')} role="alert">
        {errorMessage}
      </p>
    </div>
  )
}
