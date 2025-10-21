import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Input } from './Input';

describe('Input', () => {
  it('renders the input with a label and placeholder', () => {
    render(<Input label='Username' placeholder='Enter your username' id='username' />);
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter your username/i)).toBeInTheDocument();
  });

  it('renders without label when not provided', () => {
    render(<Input placeholder='Enter text' />);
    expect(screen.getByPlaceholderText(/enter text/i)).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<Input helperText='This is a helper message' />);
    expect(screen.getByText(/this is a helper message/i)).toBeInTheDocument();
  });

  it('displays error text when error prop is true', () => {
    render(<Input error errorText='This field is required' />);
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-[var(--color-error)]');
  });

  it('displays error text when errorText prop is provided without error prop', () => {
    render(<Input errorText='Invalid input' />);
    expect(screen.getByText(/invalid input/i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveClass('border-[var(--color-error)]');
  });

  it('updates value on change', () => {
    render(<Input label='Name' id='name' />);
    const input = screen.getByLabelText(/name/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'John Doe' } });
    expect(input.value).toBe('John Doe');
  });

  it('is disabled when disabled prop is true', () => {
    render(<Input disabled placeholder='Disabled input' />);
    const input = screen.getByPlaceholderText(/disabled input/i);
    expect(input).toBeDisabled();
  });

  it('applies default variant styles', () => {
    render(<Input variant='default' />);
    expect(screen.getByRole('textbox')).toHaveClass('border-[var(--color-border)]');
  });

  it('applies filled variant styles', () => {
    render(<Input variant='filled' />);
    expect(screen.getByRole('textbox')).toHaveClass('bg-[var(--color-bg-tertiary)]');
  });

  it('applies outline variant styles', () => {
    render(<Input variant='outline' />);
    expect(screen.getByRole('textbox')).toHaveClass('border-2 border-[var(--color-border)]');
  });

  it('applies small size styles', () => {
    render(<Input size='sm' />);
    expect(screen.getByRole('textbox')).toHaveClass('px-3 py-1.5 text-sm');
  });

  it('applies large size styles', () => {
    render(<Input size='lg' />);
    expect(screen.getByRole('textbox')).toHaveClass('px-4 py-3 text-lg');
  });

  it('applies custom className', () => {
    render(<Input className='custom-class' />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-class');
  });


  it('handles focus and blur events', () => {
    const handleFocus = vi.fn();
    const handleBlur = vi.fn();
    render(<Input onFocus={handleFocus} onBlur={handleBlur} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(handleFocus).toHaveBeenCalledTimes(1);

    fireEvent.blur(input);
    expect(handleBlur).toHaveBeenCalledTimes(1);
  });

  // Snapshot tests
  it('matches snapshot for default variant', () => {
    const { asFragment } = render(<Input placeholder='Default input' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for filled variant', () => {
    const { asFragment } = render(<Input variant='filled' placeholder='Filled input' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for outline variant', () => {
    const { asFragment } = render(<Input variant='outline' placeholder='Outline input' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with label', () => {
    const { asFragment } = render(<Input label='Email' placeholder='Enter email' id='email' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with error state', () => {
    const { asFragment } = render(<Input error errorText='This field is required' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot with helper text', () => {
    const { asFragment } = render(<Input helperText='This is a helper message' />);
    expect(asFragment()).toMatchSnapshot();
  });

  it('matches snapshot for disabled state', () => {
    const { asFragment } = render(<Input disabled placeholder='Disabled input' />);
    expect(asFragment()).toMatchSnapshot();
  });
});
