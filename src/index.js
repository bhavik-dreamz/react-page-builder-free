/**
 * Default package entry — editor only (client).
 * For SSR HTML output use `react-page-builder-free/renderer`.
 * For styles use `react-page-builder-free/styles`.
 */
export {
  BlockEditor,
  App,
  initBlocks,
  registerBlocks,
  getWpRuntime,
  unregisterBlockType,
  EditorProvider,
  useEditor,
  resolveBlockIcon,
} from './editor.js';

export { default } from './editor.js';
