# ⚠️ `gutenberg-block-kit` is deprecated

This package was renamed to **[`react-page-builder-free`](https://www.npmjs.com/package/react-page-builder-free)**.

`gutenberg-block-kit@1.2.1` contains no code of its own — every subpath re-exports the new
package, so existing installs keep working. New features only land in
`react-page-builder-free`.

## Migrate

```bash
npm uninstall gutenberg-block-kit
npm install react-page-builder-free
```

Then update import paths:

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

The Vite plugin export was renamed `gutenbergBlockKitVite` → `reactPageBuilderVite`
(old name kept as a deprecated alias).

Docs: <https://github.com/bhavik-dreamz/react-page-builder-free>
