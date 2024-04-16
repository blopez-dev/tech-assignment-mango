import ReactQueryProvider from '@/providers/ReactQueryProviders'
import { ubuntuNormal } from '@/libs/fonts'
import classNames from 'classnames'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mango | Tech Assignment Pablo J.',
  description: 'Mango Technical test by Pablo J.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={classNames(ubuntuNormal.className)} suppressHydrationWarning={true}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
      </body>
    </html>
  )
}
