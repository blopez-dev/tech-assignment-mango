import { useState } from 'react'

export function useCustomRange(initialMin: number, initialMax: number) {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)

  return {
    minValue,
    maxValue
  }
}
