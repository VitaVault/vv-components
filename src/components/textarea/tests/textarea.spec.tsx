import { Textarea } from '../textarea'

import { fireEvent, render, screen } from '@testing-library/react'

const caseProps = {
  baseCase: {
    id: 'test-textarea',
    required: true,
    errorMessages: {
      valueMissing: 'Campo faltante'
    }
  }
}

describe('Textarea', () => {
  it('renders base input', () => {
    render(<Textarea id="test-input" />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  it('with prefilled value', () => {
    render(<Textarea id="test-textarea" value="prefilled" />)

    const input = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('prefilled')
  })

  it('marked as touched on focus', () => {
    render(<Textarea id="test-textarea" />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    fireEvent.focus(screen.getByRole('textbox'))
    expect(input).toHaveAttribute('data-touched', 'true')
  })

  it('changes value on change event', () => {
    const mockFn = jest.fn()
    render(<Textarea id="test-textarea" onChange={mockFn} />)

    const input = screen.getByRole('textbox') as HTMLTextAreaElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'new value' } })
    expect(input.value).toBe('new value')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('validates textarea', () => {
    render(<Textarea {...caseProps.baseCase} />)

    const input = screen.getByRole('textbox') as HTMLTextAreaElement
    const errorWarning = screen.getByRole('alert', { hidden: true })
    expect(input).toBeInTheDocument()
    expect(errorWarning).toBeInTheDocument()
    expect(errorWarning.textContent).toBe('')

    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(input.validity.valid).toBe(false)
    expect(errorWarning.textContent).toBe(
      caseProps.baseCase.errorMessages.valueMissing
    )

    fireEvent.change(input, { target: { value: 'new value' } })
    fireEvent.blur(input)
    expect(input.validity.valid).toBe(true)
    expect(errorWarning.textContent).toBe('')
  })
})
