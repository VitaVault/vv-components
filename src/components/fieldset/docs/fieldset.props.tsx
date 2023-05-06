import { FieldsetProps } from '../fieldset.types'

export const BaseFieldsetProps: FieldsetProps = {
  id: 'fieldset',
  alignment: 'Vertical',
  legend: 'Fieldset Legend',
  footnote: 'Text reserved for Fieldset footnotes or disclosures.'
}

export const HorizontalFieldsetProps: FieldsetProps = {
  id: 'fieldset',
  alignment: 'Horizontal',
  legend: 'Horizontal Fieldset Legend',
  footnote: 'Text reserved for Fieldset footnotes or disclosures.'
}

export const BorderlessFieldsetProps: FieldsetProps = {
  id: 'fieldset',
  bordered: false,
  legend: 'Horizontal Fieldset Legend',
  footnote: 'Text reserved for Fieldset footnotes or disclosures.'
}

export const FieldsetNoTextProps: FieldsetProps = {
  id: 'fieldset',
  alignment: 'Horizontal',
  bordered: false
}
