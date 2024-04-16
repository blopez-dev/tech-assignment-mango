import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useRangeValues } from './useGetRangeValues'

const createWrapper = () => {
  const queryClient = new QueryClient()
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('useRangeValues', () => {
  it('should return range values successfully', async () => {
    const { result } = renderHook(() => useRangeValues(), {
      wrapper: createWrapper()
    })

    await waitFor(() => result.current.isSuccess)

    expect(result.current.data).toEqual({ min: 1, max: 100 })
  })
})
