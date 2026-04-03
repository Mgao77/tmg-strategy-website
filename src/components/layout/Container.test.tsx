import { render, screen } from '@testing-library/react'
import Container from './Container'

describe('Container', () => {
  it('renders children', () => {
    render(<Container><p>Test content</p></Container>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies correct max-width class', () => {
    const { container } = render(<Container><span /></Container>)
    expect(container.firstChild).toHaveClass('max-w-[1200px]')
  })
})
