import { mockForm, mockFieldset, mockInput } from '../docs/formbuilder.mocks'

import { Rule } from 'src/formbuilder.types'

export const rulesMock: { [key: string]: Rule[] } = {
  input: [
    {
      when: [
        {
          field: 'trigger',
          operator: 'CHANGED'
        }
      ],
      then: {
        data: {}
      }
    },
    {
      when: [
        {
          field: 'blank1',
          operator: 'EXISTS'
        },
        {
          field: 'blank2',
          operator: 'CHANGED'
        }
      ],
      then: {
        data: {}
      }
    },
    {
      when: [
        {
          field: 'blank1',
          operator: 'CHANGED'
        },
        {
          field: 'trigger',
          operator: 'EQUALS',
          value: 'test'
        }
      ],
      then: {
        data: {}
      }
    }
  ]
}

export const nestedFormMock = mockForm('flattening', [
  mockInput('input1'),
  mockInput('input2'),
  mockFieldset('fieldset1', {
    fields: [
      mockFieldset('fieldset2', {
        fields: [mockInput('input3')]
      }),
      mockInput('input4')
    ]
  }),
  mockInput('input5')
])

export const formWithRules = mockForm(
  'evaluation',
  [mockInput('trigger'), mockInput('blank1'), mockInput('blank2')],
  rulesMock
)
