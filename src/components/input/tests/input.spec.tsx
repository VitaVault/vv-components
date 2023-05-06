import { Input } from '../input'
import { InputProps } from '../input.types'

import { fireEvent, render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

const baseProps: InputProps = {
  id: 'test-input',
  name: 'test-input',
  label: 'label'
}

const caseProps = {
  email: {
    id: 'email',
    type: 'email',
    placeholder: 'correo electrónico',
    required: true,
    errorMessages: {
      valueMissing: 'Ingresa tu correo electrónico',
      typeMismatch: 'Este no es un formato de email válido'
    }
  }
}

describe('Input', () => {
  it('renders base input', async () => {
    const { container } = render(<Input {...baseProps} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('with prefilled value', () => {
    render(<Input {...baseProps} value="prefilled" />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('prefilled')
  })

  it('marked as touched on focus', () => {
    render(<Input {...baseProps} />)

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()

    fireEvent.focus(screen.getByRole('textbox'))
    expect(input).toHaveAttribute('data-touched', 'true')
  })

  it('changes value on change event', () => {
    const mockFn = jest.fn()
    render(<Input {...baseProps} onChange={mockFn} />)

    const input = screen.getByRole('textbox') as HTMLInputElement
    expect(input).toBeInTheDocument()
    expect(input.value).toBe('')

    fireEvent.change(input, { target: { value: 'new value' } })
    expect(input.value).toBe('new value')
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('renders password type toggle', () => {
    render(<Input {...baseProps} label="password" type="password" />)

    const input = screen.getByLabelText('password') as HTMLInputElement

    expect(input).toBeInTheDocument()
    expect(input.type).toBe('password')

    let toggle = screen.getByLabelText('Mostrar contraseña') as HTMLInputElement
    expect(toggle).toBeInTheDocument()

    fireEvent.click(toggle)
    expect(input.type).toBe('text')
    toggle = screen.getByLabelText('Ocultar contraseña') as HTMLInputElement
    expect(toggle).toBeInTheDocument()

    fireEvent.click(toggle)
    expect(input.type).toBe('password')
    toggle = screen.getByLabelText('Mostrar contraseña') as HTMLInputElement
    expect(toggle).toBeInTheDocument()
  })

  it('validates an email', () => {
    render(<Input {...baseProps} {...caseProps.email} />)

    const input = screen.getByPlaceholderText(
      'correo electrónico'
    ) as HTMLInputElement
    const errorWarning = screen.getByRole('alert', { hidden: true })
    expect(input).toBeInTheDocument()
    expect(errorWarning).toBeInTheDocument()
    expect(errorWarning.textContent).toBe('')

    fireEvent.focus(input)
    fireEvent.blur(input)
    expect(input.validity.valid).toBe(false)
    expect(errorWarning.textContent).toBe(
      caseProps.email.errorMessages.valueMissing
    )

    fireEvent.change(input, { target: { value: 'new value' } })
    fireEvent.blur(input)
    expect(input.validity.valid).toBe(false)
    expect(errorWarning.textContent).toBe(
      caseProps.email.errorMessages.typeMismatch
    )

    fireEvent.change(input, { target: { value: 'example@mail.com' } })
    fireEvent.blur(input)
    expect(input.validity.valid).toBe(true)
    expect(errorWarning.textContent).toBe('')
  })
})
