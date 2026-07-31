import React from 'react';
import {
  useBlockProps,
  RichText,
  InspectorControls,
  InnerBlocks,
  PanelColorSettings,
  MediaUpload,
  MediaUploadCheck,
} from '@wordpress/block-editor';
import {
  PanelBody,
  TextControl,
  TextareaControl,
  ToggleControl,
  SelectControl,
  FormTokenField,
  Button,
  Spinner,
} from '@wordpress/components';
import { useEffect, useMemo, useState } from '@wordpress/element';
import { getCategories, setCategories } from '@wordpress/blocks';
import { resolveBlockIcon } from './utils/blockIcons.js';
import {
  ActionBuilder,
  DEFAULT_BUTTON_ACTION,
  useActionBuilderHost,
} from './actions/index.js';

/**
 * Schema-driven JSON block factory.
 *
 * A block definition is pure JSON (no functions), stored in the host app DB:
 *
 *   {
 *     name: 'cms/hero-banner',
 *     title: 'Hero Banner',
 *     description, category, icon, previewImage, keywords: [],
 *     supports: { html:false, align:['wide','full'] },
 *     parent: ['cms/foo'],            // optional
 *     attributes: { title: { type:'string', default:'' } },   // optional (derived from fields)
 *     fields: [                        // control spec — drives the inspector UI
 *       { key:'title', control:'text', label:'Title', panel:'Content', default:'Welcome' },
 *       { key:'items', control:'repeater', label:'Items', itemFields:[ ...fields ] },
 *       { key:'cfg',   control:'group',    label:'Config', fields:[ ...fields ] },
 *     ],
 *   }
 *
 * The factory turns that JSON into a Gutenberg block with a generic
 * InspectorControls UI and a deterministic, mobile-contract Save
 * (`riyasat-<slug>` class + `data-riyasat` attribute JSON).
 */

// ── control → WP attribute type ─────────────────────────────────────────────
const CONTROL_ATTR = {
  text: { type: 'string', default: '' },
  textarea: { type: 'string', default: '' },
  richtext: { type: 'string', default: '' },
  url: { type: 'string', default: '' },
  select: { type: 'string', default: '' },
  color: { type: 'string', default: '' },
  number: { type: 'number', default: 0 },
  boolean: { type: 'boolean', default: false },
  multiselect: { type: 'array', default: [] },
  image: { type: 'object', default: {} },
  video: { type: 'object', default: {} },
  action: { type: 'object', default: DEFAULT_BUTTON_ACTION },
  collection: { type: 'object', default: {} },
  product: { type: 'object', default: {} },
  page: { type: 'object', default: {} },
  repeater: { type: 'array', default: [] },
  group: { type: 'object', default: {} },
};

/** Build the WP `attributes` map from `fields` (merged over any explicit `attributes`). */
function buildAttributes(def) {
  const attrs = { ...(def.attributes || {}) };
  (def.fields || []).forEach((f) => {
    if (!f || !f.key) return;
    if (attrs[f.key]) {
      if (f.default !== undefined && attrs[f.key].default === undefined) {
        attrs[f.key] = { ...attrs[f.key], default: f.default };
      }
      return;
    }
    const base = CONTROL_ATTR[f.control] || CONTROL_ATTR.text;
    attrs[f.key] = {
      type: base.type,
      default: f.default !== undefined ? f.default : base.default,
    };
  });
  return attrs;
}

/** Register a block category if it is not already present. */
function ensureCategory(slug, title) {
  if (!slug) return;
  const existing = getCategories();
  if (existing.some((c) => c.slug === slug)) return;
  setCategories([...existing, { slug, title: title || slug }]);
}

// ── single field control ────────────────────────────────────────────────────
function FieldControl({ field, value, onChange }) {
  const host = useActionBuilderHost();
  const label = field.label || field.key;

  switch (field.control) {
    case 'textarea':
    case 'richtext':
      return (
        <TextareaControl
          label={field.control === 'richtext' ? `${label} (HTML)` : label}
          value={value || ''}
          rows={field.rows || 4}
          onChange={onChange}
          __nextHasNoMarginBottom
        />
      );

    case 'number':
      return (
        <TextControl
          type="number"
          label={label}
          value={value ?? ''}
          onChange={(v) => onChange(v === '' ? '' : Number(v))}
          __nextHasNoMarginBottom
        />
      );

    case 'url':
      return (
        <TextControl
          type="url"
          label={label}
          value={value || ''}
          onChange={onChange}
          __nextHasNoMarginBottom
        />
      );

    case 'boolean':
      return (
        <ToggleControl
          label={label}
          checked={!!value}
          onChange={onChange}
          __nextHasNoMarginBottom
        />
      );

    case 'select':
      return (
        <SelectControl
          label={label}
          value={value || ''}
          options={normalizeOptions(field.options)}
          onChange={onChange}
          __nextHasNoMarginBottom
        />
      );

    case 'multiselect': {
      const opts = normalizeOptions(field.options);
      const labels = opts.map((o) => o.label);
      const byLabel = Object.fromEntries(opts.map((o) => [o.label, o.value]));
      const byValue = Object.fromEntries(opts.map((o) => [o.value, o.label]));
      return (
        <FormTokenField
          label={label}
          value={(value || []).map((v) => byValue[v] || v)}
          suggestions={labels}
          onChange={(tokens) => onChange(tokens.map((t) => byLabel[t] ?? t))}
          __experimentalExpandOnFocus
        />
      );
    }

    case 'color':
      return (
        <PanelColorSettings
          title={label}
          colorSettings={[
            { label, value: value || '', onChange: (v) => onChange(v || '') },
          ]}
        />
      );

    case 'image':
    case 'video': {
      const types = field.control === 'video' ? ['video'] : ['image'];
      const current = value || {};
      return (
        <div className="riyasat-field-media">
          <p className="riyasat-field-label">{label}</p>
          {current.url ? (
            field.control === 'video' ? (
              <video src={current.url} muted style={mediaThumbStyle} />
            ) : (
              <img src={current.url} alt={current.alt || ''} style={mediaThumbStyle} />
            )
          ) : null}
          <MediaUploadCheck>
            <MediaUpload
              allowedTypes={types}
              onSelect={(m) => onChange(normalizeMedia(m, field.control))}
              render={({ open }) => (
                <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
                  <Button variant="secondary" onClick={open}>
                    {current.url ? 'Replace' : `Select ${field.control}`}
                  </Button>
                  {current.url && (
                    <Button variant="link" isDestructive onClick={() => onChange({})}>
                      Remove
                    </Button>
                  )}
                </div>
              )}
            />
          </MediaUploadCheck>
        </div>
      );
    }

    case 'action':
      return (
        <ActionBuilder
          label={label}
          value={value || DEFAULT_BUTTON_ACTION}
          onChange={onChange}
        />
      );

    case 'product':
      return (
        <ResourcePicker
          label={label}
          value={value}
          pick={host?.pickProduct}
          titleKey="productTitle"
          onChange={onChange}
        />
      );

    case 'collection':
      return (
        <ResourcePicker
          label={label}
          value={value}
          pick={host?.pickCollection}
          titleKey="collectionTitle"
          onChange={onChange}
        />
      );

    case 'page':
      return <PagePicker label={label} value={value} host={host} onChange={onChange} />;

    case 'repeater':
      return <RepeaterControl field={field} value={value} onChange={onChange} />;

    case 'group':
      return <GroupControl field={field} value={value} onChange={onChange} />;

    case 'text':
    default:
      return (
        <TextControl
          label={label}
          value={value || ''}
          onChange={onChange}
          __nextHasNoMarginBottom
        />
      );
  }
}

const mediaThumbStyle = {
  maxWidth: '100%',
  maxHeight: 120,
  borderRadius: 6,
  display: 'block',
  objectFit: 'cover',
};

function normalizeOptions(options) {
  if (!Array.isArray(options)) return [];
  return options.map((o) =>
    typeof o === 'string' ? { label: o, value: o } : { label: o.label, value: o.value },
  );
}

function normalizeMedia(m, control) {
  if (!m) return {};
  const out = { url: m.url, alt: m.alt || '', mimeType: m.mime || m.mimeType || '' };
  // media-dimensions contract: persist intrinsic size for images (hidden UI).
  if (control !== 'video') {
    if (m.width) out.width = m.width;
    if (m.height) out.height = m.height;
  }
  return out;
}

// ── resource pickers (Shopify) ──────────────────────────────────────────────
function ResourcePicker({ label, value, pick, titleKey, onChange }) {
  const current = value || {};
  const title = current[titleKey] || current.handle || (current.id ? '1 selected' : '');
  return (
    <div className="riyasat-field-picker">
      <p className="riyasat-field-label">{label}</p>
      {title && <p className="riyasat-field-picked">{title}</p>}
      <div style={{ display: 'flex', gap: 8 }}>
        <Button variant="secondary" disabled={!pick} onClick={async () => {
          if (!pick) return;
          const picked = await pick();
          if (picked) onChange(picked);
        }}>
          {pick ? (title ? 'Change' : 'Select') : 'Picker unavailable'}
        </Button>
        {title && (
          <Button variant="link" isDestructive onClick={() => onChange({})}>Clear</Button>
        )}
      </div>
    </div>
  );
}

function PagePicker({ label, value, host, onChange }) {
  const [pages, setPages] = useState(host?.pages || []);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    let cancelled = false;
    if (!host?.fetchPages) return;
    setLoading(true);
    host.fetchPages()
      .then((r) => { if (!cancelled) setPages(r || []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [host]);
  if (loading) return <Spinner />;
  const current = value || {};
  return (
    <SelectControl
      label={label}
      value={current.id || ''}
      options={[{ label: '— Select page —', value: '' },
        ...pages.map((p) => ({ label: p.title || p.id, value: p.id }))]}
      onChange={(id) => {
        const page = pages.find((p) => p.id === id);
        onChange(page ? { id: page.id, title: page.title } : {});
      }}
      __nextHasNoMarginBottom
    />
  );
}

// ── repeater / group ────────────────────────────────────────────────────────
function emptyItem(fields) {
  const obj = {};
  (fields || []).forEach((f) => {
    const base = CONTROL_ATTR[f.control] || CONTROL_ATTR.text;
    obj[f.key] = f.default !== undefined ? f.default : base.default;
  });
  return obj;
}

function RepeaterControl({ field, value, onChange }) {
  const items = Array.isArray(value) ? value : [];
  const itemFields = field.itemFields || field.fields || [];

  const update = (idx, key, val) => {
    const next = items.map((it, i) => (i === idx ? { ...it, [key]: val } : it));
    onChange(next);
  };
  const move = (idx, dir) => {
    const j = idx + dir;
    if (j < 0 || j >= items.length) return;
    const next = items.slice();
    [next[idx], next[j]] = [next[j], next[idx]];
    onChange(next);
  };

  return (
    <div className="riyasat-repeater">
      <p className="riyasat-field-label">{field.label || field.key}</p>
      {items.map((item, idx) => (
        <div key={idx} className="riyasat-repeater-item" style={repeaterItemStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <strong>#{idx + 1}</strong>
            <div style={{ display: 'flex', gap: 4 }}>
              <Button size="small" icon="arrow-up-alt2" label="Move up" onClick={() => move(idx, -1)} />
              <Button size="small" icon="arrow-down-alt2" label="Move down" onClick={() => move(idx, 1)} />
              <Button size="small" isDestructive icon="trash" label="Remove"
                onClick={() => onChange(items.filter((_, i) => i !== idx))} />
            </div>
          </div>
          {itemFields.map((f) => (
            <FieldControl key={f.key} field={f} value={item[f.key]}
              onChange={(v) => update(idx, f.key, v)} />
          ))}
        </div>
      ))}
      <Button variant="secondary" onClick={() => onChange([...items, emptyItem(itemFields)])}>
        + Add item
      </Button>
    </div>
  );
}

const repeaterItemStyle = {
  border: '1px solid #e0e0e0',
  borderRadius: 6,
  padding: 10,
  marginBottom: 10,
};

function GroupControl({ field, value, onChange }) {
  const obj = value || {};
  const fields = field.fields || [];
  return (
    <div className="riyasat-group" style={repeaterItemStyle}>
      <p className="riyasat-field-label">{field.label || field.key}</p>
      {fields.map((f) => (
        <FieldControl key={f.key} field={f} value={obj[f.key]}
          onChange={(v) => onChange({ ...obj, [f.key]: v })} />
      ))}
    </div>
  );
}

// ── editor / save ───────────────────────────────────────────────────────────
function groupFieldsByPanel(fields) {
  const panels = {};
  (fields || []).forEach((f) => {
    const p = f.panel || 'Content';
    (panels[p] = panels[p] || []).push(f);
  });
  return panels;
}

/**
 * Container config: a block that accepts child blocks (InnerBlocks).
 * `def.allowedBlocks` present (array) → container. Empty array = allow any block.
 * A non-empty array restricts which child block types can be inserted.
 */
function containerAllowed(def) {
  if (!Array.isArray(def.allowedBlocks)) return null;
  return def.allowedBlocks.length ? def.allowedBlocks : true;
}

function makeEdit(def, slug) {
  const allowed = containerAllowed(def);
  return function Edit({ attributes, setAttributes }) {
    const bp = useBlockProps({ className: `riyasat-json-block riyasat-json-block--${slug}` });
    const panels = useMemo(() => groupFieldsByPanel(def.fields), []);
    const panelNames = Object.keys(panels);

    return (
      <div {...bp}>
        <InspectorControls>
          {panelNames.map((name, i) => (
            <PanelBody key={name} title={name} initialOpen={i === 0}>
              {panels[name].map((f) => (
                <FieldControl
                  key={f.key}
                  field={f}
                  value={attributes[f.key]}
                  onChange={(v) => setAttributes({ [f.key]: v })}
                />
              ))}
            </PanelBody>
          ))}
        </InspectorControls>
        <BlockPreview def={def} attributes={attributes} />
        {allowed !== null ? (
          <div className="riyasat-json-block__children">
            <InnerBlocks
              allowedBlocks={allowed === true ? undefined : allowed}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
          </div>
        ) : null}
      </div>
    );
  };
}

/** Best-effort visual preview shared by the editor canvas. */
function BlockPreview({ def, attributes }) {
  return (
    <div className="riyasat-json-block__preview">
      {def.previewImage && !hasVisibleContent(def, attributes) ? (
        <img src={def.previewImage} alt={def.title} style={{ maxWidth: '100%' }} />
      ) : null}
      <span className="riyasat-json-block__label">{def.title}</span>
      {(def.fields || []).map((f) => renderPreviewField(f, attributes[f.key]))}
    </div>
  );
}

function hasVisibleContent(def, attributes) {
  return (def.fields || []).some((f) => {
    const v = attributes[f.key];
    return v && (typeof v === 'string' ? v.trim() : (v.url || (Array.isArray(v) && v.length)));
  });
}

function renderPreviewField(f, value) {
  if (value == null || value === '') return null;
  switch (f.control) {
    case 'richtext':
      return <div key={f.key} className={`riyasat-attr-${f.key}`}
        dangerouslySetInnerHTML={{ __html: value }} />;
    case 'text':
    case 'textarea': {
      const isHeading = /title|heading/.test(f.key);
      const Tag = isHeading ? 'h3' : 'p';
      return <Tag key={f.key} className={`riyasat-attr-${f.key}`}>{value}</Tag>;
    }
    case 'image':
      return value.url ? <img key={f.key} src={value.url} alt={value.alt || ''}
        style={{ maxWidth: '100%' }} /> : null;
    case 'video':
      return value.url ? <video key={f.key} src={value.url} muted controls
        style={{ maxWidth: '100%' }} /> : null;
    default:
      return null;
  }
}

function makeSave(def, slug) {
  const isContainer = containerAllowed(def) !== null;
  return function Save({ attributes }) {
    const name = def.name;
    const bp = useBlockProps.save({
      className: `riyasat-block riyasat-${slug} wp-block-${name.replace(/\//g, '-')}`,
      'data-riyasat-block': name,
      'data-riyasat': JSON.stringify(attributes || {}),
    });
    return (
      <div {...bp}>
        {(def.fields || []).map((f) => renderPreviewField(f, attributes[f.key]))}
        {isContainer ? <InnerBlocks.Content /> : null}
      </div>
    );
  };
}

/**
 * Register (or re-register) a JSON block definition.
 * @param {(name:string)=>void} unregister - unregisterBlockType, passed by caller
 */
export function buildBlockSettings(def) {
  const slug = def.name.split('/').pop();
  const attributes = buildAttributes(def);

  ensureCategory(def.category, def.categoryTitle);

  const icon = def.previewImage
    ? () => <img src={def.previewImage} alt="" style={{ width: 24, height: 24, objectFit: 'cover', borderRadius: 3 }} />
    : resolveBlockIcon(def.icon);

  const settings = {
    apiVersion: 3,
    title: def.title,
    description: def.description || '',
    category: def.category || 'common',
    icon,
    keywords: Array.isArray(def.keywords) ? def.keywords : [],
    supports: def.supports || { html: false },
    attributes,
    edit: makeEdit(def, slug),
    save: makeSave(def, slug),
  };
  if (Array.isArray(def.parent) && def.parent.length) settings.parent = def.parent;
  // Native inserter hover-preview from defaults.
  settings.example = {
    attributes: Object.fromEntries(
      Object.entries(attributes).map(([k, a]) => [k, a.default]),
    ),
  };
  return settings;
}
