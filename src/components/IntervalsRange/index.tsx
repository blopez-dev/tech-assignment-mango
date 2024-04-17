'use client'

import styles from '@/components/Range/Range.module.css'
import { positionFormatter } from '@/services/positionFormater'
import { useIntervalsRange } from '@/hooks/useIntervalsRange'

export default function IntervalsRange({
  rangeValues,
  onChange
}: {
  rangeValues: number[]
  onChange?: (min: number, max: number) => void
}) {
  const minIntervalsValues = rangeValues[0]
  const maxIntervalsValues = rangeValues[rangeValues.length - 1]
  const { minInterval, maxInterval, handleSlidingValue } = useIntervalsRange(
    minIntervalsValues,
    maxIntervalsValues,
    rangeValues,
    onChange
  )

  const pointerWidth = 15
  const { minRangePosition, maxRangePosition } = positionFormatter(
    minInterval,
    maxInterval,
    minIntervalsValues,
    maxIntervalsValues
  )
  return (
    <section className={styles.rangeContainer} data-testId='intervalRangeComponent'>
      <label data-testid='range-min-value' className={styles.labelValue}>
        {minInterval}
      </label>
      <div className={styles.slideRange}>
        <div className={styles.slideTrack} />
        <div
          data-testid='min-thumb'
          className={styles.pointer}
          style={{ left: `calc(${minRangePosition}% - ${pointerWidth / 2}px)` }}
          onMouseDown={e => handleSlidingValue(e, true)}
        ></div>
        <div
          data-testid='max-thumb'
          role='slider'
          className={styles.pointer}
          style={{ left: `calc(${maxRangePosition}% - ${pointerWidth / 2}px)` }}
          onMouseDown={e => handleSlidingValue(e, false)}
        ></div>
      </div>
      <label data-testid='range-max-value' className={styles.labelValue}>
        {maxInterval}
      </label>
    </section>
  )
}
