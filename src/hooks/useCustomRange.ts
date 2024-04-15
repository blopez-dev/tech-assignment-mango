import { useState } from 'react'
import { act } from 'react-dom/test-utils'
import { is } from 'immutable'

export function useCustomRange(initialMin: number, initialMax: number) {
  const [minValue, setMinValue] = useState(initialMin)
  const [maxValue, setMaxValue] = useState(initialMax)
  const [isEditingMinValue, setEditingMinvalue] = useState(false)
  const [isEditingMaxValue, setEditingMaxValue] = useState(false)
  const updateValues = (newValue: number, isMinValue: boolean) => {
    if (isMinValue) {
      if (newValue >= initialMin && newValue <= maxValue) {
        setMinValue(newValue)
      }
    } else {
      if (newValue >= minValue && newValue <= initialMax) {
        setMaxValue(newValue)
      }
    }
  }
  const handleSlidingValue = (e: React.MouseEvent<HTMLElement>, isMinThumb: boolean) => {
    e.preventDefault()
    const actualThumbPosition = e.currentTarget
    console.log(actualThumbPosition)
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
    } else {
      if (value > minValue && value <= initialMax) setMaxValue(value)
      setEditingMaxValue(false)
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
