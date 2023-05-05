import {
  FBFieldProps,
  FormFormat,
  InputPropsMap,
  ThenClause,
  WhenClause
} from '../formbuilder.types'

import { ValidityStateErrors } from '@hooks/useInputValidation.hook'

const mockErrorMessages: Record<ValidityStateErrors, string> = {
  valueMissing: 'Required field',
  typeMismatch: 'Input type mismatch',
  patternMismatch: 'Pattern mismatch',
  tooShort: 'Field too short',
  tooLong: 'Field too long',
  rangeUnderflow: 'Value too low',
  rangeOverflow: 'Value too high',
  stepMismatch: 'Value not a multiple of step',
  badInput: 'Value not processable'
}

const mockBasicProps = (
  id: string
): {
  id: string
  name: string
  placeholder: string
  label: string
  variant: 'base'
  errorMessages: Record<ValidityStateErrors, string>
} => ({
  id,
  name: id,
  placeholder: 'Placeholder',
  label: id,
  variant: 'base',
  errorMessages: mockErrorMessages
})

export const mockInput = (
  id: string,
  props: Partial<FBFieldProps<'input'>> = {}
): FBFieldProps<'input'> => {
  return {
    ...mockBasicProps(id),
    type: 'text',
    component: 'input',
    ...props
  }
}

export const mockTextarea = (
  id: string,
  props: Partial<FBFieldProps<'textarea'>> = {}
): FBFieldProps<'textarea'> => {
  return {
    ...mockBasicProps(id),
    component: 'textarea',
    rows: 5,
    ...props
  }
}

export const mockSelect = (
  id: string,
  props: Partial<FBFieldProps<'select'>> = {}
): FBFieldProps<'select'> => {
  return {
    ...mockBasicProps(id),
    component: 'select',
    datalist: [
      {
        value: '1',
        label: 'Polio'
      },
      {
        value: '2',
        label: 'Malaria'
      },
      {
        value: '3',
        label: 'Hepatitis'
      }
    ],
    value: '1',
    ...props
  }
}

export const mockFieldset = (
  id: string,
  props: Partial<FBFieldProps<'fieldset'>> = {}
): FBFieldProps<'fieldset'> => {
  return {
    ...mockBasicProps(id),
    component: 'fieldset',
    fields: [],
    ...props
  }
}

export const FormMock = (
  name: string,
  fields: FBFieldProps<keyof InputPropsMap>[] = [],
  rules: { [key: string]: { when: WhenClause[]; then: ThenClause }[] } = {}
): FormFormat => ({
  name,
  title: name,
  submitLabel: 'Submit',
  fields: fields,
  rules: rules
})
