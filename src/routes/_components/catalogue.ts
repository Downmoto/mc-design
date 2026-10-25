export interface CatalogueEntry {
  category: 'Actions' | 'Configuration' | 'Inputs' | 'Structure';
  description: string;
  name: string;
  route:
    | '/components/action-group'
    | '/components/button'
    | '/components/consumer'
    | '/components/text-area'
    | '/components/text-input'
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
  {
    category: 'Inputs',
    description: 'Collects a single line of text with clear field feedback',
    name: 'Text input',
    route: '/components/text-input',
    status: 'Ready',
  },
  {
    category: 'Inputs',
    description: 'Collects multiple lines of text with clear field feedback',
    name: 'Text area',
    route: '/components/text-area',
    status: 'Ready',
  },
];
