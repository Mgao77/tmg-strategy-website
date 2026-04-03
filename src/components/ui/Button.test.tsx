import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Button from './Button'

describe('Button', () => {
  it('renders primary variant by default', () => {
    render(<Button>Book a call</Button>)
    const btn = screen.getByRole('button', { name: 'Book a call' })
    expect(btn).toBeInTheDocument()
  })

  it('renders as anchor when href provided', () => {
    render(<Button href="/contact">Contact</Button>)
    expect(screen.getByRole('link', { name: 'Contact' })).toBeInTheDocument()
  })

  it('calls onClick handler', async () => {
    const handler = jest.fn()
    render(<Button onClick={handler}>Click</Button>)
    await userEvent.click(screen.getByRole('button'))
    expect(handler).toHaveBeenCalledTimes(1)
  })
})
