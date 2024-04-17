import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import Range from '@/components/Range'

describe('UI - Component - <Range />', () => {
  it('Should display the initials values', async () => {
    render(<Range initialMin={10} initialMax={100} />)
    const minValue = screen.getByTestId('range-min-value')
    const maxValue = screen.getByTestId('range-max-value')
    const initialMin = within(minValue).getByText('10')
    const initialMax = within(maxValue).getByText('100')
    expect(initialMin).toBeInTheDocument()
    expect(initialMax).toBeInTheDocument()
  })
  it('Should manual editing min value', async () => {
    const onChange = vi.fn()
    render(<Range initialMin={10} initialMax={200} onChange={onChange} />)
    const minValue = screen.getByTestId('range-min-value')
    await userEvent.click(minValue)
    const input = screen.getByDisplayValue('10')
    await userEvent.type(input, '5')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(105, 200)
    })
  })

  it('Should manual editing max value', async () => {
    const onChange = vi.fn()
    render(<Range initialMin={10} initialMax={200} onChange={onChange} />)
    const maxValue = screen.getByTestId('range-max-value')
    await userEvent.click(maxValue)
    const input = screen.getByDisplayValue('200')
    await userEvent.type(input, '90')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(10, 20090)
    })
  })

  it('Should not allow updating the minimum value, if the number entered in the input is less than this', async () => {
    const onChange = vi.fn()
    render(<Range initialMin={5} initialMax={200} onChange={onChange} />)
    const minValue = screen.getByTestId('range-min-value')
    await userEvent.click(minValue)
    const input = screen.getByDisplayValue('5')
    await userEvent.type(input, '0')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(50, 200)
    })
  })
  it('Should not allow updating the max value, if the number entered in the input is bigger than this', async () => {
    const onChange = vi.fn()
    render(<Range initialMin={0} initialMax={200} onChange={onChange} />)
    const maxValue = screen.getByTestId('range-max-value')
    await userEvent.click(maxValue)
    const input = screen.getByDisplayValue('200')
    await userEvent.type(input, '250')
    fireEvent.blur(input)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith(0, 200250)
      expect(screen.getByText('200')).toBeInTheDocument()
    })
  })
})
