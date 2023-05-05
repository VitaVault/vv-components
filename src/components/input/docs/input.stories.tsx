import {
  BaseInputProps,
  PasswordInputProps,
  ValidatedInputProps
} from './input.props'

import Input from '..'

import { Meta } from '@storybook/react'

const StoryDetails = {
  title: 'Utilities/Input',
  component: Input
} as Meta<typeof Input>

export const BaseInput = {
  args: BaseInputProps
}

export const PasswordInput = {
  args: PasswordInputProps
}

export const ValidatedInput = {
  args: ValidatedInputProps
}

export default StoryDetails
