export interface CatalogueEntry {
  category: 'Actions' | 'Configuration' | 'Structure';
  description: string;
  name: string;
  route:
    | '/components/action-group'
    | '/components/button'
    | '/components/consumer'
    | '/components/typography';
  status: 'Draft' | 'Ready';
}

export const catalogue: CatalogueEntry[] = [
  {
    category: 'Configuration',
    description: 'Provides a consumer theme to nested library components',
    name: 'Consumer',
    route: '/components/consumer',
    status: 'Ready',
  },
  {
    category: 'Actions',
    description: 'Provides labelled, linked, and icon-only controls',
    name: 'Button',
    route: '/components/button',
    status: 'Ready',
  },
  {
    category: 'Actions',
    description: 'Arranges related actions as spaced or joined controls',
    name: 'Action group',
    route: '/components/action-group',
    status: 'Ready',
  },
  {
    category: 'Structure',
    description: 'Provides named semantic patterns for common text structures',
    name: 'Typography',
    route: '/components/typography',
    status: 'Ready',
  },
];
