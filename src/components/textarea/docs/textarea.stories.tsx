import {
  BaseTextareaProps,
  NativeTextareaProps,
  ValidatedTextareaProps
} from './textarea.props'

import Textarea from '..'

import { Meta } from '@storybook/react'

const StoryDetails = {
  title: 'Utilities/Textarea',
  component: Textarea
} as Meta<typeof Textarea>

export const BaseTextarea = {
  args: BaseTextareaProps
}

export const NativeTextarea = {
  args: NativeTextareaProps
}

export const ValidatedTextarea = {
  args: ValidatedTextareaProps
}

export default StoryDetails
