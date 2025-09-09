export type Page = 'home' | 'apply' | 'services' | 'about' | 'contact';

export type SetPageFn = (page: Page, params?: { contactTab: string }) => void;