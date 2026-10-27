export interface CatalogueEntry {
  category: 'Actions' | 'Configuration' | 'Inputs' | 'Navigation' | 'Structure';
  description: string;
  name: string;
  route:
    | '/components/action-group'
    | '/components/button'
    | '/components/checkbox'
    | '/components/consumer'
    | '/components/menu'
    | '/components/numeric-input'
    | '/components/radio-group'
    | '/components/select'
    | '/components/slider'
    | '/components/switch'
    | '/components/tabs'
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
  {
    category: 'Inputs',
    description: 'Chooses one option from a visible set',
    name: 'Radio group',
    route: '/components/radio-group',
    status: 'Ready',
  },
  {
    category: 'Inputs',
    description: 'Toggles a setting with an immediate effect',
    name: 'Switch',
    route: '/components/switch',
    status: 'Ready',
  },
  {
    category: 'Inputs',
    description: 'Chooses a numeric value from a continuous range',
    name: 'Slider',
    route: '/components/slider',
    status: 'Ready',
  },
  {
    category: 'Navigation',
    description: 'Switches between related sections in the same context',
    name: 'Tabs',
    route: '/components/tabs',
    status: 'Ready',
  },
  {
    category: 'Navigation',
    description:
      'Presents actions and links from buttons or contextual targets',
    name: 'Menu',
    route: '/components/menu',
    status: 'Ready',
  },
];
