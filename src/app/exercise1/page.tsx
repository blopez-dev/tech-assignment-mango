'use client'
import { useState, useEffect } from 'react'
import styles from '@/ui/home.module.css'
import Range from '@/components/Range'
import { useRangeValues } from '@/api/RangeValues/useGetRangeValues'
import { RangeValues } from '@/api/RangeValues/model'

export default function Exercise1() {
  const { data, isLoading } = useRangeValues()
  const [rangeValues, setRangeValues] = useState<RangeValues>({
    minValueRange: 0,
    maxValueRange: 0
  })
  const { minValueRange, maxValueRange } = rangeValues
  useEffect(() => {
    if (data) {
      setRangeValues(prevState => ({
        ...prevState,
        minValueRange: data.minValueRange,
        maxValueRange: data.maxValueRange
      }))
    }
  }, [data])

  return (
    <main className={styles.mainContainer}>
      {isLoading && <span>Loading...</span>}
      {!isLoading && data && <Range minValueRange={minValueRange} maxValueRange={maxValueRange} />}
    </main>
  )
}
