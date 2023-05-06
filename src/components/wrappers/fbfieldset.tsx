import FBInput from './fbinput'
import FBSelect from './fbselect'
import FBTextarea from './fbtextarea'

import Fieldset from '../fieldset'

import type { FBFieldProps, InputPropsMap } from '../../formbuilder.types'
import type { FC } from 'react'

const FBFieldset: FC<FBFieldProps<'fieldset'>> = (props) => {
  const ComponentMap: Record<keyof InputPropsMap, FC<FBFieldProps<any>>> = {
    fieldset: FBFieldset,
    input: FBInput,
    select: FBSelect,
    textarea: FBTextarea
  }

  return (
    <Fieldset {...props}>
      {props.fields.map((field) => {
        const Component = ComponentMap[field.component]
        return <Component key={field.id} {...field} />
      })}
    </Fieldset>
  )
}

export default FBFieldset
