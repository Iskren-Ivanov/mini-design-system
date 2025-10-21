import { Button, Input, ThemeProvider, useTheme } from '@mini-design-system/ui';
import { useState } from 'react';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      variant='outline'
      onClick={toggleTheme}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </Button>
  );
}

function App() {
  const [hasError, setHasError] = useState(true);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (hasError) {
      setHasError(false);
    }
  };

  return (
    <ThemeProvider>
      <div className='min-h-screen bg-[var(--color-bg-secondary)]'>
        <div className='container mx-auto px-4 py-8'>
          <div className='flex justify-between items-center mb-8'>
            <h1 className='text-3xl font-bold text-[var(--color-text-primary)]'>
              Mini Design System
            </h1>
            <ThemeToggle />
          </div>

          {/* Buttons Section */}
          <section className='mb-12'>
            <h2 className='text-2xl font-semibold text-[var(--color-text-primary)] mb-6'>
              Buttons
            </h2>

            <div className='space-y-6'>
              {/* Button Variants */}
              <div>
                <h3 className='text-lg font-medium text-[var(--color-text-secondary)] mb-4'>
                  Variants
                </h3>
                <div className='flex flex-wrap gap-4'>
                  <Button variant='primary'>Primary</Button>
                  <Button variant='secondary'>Secondary</Button>
                  <Button variant='outline'>Outline</Button>
                  <Button variant='ghost'>Ghost</Button>
                </div>
              </div >

              {/* Button Sizes */}
              < div >
                <h3 className='text-lg font-medium text-[var(--color-text-secondary)] mb-4'>
                  Sizes
                </h3>
                <div className='flex flex-wrap items-center gap-4'>
                  < Button size='sm'>Small</Button>
                  < Button size='md'>Medium</Button>
                  < Button size='lg'>Large</Button>
                </div >
              </div >

              {/* Disabled Buttons */}
              < div >
                <h3 className='text-lg font-medium text-[var(--color-text-secondary)] mb-4'>
                  Disabled
                </h3>
                <div className='flex flex-wrap gap-4'>
                  < Button disabled > Disabled Primary</Button >
                  <Button variant='outline' disabled>Disabled Outline</Button>
                </div>
              </div>
            </div>
          </section>

          {/* Inputs Section */}
          <section className='mb-12'>
            < h2 className='text-2xl font-semibold text-[var(--color-text-primary)] mb-6'>
              Inputs
            </h2 >

            <div className='space-y-6'>
              {/* Input Variants */}
              <div>
                <h3 className='text-lg font-medium text-[var(--color - text - secondary)]mb - 4'>
                  Variants
                </h3 >
                <div className='space-y-4 max-w-md'>
                  <Input placeholder='Default input' />
                  < Input variant='filled' placeholder='Filled input' />
                  < Input variant='outline' placeholder='Outlined input' />
                </div >
              </div >

              {/* Input Sizes */}
              < div >
                <h3 className='text-lg font-medium text-[var(--color-text-secondary)] mb-4'>
                  Sizes
                </h3>
                <div className='space-y-4 max-w-md'>
                  < Input size='sm' placeholder='Small input' />
                  < Input size='md' placeholder='Medium input' />
                  < Input size='lg' placeholder='Large input' />
                </div >
              </div >

              {/* Input States */}
              < div >
                <h3 className='text-lg font-medium text-[var(--color-text-secondary)] mb-4'>
                  States
                </h3>
                <div className='space-y-4 max-w-md'>
                  < Input placeholder='Normal input' />
                  <Input
                    placeholder='Error input'
                    value={inputValue}
                    onChange={handleInputChange}
                    error={hasError || inputValue.length === 0}
                    errorText={hasError || inputValue.length === 0 ? 'This field is required' : undefined}
                  />
                  <Input placeholder='Disabled input' disabled />
                </div >
              </div >
            </div >
          </section >
        </div >
      </div >
    </ThemeProvider >
  );
}

export default App;