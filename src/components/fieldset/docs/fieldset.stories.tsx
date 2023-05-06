import {
  BaseFieldsetProps,
  BorderlessFieldsetProps,
  FieldsetNoTextProps,
  HorizontalFieldsetProps
} from './fieldset.props'

import Fieldset from '..'
import Input from '../../input'
import { BaseInputProps } from '../../input/docs/input.props'
import Select from '../../select'
import { BaseSelectProps } from '../../select/docs/select.props'
import Textarea from '../../textarea'
import { BaseTextareaProps } from '../../textarea/docs/textarea.props'

import { Meta, StoryFn } from '@storybook/react'

const StoryDetails = {
  title: 'Utilities/Fieldset',
  component: Fieldset
} as Meta<typeof Fieldset>

const Template: StoryFn<typeof Fieldset> = (args) => (
  <Fieldset {...args}>
    <Input {...BaseInputProps} />
    <Select {...BaseSelectProps}>
      <option value="1">Option 1</option>
    </Select>
    <Textarea {...BaseTextareaProps} />
  </Fieldset>
)

const HorizontalTemplate: StoryFn<typeof Fieldset> = (args) => (
  <Fieldset {...args}>
    <Input {...BaseInputProps} id="1" />
    <Input {...BaseInputProps} id="2" />
    <Input {...BaseInputProps} id="3" />
  </Fieldset>
)

export const BaseFieldset = {
  render: Template,
  args: BaseFieldsetProps
}

export const HorizontalFieldset = {
  render: HorizontalTemplate,
  args: HorizontalFieldsetProps
}

export const BorderlessFieldset = {
  render: Template,
  args: BorderlessFieldsetProps
}

export const FieldsetWithoutText = {
  render: HorizontalTemplate,
  args: FieldsetNoTextProps
}

export default StoryDetails
