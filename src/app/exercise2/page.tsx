'use client'

import styles from '@/ui/home.module.css'
import IntervalsRange from '@/components/IntervalsRange'

import { useIntervalsRangeValues } from '@/api/RangeValues/useGetRangeValues'
import Link from 'next/link'
import PrimaryButton from '@/components/Button'

export default function Exercise2() {
  const { data, isLoading } = useIntervalsRangeValues()

  return (
    <main className={styles.mainContainer}>
      <div className={styles.head}>
        <Link href='/'>
          <PrimaryButton type='button' text='Return to home' className='button' />
        </Link>
        {isLoading && <span>Loading...</span>}
        {!isLoading && data && <IntervalsRange rangeValues={data} />}
      </div>
    </main>
  )
}
