import type {
  FBField,
  FBFieldProps,
  Rule,
  ThenClause,
  WhenClause
} from './formbuilder.types'
import type { FC } from 'react'

type RuleExecutionQueue = [string, ThenClause][]

export default class FormbuilderUtils {
  constructor(
    public fieldset: FC<FBFieldProps<'fieldset'>>,
    public input: FC<FBFieldProps<'input'>>,
    public textarea: FC<FBFieldProps<'textarea'>>,
    public select: FC<FBFieldProps<'select'>>
  ) {}

  FlattenFields(fields: FBField[]): FBField[] {
    const flattenedFields: FBField[] = []

    fields.forEach((field) => {
      if (field.component === 'fieldset') {
        flattenedFields.push(
          ...this.FlattenFields((field as FBFieldProps<'fieldset'>).fields)
        )
      } else {
        flattenedFields.push(field)
      }
    })

    return flattenedFields
  }

  static findField(id: string): HTMLElement | null {
    return document.getElementById(id)
  }

  static shouldExecuteRule(whens: WhenClause[]): boolean {
    for (let i = 0; i < whens.length; i++) {
      const element = this.findField(whens[i].field) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
      if (!element) return false

      switch (whens[i].operator) {
        case 'IN':
          if (!whens[i].value.includes(element.value)) return false
          break
        case 'NIN':
          if (whens[i].value.includes(element.value)) return false
          break
        case 'EQUALS':
          if (whens[i].value !== element.value) return false
          break
        case 'NEQUALS':
          if (whens[i].value === element.value) return false
          break
        case 'EXISTS':
          if (element.value) return false
          break
        case 'NEXISTS':
          if (!element.value) return false
          break
        case 'CHANGED':
          break
      }
    }
    return true
  }

  static createRuleExecutionQueue(
    triggeringFieldID: string,
    rules: { [key: string]: Rule[] }
  ): RuleExecutionQueue {
    const queue: RuleExecutionQueue = []

    Object.keys(rules).forEach((ruleFieldID) => {
      const fieldRules = rules[ruleFieldID]
      fieldRules.forEach((fieldRule) => {
        if (
          fieldRule.when.find(
            (condition) => condition.field === triggeringFieldID
          )
        ) {
          if (this.shouldExecuteRule(fieldRule.when)) {
            queue.push([ruleFieldID, fieldRule.then])
          }
        }
      })
    })

    return queue
  }

  static modifyField(
    id: string,
    fields: FBFieldProps<any>[],
    props: Partial<FBField>
  ) {
    const fieldsCopy = JSON.parse(JSON.stringify(fields))

    for (let i = 0; i < fieldsCopy.length; i++) {
      if (fieldsCopy[i].id === id) {
        if (fieldsCopy[i].component === 'fieldset') {
          fieldsCopy[i] = this.modifyField(id, fieldsCopy[i].fields, props)
        } else {
          fieldsCopy[i] = {
            ...fieldsCopy[i],
            ...props
          }
        }
      }
    }

    return fieldsCopy
  }

  static evaluateRuleEvacuationQueue(
    queue: RuleExecutionQueue,
    fields: FBField[]
  ) {
    let fieldsCopy = JSON.parse(JSON.stringify(fields))
    queue.forEach(([fieldID, thenClause]) => {
      fieldsCopy = this.modifyField(fieldID, fieldsCopy, thenClause.data)
    })
    return fieldsCopy
  }
}
