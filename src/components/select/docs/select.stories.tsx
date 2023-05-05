import { BaseSelectProps, ValidatedSelectProps } from './select.props'

import Select from '..'
import { SelectProps } from '../select.types'

import { Meta, StoryFn } from '@storybook/react'

const StoryDetails = {
  title: 'Utilities/Select',
  component: Select
} as Meta<typeof Select>

const Template: StoryFn<typeof Select> = ({ ...args }: SelectProps) => (
  <Select placeholder="Select one" {...args}>
    <option value="1">Option 1</option>
    <option value="2">Option 2</option>
    <option value="3">Option 3</option>
  </Select>
)

export const BaseSelect = {
  render: Template,
  args: BaseSelectProps
}

export const ValidatedSelect = {
  render: (args: SelectProps) => (
    <Select placeholder="Select one" {...args}>
      <option value="">INVALID OPT</option>
    </Select>
  ),
  args: ValidatedSelectProps
}

export default StoryDetails
