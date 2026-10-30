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
    | '/components/dialog'
    | '/components/empty-state'
    | '/components/list'
    | '/components/menu'
    | '/components/numeric-input'
    | '/components/progress-indicator'
    | '/components/panel'
    | '/components/radio-group'
    | '/components/select'
    | '/components/sidebar'
    | '/components/slider'
    | '/components/scrollbar'
    | '/components/status'
    | '/components/switch'
    | '/components/tabs'
    | '/components/table'
    | '/components/text-area'
    | '/components/text-input'
    | '/components/toast'
    | '/components/toggle'
    | '/components/toolbar'
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
    category: 'Configuration',
    description: 'Applies shared scrollbar styling to nested content',
    name: 'Scrollbar',
    route: '/components/scrollbar',
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
    category: 'Actions',
    description: 'Turns an independent action state on or off',
    name: 'Toggle',
    route: '/components/toggle',
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
    category: 'Structure',
    description: 'Groups frequently used controls with efficient navigation',
    name: 'Toolbar',
    route: '/components/toolbar',
  },
  {
    category: 'Structure',
    description: 'Fills a workspace region with persistent and scrolling areas',
    name: 'Panel',
    route: '/components/panel',
  },
  {
    category: 'Structure',
    description: 'Presents related content as semantic structured rows',
    name: 'List',
    route: '/components/list',
  },
  {
    category: 'Structure',
    description: 'Compares structured values across labelled columns',
    name: 'Table',
    route: '/components/table',
  },
  {
    category: 'Structure',
    description: 'Explains an empty region and provides an optional next step',
    name: 'Empty state',
    route: '/components/empty-state',
  },
  {
    category: 'Structure',
    description: 'Provides responsive application navigation and shell layout',
    name: 'Sidebar',
    route: '/components/sidebar',
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
  {
    category: 'Feedback',
    description: 'Focuses attention within a modal layer',
    name: 'Dialog',
    route: '/components/dialog',
  },
];
