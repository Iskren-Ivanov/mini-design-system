# Mini Design System

A modern, scalable design system built with React, TypeScript, and Tailwind CSS, organized as a Turborepo monorepo.

## 🏗️ Architecture

This project uses a **monorepo architecture** with Turborepo for efficient build orchestration and dependency management.

### Project Structure

```
mini-design-system/
├── apps/
│   └── demo/                    # Demo application showcasing components
├── packages/
│   ├── ui/                      # Core UI components library
│   └── storybook/               # Storybook for component documentation
├── package.json                 # Root package configuration
├── turbo.json                   # Turborepo task orchestration
├── tailwind.config.js           # Centralized Tailwind configuration
├── postcss.config.js            # Centralized PostCSS configuration
└── tsconfig.json                # Centralized TypeScript configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 10.0.0

### Installation

```bash
# Clone the repository
git clone [YOUR_GITHUB_REPO_URL]
cd mini-design-system

# Install all dependencies
npm install
```

### Development

```bash
# Start all development servers
npm run dev

# Start specific applications
npm run demo          # Demo application (http://localhost:5173)
npm run storybook     # Storybook (http://localhost:6006)
```

### Building

```bash
# Build all packages
npm run build

# Build specific packages
npm run build:ui       # Build UI library
npm run build:demo     # Build demo application
npm run build:storybook # Build Storybook static files
```

## 📦 Package Details

### UI Library (`packages/ui/`)

The core design system containing:

- **Components**: Button, Input, ThemeProvider
- **Utilities**: `cn()` for className merging
- **Theming**: CSS custom properties for light/dark themes
- **Styling**: Tailwind CSS with centralized configuration

**Key Features:**

- CSS Custom Properties for theming (no `dark:` prefixes needed)
- TypeScript support with full type definitions
- Comprehensive test coverage with Vitest
- Optimized build output with Vite

### Demo Application (`apps/demo/`)

A showcase application demonstrating:

- Component usage examples
- Theme switching functionality
- Real-world implementation patterns

### Storybook (`packages/storybook/`)

Component documentation and development environment:

- Interactive component playground
- Visual testing capabilities
- Design system documentation

## ⚙️ Configuration Architecture

### Centralized Configuration Strategy

This monorepo uses a **centralized configuration approach** to avoid duplication and ensure consistency:

#### Root-Level Configurations

**`tailwind.config.js`** - Centralized Tailwind configuration:

```javascript
export default {
  content: ['./apps/**/*.{js,ts,jsx,tsx}', './packages/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  // ... shared theme configuration
};
```

**`postcss.config.js`** - Centralized PostCSS configuration:

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

**`tsconfig.json`** - Base TypeScript configuration:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "strict": true
    // ... shared compiler options
  },
  "include": ["apps/**/*", "packages/**/*"]
}
```

#### Package-Level Configurations

Each package extends the root configuration:

**`packages/ui/tsconfig.json`**:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "noEmit": false,
    "outDir": "./dist"
  }
}
```

**`apps/demo/tailwind.config.js`**:

```javascript
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}', // Include UI components
  ],
  // Inherits from root config
};
```

### How Packages Read Root Configurations

1. **Dependency Hoisting**: Common dependencies are installed at the root level
2. **Configuration Inheritance**: Packages extend root configurations
3. **Path Resolution**: Build tools automatically resolve configurations up the directory tree
4. **Shared Dependencies**: React, TypeScript, Tailwind, and other common tools are hoisted to root

## 🎨 Theming System

### CSS Custom Properties Approach

Instead of using Tailwind's `dark:` prefixes, this design system uses CSS custom properties:

```css
:root {
  --color-bg-primary: #ffffff;
  --color-text-primary: #111827;
  /* ... light theme colors */
}

.dark {
  --color-bg-primary: #111827;
  --color-text-primary: #f9fafb;
  /* ... dark theme colors */
}
```

**Benefits:**

- No need to add `dark:` classes to every component
- Automatic theme switching
- Better performance (fewer CSS classes)
- Easier maintenance

### Component Usage

```tsx
// Components automatically use theme variables
<Button variant="primary">Click me</Button>
<Input placeholder="Enter text" error={hasError} />
```

## 🧪 Testing

### Test Setup

- **Framework**: Vitest with React Testing Library
- **Environment**: JSDOM for browser simulation
- **Location**: Tests are co-located with components (`Button.test.tsx`)

### Running Tests

```bash
# Run all tests
npm run test

# Run UI package tests
npm run test:ui

# Run tests in watch mode
npm run test:watch
```

### Snapshot Testing

This project uses **snapshot testing** to ensure UI components maintain their expected structure. Snapshot tests capture the rendered HTML output of components and compare it against stored snapshots.

#### How Snapshot Tests Work

- **First run**: Creates `.snap` files in `packages/ui/src/components/__snapshots__/`
- **Subsequent runs**: Compares current output with stored snapshots
- **Changes detected**: Tests fail and show diff of what changed

#### Managing Snapshot Changes

When you modify components and snapshots need updating:

**Option 1: Update all snapshots automatically**

```bash
npm run test:ui -- -u
```

**Option 2: Update snapshots interactively**

```bash
npm run test:ui
# Press 'u' in the terminal to update snapshots
```

**Option 3: Delete and recreate snapshots**

```bash
# Delete existing snapshots
rm -rf packages/ui/src/components/__snapshots__/

# Run tests to create new snapshots
npm run test:ui -- --run
```

#### When Snapshots Fail

Snapshot tests fail when:

- Component HTML structure changes
- CSS classes are modified
- Component props affect rendering
- New elements are added/removed

**Review the diff carefully** - if changes are intentional, update snapshots. If changes are bugs, fix the component.

#### Snapshot Best Practices

- **Review diffs**: Always check what changed before updating
- **Commit snapshots**: Include `.snap` files in version control
- **Team coordination**: Discuss snapshot changes with team
- **Regular updates**: Update snapshots when making intentional changes

## 📚 Development Workflow

### Adding New Components

1. Create component in `packages/ui/src/components/`
2. Add tests in the same directory
3. Create Storybook stories in `packages/storybook/src/stories/`
4. Export from `packages/ui/src/index.ts`

### Making Changes

1. **UI Components**: Changes in `packages/ui/` automatically reflect in demo and Storybook
2. **Configuration**: Changes to root configs affect all packages
3. **Dependencies**: Add shared dependencies to root `package.json`

## 🔧 Build System

### Vite Configuration

Each package has its own Vite configuration extending a base config:

**`vite.config.base.ts`** (root):

```typescript
export const baseConfig = {
  plugins: [react()],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
};
```

**`packages/ui/vite.config.ts`**:

```typescript
export default defineConfig({
  ...baseConfig,
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
    },
  },
});
```

### Turborepo Tasks

**`turbo.json`** defines the build pipeline:

```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

## 📦 Package Management

### Dependency Strategy

- **Root Dependencies**: Shared tools (React, TypeScript, Tailwind, Vite)
- **Package Dependencies**: Package-specific tools (testing libraries, build tools)
- **Peer Dependencies**: UI library expects React to be provided by consuming applications

### Workspace Configuration

```json
{
  "workspaces": ["packages/*", "apps/*"]
}
```

## 🚀 Deployment

### Building for Production

```bash
# Build all packages
npm run build

# Build specific applications
npm run build:demo
npm run build:storybook
```

### Output Structure

- **UI Library**: `packages/ui/dist/` - ES modules and TypeScript definitions
- **Demo App**: `apps/demo/dist/` - Static files ready for deployment
- **Storybook**: `packages/storybook/storybook-static/` - Static documentation site

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Update documentation
6. Submit a pull request

## 📄 License

---

**Built with ❤️ using React, TypeScript, Tailwind CSS, and Turborepo**
