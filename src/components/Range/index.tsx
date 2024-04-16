'use client'

import styles from './Range.module.css'
import { TRange } from '@/types/RangeTypes'
import { useCustomRange } from '@/hooks/useCustomRange'
import { positionFormatter } from '@/services/positionFormater'

export default function Range({ minValueRange, maxValueRange }: TRange) {
  const {
    minValue,
    maxValue,
    isEditingMinValue,
    isEditingMaxValue,
    handleSlidingValue,
    setEditingMinvalue,
    setEditingMaxValue,
    handleValueSubmit
  } = useCustomRange(minValueRange, maxValueRange)

  const { minRangePosition, maxRangePosition } = positionFormatter(minValue, maxValue, minValueRange, maxValueRange)
  const pointerWidth = 15

  return (
    <section className={styles.rangeContainer}>
      {isEditingMinValue ? (
        <input
          type='number'
          defaultValue={minValue}
          onBlur={e => handleValueSubmit(e.currentTarget.value, true)}
          onKeyUp={e => {
            e.key === 'Enter' ? (e.currentTarget as HTMLInputElement).blur() : null
          }}
          onFocus={e => e.target.select()}
          pattern='[0-9]*'
          autoFocus
        />
      ) : (
        <label className={styles.labelValue} onClick={() => setEditingMinvalue(true)}>
          <span>{minValue}</span>
        </label>
      )}
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
      {isEditingMaxValue ? (
        <input
          type='number'
          defaultValue={maxValue}
          onBlur={e => handleValueSubmit(e.currentTarget.value, false)}
          onKeyUp={e => {
            e.key === 'Enter' ? (e.currentTarget as HTMLInputElement).blur() : null
          }}
          onFocus={e => e.target.select()}
          autoFocus
        />
      ) : (
        <label className={styles.labelValue} onClick={() => setEditingMaxValue(true)}>
          <span>{maxValue}</span>
        </label>
      )}
    </section>
  )
}
