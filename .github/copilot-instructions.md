	You are an elite coder, 
	<Tech Stack>
	Backend: FastApi, postgres, alembic,
	Frontend: React, Vite, shadcn/ui, twilightcss
	LLM: Bedrock
	</Tech Stack>

	<Gotcha - Bakcend>
	- `os.path.splitext()` should be replaced by `Path.suffix`, `Path.stem`, and `Path.parent`
	- Use `logging.exception` instead of `logging.error
	- Single quotes found but double quotes
	- Use explicit conversion
	- Multi-line docstring summary should start at the first line
	- imports shuold be added at the class level not inside the functions
	- This type is deprecated as of Python 3.10; use "| None" instead
	- Use `list` instead of `List` for type annotation (aldo dict and etc)
	- Use `elif` instead of `else` then `if`, to reduce indentation
	- Use snake case
	- avoid using log lines one after the other, try to concilidate them to a single line if possible
	</Gotcha - Bakcend>


	<Gotcha - Client>
	 - require is not available in the browser environment when using Vite. use dynamic import using import()
	 - Use camel case
	 - The 'shadcn-ui' package is deprecated. Please use the 'shadcn' package instead:
	</Gotcha - Client>

	<Tailwind>
	Here are clear instructions for installing Tailwind CSS as a Vite plugin:

## Installing Tailwind CSS with Vite

### Prerequisites
- Node.js installed on your system
- A project using Vite

### Step-by-Step Installation

1. **Install Tailwind CSS and Vite Plugin**
   Open your terminal and run:
   ```bash
   npm install tailwindcss @tailwindcss/vite
   ```

2. **Configure Vite Plugin**
   In your `vite.config.ts` file, add the Tailwind CSS plugin:
   ```typescript
   import { defineConfig } from 'vite'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [
       tailwindcss(),
     ],
   })
   ```

3. **Import Tailwind in Your CSS**
   In your main CSS file (e.g., `src/styles.css`), add:
   ```css
   @import "tailwindcss";
   ```

4. **Start Development Server**
   Run your development server:
   ```bash
   npm run dev
   ```

5. **Use Tailwind Classes**
   Start using Tailwind utility classes in your HTML/components:
   ```html
   <h1 class="text-3xl font-bold underline">
     Hello world!
   </h1>
   ```

### Notes
- Ensure your CSS is linked in the `<head>` of your HTML
- Some frameworks handle CSS injection automatically
	</Tailwind>

	<shadcn-ui>
		# Setting Up a React + TypeScript Project with Tailwind CSS and Shadcn UI

## Prerequisites
- Node.js installed
- NPM (Node Package Manager)

## Step-by-Step Guide

### 1. Create React Project
```bash
npm create vite@latest
```
- When prompted, select:
  - React
  - TypeScript

### 2. Install Dependencies
```bash
# Install Tailwind and Vite plugin
npm install tailwindcss @tailwindcss/vite

# Install path type definitions
npm install -D @types/node
```

### 3. Configure TypeScript
#### Update `tsconfig.json`:
```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

#### Update `tsconfig.app.json`:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### 4. Configure Vite
Update `vite.config.ts`:
```typescript
import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
```

### 5. Setup Tailwind CSS
Replace content in `src/index.css`:
```css
@import "tailwindcss";
```

### 6. Initialize Shadcn UI
```bash
npx shadcn@latest init
```
- Choose "Neutral" as base color

### 7. Add First Component
```bash
npx shadcn@latest add button
```

### 8. Use Component in App
Update `src/App.tsx`:
```typescript
import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-svh">
      <Button>Click me</Button>
    </div>
  )
}

export default App
```

### 9. Start Development Server
```bash
npm run dev
```

## Notes
- Ensure all configuration steps are followed carefully
- Check that all paths and imports are correct
- Restart dev server if changes don't reflect immediately
	</shadcn-ui>

	when given a task, you need to follow the given task, in case you notice there are other things which require adjustments,
	things which require fixing or not writtern properly, but not part of the given task, you need to ask for explicit permission to execute.
	It's important to split the code to small components, don't create files larger than 800 lines.
	for the ui whenever applicable use shadcn/ui components, before installing new components, make sure not already installed 
	We are using justfile for a lot of operations:
	just generate_migration
	just migrate

	You are required to write clean code, don't use any/Any create actual classes / interfaces. create short and clear fucntoins.

## Testing
You are required to write tests, we need tests for the backend, the tests need to check actual code, it needs to use real classes
and test real functionality, create mock data for each test. put tests in the tests folder under the client

## Problem Solving
When there is a complex problem or a task, you can just simplify and remove features, workaround are not acceptable unless given an explicit permission for 
making workarounds or simplifying features requested to implement

The client tests needs to check actual ui and use playwright for this, you will need to put the tests in the tests folder under the client