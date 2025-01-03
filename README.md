# Nuxt Minimal Starter

- compatibility with Nuxt4 (app folder contains the client part of the application)
- Typescript and global types
- Postcss preset env, Sass and global styles
- DaisyUI for UI components as a Tailwind plugin
- explicit SSR
- Basic layout and routing
- App \_models folder contains every Domain with its own components, composables, types (Nuxt config is configured to auto-import files inside \_models folder)

## Preview

Preview the project [at Vercel](https://carbonara-app-chekobils-projects.vercel.app/)

## Documentation

Read the documentation [here](https://kobino.notion.site/Carbonara-app-12d51469461180539df1e05511af94c8)

## Setup

Clone the repo and make sure to install dependencies:

```bash
git clone <repo-url-from-github>
cd carbonara-app
pnpm install
```

## Development Server

Nuxt starts the development server at `http://localhost:3000`:

```bash
bun dev
```

## Testing

Unit tests can be run with the next command

```bash
bun test:unit
```

Components unit tests can be run with the next command

```bash
bun test:components
```

E2E tests can be run with the next command
Be sure to have the app running in DEV mode.

```bash
# run tests in headless mode
bun test:e2e:firefox
# or use the visual mode from Cypress
bun cy:open
```

## Production

Locally preview production build:

```bash
bun preview
```
