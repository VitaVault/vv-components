import { useInputValidation } from '../../hooks/useInputValidation.hook'
import { CSSClassGenerator } from '../../styles/css-class-name-gen'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import './input.scss'

import type { InputProps } from './input.types'
import type { FC } from 'react'

const componentName = 'input'

export const Input: FC<InputProps> = ({
  errorMessages,
  value: initialValue = '',
  type = 'text',
  onChange,
  label,
  id,
  hidden = false,
  ...props
}) => {
  const css = new CSSClassGenerator(componentName)
  const [inputType, setInputType] = useState(type ?? 'text')
  const {
    errorMessage,
    validateOnFocusEvent,
    value,
    setValue,
    changeHandler,
    inputRef,
    markAsTouched
  } = useInputValidation<HTMLInputElement>({
    errorMessages,
    defaultValue: initialValue,
    onChange
  })

  useEffect(() => {
    setValue(initialValue ?? '')
  }, [initialValue, setValue])

  return (
    <div className={clsx(css.elementClass('container'), { hidden })}>
      <input
        {...props}
        ref={inputRef}
        id={id}
        type={inputType}
        value={value}
        onChange={changeHandler}
        onBlur={validateOnFocusEvent}
        onFocus={markAsTouched}
        aria-hidden={hidden}
      />
      {label && <label htmlFor={id}>{label}</label>}
      {type === 'password' && (
        <button
          type="button"
          aria-label={`${
            inputType === 'password' ? 'Mostrar' : 'Ocultar'
          } contraseña`}
          onClick={() => {
            setInputType(inputType === 'password' ? 'text' : 'password')
          }}
        >
          {inputType === 'password' ? <FaEye /> : <FaEyeSlash />}
        </button>
      )}
      <p className={css.elementClass('error')} role="alert">
        {errorMessage}
      </p>
    </div>
  )
}
