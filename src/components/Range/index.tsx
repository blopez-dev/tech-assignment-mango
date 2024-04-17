'use client'

import styles from './Range.module.css'
import { TRange } from '@/types/RangeTypes'
import { useCustomRange } from '@/hooks/useCustomRange'
import { positionFormatter } from '@/services/positionFormater'

export default function Range({ initialMin, initialMax, onChange }: TRange) {
  const {
    minValue,
    maxValue,
    isEditingMinValue,
    isEditingMaxValue,
    handleSlidingValue,
    setEditingMinvalue,
    setEditingMaxValue,
    handleValueSubmit
  } = useCustomRange(initialMin, initialMax, onChange)

  const { minRangePosition, maxRangePosition } = positionFormatter(minValue, maxValue, initialMin, initialMax)
  const pointerWidth = 15

  return (
    <section className={styles.rangeContainer} data-testId='rangeComponent'>
      <div className={styles.containerLabels}>
        {isEditingMinValue ? (
          <input
            type='number'
            className={styles.editingInput}
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
          <label data-testid='range-min-value' className={styles.labelValue} onClick={() => setEditingMinvalue(true)}>
            <span>{minValue}</span>
          </label>
        )}
      </div>
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
          className={styles.editingInput}
          defaultValue={maxValue}
          onBlur={e => handleValueSubmit(e.currentTarget.value, false)}
          onKeyUp={e => {
            e.key === 'Enter' ? (e.currentTarget as HTMLInputElement).blur() : null
          }}
          onFocus={e => e.target.select()}
          autoFocus
        />
      ) : (
        <label data-testid='range-max-value' className={styles.labelValue} onClick={() => setEditingMaxValue(true)}>
          <span>{maxValue}</span>
        </label>
      )}
    </section>
  )
}
