/**
 * Client-only editor entry — do not import in Server Components or Node SSR.
 * Includes bootstrap side effects. Import styles separately:
 *   import 'react-page-builder-free/styles'
 *
 * For SSR HTML use `react-page-builder-free/renderer`.
 *
 * Host blocks: import `react-page-builder-free/wp/*` in your `.jsx` files, or use
 * `registerBlocks((wp) => …)`. Pass `disableBundledBlocks` / `unregisterBlocks`
 * to control bundled demos. `initBlocks()` is async.
 */
import './bootstrap.js';

export { default as BlockEditor } from './App.jsx';
/** @deprecated Use BlockEditor — same component */
export { default as App } from './App.jsx';
export { default } from './App.jsx';

export {
  initBlocks,
  registerBlocks,
  reRegisterJSONBlock,
  getWpRuntime,
  exposeWpOnWindow,
  unregisterBlockType,
} from './registerBlocks.jsx';
export { buildBlockSettings } from './blockFactory.jsx';
export { resolveBlockIcon } from './utils/blockIcons.js';
export { EditorProvider, useEditor } from './context/EditorContext.jsx';
export { EDITOR_SETTINGS, mergeEditorSettings } from './config/editorSettings.js';
export {
  createMediaUploadHandler,
  applyMediaToSettings,
  normalizeMediaItem,
} from './media/index.js';
export {
  ActionBuilder,
  ActionLink,
  ActionBuilderSetup,
  ActionBuilderProvider,
  useActionBuilderHost,
  useActionRegistry,
  createActionRegistry,
  BUILTIN_ACTIONS,
  DEFAULT_REGISTRY,
  ACTION_NAMES,
  ACTION_OPTIONS,
  ACTION_SCHEMAS,
  normalizeAction,
  denormalizeAction,
  getDefaultActionForType,
  getActionPreviewHref,
  parsePageParams,
  pageParamsToRaw,
  migrateUrlToAction,
  resolveButtonAction,
  resolveItemButtonAction,
  validateAction,
  serializeActionAttribute,
  buttonActionAttribute,
} from './actions/index.js';
