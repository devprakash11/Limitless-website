/* =========================================================
   DYNAMIC LOGO DOWNLOAD DATA

   Every Logo Design card and the reusable download page use
   this same file. Add or edit logo information only here.
========================================================= */

function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createLogoAsset({
  title,
  image,
  description,
  tags = ["Brand Identity", "Logo Design", "Digital Ready"],
  extraFiles = [],
}) {
  const slug = slugify(title);
  const baseName = slug || "logo-design";

  return {
    slug,
    title,
    image,
    creator: "Limitless Design",
    category: "Logo Design",
    description:
      description ||
      `${title} is a professionally presented logo concept suitable for brand identity, websites, social media, packaging, business communication, and digital campaigns.`,
    tags,
    specifications: [
      {
        label: "Category",
        value: "Logo Design",
      },
      {
        label: "Preview Format",
        value: "WEBP",
      },
      {
        label: "Recommended Use",
        value: "Digital & Branding",
      },
    ],

    /*
      PNG and JPG are created automatically in the browser from
      the original WEBP preview. WEBP downloads the original file.

      Add real PSD, AI, SVG, PDF or ZIP files inside extraFiles:

      extraFiles: [
        {
          id: "animalia-psd",
          label: "PSD",
          size: "11.68 MB",
          mode: "direct",
          url: "/downloads/logos/animalia.psd",
          filename: "animalia-logo.psd",
        },
        {
          id: "animalia-zip",
          label: "DOWNLOAD ZIP",
          size: "All source files",
          mode: "direct",
          url: "/downloads/logos/animalia.zip",
          filename: "animalia-logo.zip",
        },
      ]
    */
    formats: [
      ...extraFiles,
      {
        id: `${baseName}-png`,
        label: "PNG",
        size: "High-quality conversion",
        badge: "Popular",
        mode: "convert",
        mimeType: "image/png",
        extension: "png",
        filename: `${baseName}.png`,
      },
      {
        id: `${baseName}-jpg`,
        label: "JPG",
        size: "High-quality conversion",
        mode: "convert",
        mimeType: "image/jpeg",
        extension: "jpg",
        quality: 0.95,
        filename: `${baseName}.jpg`,
      },
      {
        id: `${baseName}-webp`,
        label: "WEBP",
        size: "Original preview file",
        mode: "direct",
        url: image,
        filename: `${baseName}.webp`,
      },
    ],
  };
}

export const logoDownloads = [
  createLogoAsset({
    title: "Animalia Logo",
    image: "/images/logo-design/animalia.webp",
    tags: ["Animal Brand", "Mascot", "Modern Identity"],
  }),
  createLogoAsset({
    title: "Black Hat Logo",
    image: "/images/logo-design/balck-hat.webp",
    tags: ["Fashion", "Dark Identity", "Premium"],
  }),
  createLogoAsset({
    title: "Bear Chat Logo",
    image: "/images/logo-design/bearchat.webp",
    tags: ["Chat Brand", "Bear Mascot", "Friendly"],
  }),
  createLogoAsset({
    title: "Bird Logo",
    image: "/images/logo-design/bird.webp",
    tags: ["Bird Mark", "Minimal", "Creative"],
  }),
  createLogoAsset({
    title: "Bishop Logo",
    image: "/images/logo-design/bishop-logo.webp",
    tags: ["Chess Identity", "Professional", "Symbol Mark"],
  }),
  createLogoAsset({
    title: "C&C Logo",
    image: "/images/logo-design/C&C-logo.webp",
    tags: ["Letter Mark", "Corporate", "Clean"],
  }),
  createLogoAsset({
    title: "Chicken Tikka Logo",
    image: "/images/logo-design/chicken-tikka.webp",
    tags: ["Restaurant", "Food Brand", "Mascot"],
  }),
  createLogoAsset({
    title: "Chrunchy Logo",
    image: "/images/logo-design/chrunchy.webp",
    tags: ["Snack Brand", "Food Identity", "Bold"],
  }),
  createLogoAsset({
    title: "Clay Human Logo",
    image: "/images/logo-design/clay-human.webp",
    tags: ["Human Figure", "Art Brand", "Creative"],
  }),
  createLogoAsset({
    title: "Dance Logo",
    image: "/images/logo-design/dance-logo.webp",
    tags: ["Dance Studio", "Movement", "Elegant"],
  }),
  createLogoAsset({
    title: "Data Location Logo",
    image: "/images/logo-design/data-loacation-logo.webp",
    tags: ["Technology", "Location", "Data Brand"],
  }),
  createLogoAsset({
    title: "Digital Library Logo",
    image: "/images/logo-design/digtal-library-logo.webp",
    tags: ["Education", "Digital Library", "Knowledge"],
  }),
  createLogoAsset({
    title: "Dott Logo",
    image: "/images/logo-design/Dott-logo.webp",
    tags: ["Minimal", "Dot Mark", "Modern"],
  }),
  createLogoAsset({
    title: "Dragonoid Logo",
    image: "/images/logo-design/dragonoid-logo.webp",
    tags: ["Dragon Mascot", "Gaming", "Bold"],
  }),
  createLogoAsset({
    title: "Drive Com Logo",
    image: "/images/logo-design/drive-com.webp",
    tags: ["Automotive", "Technology", "Modern"],
  }),
  createLogoAsset({
    title: "Elephant Logo",
    image: "/images/logo-design/elephant-logo.webp",
    tags: ["Elephant Mark", "Strong Brand", "Mascot"],
  }),
  createLogoAsset({
    title: "Food Logo",
    image: "/images/logo-design/food.webp",
    tags: ["Food Business", "Restaurant", "Fresh"],
  }),
  createLogoAsset({
    title: "Geek Owl Logo",
    image: "/images/logo-design/geekowl.webp",
    tags: ["Education", "Technology", "Owl Mascot"],
  }),
  createLogoAsset({
    title: "Goat Leaf Logo",
    image: "/images/logo-design/goat-leaf.webp",
    tags: ["Organic", "Animal Mark", "Natural"],
  }),
  createLogoAsset({
    title: "Humming Bird Logo",
    image: "/images/logo-design/humming-bird1.webp",
    tags: ["Bird Identity", "Elegant", "Colorful"],
  }),
  createLogoAsset({
    title: "Moto Race Logo",
    image: "/images/logo-design/moto-race-logo.webp",
    tags: ["Motorsport", "Speed", "Bold"],
  }),
  createLogoAsset({
    title: "Nail Queen Logo",
    image: "/images/logo-design/nail-queen.webp",
    tags: ["Beauty", "Nail Studio", "Luxury"],
  }),
  createLogoAsset({
    title: "Navyojan Logo",
    image: "/images/logo-design/navyojan.webp",
    tags: ["Organisation", "Modern Identity", "Corporate"],
  }),
  createLogoAsset({
    title: "Organics Logo",
    image: "/images/logo-design/Organics-logo.webp",
    tags: ["Organic Brand", "Natural", "Eco Friendly"],
  }),
  createLogoAsset({
    title: "Pasta House Logo",
    image: "/images/logo-design/Pasta-house.webp",
    tags: ["Restaurant", "Pasta Brand", "Food"],
  }),
  createLogoAsset({
    title: "Peacock Logo",
    image: "/images/logo-design/peacock.webp",
    tags: ["Peacock Mark", "Elegant", "Premium"],
  }),
  createLogoAsset({
    title: "Quick Stop Logo",
    image: "/images/logo-design/quick-stop.webp",
    tags: ["Retail", "Fast Service", "Modern"],
  }),
  createLogoAsset({
    title: "Restaurant 2 Logo",
    image: "/images/logo-design/restaurant-2.webp",
    tags: ["Restaurant", "Hospitality", "Food Brand"],
  }),
  createLogoAsset({
    title: "Restaurant Logo",
    image: "/images/logo-design/restaurant.webp",
    tags: ["Restaurant", "Food Identity", "Professional"],
  }),
  createLogoAsset({
    title: "Turning Point Logo",
    image: "/images/logo-design/TURNING-POINT.webp",
    tags: ["Corporate", "Growth", "Direction"],
  }),
  createLogoAsset({
    title: "Veggie Food Logo",
    image: "/images/logo-design/VEGGIE-FOOD.webp",
    tags: ["Vegetarian", "Healthy Food", "Fresh"],
  }),
  createLogoAsset({
    title: "Wetcap Logo",
    image: "/images/logo-design/wetcap-logo.webp",
    tags: ["Modern Brand", "Symbol Mark", "Creative"],
  }),
  createLogoAsset({
    title: "Whale Logo",
    image: "/images/logo-design/whale-logo.webp",
    tags: ["Whale Mark", "Ocean", "Strong Identity"],
  }),
];

export function getLogoDownloadBySlug(slug) {
  return logoDownloads.find((logo) => logo.slug === slug);
}

export function getLogoDownloadIndex(slug) {
  return logoDownloads.findIndex((logo) => logo.slug === slug);
}
