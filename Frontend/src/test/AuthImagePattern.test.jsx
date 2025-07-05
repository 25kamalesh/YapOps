import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import AuthImagePattern from '../Components/AuthImagePattern'

describe('AuthImagePattern Component', () => {
  it('should render with title and subtitle', () => {
    const title = 'Welcome Back'
    const subtitle = 'Sign in to continue your conversations'
    
    render(<AuthImagePattern title={title} subtitle={subtitle} />)
    
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(subtitle)).toBeInTheDocument()
  })

  it('should render 9 grid items', () => {
    render(<AuthImagePattern title="Test" subtitle="Test subtitle" />)
    
    const container = document.querySelector('.grid-cols-3')
    expect(container).toBeInTheDocument()
    
    const gridItems = container.children
    expect(gridItems).toHaveLength(9)
  })

  it('should have proper CSS classes', () => {
    render(<AuthImagePattern title="Test" subtitle="Test subtitle" />)
    
    const mainContainer = document.querySelector('.hidden.lg\\:flex')
    expect(mainContainer).toBeInTheDocument()
    expect(mainContainer).toHaveClass('bg-base-200', 'p-12')
  })

  it('should render without crashing when props are missing', () => {
    render(<AuthImagePattern />)
    
    // Component should still render even without props
    const container = document.querySelector('.hidden.lg\\:flex')
    expect(container).toBeInTheDocument()
  })
})
