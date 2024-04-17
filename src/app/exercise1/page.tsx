'use client'

import { useState } from 'react'
import styles from '@/ui/home.module.css'
import Range from '@/components/Range'
import { useRangeValues } from '@/api/RangeValues/useGetRangeValues'
import Link from 'next/link'
import PrimaryButton from '@/components/Button'

export default function Exercise1() {
  const { data, isLoading } = useRangeValues()
  const [currentValue, setCurrentValues] = useState({
    min: data?.minValueRange || 0,
    max: data?.maxValueRange || 0
  })
  const onChange = (min: number, max: number) => setCurrentValues({ min, max })

  return (
    <main className={styles.mainContainer}>
      <div className={styles.head}>
        <Link href='/'>
          <PrimaryButton type='button' text='Return to home' className='button' />
        </Link>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && data && (
        <Range initialMin={data.minValueRange || 0} initialMax={data.maxValueRange || 0} onChange={onChange} />
      )}
      <div className={styles.updateValues}>
        <span>minvalue Selected {currentValue.min}</span>
        <span>maxValue Selected {currentValue.max}</span>
      </div>
    </main>
  )
}
