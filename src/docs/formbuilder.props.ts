import {
  FormMock,
  mockFieldset,
  mockInput,
  mockSelect,
  mockTextarea
} from './formbuilder.mocks'

import type { FormFormat } from '../formbuilder.types'

export const FormRenderingProps: FormFormat = FormMock('FormRendering', [
  mockInput('firstname'),
  mockSelect('vaccines'),
  mockTextarea('description'),
  mockFieldset('data', {
    alignment: 'Vertical',
    fields: [
      mockFieldset('personal', {
        alignment: 'Horizontal',
        bordered: false,
        fields: [mockInput('middlename'), mockInput('lastname')]
      }),
      mockTextarea('opinion')
    ]
  }),
  mockTextarea('review')
])

export const FormValidationProps: FormFormat = FormMock('FormValidation', [
  mockFieldset('data', {
    alignment: 'Vertical',
    fields: [
      mockFieldset('personal', {
        alignment: 'Horizontal',
        bordered: false,
        fields: [
          mockInput('name', {
            required: true
          }),
          mockInput('lastname', {
            required: true
          })
        ]
      }),
      mockSelect('diseases', {
        zeroOption: { value: '', label: 'Select Vaccines' },
        value: '',
        required: true
      }),
      mockTextarea('description', {
        required: true
      })
    ]
  })
])

export const FormRuleExecutionProps: FormFormat = FormMock(
  'FormRuleExecution',
  [
    mockSelect('vaccines2', {
      zeroOption: { value: '', label: 'Select Vaccines' },
      value: ''
    }),
    mockInput('polioDate', { hidden: true }),
    mockInput('malariaDate', { hidden: true }),
    mockInput('hepDate', { hidden: true })
  ],
  {
    polioDate: [
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'EQUALS',
            value: '1'
          }
        ],
        then: {
          data: {
            hidden: false
          }
        }
      },
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'NEQUALS',
            value: '1'
          }
        ],
        then: {
          data: {
            hidden: true,
            value: ''
          }
        }
      }
    ],
    malariaDate: [
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'EQUALS',
            value: '2'
          }
        ],
        then: {
          data: {
            hidden: false
          }
        }
      },
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'NEQUALS',
            value: '2'
          }
        ],
        then: {
          data: {
            hidden: true,
            value: ''
          }
        }
      }
    ],
    hepDate: [
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'EQUALS',
            value: '3'
          }
        ],
        then: {
          data: {
            hidden: false
          }
        }
      },
      {
        when: [
          {
            field: 'vaccines2',
            operator: 'NEQUALS',
            value: '3'
          }
        ],
        then: {
          data: {
            hidden: true,
            value: ''
          }
        }
      }
    ]
  }
)
