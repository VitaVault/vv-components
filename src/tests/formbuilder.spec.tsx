import { formWithRules, nestedFormMock, rulesMock } from './utils.mocks'

import { mockInput, mockForm, mockFieldset } from '../docs/formbuilder.mocks'
import { Formbuilder } from '../formbuilder'
import FBUtils from '../utils'

import { render } from '@testing-library/react'

describe('Formbuilder', () => {
  it('flattens fields correctly', () => {
    const formMock = nestedFormMock
    const flattenedFields = FBUtils.FlattenFields(formMock.fields).map(
      (field) => field.id
    )

    expect(flattenedFields.length).toEqual(5)
    expect(flattenedFields).toEqual(
      expect.arrayContaining(['input1', 'input2', 'input3', 'input4', 'input5'])
    )
  })

  it('finds shallow fields', () => {
    render(<Formbuilder form={mockForm('find1', [mockInput('findMe')])} />)

    expect(FBUtils.FindFieldInDOM('findMe')).toBeTruthy()
  })

  it('finds nested fields', () => {
    render(
      <Formbuilder
        form={mockForm('find1', [
          mockFieldset('fieldset', { fields: [mockInput('findMe')] })
        ])}
      />
    )

    expect(FBUtils.FindFieldInDOM('findMe')).toBeTruthy()
  })

  it('modifies field appropriately', () => {
    const fields = [mockInput('input', { value: 'initial' })]
    const modified = FBUtils.ModifyField('input', fields, { value: 'updated' })

    expect(modified.pop().value).toEqual('updated')
  })

  it('creates Rule Execution Queue with first matching rule', () => {
    render(<Formbuilder form={formWithRules} />)
    const mockREQ = FBUtils.CreateRuleExecutionQueue('trigger', rulesMock)

    expect(mockREQ.length).toEqual(1)
    expect(mockREQ[0][0]).toEqual('input')
  })

  describe('Input validations', () => {
    it('validates required field correctly', () => {
      const form = mockForm('form', [mockInput('input', { required: true })])

      expect(FBUtils.validateForm({ input: '' }, form)).toHaveProperty(
        'input',
        'valueMissing'
      )
      expect(FBUtils.validateForm({ input: 'value' }, form)).toEqual(true)
    })

    it('validates field minlength correctly', () => {
      const form = mockForm('form', [mockInput('input', { minLength: 3 })])

      expect(FBUtils.validateForm({ input: '' }, form)).toHaveProperty(
        'input',
        'tooShort'
      )
      expect(FBUtils.validateForm({ input: 'val' }, form)).toEqual(true)
    })

    it('validates field maxlength correctly', () => {
      const form = mockForm('form', [mockInput('input', { maxLength: 3 })])

      expect(FBUtils.validateForm({ input: 'value' }, form)).toHaveProperty(
        'input',
        'tooLong'
      )
      expect(FBUtils.validateForm({ input: 'val' }, form)).toEqual(true)
    })

    it('validates field min correctly', () => {
      const form = mockForm('form', [mockInput('input', { min: 3 })])

      expect(FBUtils.validateForm({ input: '1' }, form)).toHaveProperty(
        'input',
        'rangeUnderflow'
      )
      expect(FBUtils.validateForm({ input: '3' }, form)).toEqual(true)
    })

    it('validates field max correctly', () => {
      const form = mockForm('form', [mockInput('input', { max: 3 })])

      expect(FBUtils.validateForm({ input: '4' }, form)).toHaveProperty(
        'input',
        'rangeOverflow'
      )
      expect(FBUtils.validateForm({ input: '3' }, form)).toEqual(true)
    })

    it('validates field pattern correctly', () => {
      const form = mockForm('form', [mockInput('input', { pattern: '[0-9]' })])

      expect(FBUtils.validateForm({ input: 'asdf' }, form)).toHaveProperty(
        'input',
        'patternMismatch'
      )
      expect(FBUtils.validateForm({ input: '1234' }, form)).toEqual(true)
    })

    it('validates field type email correctly', () => {
      const form = mockForm('form', [mockInput('input', { type: 'email' })])

      expect(FBUtils.validateForm({ input: 'asdf' }, form)).toHaveProperty(
        'input',
        'typeMismatch'
      )
      expect(FBUtils.validateForm({ input: 'asdf.com' }, form)).toHaveProperty(
        'input',
        'typeMismatch'
      )
      expect(FBUtils.validateForm({ input: 'asdf@mail' }, form)).toEqual(true)
      expect(FBUtils.validateForm({ input: 'example@mail.com' }, form)).toEqual(
        true
      )
    })

    it('validates field type url correctly', () => {
      const form = mockForm('form', [mockInput('input', { type: 'url' })])

      expect(FBUtils.validateForm({ input: 'asdf' }, form)).toHaveProperty(
        'input',
        'typeMismatch'
      )
      expect(FBUtils.validateForm({ input: 'asdf.com' }, form)).toHaveProperty(
        'input',
        'typeMismatch'
      )
      expect(
        FBUtils.validateForm({ input: 'www.asdf.com' }, form)
      ).toHaveProperty('input', 'typeMismatch')
      expect(FBUtils.validateForm({ input: 'http://asdf.com' }, form)).toEqual(
        true
      )
      expect(FBUtils.validateForm({ input: 'https://asdf.com' }, form)).toEqual(
        true
      )
      expect(
        FBUtils.validateForm({ input: 'http://www.asdf.com' }, form)
      ).toEqual(true)
      expect(
        FBUtils.validateForm({ input: 'http://www.asdf.com/path/test' }, form)
      ).toEqual(true)
      expect(
        FBUtils.validateForm(
          { input: 'http://www.asdf.com/path/test?test=test' },
          form
        )
      ).toEqual(true)
    })

    it('validates field step correctly', () => {
      const form = mockForm('form', [
        mockInput('input', { step: '3', min: '6', max: '12' })
      ])

      expect(FBUtils.validateForm({ input: '2' }, form)).toHaveProperty(
        'input',
        'stepMismatch'
      )
      expect(FBUtils.validateForm({ input: '8' }, form)).toHaveProperty(
        'input',
        'stepMismatch'
      )
      expect(FBUtils.validateForm({ input: '15' }, form)).toHaveProperty(
        'input',
        'stepMismatch'
      )
      expect(FBUtils.validateForm({ input: '9' }, form)).toEqual(true)
    })
  })

  describe('Form validations', () => {
    it('form with single error', () => {
      const form = mockForm('form', [
        mockInput('input1', { required: true }),
        mockInput('input2', { required: true }),
        mockInput('input3', { required: true })
      ])

      const errors = FBUtils.validateForm(
        { input1: 'filled', input2: 'filled' },
        form
      )

      expect(Object.keys(errors).length).toBe(1)
      expect(errors).not.toHaveProperty('input1', 'valueMissing')
      expect(errors).not.toHaveProperty('input2', 'valueMissing')
      expect(errors).toHaveProperty('input3', 'valueMissing')
    })

    it('form with multiple errors', () => {
      const form = mockForm('form', [
        mockInput('input1', { required: true }),
        mockInput('input2', { required: true }),
        mockInput('input3', { required: true })
      ])

      const errors = FBUtils.validateForm({ input1: 'filled' }, form)

      expect(Object.keys(errors).length).toBe(2)
      expect(errors).not.toHaveProperty('input1', 'valueMissing')
      expect(errors).toHaveProperty('input2', 'valueMissing')
      expect(errors).toHaveProperty('input3', 'valueMissing')
    })

    it('form without errors', () => {
      const form = mockForm('form', [
        mockInput('input1', { required: true }),
        mockInput('input2', { required: true }),
        mockInput('input3', { required: true })
      ])

      const validated = FBUtils.validateForm(
        { input1: 'filled', input2: 'filled', input3: 'filled' },
        form
      )

      expect(validated).toBe(true)
      expect(validated).not.toHaveProperty('input1', 'valueMissing')
      expect(validated).not.toHaveProperty('input2', 'valueMissing')
      expect(validated).not.toHaveProperty('input3', 'valueMissing')
    })
  })
})
