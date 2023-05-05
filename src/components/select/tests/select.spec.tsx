import Select from '..'

import { fireEvent, render, screen } from '@testing-library/react'
import { OptionHTMLAttributes, ReactElement } from 'react'

const generateOptions = (
  upperLimit: number,
  props?: OptionHTMLAttributes<HTMLOptionElement>
): ReactElement[] => {
  const opts = []
  for (let x = 0; x < upperLimit; x++) {
    opts.push(
      <option {...props} key={x} value={x}>
        {x}
      </option>
    )
  }
  return opts
}

describe('Select', () => {
  it('renders base select with children', () => {
    render(<Select id="test-select">datalist={generateOptions(2)}</Select>)

    const select = screen.getByRole('combobox')
    const opts = screen.getAllByRole('option')
    expect(select).toBeInTheDocument()
    expect(opts).toHaveLength(2)
  })

  it('first option is pre-selected by default', () => {
    render(<Select id="test-select">datalist={generateOptions(2)}</Select>)

    const [firstOpt, secondOpt] = screen.getAllByRole(
      'option'
    ) as HTMLOptionElement[]
    expect(firstOpt.selected).toBeTruthy()
    expect(secondOpt.selected).toBeFalsy()
  })

  it('second option is selected on change', () => {
    render(<Select id="test-select">datalist={generateOptions(2)}</Select>)

    const [firstOpt, secondOpt] = screen.getAllByRole(
      'option'
    ) as HTMLOptionElement[]
    expect(firstOpt.selected).toBeTruthy()
    expect(secondOpt.selected).toBeFalsy()

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 1 } })
    expect(firstOpt.selected).toBeFalsy()
    expect(secondOpt.selected).toBeTruthy()
  })

  it('correct option is selected when value is passed as prop', () => {
    render(
      <Select id="test-select" value={1}>
        datalist={generateOptions(2)}
      </Select>
    )

    const [firstOpt, secondOpt] = screen.getAllByRole(
      'option'
    ) as HTMLOptionElement[]
    expect(firstOpt.selected).toBeFalsy()
    expect(secondOpt.selected).toBeTruthy()
  })

  it('onChange is called', () => {
    const mockFn = jest.fn()
    render(
      <Select id="test-select" onChange={mockFn}>
        datalist={generateOptions(2)}
      </Select>
    )

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 1 } })
    expect(mockFn).toHaveBeenCalledTimes(1)
  })

  it('marked as touched', () => {
    render(<Select id="test-select">datalist={generateOptions(2)}</Select>)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(select).not.toHaveAttribute('data-touched', 'true')

    fireEvent.focus(select)
    expect(select).toHaveAttribute('data-touched', 'true')
  })

  it('renders error message when required (all options are disabled)', () => {
    const errorMessages = {
      valueMissing: 'error message'
    }
    render(
      <Select id="test-select" errorMessages={errorMessages} required>
        datalist={generateOptions(2, { disabled: true })}
      </Select>
    )

    const select = screen.getByRole('combobox')
    const error = screen.getByRole('alert', { hidden: true })

    expect(select).toBeInTheDocument()
    expect(error).toBeInTheDocument()
    expect(error.textContent).toBe('')

    fireEvent.blur(select)
    expect(error.textContent).toBe('error message')
  })
})
