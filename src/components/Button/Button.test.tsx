import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import PrimaryButton from '@/components/Button'

describe('UI - Component - <Button />', () => {
  it('renders the button with the provided text', () => {
    const handleClick = vi.fn()
    render(<PrimaryButton text='Exercise 1' onClick={handleClick} type='button' />)
    expect(screen.getByRole('button', { name: 'Exercise 1' })).toBeInTheDocument()
  })

  it('handles onClick event', async () => {
    const handleClick = vi.fn()
    render(<PrimaryButton text='Exercise 1' onClick={handleClick} type='button' />)
    const button = screen.getByRole('button', { name: 'Exercise 1' })
    await userEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
