import Input from '@components/input'

import type { FBFieldProps } from '../../formbuilder.types'
import type { FC } from 'react'

const FBInput: FC<FBFieldProps<'input'>> = (props) => {
  return <Input {...props} />
}

export default FBInput
