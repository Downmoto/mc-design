export interface CatalogueEntry {
  category:
    | 'Actions'
    | 'Configuration'
    | 'Feedback'
    | 'Inputs'
    | 'Navigation'
    | 'Structure';
  description: string;
  name: string;
  route:
    | '/components/action-group'
    | '/components/alert'
    | '/components/badge'
    | '/components/button'
    | '/components/card'
    | '/components/checkbox'
    | '/components/consumer'
    | '/components/disclosure'
    | '/components/menu'
    | '/components/numeric-input'
    | '/components/progress-indicator'
    | '/components/radio-group'
    | '/components/select'
    | '/components/slider'
    | '/components/status'
    | '/components/switch'
    | '/components/tabs'
    | '/components/text-area'
    | '/components/text-input'
    | '/components/toast'
    | '/components/tooltip'
    | '/components/typography';
}

export const catalogue: CatalogueEntry[] = [
  {
    category: 'Configuration',
    description: 'Provides a consumer theme to nested library components',
    name: 'Consumer',
    route: '/components/consumer',
  },
  {
    category: 'Actions',
    description: 'Provides labelled, linked, and icon-only controls',
    name: 'Button',
    route: '/components/button',
  },
  {
    category: 'Actions',
    description: 'Arranges related actions as spaced or joined controls',
    name: 'Action group',
    route: '/components/action-group',
  },
  {
    category: 'Structure',
    description: 'Provides named semantic patterns for common text structures',
    name: 'Typography',
    route: '/components/typography',
  },
  {
    category: 'Structure',
    description: 'Groups related content into a flexible contained surface',
    name: 'Card',
    route: '/components/card',
  },
  {
    category: 'Inputs',
    description: 'Collects a single line of text with clear field feedback',
    name: 'Text input',
    route: '/components/text-input',
  },
  {
    category: 'Inputs',
    description: 'Collects multiple lines of text with clear field feedback',
    name: 'Text area',
    route: '/components/text-area',
  },
  {
    category: 'Inputs',
    description: 'Collects constrained numeric values with native controls',
    name: 'Numeric input',
    route: '/components/numeric-input',
  },
  {
    category: 'Inputs',
    description: 'Chooses one value from a known set of options',
    name: 'Select',
    route: '/components/select',
  },
  {
    category: 'Inputs',
    description: 'Toggles an independent option on or off',
    name: 'Checkbox',
    route: '/components/checkbox',
  },
  {
    category: 'Inputs',
    description: 'Chooses one option from a visible set',
    name: 'Radio group',
    route: '/components/radio-group',
  },
  {
    category: 'Inputs',
    description: 'Toggles a setting with an immediate effect',
    name: 'Switch',
    route: '/components/switch',
  },
  {
    category: 'Inputs',
    description: 'Chooses a numeric value from a continuous range',
    name: 'Slider',
    route: '/components/slider',
  },
  {
    category: 'Navigation',
    description: 'Switches between related sections in the same context',
    name: 'Tabs',
    route: '/components/tabs',
  },
  {
    category: 'Navigation',
    description:
      'Presents actions and links from buttons or contextual targets',
    name: 'Menu',
    route: '/components/menu',
  },
  {
    category: 'Navigation',
    description: 'Reveals supporting content or navigation on request',
    name: 'Disclosure',
    route: '/components/disclosure',
  },
  {
    category: 'Feedback',
    description: 'Provides concise supporting text for a control',
    name: 'Tooltip',
    route: '/components/tooltip',
  },
  {
    category: 'Feedback',
    description: 'Labels concise metadata, categories, and attributes',
    name: 'Badge',
    route: '/components/badge',
  },
  {
    category: 'Feedback',
    description: 'Presents persistent contextual information',
    name: 'Alert',
    route: '/components/alert',
  },
  {
    category: 'Feedback',
    description: 'Announces temporary background results without moving focus',
    name: 'Toast',
    route: '/components/toast',
  },
  {
    category: 'Feedback',
    description: 'Announces concise background updates without moving focus',
    name: 'Status',
    route: '/components/status',
  },
  {
    category: 'Feedback',
    description: 'Communicates the completion of an ongoing process',
    name: 'Progress indicator',
    route: '/components/progress-indicator',
  },
];
