import Textarea from '../textarea'

import type { FBFieldProps } from '../../formbuilder.types'
import type { FC } from 'react'

const FBTextarea: FC<FBFieldProps<'textarea'>> = (props) => {
  return <Textarea {...props} />
}

export default FBTextarea
