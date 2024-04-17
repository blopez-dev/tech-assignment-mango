export const positionFormatter = (minValue: number, maxValue: number, minValueRange: number, maxValueRange: number) => {
  const minRangePosition = ((minValue - minValueRange) / (maxValueRange - minValueRange)) * 100
  const maxRangePosition = ((maxValue - minValueRange) / (maxValueRange - minValueRange)) * 100
  return { minRangePosition, maxRangePosition }
}
