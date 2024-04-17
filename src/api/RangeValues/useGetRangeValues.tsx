import { useQuery } from '@tanstack/react-query'
import { RangeValues, IntervalsRangeValue } from '@/api/RangeValues/model'

const fetchRangesValues = async (): Promise<RangeValues> => {
  return fetch('https://demo6713668.mockable.io/range').then(d => d.json())
}

const useRangeValues = () => {
  return useQuery({
    queryKey: ['rangesValues'],
    queryFn: () => fetchRangesValues()
  })
}

const fetchIntervalsRangeValues = async () => {
  return fetch('https://demo6713668.mockable.io/valueRangeIntervals')
    .then(d => d.json())
    .then(d => d.rangeValues)
}
const useIntervalsRangeValues = () => {
  return useQuery({
    queryKey: ['intervalsRangeValues'],
    queryFn: () => fetchIntervalsRangeValues()
  })
}

export { useRangeValues, fetchRangesValues, useIntervalsRangeValues, fetchIntervalsRangeValues }
