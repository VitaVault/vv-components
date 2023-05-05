import { paramCase } from 'change-case'

export class CSSClassGenerator {
  constructor(private readonly component: string) {}

  elementClass(className: string) {
    return `${this.component}-${paramCase(className)}`
  }

  propClass(propName: string, propVal: string | boolean) {
    const sluggedProp = paramCase(propName)
    switch (typeof propVal) {
      case 'string':
        return `${this.component}-${sluggedProp}-${paramCase(propVal)}`
      case 'boolean':
        if (propVal) {
          return `${this.component}-${sluggedProp}`
        } else {
          return `${this.component}-non-${sluggedProp}`
        }
      default:
        return `${this.component}-${sluggedProp}`
    }
  }
}
