import Select from '../select'

import type { FBFieldProps } from '../../formbuilder.types'
import type { FC } from 'react'

const FBSelect: FC<FBFieldProps<'select'>> = ({
  datalist,
  zeroOption,
  value,
  ...props
}) => {
  return (
    <Select {...props} value={value ?? zeroOption?.value ?? ''}>
      {zeroOption && <option value="">{zeroOption.label}</option>}
      {datalist.map(({ label, value, props: optProps }) => (
        <option {...optProps} value={value} key={value}>
          {label}
        </option>
      ))}
    </Select>
  )
}

export default FBSelect
