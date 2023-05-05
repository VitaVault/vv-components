import {
  formSubmitCallback,
  useFormValidation
} from '@hooks/useFormValidation.hook'
import { CSSClassGenerator } from '@styles/css-class-name-gen'

import type { FC, ReactNode } from 'react'

interface FBFormProps {
  onSubmit: formSubmitCallback
  children: ReactNode | ReactNode[]
}

const componentName = 'fbform'
const FBForm: FC<FBFormProps> = ({ onSubmit, children }) => {
  const css = new CSSClassGenerator(componentName)
  const { formError, submitHandler } = useFormValidation()

  return (
    <form onSubmit={(e) => submitHandler(e, onSubmit)} noValidate>
      {children}
      <p className={css.elementClass('error')}>{formError}</p>
    </form>
  )
}

export default FBForm
