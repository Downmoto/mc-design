export interface CatalogueEntry {
  category: 'Actions' | 'Configuration';
  description: string;
  name: string;
  route:
    | '/components/button'
    | '/components/consumer'
    | '/components/icon-button'
    | '/components/link';
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
    description: 'Navigates to another location with descriptive text',
    name: 'Link',
    route: '/components/link',
    status: 'Ready',
  },
  {
    category: 'Actions',
    description: 'Triggers an action with a clear, visible text label',
    name: 'Button',
    route: '/components/button',
    status: 'Ready',
  },
  {
    category: 'Actions',
    description: 'Provides a compact action when an icon is widely understood',
    name: 'Icon button',
    route: '/components/icon-button',
    status: 'Ready',
  },
];
