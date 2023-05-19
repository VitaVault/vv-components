import { InputProps } from './components/input/input.types'
import { TextareaProps } from './components/textarea/textarea.types'

import type {
  FBField,
  FBFieldProps,
  FormFormat,
  Rule,
  ThenClause,
  WhenClause
} from './formbuilder.types'
import type { FC } from 'react'

type RuleExecutionQueue = [string, ThenClause][]

const EMAIL_REGEX = new RegExp(
  "[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(.[a-z0-9-]+)*"
)
const URL_REGEX =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/
export default class FormbuilderUtils {
  public static validators = {
    required: (field: FBField, value: string | string[]): boolean => {
      if (!value) {
        throw new Error('valueMissing')
      }
      return true
    },
    minLength: (field: InputProps | TextareaProps, value: string): boolean => {
      if (value.length < field.minLength!) {
        throw new Error('tooShort')
      }
      return true
    },
    maxLength: (field: InputProps | TextareaProps, value: string): boolean => {
      if (value.length > field.maxLength!) {
        throw new Error('tooLong')
      }
      return true
    },
    size: (field: InputProps | TextareaProps, value: string): boolean => {
      if (value.length !== field.maxLength!) {
        throw new Error('wrongSize')
      }
      return true
    },
    min: (field: InputProps, value: string): boolean => {
      if (+value < +field.min!) {
        throw new Error('rangeUnderflow')
      }
      return true
    },
    max: (field: InputProps, value: string): boolean => {
      if (+value > +field.max!) {
        throw new Error('rangeOverflow')
      }
      return true
    },
    pattern: (field: InputProps, value: string): boolean => {
      const regex = new RegExp(field.pattern!)
      if (!regex.test(value)) {
        throw new Error('patternMismatch')
      }
      return true
    },
    type: (field: InputProps, value: string): boolean => {
      switch (field.type) {
        case 'email':
          if (!EMAIL_REGEX.test(value)) throw new Error('typeMismatch')
          return true
        case 'url':
          if (!URL_REGEX.test(value)) throw new Error('typeMismatch')
          return true
        default:
          return true
      }
    },
    step: (field: InputProps, value: string): boolean => {
      if (+value % +field.step! !== 0) {
        throw new Error('stepMismatch')
      }
      if (field.min) {
        if (+value < +field.min!) throw new Error('stepMismatch')
      }
      if (field.max) {
        if (+value > +field.max!) throw new Error('stepMismatch')
      }
      return true
    }
  }

  constructor(
    public fieldset: FC<FBFieldProps<'fieldset'>>,
    public input: FC<FBFieldProps<'input'>>,
    public textarea: FC<FBFieldProps<'textarea'>>,
    public select: FC<FBFieldProps<'select'>>
  ) {}

  static FlattenFields(fields: FBField[]): FBField[] {
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

  static FindFieldInDOM(id: string): HTMLElement | null {
    return document.getElementById(id)
  }

  static FindFieldInForm(id: string, fields: FBField[]): FBField | undefined {
    return this.FlattenFields(fields).find((field) => field.id === id)
  }

  static ShouldExecuteRule(whens: WhenClause[]): boolean {
    for (let i = 0; i < whens.length; i++) {
      const element = this.FindFieldInDOM(whens[i].field) as
        | HTMLInputElement
        | HTMLSelectElement
        | HTMLTextAreaElement
      if (!element) return false

      switch (whens[i].operator) {
        case 'IN':
          if (!whens[i].value!.includes(element.value)) return false
          break
        case 'NIN':
          if (whens[i].value!.includes(element.value)) return false
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

  static CreateRuleExecutionQueue(
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
          if (this.ShouldExecuteRule(fieldRule.when)) {
            queue.push([ruleFieldID, fieldRule.then])
          }
        }
      })
    })

    return queue
  }

  static ModifyField(
    id: string,
    fields: FBFieldProps<any>[],
    props: Partial<FBField>
  ) {
    const fieldsCopy: FBFieldProps<any>[] = JSON.parse(JSON.stringify(fields))

    for (let i = 0; i < fieldsCopy.length; i++) {
      if (fieldsCopy[i].id === id) {
        if (fieldsCopy[i].component === 'fieldset') {
          fieldsCopy[i] = this.ModifyField(id, fieldsCopy[i].fields, props)
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

  static EvaluateRuleEvacuationQueue(
    queue: RuleExecutionQueue,
    fields: FBField[]
  ) {
    let fieldsCopy = JSON.parse(JSON.stringify(fields))
    queue.forEach(([fieldID, thenClause]) => {
      fieldsCopy = this.ModifyField(fieldID, fieldsCopy, thenClause.data)
    })
    return fieldsCopy
  }

  static validateForm(
    data: Record<string, string>,
    form: FormFormat
  ): true | Record<string, string> {
    const errors: Record<string, any> = {}
    const flattenedFields = this.FlattenFields(form.fields)

    flattenedFields.forEach((field) => {
      const value = data[field.id]
      try {
        // if (!fieldData) throw new Error('field not ')
        switch (field?.component) {
          case 'input': {
            const input = field as FBFieldProps<'input'>
            if (input.required) this.validators.required(input, value)
            if (input.minLength) this.validators.minLength(input, value)
            if (input.maxLength) this.validators.maxLength(input, value)
            if (input.step) this.validators.step(input, value)
            if (input.min) this.validators.min(input, value)
            if (input.max) this.validators.max(input, value)
            if (input.pattern) this.validators.pattern(input, value)
            if (input.type) this.validators.type(input, value)
            break
          }
          case 'select': {
            const select = field as FBFieldProps<'select'>
            if (select.required) this.validators.required(select, value)
            break
          }
          case 'textarea': {
            const textarea = field as FBFieldProps<'textarea'>
            if (textarea.required) this.validators.required(textarea, value)
            if (textarea.minLength) this.validators.minLength(textarea, value)
            if (textarea.maxLength) this.validators.maxLength(textarea, value)
            break
          }
          case 'fieldset':
            throw new Error("Fieldsets can't have a value attached")
        }
      } catch (e) {
        if (e instanceof Error) {
          errors[field.id] = e.message
        }
      }
    })
    if (Object.keys(errors).length > 0) {
      return errors
    }

    return true
  }
}
