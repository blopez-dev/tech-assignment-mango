import { describe, it, expect } from 'vitest'
import { positionFormatter } from '@/services/positionFormater' // Adjust the import path as necessary

describe('positionFormatter', () => {
  it('should return right position within the range', () => {
    const result = positionFormatter(10, 20, 0, 100)
    expect(result.minRangePosition).toBe(10)
    expect(result.maxRangePosition).toBe(20)
  })

  it('should return right position at the range boundaries', () => {
    const result = positionFormatter(0, 100, 0, 100)
    expect(result.minRangePosition).toBe(0)
    expect(result.maxRangePosition).toBe(100)
  })

  it('should handlers negative values', () => {
    const result = positionFormatter(-100, 0, -200, 200)
    expect(result.minRangePosition).toBe(25)
    expect(result.maxRangePosition).toBe(50)
  })

  it('should handler large numbers', () => {
    const result = positionFormatter(1000, 10000, 0, 100000)
    expect(result.minRangePosition).toBe(1)
    expect(result.maxRangePosition).toBe(10)
  })
})
