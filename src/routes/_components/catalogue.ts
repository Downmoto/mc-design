export interface CatalogueEntry {
  category: 'Actions';
  description: string;
  name: string;
  route: '/components/button' | '/components/icon-button';
  status: 'Draft' | 'Ready';
}

export const catalogue: CatalogueEntry[] = [
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
