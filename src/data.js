import { groups as groupDefs } from '../content/groups.json';

// ── Content is authored as JSON files under /content, editable via the
//    Decap CMS admin UI (see /admin) as well as by hand. ──────────────
const categoryModules = import.meta.glob('../content/categories/*.json', { eager: true, import: 'default' });

const categoryEntries = Object.values(categoryModules).sort((a, b) => a.order - b.order);

export const CATEGORIES = categoryEntries.map(({ id, label, color, emoji }) => ({ id, label, color, emoji }));

// ── Category groups (4 faces of the drum sidebar) ────────────
export const CATEGORY_GROUPS = groupDefs.map(group => ({
  ...group,
  categoryIds: categoryEntries.filter(c => c.group === group.id).map(c => c.id),
}));

export const DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
export const TODAY_IDX = new Date().getDay();

export const VITAMINS = Object.fromEntries(
  categoryEntries.map(c => [c.id, c.vitamins.map((v, day) => ({ day, ...v }))])
);

export const DEVOTIONALS = Object.fromEntries(
  categoryEntries
    .filter(c => c.devotional && c.devotional.title && c.devotional.title.trim())
    .map(c => [c.id, c.devotional])
);

// Keyed by category id — each category owns its own bonus vitamin.
export const BONUS_VITAMINS = Object.fromEntries(
  categoryEntries.map(c => [c.id, c.bonus])
);
