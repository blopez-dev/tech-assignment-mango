'use client'

import { useState, useEffect } from 'react'
import styles from '@/ui/home.module.css'
import Range from '@/components/Range'
import { useRangeValues } from '@/api/RangeValues/useGetRangeValues'
import { RangeValues } from '@/api/RangeValues/model'
import Link from 'next/link'
import PrimaryButton from '@/components/Button'

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
      <div className={styles.head}>
        <Link href='/'>
          <PrimaryButton type='button' text='Return to home' className='button' />
        </Link>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && data && <Range minValueRange={minValueRange} maxValueRange={maxValueRange} />}
    </main>
  )
}
