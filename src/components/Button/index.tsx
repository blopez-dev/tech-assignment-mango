'use client'

import React, { FC } from 'react'
import classNames from 'classnames'
import styles from './button.module.css'

interface PrimaryButtonProps {
  text: string
  className?: string
  type: 'button'
  onClick?: () => void
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, className, type, onClick, ...props }) => {
  return (
    <button className={classNames(className, styles.button)} {...props} onClick={onClick} type={type}>
      {text}
    </button>
  )
}

export default PrimaryButton
