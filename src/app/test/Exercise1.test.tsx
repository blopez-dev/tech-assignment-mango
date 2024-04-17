import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ReactQueryProvider from '@/providers/ReactQueryProviders'
import * as useRangeValuesHook from '@/api/RangeValues/useGetRangeValues'
import Exercise1 from '@/app/exercise1/page'

interface MockData {
  minValueRange: number
  maxValueRange: number
}

describe('Home', () => {
  const mockData: MockData = {
    minValueRange: 10,
    maxValueRange: 50
  }
  const useRangeValuesSpy = vi.spyOn(useRangeValuesHook, 'useRangeValues')

  it('should render a button component', async () => {
    render(
      <ReactQueryProvider>
        <Exercise1 />
      </ReactQueryProvider>
    )
    const btnToReturn = screen.queryByText('Return to home')
    await waitFor(() => expect(btnToReturn).toBeInTheDocument())
  })
  it('should a range component', async () => {
    useRangeValuesSpy.mockReturnValue({ data: mockData, isLoading: false })
    render(
      <ReactQueryProvider>
        <Exercise1 />
      </ReactQueryProvider>
    )
    const rangeComponent = screen.getByTestId('rangeComponent')
    await waitFor(() => expect(rangeComponent).toBeInTheDocument())
  })
})
