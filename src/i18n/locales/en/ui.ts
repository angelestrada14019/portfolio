// Chrome / microcopy — nav accessibility labels, generic UI strings.
export interface UIStrings {
  nav: {
    navLabel: string
    openMenu: string
    closeMenu: string
    menuLabel: string
    mainLabel: string
  }
  footer: {
    category: string
    credit: string
    navLabel: string
  }
  langSwitcher: {
    label: string
  }
  notFound: {
    heading: string
    body: string
    backLink: string
  }
}

export const uiEn: UIStrings = {
  nav: {
    navLabel: 'Main navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    menuLabel: 'Mobile menu',
    mainLabel: 'Main links',
  },
  footer: {
    category: 'AI Automation Engineer',
    credit: 'Built with React, Three.js & GSAP',
    navLabel: 'Footer links',
  },
  langSwitcher: {
    label: 'Language selection',
  },
  notFound: {
    heading: 'Page not found',
    body: "The page you're looking for doesn't exist or has moved.",
    backLink: 'Back to home',
  },
}
