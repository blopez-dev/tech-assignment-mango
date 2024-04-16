'use client'

import styles from '@/components/Range/Range.module.css'
import { positionFormatter } from '@/services/positionFormater'
import { useIntervalsRange } from '@/hooks/useIntervalsRange'

export default function IntervalsRange({ rangeValues }: { rangeValues: number[] }) {
  const minIntervalsValues = rangeValues[0]
  const maxIntervalsValues = rangeValues[rangeValues.length - 1]
  const { minInterval, maxInterval, handleSlidingValue } = useIntervalsRange(
    minIntervalsValues,
    maxIntervalsValues,
    rangeValues
  )

  const pointerWidth = 15
  const { minRangePosition, maxRangePosition } = positionFormatter(
    minInterval,
    maxInterval,
    minIntervalsValues,
    maxIntervalsValues
  )
  return (
    <section className={styles.rangeContainer}>
      <label className={styles.labelValue}>
        <span>{minInterval}</span>
      </label>
      <div className={styles.slideRange}>
        <div className={styles.slideTrack} />
        <div
          className={styles.pointer}
          style={{ left: `calc(${minRangePosition}% - ${pointerWidth / 2}px)` }}
          onMouseDown={e => handleSlidingValue(e, true)}
        ></div>
        <div
          role='slider'
          className={styles.pointer}
          style={{ left: `calc(${maxRangePosition}% - ${pointerWidth / 2}px)` }}
          onMouseDown={e => handleSlidingValue(e, false)}
        ></div>
      </div>
      <label className={styles.labelValue}>
        <span>{maxInterval}</span>
      </label>
    </section>
  )
}
