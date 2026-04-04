import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  const { name, company, email, message } = await request.json()

  // Basic server-side validation
  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    await resend.emails.send({
      from: 'TMG Strategy Website <noreply@tmgstrategy.com>',
      to: ['hello@tmgstrategy.com'],
      replyTo: email,
      subject: `New enquiry from ${name}${company ? ` at ${company}` : ''}`,
      text: `Name: ${name}\nCompany: ${company || 'Not provided'}\nEmail: ${email}\n\nMessage:\n${message}`,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
