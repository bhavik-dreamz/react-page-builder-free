import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);

function getPackageRoot() {
  return dirname(require.resolve('react-page-builder-free/package.json'));
}

function resolveFromKit(id) {
  try {
    return require.resolve(id, { paths: [getPackageRoot()] });
  } catch {
    return null;
  }
}

/**
 * Vite plugin for consumer apps using react-page-builder-free.
 * Resolves @wordpress/* from this package's dependencies (npm/pnpm nested installs)
 * and avoids broken optimizeDeps pre-bundling when WordPress isn't at the app root.
 *
 * @example
 * // vite.config.js
 * import { defineConfig } from 'vite';
 * import react from '@vitejs/plugin-react';
 * import { reactPageBuilderVite } from 'react-page-builder-free/vite';
 *
 * export default defineConfig({
 *   plugins: [react(), reactPageBuilderVite()],
 * });
 */
export function reactPageBuilderVite() {
  return {
    name: 'react-page-builder-free-vite',
    config() {
      return {
        resolve: {
          dedupe: ['react', 'react-dom', '@wordpress/element'],
        },
        optimizeDeps: {
          // Pre-bundling the editor duplicates React → cloneElement / hook errors.
          exclude: [
            'react-page-builder-free',
            'react-page-builder-free/editor',
            'react-page-builder-free/editor-client',
            'react-page-builder-free/wp',
            'react-page-builder-free/wp/blocks',
            'react-page-builder-free/wp/block-editor',
            'react-page-builder-free/wp/components',
            'react-page-builder-free/wp/element',
            'react-page-builder-free/wp/data',
            'react-page-builder-free/wp/icons',
            'react-page-builder-free/actions',
          ],
        },
        ssr: {
          external: ['react-page-builder-free', 'react-page-builder-free/editor'],
        },
      };
    },
    resolveId(source) {
      if (source.startsWith('react-page-builder-free/wp')) {
        const sub = source.replace('react-page-builder-free/', '');
        return resolveFromKit(`react-page-builder-free/${sub}`) || resolveFromKit(source);
      }
      if (source === 'react-page-builder-free/actions') {
        return resolveFromKit('react-page-builder-free/actions');
      }
      if (!source.startsWith('@wordpress/')) {
        return null;
      }
      return resolveFromKit(source);
    },
  };
}

/**
 * @deprecated Renamed to `reactPageBuilderVite` in v2. Kept for `gutenberg-block-kit` users.
 */
export const gutenbergBlockKitVite = reactPageBuilderVite;

export default reactPageBuilderVite;
