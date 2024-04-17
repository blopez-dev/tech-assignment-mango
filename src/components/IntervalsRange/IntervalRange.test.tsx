import { fireEvent, getByTestId, render, screen, waitFor, within } from '@testing-library/react'
import { vi } from 'vitest'
import IntervalsRange from '@/components/IntervalsRange'

describe('UI - Component - <IntervalsRange />', () => {
  const rangeValues = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
  it('Should display the initials values', async () => {
    render(<IntervalsRange rangeValues={rangeValues} />)
    const minValue = screen.getByTestId('range-min-value')
    const maxValue = screen.getByTestId('range-max-value')
    const initialMin = within(minValue).getByText(rangeValues[0])
    const initialMax = within(maxValue).getByText(rangeValues[rangeValues.length - 1])
    expect(initialMin).toBeInTheDocument()
    expect(initialMax).toBeInTheDocument()
  })
  it('Should not allow slide thumb outside of min and max values range', async () => {
    render(<IntervalsRange rangeValues={rangeValues} />)
    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: rangeValues[0] })
    fireEvent.mouseMove(minThumb, { clientX: 1500 })
    fireEvent.mouseUp(minThumb)
    expect(screen.getByText(`${rangeValues[0]}`)).toBeInTheDocument()
  })

  it('Should slide min bullet', async () => {
    const onChange = vi.fn()
    render(<IntervalsRange rangeValues={rangeValues} onChange={onChange} />)
    const minThumb = screen.getByTestId('min-thumb')
    fireEvent.mouseDown(minThumb, { clientX: rangeValues[0] })
    fireEvent.mouseMove(document, { clientX: 10.99 })
    fireEvent.mouseUp(document)
    await waitFor(() => {
      expect(onChange).toHaveBeenCalled()
      expect(onChange).toHaveBeenCalledTimes(1)
    })
  })
  it('Should slide max bullet', () => {
    const onChange = vi.fn()
    render(<IntervalsRange rangeValues={rangeValues} onChange={onChange} />)
    const maxThumb = screen.getByTestId('max-thumb')
    fireEvent.mouseDown(maxThumb, { clientX: rangeValues.length - 1 })
    fireEvent.mouseMove(maxThumb, { clientX: -50 })
    fireEvent.mouseUp(maxThumb)
    expect(screen.getByText(`70.99`)).toBeInTheDocument()
  })
})
