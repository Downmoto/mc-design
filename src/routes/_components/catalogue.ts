export interface CatalogueEntry {
  category: 'Actions' | 'Configuration';
  description: string;
  name: string;
  route: '/components/button' | '/components/consumer';
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
];
