import {
  FormRenderingProps,
  FormRuleExecutionProps,
  FormValidationProps
} from './formbuilder.props'

import { Formbuilder } from '..'

import { Meta } from '@storybook/react'

const StoryDetails = {
  title: 'Formbuilder',
  component: Formbuilder
} as Meta<typeof Formbuilder>

export const FormRendering = {
  args: FormRenderingProps
}

export const FormValidation = {
  args: FormValidationProps
}

export const FormRuleExecution = {
  args: FormRuleExecutionProps
}

export default StoryDetails
