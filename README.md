# Karabiner Hyper Key Configuration

My custom Karabiner Elements setup using [mxstbr's TypeScript configuration](https://github.com/mxstbr/karabiner).

## What is this?

Caps Lock becomes a **Hyper Key** (⌃⌥⇧⌘) that unlocks sublayers of shortcuts:

| Prefix | Purpose |
|--------|---------|
| `Hyper + O` | **O**pen apps |
| `Hyper + B` | **B**rowse websites |
| `Hyper + G` | **G**itHub (Raycast) |
| `Hyper + W` | **W**indow management |
| `Hyper + R` | **R**aycast extensions |
| `Hyper + S` | **S**ystem controls |
| `Hyper + V` | **V**im movement |
| `Hyper + C` | Musi**c** controls |
| `Hyper + /` | Show cheatsheet |

Tap Caps Lock alone → Escape

## Setup

```bash
# Install dependencies
npm install --include=dev

# Build config
npm run build

# Symlink to Karabiner (first time only)
ln -sf ~/github/mxstbr/karabiner ~/.config/karabiner

# Reload Karabiner after changes
launchctl kickstart -k gui/$(id -u)/org.pqrs.service.agent.karabiner_console_user_server
```

## Files

- `rules.ts` - All keyboard shortcuts defined here
- `karabiner.json` - Generated config (don't edit directly)
- `cheatsheet.html` - Visual reference (view with `Hyper + /`)
- `utils.ts` - Helper functions
- `types.ts` - TypeScript types

## Customizing

Edit `rules.ts`, then rebuild:

```bash
npm run build
```

Karabiner auto-reloads, or force it with the launchctl command above.
