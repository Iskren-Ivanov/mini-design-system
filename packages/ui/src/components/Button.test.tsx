import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button', () => {
  it('renders the button with default variant and medium size', () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[var(--color-primary)]');
    expect(button).toHaveClass('px-4 py-2 text-base');
  });

  it('renders with primary variant', () => {
    render(<Button variant='primary'>Primary Button</Button>);
    const button = screen.getByRole('button', { name: /primary button/i });
    expect(button).toHaveClass('bg-[var(--color-primary)]');
  });

  it('renders with secondary variant', () => {
    render(<Button variant='secondary'>Secondary Button</Button>);
    const button = screen.getByRole('button', { name: /secondary button/i });
    expect(button).toHaveClass('bg-[var(--color-bg-tertiary)]');
  });

  it('renders with outline variant', () => {
    render(<Button variant='outline'>Outline Button</Button>);
    const button = screen.getByRole('button', { name: /outline button/i });
    expect(button).toHaveClass('border-2 border-[var(--color-primary)]');
  });

  it('renders with ghost variant', () => {
    render(<Button variant='ghost'>Ghost Button</Button>);
    const button = screen.getByRole('button', { name: /ghost button/i });
    expect(button).toHaveClass('bg-transparent');
  });

  it('renders with small size', () => {
    render(<Button size='sm'>Small Button</Button>);
    const button = screen.getByRole('button', { name: /small button/i });
    expect(button).toHaveClass('px-3 py-1.5 text-sm');
  });

  it('renders with large size', () => {
    render(<Button size='lg'>Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('px-6 py-3 text-lg');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const button = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom Button</Button>);
    const button = screen.getByRole('button', { name: /custom button/i });
    expect(button).toHaveClass('custom-class');
  });

  // Snapshot tests
  it('matches snapshot for primary variant', () => {
    const { asFragment } = render(<Button variant='primary'>Primary Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for secondary variant', () => {
    const { asFragment } = render(<Button variant='secondary'>Secondary Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for outline variant', () => {
    const { asFragment } = render(<Button variant='outline'>Outline Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for ghost variant', () => {
    const { asFragment } = render(<Button variant='ghost'>Ghost Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for disabled state', () => {
    const { asFragment } = render(<Button disabled>Disabled Button</Button>);
    expect(asFragment()).toMatchSnapshot();
  });

});
