import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import ReactQueryProvider from '@/providers/ReactQueryProviders'
import * as useIntervalsRangeValues from '@/api/RangeValues/useGetRangeValues'
import Exercise2 from '@/app/exercise2/page'

describe('Home', () => {
  const mockData: number[] = [1.99, 5.99, 10.99, 30.99, 50.99, 70.99]
  const useRangeValuesSpy = vi.spyOn(useIntervalsRangeValues, 'useIntervalsRangeValues')

  it('should a range component', async () => {
    useRangeValuesSpy.mockReturnValue({ data: mockData, isLoading: false })
    render(
      <ReactQueryProvider>
        <Exercise2 />
      </ReactQueryProvider>
    )
    const rangeComponent = screen.getByTestId('intervalRangeComponent')
    await waitFor(() => expect(rangeComponent).toBeInTheDocument())
  })
})
