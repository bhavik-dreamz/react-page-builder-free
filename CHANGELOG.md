# Changelog

## 2.0.0

### Changed — BREAKING: package renamed

- Package renamed **`gutenberg-block-kit` → `react-page-builder-free`**. Repo renamed to
  [`bhavik-dreamz/react-page-builder-free`](https://github.com/bhavik-dreamz/react-page-builder-free).
  No API changes beyond the import specifier — update every import path:

  ```diff
  - import { BlockEditor, initBlocks } from 'gutenberg-block-kit/editor';
  - import { BlockRenderer } from 'gutenberg-block-kit/renderer';
  - import 'gutenberg-block-kit/styles';
  + import { BlockEditor, initBlocks } from 'react-page-builder-free/editor';
  + import { BlockRenderer } from 'react-page-builder-free/renderer';
  + import 'react-page-builder-free/styles';
  ```

  Codemod:

  ```bash
  grep -rl 'gutenberg-block-kit' src | xargs sed -i "s/gutenberg-block-kit/react-page-builder-free/g"
  ```

- Vite plugin export renamed **`gutenbergBlockKitVite` → `reactPageBuilderVite`**.
  Old name still exported as a deprecated alias.
- WordPress media-upload filter name changed to `react-page-builder-free/host-media-upload`.
- `gutenberg-block-kit` on npm is deprecated; `1.2.1` re-exports this package.

### Added

- All `## Unreleased` items below ship in this release.

## Unreleased

### Added

- **`headerButtons`** prop — show/hide individual header buttons (`deviceSwitcher`, `sidebar`, `preview`, `clear`, `save`, `viewSite`, `options`). All shown by default.
- **`confirmClear`** / **`confirmClearMessage`** props — Clear button now asks for confirmation before wiping content (`confirmClear` defaults `true`).
- **`devices`** prop — restrict which preview-width buttons appear (e.g. `['mobile']`); switcher auto-hides when only one device is allowed.
- **`defaultDevice`** prop — initial selected device; validated against `devices`, falls back to the first allowed device.
- **`customButtons`** prop — add consumer buttons to the header (`id`, `label`, `icon`, `title`, `position`, `className`, `disabled`, `onClick`); each `onClick` receives an editor API (`blocks`, `setBlocks`, `pageId`, `pageTitle`, `handleSave`, `handleClear`, …).
- **`templates`** prop — register/import consumer block templates into the "Choose a Template" picker (descriptor: `{ slug, label, category, icon, description, blocks[] }`).
- **`disableBundledTemplates`** prop — hide the bundled demo templates and show only consumer `templates`.
- Media Library modal: **tabbed UI** (Media library / Upload files), **drag-and-drop** upload, click-to-browse dropzone, **multi-file** upload with progress, and a selected-item check badge.

### Fixed

- Media Library **Upload button did nothing** — the upload control nested a `<button>` inside a `<label>`, which swallowed the click and never opened the file picker. Now triggers the hidden file input directly.

## 1.1.0

### Added

- **`gutenberg-block-kit/wp`** and **`gutenberg-block-kit/wp/*`** subpaths — shared `@wordpress` runtime for host-authored `.jsx` blocks (`blocks`, `block-editor`, `components`, `element`, `data`, `icons`).
- **`gutenberg-block-kit/actions`** — public export of `ActionBuilder`, `ActionLink`, `DEFAULT_BUTTON_ACTION`, `resolveItemButtonAction`, and related helpers.
- **`registerBlocks(callback)`** — queue host block registration; callback receives the kit `wp` runtime after init.
- **`disableBundledBlocks`** prop — skip all bundled `myapp/*` demo blocks.
- **`unregisterBlocks`** prop — remove specific blocks by name after init (e.g. `['myapp/carousel']`).
- Shared **`wp-runtime`** build chunk so editor and `wp/*` entries use one `@wordpress/blocks` registry.
- **`window.wp`** fallback assigned at editor init.
- **`test:wp-singleton`** — verifies registry singleton in CI.

### Changed

- **`initBlocks()`** is now async (`Promise<void>`); `BlockEditor` waits for block init before rendering.
