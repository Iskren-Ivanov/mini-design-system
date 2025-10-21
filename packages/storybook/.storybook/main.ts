import type { StorybookConfig } from '@storybook/react-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal: async (config) => {
    const tailwindcss = await import('tailwindcss')
    const autoprefixer = await import('autoprefixer')

    config.css = {
      postcss: {
        plugins: [
          tailwindcss.default,
          autoprefixer.default,
        ],
      },
    }

    return config
  },
}

export default config
