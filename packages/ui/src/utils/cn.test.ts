import { describe, it, expect } from 'vitest';
import { cn } from './cn';

describe('cn utility', () => {
  it('combines class names correctly', () => {
    const result = cn('class1', 'class2');
    expect(result).toBe('class1 class2');
  });

  it('handles conditional classes', () => {
    const result = cn('base', true && 'conditional', false && 'hidden');
    expect(result).toBe('base conditional');
  });

  it('handles undefined and null values', () => {
    const result = cn('base', undefined, null, 'end');
    expect(result).toBe('base end');
  });

  it('handles empty strings', () => {
    const result = cn('base', '', 'end');
    expect(result).toBe('base end');
  });

  it('handles arrays of classes', () => {
    const result = cn(['class1', 'class2'], 'class3');
    expect(result).toBe('class1 class2 class3');
  });

  it('handles objects with boolean values', () => {
    const result = cn({
      'base': true,
      'conditional': true,
      'hidden': false
    });
    expect(result).toBe('base conditional');
  });

  it('merges conflicting Tailwind classes', () => {
    const result = cn('px-4 py-2', 'px-6 py-3');
    expect(result).toBe('px-6 py-3');
  });

  it('handles complex combinations', () => {
    const result = cn(
      'base-class',
      true && 'conditional-class',
      false && 'hidden-class',
      {
        'object-class': true,
        'object-hidden': false
      },
      ['array-class1', 'array-class2']
    );
    expect(result).toBe('base-class conditional-class object-class array-class1 array-class2');
  });
});
