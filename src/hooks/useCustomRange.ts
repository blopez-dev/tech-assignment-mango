import { useState, useEffect } from 'react'

export function useCustomRange(initialMin: number, initialMax: number, onChange?: (min: number, max: number) => void) {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)
  const [isEditingMinValue, setEditingMinvalue] = useState(false)
  const [isEditingMaxValue, setEditingMaxValue] = useState(false)

  useEffect(() => {
    if (initialMin) setMinValue(initialMin)
  }, [initialMin])

  useEffect(() => {
    if (initialMax) setMaxValue(initialMax)
  }, [initialMax])

  const updateValues = (newValue: number, isMinValue: boolean) => {
    if (isMinValue) {
      if (newValue >= initialMin && newValue <= maxValue) {
        setMinValue(newValue)
        onChange && onChange(newValue, maxValue)
      }
    } else {
      if (newValue >= minValue && newValue <= initialMax) {
        setMaxValue(newValue)
        onChange && onChange(minValue, newValue)
      }
    }
  }
  const handleSlidingValue = (e: React.MouseEvent<HTMLElement>, isMinThumb: boolean) => {
    e.preventDefault()
    const actualThumbPosition = e.currentTarget
    if (!actualThumbPosition.parentElement) return

    const { left, width } = actualThumbPosition.parentElement.getBoundingClientRect()
    const onSlide = (moveMouseEvent: MouseEvent) => {
      const newThumbPosition = initialMin + ((moveMouseEvent.clientX - left) / width) * (initialMax - initialMin)
      if (isMinThumb) {
        if (Math.round(newThumbPosition) < maxValue) {
          updateValues(Math.round(newThumbPosition), true)
        }
      } else {
        if (Math.round(newThumbPosition) > minValue) {
          updateValues(Math.round(newThumbPosition), false)
        }
      }
    }
    const onStopSlide = () => {
      document.removeEventListener('mousemove', onSlide)
      document.removeEventListener('mouseup', onStopSlide)
    }
    document.addEventListener('mousemove', onSlide)
    document.addEventListener('mouseup', onStopSlide)
  }
  const handleValueSubmit = (newValue: string, isMinValue: boolean) => {
    const value = Math.round(Number(newValue))
    if (isMinValue) {
      if (value >= initialMin && value < maxValue) setMinValue(value)
      setEditingMinvalue(false)
      onChange && onChange(value, maxValue)
    } else {
      if (value > minValue && value <= initialMax) setMaxValue(value)
      setEditingMaxValue(false)
      onChange && onChange(minValue, value)
    }
  }
  return {
    minValue,
    maxValue,
    isEditingMinValue,
    isEditingMaxValue,
    handleSlidingValue,
    handleValueSubmit,
    setEditingMinvalue,
    setEditingMaxValue
  }
}
