import React from 'react';

if (typeof window !== 'undefined' && !window.React) {
  window.React = React;
}

import './registerCategories.jsx';
import { ensureCustomCategoryFirst } from './registerCategories.jsx';

import { registerBlockType, unregisterBlockType, getBlockType } from '@wordpress/blocks';
import { registerCoreBlocks } from '@wordpress/block-library';
import './blocks/paragraphFormats.jsx';

import customBlocksConfig from './data/customBlocksConfig.json';
import { buildBlockSettings } from './blockFactory.jsx';
import { getWpRuntime, exposeWpOnWindow } from './wp/runtime.js';

// ── JSON Block Factory ──────────────────────────────────────────────────────────
// Schema-driven: `blockDef` is pure JSON (attributes + fields spec). See
// blockFactory.jsx for the control map and supported field types.
function registerJSONBlock(blockDef) {
  registerBlockType(blockDef.name, buildBlockSettings(blockDef));
}

/**
 * Re-register a JSON block after its definition changed within a session
 * (unregister + register). Safe to call before the block exists.
 * @param {object} blockDef
 */
export function reRegisterJSONBlock(blockDef) {
  if (!blockDef?.name) return;
  if (getBlockType(blockDef.name)) {
    try {
      unregisterBlockType(blockDef.name);
    } catch (err) {
      console.warn(`re-register: unregister("${blockDef.name}") failed:`, err);
    }
  }
  registerJSONBlock(blockDef);
}

// ── Host block registration queue ───────────────────────────────────────────────
const pendingRegistrars = [];
let registered = false;
let initPromise = null;
const registeredExternalBlocks = new Set();

/**
 * Queue a host block registrar. Runs after core/bundled init, before first editor render.
 * @param {(wp: ReturnType<typeof getWpRuntime>) => void} registrar
 */
export function registerBlocks(registrar) {
  if (typeof registrar !== 'function') return;
  if (registered) {
    registrar(getWpRuntime());
    return;
  }
  pendingRegistrars.push(registrar);
}

function runPendingRegistrars() {
  const wp = getWpRuntime();
  while (pendingRegistrars.length) {
    const fn = pendingRegistrars.shift();
    try {
      fn(wp);
    } catch (err) {
      console.error('registerBlocks callback failed:', err);
    }
  }
}

function applyUnregisterList(names = []) {
  if (!Array.isArray(names)) return;
  names.forEach((name) => {
    if (typeof name !== 'string' || !name) return;
    try {
      unregisterBlockType(name);
    } catch (err) {
      console.warn(`unregisterBlockType("${name}") failed:`, err);
    }
  });
}

/**
 * Register core + bundled blocks once, then merge consumer block definitions.
 * @param {object[]} externalBlocks - JSON block defs (same shape as customBlocksConfig.json)
 * @param {object} [options]
 * @param {object[]} [options.customBlocksConfig] - Extra JSON blocks from the host app
 * @param {boolean} [options.disableBundledBlocks] - Skip kit myapp/* demo blocks
 * @param {string[]} [options.unregisterBlocks] - Block names to remove after init
 * @returns {Promise<void>}
 */
export async function initBlocks(externalBlocks = [], options = {}) {
  if (initPromise) {
    await initPromise;
    if (Array.isArray(externalBlocks)) {
      externalBlocks.forEach(blockDef => {
        if (blockDef?.name && !registeredExternalBlocks.has(blockDef.name)) {
          try {
            registerJSONBlock(blockDef);
            registeredExternalBlocks.add(blockDef.name);
          } catch (err) {
            console.error(`Failed to register dynamic block: ${blockDef.name}`, err);
          }
        }
      });
    }
    return;
  }

  initPromise = (async () => {
    const consumerJsonBlocks = Array.isArray(options.customBlocksConfig)
      ? options.customBlocksConfig
      : [];
    const disableBundledBlocks = options.disableBundledBlocks === true;
    const unregisterBlocks = Array.isArray(options.unregisterBlocks)
      ? options.unregisterBlocks
      : [];

    registered = true;

    [...customBlocksConfig, ...consumerJsonBlocks].forEach(registerJSONBlock);

    if (!disableBundledBlocks) {
      await import('./blocks/bundled.jsx');
    }

    registerCoreBlocks();
    ensureCustomCategoryFirst();

    runPendingRegistrars();
    exposeWpOnWindow();

    applyUnregisterList(unregisterBlocks);

    if (Array.isArray(externalBlocks)) {
      externalBlocks.forEach(blockDef => {
        if (blockDef?.name && !registeredExternalBlocks.has(blockDef.name)) {
          try {
            registerJSONBlock(blockDef);
            registeredExternalBlocks.add(blockDef.name);
          } catch (err) {
            console.error(`Failed to register dynamic block: ${blockDef.name}`, err);
          }
        }
      });
    }
  })();

  await initPromise;
}

export { getWpRuntime, exposeWpOnWindow, unregisterBlockType };
