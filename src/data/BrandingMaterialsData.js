export const brandingSamples = [
  {
    title: "Blinkit Brand Kit",
    slug: "blinkit-brand-kit",
    image: "/images/branding-materials/brand-1.webp",
  },
  {
    title: "Coffee Brand Identity",
    slug: "coffee-brand-identity",
    image: "/images/branding-materials/brand-2.webp",
  },
  {
    title: "Fashion Brand Kit",
    slug: "fashion-brand-kit",
    image: "/images/branding-materials/brand-3.webp",
  },
  {
    title: "Startup Brand System",
    slug: "startup-brand-system",
    image: "/images/branding-materials/brand-4.webp",
  },
  {
    title: "Food Brand Identity",
    slug: "food-brand-identity",
    image: "/images/branding-materials/brand-5.webp",
  },
  {
    title: "Luxury Product Branding",
    slug: "luxury-product-branding",
    image: "/images/branding-materials/brand-6.webp",
  },
  {
    title: "Agency Brand Materials",
    slug: "agency-brand-materials",
    image: "/images/branding-materials/brand-7.webp",
  },
  {
    title: "Ecommerce Brand Kit",
    slug: "ecommerce-brand-kit",
    image: "/images/branding-materials/brand-8.webp",
  },
];

export const brandingBenefits = [
  "Complete logo usage and brand identity direction",
  "Professional color palette and typography system",
  "Brand patterns, packaging, stationery, and merchandise mockups",
  "Social media-ready and print-ready visual brand materials",
  "Consistent design system for marketing and business communication",
  "Premium brand presentation for client approval and brand guidelines",
];

export const brandingProcess = [
  {
    title: "Brand Direction",
    text: "We understand your business, logo, color preference, audience, tone, and visual style.",
  },
  {
    title: "Material Design",
    text: "We design logo usage, colors, typography, brand patterns, packaging, stationery, and mockups.",
  },
  {
    title: "Final Brand Kit",
    text: "You receive a professional branding material presentation ready for digital and print use.",
  },
];

// Provides all image properties expected by BrandingBoard
const createFallbackImages = (image) => ({
  heroLogo: image,
  logoSystem: image,
  pattern: image,
  colors: image,
  typography: image,
  apparel: image,
  bag: image,
  packaging: image,
});

export const brandCases = [
  {
    slug: "blinkit-brand-kit",
    brandName: "Blinkit",
    tagline: "India’s Last Minute App",
    category: "Grocery Delivery Branding",
    year: "2026",
    description:
      "A complete branding material presentation showing logo system, color palette, typography, brand pattern, apparel, bag, packaging, and marketing elements.",
    images: {
      heroLogo:
        "/images/branding-materials/blinkit/hero-logo.webp",
      logoSystem:
        "/images/branding-materials/blinkit/logo-system.webp",
      pattern:
        "/images/branding-materials/blinkit/pattern.webp",
      colors:
        "/images/branding-materials/blinkit/colors.webp",
      typography:
        "/images/branding-materials/blinkit/typography.webp",
      apparel:
        "/images/branding-materials/blinkit/apparel.webp",
      bag:
        "/images/branding-materials/blinkit/bag.webp",
      packaging:
        "/images/branding-materials/blinkit/packaging.webp",
    },
    colors: [
      "#F8CB30",
      "#009B3A",
      "#101010",
      "#FFFFFF",
    ],
    typography: [
      "Berlin Sans FB",
      "Poppins",
      "Bold Display",
      "Regular Sans",
    ],
    elements: [
      "Logo system and usage direction",
      "Primary and secondary brand colors",
      "Typography pairing and font hierarchy",
      "Brand pattern for packaging and backgrounds",
      "T-shirt, cap, bag, and packaging mockups",
      "Marketing-ready visual brand presentation",
    ],
  },

  {
    slug: "coffee-brand-identity",
    brandName: "Coffee Brand",
    tagline: "Fresh Brewed Visual Identity",
    category: "Cafe Branding",
    year: "2026",
    description:
      "A premium branding material system for a coffee business with warm colors, packaging, typography, and social media identity.",
    images: {
      heroLogo:
        "/images/branding-materials/coffee/hero-logo.webp",
      logoSystem:
        "/images/branding-materials/coffee/logo-system.webp",
      pattern:
        "/images/branding-materials/coffee/pattern.webp",
      colors:
        "/images/branding-materials/coffee/colors.webp",
      typography:
        "/images/branding-materials/coffee/typography.webp",
      apparel:
        "/images/branding-materials/coffee/apparel.webp",
      bag:
        "/images/branding-materials/coffee/bag.webp",
      packaging:
        "/images/branding-materials/coffee/packaging.webp",
    },
    colors: [
      "#5B371F",
      "#C99052",
      "#F5E7D3",
      "#111111",
    ],
    typography: [
      "Playfair Display",
      "Inter",
      "Bold Serif",
      "Clean Sans",
    ],
    elements: [
      "Coffee logo identity",
      "Packaging and label direction",
      "Warm color palette",
      "Typography and brand tone",
      "Cup, pouch, bag, and social media kit",
      "Premium product presentation",
    ],
  },

  {
    slug: "fashion-brand-kit",
    brandName: "Fashion Brand",
    tagline: "Style With Confidence",
    category: "Fashion and Apparel Branding",
    year: "2026",
    description:
      "A modern fashion branding system created for apparel labels, boutiques, online fashion stores, and lifestyle businesses.",
    images: createFallbackImages(
      "/images/branding-materials/brand-3.webp"
    ),
    colors: [
      "#111111",
      "#D8B4A0",
      "#F7F2EE",
      "#FFFFFF",
    ],
    typography: [
      "Cormorant Garamond",
      "Montserrat",
      "Elegant Serif",
      "Modern Sans",
    ],
    elements: [
      "Fashion logo and identity direction",
      "Premium neutral color palette",
      "Editorial typography system",
      "Clothing tag and label design",
      "Shopping bag and apparel mockups",
      "Social media brand templates",
    ],
  },

  {
    slug: "startup-brand-system",
    brandName: "Startup Brand",
    tagline: "Built for the Future",
    category: "Technology Startup Branding",
    year: "2026",
    description:
      "A clean and modern identity system designed for technology startups, digital products, SaaS platforms, and new businesses.",
    images: createFallbackImages(
      "/images/branding-materials/brand-4.webp"
    ),
    colors: [
      "#2563EB",
      "#7C3AED",
      "#0F172A",
      "#F8FAFC",
    ],
    typography: [
      "Manrope",
      "Inter",
      "Bold Sans",
      "Product UI Sans",
    ],
    elements: [
      "Modern startup logo system",
      "Digital-first color palette",
      "Product typography hierarchy",
      "Website and application branding",
      "Business stationery mockups",
      "Investor presentation visual style",
    ],
  },

  {
    slug: "food-brand-identity",
    brandName: "Food Brand",
    tagline: "Made With Freshness",
    category: "Food and Restaurant Branding",
    year: "2026",
    description:
      "A vibrant food branding identity created for restaurants, cloud kitchens, packaged food businesses, and delivery brands.",
    images: createFallbackImages(
      "/images/branding-materials/brand-5.webp"
    ),
    colors: [
      "#E63946",
      "#F4A261",
      "#2A9D8F",
      "#FFF8E7",
    ],
    typography: [
      "Poppins",
      "Nunito",
      "Friendly Display",
      "Readable Sans",
    ],
    elements: [
      "Food business logo direction",
      "Bright and appetising color system",
      "Menu and packaging typography",
      "Food box and delivery bag mockups",
      "Restaurant stationery design",
      "Social media promotion templates",
    ],
  },

  {
    slug: "luxury-product-branding",
    brandName: "Luxury Product",
    tagline: "Designed for Distinction",
    category: "Luxury Product Branding",
    year: "2026",
    description:
      "A premium visual identity system designed for luxury products, beauty brands, jewellery, fragrances, and high-end businesses.",
    images: createFallbackImages(
      "/images/branding-materials/brand-6.webp"
    ),
    colors: [
      "#0B0B0B",
      "#C5A059",
      "#F5F0E6",
      "#FFFFFF",
    ],
    typography: [
      "Bodoni Moda",
      "DM Sans",
      "Luxury Serif",
      "Minimal Sans",
    ],
    elements: [
      "Premium logo and monogram system",
      "Luxury black and gold palette",
      "Elegant typography pairing",
      "Premium box and packaging mockups",
      "Shopping bag and product presentation",
      "High-end marketing templates",
    ],
  },

  {
    slug: "agency-brand-materials",
    brandName: "Creative Agency",
    tagline: "Ideas That Create Impact",
    category: "Creative Agency Branding",
    year: "2026",
    description:
      "A bold and flexible branding material system designed for creative studios, marketing agencies, and digital service companies.",
    images: createFallbackImages(
      "/images/branding-materials/brand-7.webp"
    ),
    colors: [
      "#6D28D9",
      "#EC4899",
      "#111827",
      "#F9FAFB",
    ],
    typography: [
      "Space Grotesk",
      "Inter",
      "Creative Display",
      "Professional Sans",
    ],
    elements: [
      "Agency logo and visual identity",
      "Bold campaign color palette",
      "Creative typography system",
      "Presentation and proposal templates",
      "Office stationery and apparel",
      "Digital marketing brand assets",
    ],
  },

  {
    slug: "ecommerce-brand-kit",
    brandName: "Ecommerce Brand",
    tagline: "Everything You Love, Delivered",
    category: "Ecommerce Business Branding",
    year: "2026",
    description:
      "A complete ecommerce branding kit designed for online stores, product businesses, marketplaces, and digital retail brands.",
    images: createFallbackImages(
      "/images/branding-materials/brand-8.webp"
    ),
    colors: [
      "#FF5A5F",
      "#1D4ED8",
      "#111827",
      "#FFFFFF",
    ],
    typography: [
      "Outfit",
      "Inter",
      "Bold Commerce Display",
      "Clean UI Sans",
    ],
    elements: [
      "Ecommerce logo identity",
      "Website and marketplace color palette",
      "Product-focused typography system",
      "Shipping box and packaging mockups",
      "Shopping bag and label design",
      "Sale and promotional campaign templates",
    ],
  },
];