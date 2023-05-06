import FBForm from './components/wrappers/fbForm'
import FBFieldset from './components/wrappers/fbfieldset'
import FBInput from './components/wrappers/fbinput'
import FBSelect from './components/wrappers/fbselect'
import FBTextarea from './components/wrappers/fbtextarea'
import { CSSClassGenerator } from './styles/css-class-name-gen'
import FBUtils from './utils'

import { ChangeEvent, FC, useState } from 'react'

import type { FBField, FBFieldProps, FormFormat } from './formbuilder.types'
import type { formSubmitCallback } from './hooks/useFormValidation.hook'

const componentName = 'formbuilder'

export const Formbuilder: FC<FormFormat> = ({
  submitLabel,
  fields: initialFields,
  rules
}) => {
  const css = new CSSClassGenerator(componentName)
  const fb = new FBUtils(FBFieldset, FBInput, FBTextarea, FBSelect)
  const [formFields, setFormFields] = useState(initialFields)
  const onFieldChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const updatedFields = FBUtils.modifyField(e.target.id, formFields, {
      value: e.target.value
    })
    const ruleEvaluationQueue = FBUtils.createRuleExecutionQueue(
      e.target.id,
      rules
    )
    const fieldsWithRulesApplied = FBUtils.evaluateRuleEvacuationQueue(
      ruleEvaluationQueue,
      updatedFields
    )
    setFormFields(fieldsWithRulesApplied)
  }

  const processForm = (fields: FBField[]) => {
    const mappedFields: JSX.Element[] = []
    fields.forEach((props) => {
      switch (props.component) {
        case 'input':
          mappedFields.push(
            <fb.input
              key={props.id}
              {...(props as FBFieldProps<'input'>)}
              onChange={onFieldChange}
            />
          )
          break
        case 'select':
          mappedFields.push(
            <fb.select
              key={props.id}
              {...(props as FBFieldProps<'select'>)}
              onChange={onFieldChange}
            />
          )
          break
        case 'textarea':
          mappedFields.push(
            <fb.textarea
              key={props.id}
              {...(props as FBFieldProps<'textarea'>)}
              onChange={onFieldChange}
            />
          )
          break
        case 'fieldset':
          mappedFields.push(
            <fb.fieldset
              key={props.id}
              {...(props as FBFieldProps<'fieldset'>)}
            />
          )
          break
      }
    })

    return mappedFields
  }

  const onSubmit: formSubmitCallback = (submitEvent, formData) => {
    console.log('Submit Event: ', submitEvent)
    console.log('Form Data: ', formData)
  }

  return (
    <FBForm onSubmit={onSubmit}>
      {processForm(formFields).map((item) => item)}
      <button className={css.elementClass('error')} type="submit">
        {submitLabel}
      </button>
    </FBForm>
  )
}
