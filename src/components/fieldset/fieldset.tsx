import { CSSClassGenerator } from '../../styles/css-class-name-gen'

import clsx from 'clsx'

import type { FieldsetProps } from './fieldset.types'
import type { FC } from 'react'

import './fieldset.scss'

const componentName = 'fieldset'

export const Fieldset: FC<FieldsetProps> = ({
  alignment = 'Vertical',
  legend,
  children,
  footnote,
  bordered = true,
  hidden = false
}) => {
  const css = new CSSClassGenerator(componentName)

  return (
    <fieldset
      className={clsx(
        css.elementClass('container'),
        css.propClass('alignment', alignment),
        css.propClass('bordered', bordered),
        { hidden }
      )}
      aria-hidden={hidden}
    >
      {legend && <legend>{legend}</legend>}
      <div className={css.elementClass('content')}>{children}</div>
      {footnote && <p className={css.elementClass('footnote')}>{footnote}</p>}
    </fieldset>
  )
}
