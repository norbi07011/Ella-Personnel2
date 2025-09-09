export const getSlides = (t: (key: string) => string) => [
  {
    id: 1,
    title: t('slides.s1.title'),
    subtitle: t('slides.s1.subtitle'),
    description: t('slides.s1.description'),
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop',
    alt: t('slides.s1.alt'),
    ctas: [
      { label: t('slides.s1.cta1'), page: 'services', variant: 'primary' },
      { label: t('slides.s1.cta2'), page: 'contact', variant: 'secondary', contactTab: 'quote' },
    ],
  },
  {
    id: 2,
    title: t('slides.s2.title'),
    subtitle: t('slides.s2.subtitle'),
    description: t('slides.s2.description'),
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop',
    alt: t('slides.s2.alt'),
    ctas: [
      { label: t('slides.s2.cta1'), page: 'services', variant: 'primary' },
      { label: t('slides.s2.cta2'), page: 'contact', variant: 'secondary', contactTab: 'healthcareApply' },
    ],
  },
  {
    id: 3,
    title: t('slides.s3.title'),
    subtitle: t('slides.s3.subtitle'),
    description: t('slides.s3.description'),
    image: 'https://images.unsplash.com/photo-1487813489326-4c3a1535515f?q=80&w=2070&auto=format&fit=crop',
    alt: t('slides.s3.alt'),
    ctas: [
      { label: t('slides.s3.cta1'), page: 'services', variant: 'primary' },
      { label: t('slides.s3.cta2'), page: 'contact', variant: 'secondary', contactTab: 'quote' },
    ],
  },
  {
    id: 4,
    title: t('slides.s4.title'),
    subtitle: t('slides.s4.subtitle'),
    description: t('slides.s4.description'),
    image: 'https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop',
    alt: t('slides.s4.alt'),
    ctas: [
      { label: t('slides.s4.cta1'), page: 'services', variant: 'primary' },
      { label: t('slides.s4.cta2'), page: 'contact', variant: 'secondary', contactTab: 'consultation' },
    ],
  },
];