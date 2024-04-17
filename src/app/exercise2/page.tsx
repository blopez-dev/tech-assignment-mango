'use client'

import { useState } from 'react'
import styles from '@/ui/home.module.css'
import IntervalsRange from '@/components/IntervalsRange'

import { useIntervalsRangeValues } from '@/api/RangeValues/useGetRangeValues'
import Link from 'next/link'
import PrimaryButton from '@/components/Button'

export default function Exercise2() {
  const { data, isLoading } = useIntervalsRangeValues()
  const [currentValue, setCurrentValue] = useState({
    min: data?.[0] || 0,
    max: data?.[data.length - 1] || 0
  })

  const onChange = (min: number, max: number) => setCurrentValue({ min, max })

  return (
    <main className={styles.mainContainer}>
      <div className={styles.head}>
        <Link href='/'>
          <PrimaryButton type='button' text='Return to home' className='button' />
        </Link>
      </div>
      {isLoading && <span>Loading...</span>}
      {!isLoading && data && <IntervalsRange rangeValues={data} onChange={onChange} />}
      <div className={styles.updateValues}>
        <span>minvalue Selected: {currentValue.min}</span>
        <span>maxValue Selected: {currentValue.max}</span>
      </div>
    </main>
  )
}
