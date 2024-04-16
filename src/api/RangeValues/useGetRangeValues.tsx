import { useQuery } from '@tanstack/react-query'
import { RangeValues } from '@/api/RangeValues/model'

const fetchRangesValues = async (): Promise<RangeValues> => {
  return fetch('https://demo6713668.mockable.io/range').then(d => d.json())
}

const useRangeValues = () => {
  return useQuery({
    queryKey: ['rangesValues'],
    queryFn: () => fetchRangesValues()
  })
}

export { useRangeValues, fetchRangesValues }
