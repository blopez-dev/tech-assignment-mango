import styles from '@/ui/home.module.css'
import Range from '@/components/Range'
export default function Exercise1() {
  return (
    <main className={styles.mainContainer}>
      <Range minValueRange={0} maxValueRange={200} />
    </main>
  )
}
