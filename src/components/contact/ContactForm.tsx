'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'

interface FormData {
  name: string
  company: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim()) errors.name = 'Name is required.'
  if (!data.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!data.message.trim()) errors.message = 'Message is required.'
  return errors
}

const fieldClass =
  'w-full px-4 py-3 bg-[var(--color-surface)] border border-[rgba(0,0,0,0.12)] rounded-[4px] text-sm text-[var(--color-ink-primary)] placeholder:text-[var(--color-ink-muted)] focus:outline-none focus:border-[var(--color-ink-primary)] transition-colors duration-200'

const labelClass = 'block text-sm font-medium text-[var(--color-ink-secondary)] mb-2'

export default function ContactForm() {
  const [data, setData] = useState<FormData>({ name: '', company: '', email: '', message: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target
    setData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const validationErrors = validate(data)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Send failed')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="py-8 text-center" role="status">
        <p className="font-sans font-semibold text-[var(--color-ink-primary)] mb-2">Message received.</p>
        <p className="text-body text-[var(--color-ink-secondary)]">
          We will be in touch within one business day.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label htmlFor="name" className={labelClass}>Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={data.name}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Your name"
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>Company</label>
          <input
            id="company"
            name="company"
            type="text"
            value={data.company}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Your company (optional)"
          />
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="email" className={labelClass}>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={data.email}
          onChange={handleChange}
          className={fieldClass}
          placeholder="you@company.com"
          aria-required="true"
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
            {errors.email}
          </p>
        )}
      </div>

      <div className="mb-8">
        <label htmlFor="message" className={labelClass}>Message</label>
        <textarea
          id="message"
          name="message"
          value={data.message}
          onChange={handleChange}
          rows={5}
          className={`${fieldClass} resize-none`}
          placeholder="Tell us about your situation"
          aria-required="true"
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" role="alert" className="mt-2 text-[0.8rem] text-[#9F2F2D]">
            {errors.message}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className="mb-6 text-sm text-[#9F2F2D]">
          Could not send your message. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" variant="primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </Button>
    </form>
  )
}
