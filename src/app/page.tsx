import styles from '@/ui/home.module.css'
import Link from 'next/link'
import PrimaryButton from '@/components/Button'
import classNames from 'classnames'
import { ubuntuLight, ubuntuNormal } from '@/libs/fonts'

export default function Home() {
  return (
    <main className={styles.homepage}>
      <section className='home-page'>
        <h2 className={classNames(ubuntuNormal.className, styles.heading2)}>Mango Technical Assignment</h2>
        <h3 className={classNames(ubuntuLight.className, styles.heading3)}>by Pablo J. García López</h3>
        <div className={styles.actions}>
          <Link href='/exercise1'>
            <PrimaryButton type='button' text='Exercise 1' className='button' />
          </Link>
          <Link href='/exercise2'>
            <PrimaryButton type='button' text='Exercise 2' className='button' />
          </Link>
        </div>
      </section>
    </main>
  )
}
