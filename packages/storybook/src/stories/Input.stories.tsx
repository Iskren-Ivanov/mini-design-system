import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@mini-design-system/ui';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'filled', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Default input',
  },
}

export const Filled: Story = {
  args: {
    variant: 'filled',
    placeholder: 'Filled input',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    placeholder: 'Outline input',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const WithError: Story = {
  args: {
    placeholder: 'Error input',
    error: false,
    errorText: 'This field is required',
    variant: 'default'
  },
}

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
}
