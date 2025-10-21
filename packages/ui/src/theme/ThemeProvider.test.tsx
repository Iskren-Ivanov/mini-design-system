import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, useTheme } from './ThemeProvider';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <div data-testid='current-theme'>{theme}</div>
      <button onClick={toggleTheme} data-testid='toggle-theme'>
        Toggle Theme
      </button>
    </div>
  );
};

describe('ThemeProvider', () => {
  it('provides default light theme', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });

  it('toggles theme from light to dark', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('toggles theme from dark to light', () => {
    render(
      <ThemeProvider defaultTheme='dark'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });


  it('removes dark class from document when theme is light', () => {
    document.documentElement.classList.add('dark');

    render(
      <ThemeProvider defaultTheme='light'>
        <TestComponent />
      </ThemeProvider>
    );

    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('persists theme changes in localStorage', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(localStorage.getItem('theme')).toBe('dark');

    fireEvent.click(screen.getByTestId('toggle-theme'));
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('initializes with stored theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('dark');
  });

  it('handles invalid stored theme gracefully', () => {
    localStorage.setItem('theme', 'invalid-theme');

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('current-theme')).toHaveTextContent('light');
  });
});
