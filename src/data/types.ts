export type Link = { label: string; href: string };
export type Cta = { label: string; url: string };

export type Content = {
  brand: { name: string; logoText: string; primaryColor: string; tagline: string };
  header: { nav: Link[]; ctaLabel: string; ctaUrl: string };
  hero: { headline: string; subhead: string; primaryCta: Cta; secondaryCta: Cta; backgroundImage: string };
  offerBanner: null | { eyebrow: string; headline: string; body: string; ctaLabel: string; ctaUrl: string };
  approach: { headline: string; body: string }[];
  services: { name: string; description: string; image: string; learnMoreUrl: string; bookUrl: string }[];
  compare: null | { yourLabel: string; othersLabel: string; rows: { label: string; you: boolean; others: boolean }[] };
  testimonials: { name: string; location: string; quote: string }[];
  introOffers: null | { title: string; description: string; ctaLabel: string; ctaUrl: string }[];
  gallery: null | string[];
  locations: null | {
    mode: "single" | "multi";
    headline: string;
    single: null | { address: string; phone: string; mapUrl: string };
    multi: null | { region: string; locations: { name: string; href: string }[] }[];
  };
  footer: {
    columns: { title: string; links: Link[] }[];
    social: { platform: string; url: string }[];
    contact: { email: string; phone: string };
    copyright: string;
  };
};

import data from "./content.json";
export const content = data as Content;
