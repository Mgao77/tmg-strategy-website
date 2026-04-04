import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContactForm from './ContactForm'

describe('ContactForm', () => {
  it('renders all required fields', () => {
    render(<ContactForm />)
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/company/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('shows validation error on empty submit', async () => {
    render(<ContactForm />)
    await userEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getAllByRole('alert').length).toBeGreaterThan(0)
  })

  it('shows email format error for invalid email', async () => {
    render(<ContactForm />)
    await userEvent.type(screen.getByLabelText(/email/i), 'not-an-email')
    await userEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(screen.getByText(/valid email/i)).toBeInTheDocument()
  })
})
