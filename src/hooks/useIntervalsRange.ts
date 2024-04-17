import { useState } from 'react'

export function useIntervalsRange(
  minIntervalValue: number,
  maxIntervalValue: number,
  allIntervalValues: number[],
  onChange?: (min: number, max: number) => void
) {
  const [minInterval, setMinInterval] = useState(minIntervalValue)
  const [maxInterval, setMaxInterval] = useState(maxIntervalValue)

  const findNearPosition = (value: number) => {
    return allIntervalValues.reduce((acc, curr) => (Math.abs(curr - value) < Math.abs(acc - value) ? curr : acc))
  }

  const updateValue = (newValue: number, isMinValue: boolean) => {
    if (isMinValue) {
      if (newValue >= minIntervalValue && newValue <= maxInterval) {
        setMinInterval(newValue)
        onChange && onChange(newValue, maxInterval)
      }
    } else {
      if (newValue >= minInterval && newValue <= maxIntervalValue) {
        setMaxInterval(newValue)
        onChange && onChange(minIntervalValue, newValue)
      }
    }
  }
  const handleSlidingValue = (e: React.MouseEvent<HTMLElement>, isMinValue: boolean) => {
    e.preventDefault()
    const actualThumbPosition = e.currentTarget
    if (!actualThumbPosition.parentElement) return
    const { left, width } = actualThumbPosition.parentElement.getBoundingClientRect()
    const onSlide = (mouseEvent: MouseEvent) => {
      mouseEvent.preventDefault()
      const newThumbPosition = (mouseEvent.clientX - left) / width
      const newValueRange = minIntervalValue + newThumbPosition * (maxIntervalValue - minIntervalValue)
      const nearPosition = findNearPosition(newValueRange)

      if (isMinValue) {
        if (nearPosition < maxInterval) updateValue(nearPosition, true)
      } else {
        if (nearPosition > minInterval) updateValue(nearPosition, false)
      }
    }
    const onStopSlide = () => {
      document.removeEventListener('mousemove', onSlide)
      document.removeEventListener('mouseup', onStopSlide)
    }
    document.addEventListener('mousemove', onSlide)
    document.addEventListener('mouseup', onStopSlide)
  }

  return {
    minInterval,
    maxInterval,
    handleSlidingValue
  }
}
