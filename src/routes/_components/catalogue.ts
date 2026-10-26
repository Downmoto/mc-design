export interface CatalogueEntry {
  category: 'Actions' | 'Configuration' | 'Inputs' | 'Structure';
  description: string;
  name: string;
  route:
    | '/components/action-group'
    | '/components/button'
    | '/components/checkbox'
    | '/components/consumer'
    | '/components/numeric-input'
    | '/components/select'
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
  {
    category: 'Inputs',
    description: 'Collects constrained numeric values with native controls',
    name: 'Numeric input',
    route: '/components/numeric-input',
    status: 'Ready',
  },
  {
    category: 'Inputs',
    description: 'Chooses one value from a known set of options',
    name: 'Select',
    route: '/components/select',
    status: 'Ready',
  },
  {
    category: 'Inputs',
    description: 'Toggles an independent option on or off',
    name: 'Checkbox',
    route: '/components/checkbox',
    status: 'Ready',
  },
];
