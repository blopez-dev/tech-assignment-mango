'use client'

import styles from './Range.module.css'
import { TRange } from '@/types/RangeTypes'
import { useCustomRange } from '@/hooks/useCustomRange'
import { positionFormatter } from '@/services/positionFormater'

export default function Range({ minValueRange, maxValueRange }: TRange) {
  const { minValue, maxValue } = useCustomRange(minValueRange, maxValueRange)
  const { minRangePosition, maxRangePosition } = positionFormatter(minValue, maxValue, minValueRange, maxValueRange)
  const pointerWidth = 15

  return (
    <section className={styles.rangeContainer}>
      <label className={styles.labelValue}>
        <span>0</span>
      </label>
      <div className={styles.slideRange}>
        <div className={styles.slideTrack} />
        <div className={styles.pointer} style={{ left: `calc(${minRangePosition}% - ${pointerWidth / 2}px)` }}></div>
        <div className={styles.pointer} style={{ left: `calc(${maxRangePosition}% - ${pointerWidth / 2}px)` }}></div>
      </div>
      <label className={styles.labelValue}>
        <span>200</span>
      </label>
    </section>
  )
}
