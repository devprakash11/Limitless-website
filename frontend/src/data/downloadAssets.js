/* =========================================================
   UNIVERSAL DOWNLOAD ASSET DATA

   This file powers:
   - Logo Design
   - Photo Frame
   - Poster Design
   - Social Media Banner
   - Business Card Design
   - Branding Materials
   - Any future design category
========================================================= */

export function slugify(value = "") {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getFileExtension(fileUrl = "") {
  const cleanUrl = String(fileUrl).split(/[?#]/)[0];
  const filename = cleanUrl.split("/").pop() || "";
  const extension = filename.includes(".")
    ? filename.split(".").pop().toLowerCase()
    : "webp";

  return extension === "jpeg" ? "jpg" : extension || "webp";
}

function buildDefaultDescription(title, config) {
  return `${title} is a professionally presented ${config.singularName.toLowerCase()} suitable for ${config.recommendedUse.toLowerCase()}.`;
}

/* =========================================================
   CATEGORY CONFIGURATION

   To add a future category, add one new object here and one
   new collection inside downloadCollections below.
========================================================= */

export const downloadCategoryConfig = {
  "logo-design": {
    title: "Logo Design",
    singularName: "Logo Design",
    galleryPath: "/services/logo-design",
    previewEyebrow: "Premium Logo Asset",
    recommendedUse: "Brand identity, websites, packaging and campaigns",
    defaultTags: ["Brand Identity", "Logo Design", "Digital Ready"],
    previewFeatures: [
      {
        title: "Organised Asset",
        text: "Clean logo presentation",
      },
      {
        title: "Multiple Formats",
        text: "PNG, JPG and original file",
      },
      {
        title: "Ready to Download",
        text: "Digital branding use",
      },
    ],
  },

  "photo-frame": {
    title: "Photo Frame",
    singularName: "Photo Frame Design",
    galleryPath: "/services/photo-frame",
    previewEyebrow: "Premium Photo Frame Asset",
    recommendedUse: "Events, celebrations, memories and social sharing",
    defaultTags: ["Photo Frame", "Editable Design", "Digital Ready"],
    previewFeatures: [
      {
        title: "Creative Layout",
        text: "Professionally arranged frame design",
      },
      {
        title: "Multiple Formats",
        text: "PNG, JPG and original file",
      },
      {
        title: "Ready to Use",
        text: "Events and personal memories",
      },
    ],
  },

  "poster-design": {
    title: "Poster Design",
    singularName: "Poster Design",
    galleryPath: "/services/poster-design",
    previewEyebrow: "Premium Poster Asset",
    recommendedUse: "Promotions, events, advertising and campaigns",
    defaultTags: ["Poster Design", "Campaign", "Print Ready"],
    previewFeatures: [
      {
        title: "Strong Composition",
        text: "Professional visual hierarchy",
      },
      {
        title: "Multiple Formats",
        text: "PNG, JPG and original file",
      },
      {
        title: "Campaign Ready",
        text: "Digital and print promotion",
      },
    ],
  },

  "social-media-banner": {
    title: "Social Media Banner",
    singularName: "Social Media Banner",
    galleryPath: "/services/social-media-banner",
    previewEyebrow: "Premium Social Banner Asset",
    recommendedUse: "Social media posts, advertisements and campaigns",
    defaultTags: ["Social Media", "Banner", "Campaign Ready"],
    previewFeatures: [
      {
        title: "Platform Ready",
        text: "Designed for social campaigns",
      },
      {
        title: "Multiple Formats",
        text: "PNG, JPG and original file",
      },
      {
        title: "Fast Publishing",
        text: "Ready for digital promotion",
      },
    ],
  },

  "business-card-design": {
    title: "Business Card Design",
    singularName: "Business Card Design",
    galleryPath: "/services/business-card-design",
    previewEyebrow: "Premium Business Card Asset",
    recommendedUse: "Professional networking, branding and print communication",
    defaultTags: ["Business Card", "Corporate", "Print Ready"],
    previewFeatures: [
      {
        title: "Professional Layout",
        text: "Clear contact information hierarchy",
      },
      {
        title: "Multiple Formats",
        text: "PNG, JPG and source package",
      },
      {
        title: "Print Ready",
        text: "Business and networking use",
      },
    ],
  },

  "branding-materials": {
    title: "Branding Materials",
    singularName: "Branding Material",
    galleryPath: "/services/branding-materials",
    previewEyebrow: "Premium Branding Asset",
    recommendedUse: "Corporate identity, marketing and brand communication",
    defaultTags: ["Branding", "Corporate Identity", "Marketing"],
    previewFeatures: [
      {
        title: "Brand Consistency",
        text: "Professional identity presentation",
      },
      {
        title: "Multiple Files",
        text: "Preview and source packages",
      },
      {
        title: "Business Ready",
        text: "Marketing and communication use",
      },
    ],
  },
};

/* =========================================================
   UNIVERSAL ASSET FACTORY
========================================================= */

export function createDownloadAsset({
  categoryKey,
  slug: customSlug,
  title,
  image,
  description,
  tags,
  extraFiles = [],
  specifications = [],
  creator = "Limitless Design",
}) {
  const config = downloadCategoryConfig[categoryKey];

  if (!config) {
    throw new Error(`Unknown download category: ${categoryKey}`);
  }

  if (!title || !image) {
    throw new Error(
      `Every ${config.title} asset requires both a title and preview image.`
    );
  }

  const slug = slugify(customSlug || title);
  const baseName = slug || "design-asset";
  const originalExtension = getFileExtension(image);
  const originalLabel = originalExtension.toUpperCase();

  const generatedFormats = [];

  if (originalExtension !== "png") {
    generatedFormats.push({
      id: `${baseName}-png`,
      label: "PNG",
      size: "High-quality conversion",
      badge: "Popular",
      mode: "convert",
      mimeType: "image/png",
      extension: "png",
      filename: `${baseName}.png`,
    });
  }

  if (originalExtension !== "jpg") {
    generatedFormats.push({
      id: `${baseName}-jpg`,
      label: "JPG",
      size: "High-quality conversion",
      mode: "convert",
      mimeType: "image/jpeg",
      extension: "jpg",
      quality: 0.95,
      filename: `${baseName}.jpg`,
    });
  }

  generatedFormats.push({
    id: `${baseName}-${originalExtension}`,
    label: originalLabel,
    size: "Original preview file",
    mode: "direct",
    url: image,
    filename: `${baseName}.${originalExtension}`,
  });

  return {
    slug,
    categoryKey,
    title,
    image,
    creator,
    category: config.title,
    galleryPath: config.galleryPath,
    previewEyebrow: config.previewEyebrow,
    previewFeatures: config.previewFeatures,
    description: description || buildDefaultDescription(title, config),
    tags: Array.isArray(tags) && tags.length ? tags : config.defaultTags,
    specifications: [
      {
        label: "Category",
        value: config.title,
      },
      {
        label: "Preview Format",
        value: originalLabel,
      },
      {
        label: "Recommended Use",
        value: config.recommendedUse,
      },
      ...specifications,
    ],
    formats: [...extraFiles, ...generatedFormats],
  };
}

function makeCategoryCreator(categoryKey) {
  return function createCategoryAsset(asset) {
    return createDownloadAsset({
      categoryKey,
      ...asset,
    });
  };
}

export const createLogoAsset = makeCategoryCreator("logo-design");
export const createPhotoFrameAsset = makeCategoryCreator("photo-frame");
export const createPosterAsset = makeCategoryCreator("poster-design");
export const createSocialMediaBannerAsset = makeCategoryCreator(
  "social-media-banner"
);
export const createBusinessCardAsset = makeCategoryCreator(
  "business-card-design"
);
export const createBrandingMaterialAsset = makeCategoryCreator(
  "branding-materials"
);

/* =========================================================
   LOGO DESIGN DATA

   Your existing logo list can stay almost exactly the same.
========================================================= */

export const logoDownloads = [
  createLogoAsset({
    title: "Animalia Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/animalia.webp",
    tags: ["Animal Brand", "Mascot", "Modern Identity"],
  }),
  createLogoAsset({
    title: "Black Hat Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/balck-hat.webp",
    tags: ["Fashion", "Dark Identity", "Premium"],
  }),
  createLogoAsset({
    title: "Bear Chat Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/bearchat.webp",
    tags: ["Chat Brand", "Bear Mascot", "Friendly"],
  }),
  createLogoAsset({
    title: "Bird Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/bird.webp",
    tags: ["Bird Mark", "Minimal", "Creative"],
  }),
  createLogoAsset({
    title: "Bishop Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/bishop-logo.webp",
    tags: ["Chess Identity", "Professional", "Symbol Mark"],
  }),
  createLogoAsset({
    title: "C&C Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940862/C_C-logo.webp",
    tags: ["Letter Mark", "Corporate", "Clean"],
  }),
  createLogoAsset({
    title: "Chicken Tikka Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/chicken-tikka.webp",
    tags: ["Restaurant", "Food Brand", "Mascot"],
  }),
  createLogoAsset({
    title: "Chrunchy Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/chrunchy.webp",
    tags: ["Snack Brand", "Food Identity", "Bold"],
  }),
  createLogoAsset({
    title: "Clay Human Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/clay-human.webp",
    tags: ["Human Figure", "Art Brand", "Creative"],
  }),
  createLogoAsset({
    title: "Dance Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/dance-logo.webp",
    tags: ["Dance Studio", "Movement", "Elegant"],
  }),
  createLogoAsset({
    title: "Data Location Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/data-loacation-logo.webp",
    tags: ["Technology", "Location", "Data Brand"],
  }),
  createLogoAsset({
    title: "Digital Library Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/digtal-library-logo.webp",
    tags: ["Education", "Digital Library", "Knowledge"],
  }),
  createLogoAsset({
    title: "Dott Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/Dott-logo.webp",
    tags: ["Minimal", "Dot Mark", "Modern"],
  }),
  createLogoAsset({
    title: "Dragonoid Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/dragonoid-logo.webp",
    tags: ["Dragon Mascot", "Gaming", "Bold"],
  }),
  createLogoAsset({
    title: "Drive Com Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940855/drive-com.webp",
    tags: ["Automotive", "Technology", "Modern"],
  }),
  createLogoAsset({
    title: "Elephant Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/elephant-logo.webp",
    tags: ["Elephant Mark", "Strong Brand", "Mascot"],
  }),
  createLogoAsset({
    title: "Food Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/food.webp",
    tags: ["Food Business", "Restaurant", "Fresh"],
  }),
  createLogoAsset({
    title: "Geek Owl Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/geekowl.webp",
    tags: ["Education", "Technology", "Owl Mascot"],
  }),
  createLogoAsset({
    title: "Goat Leaf Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/goat-leaf.webp",
    tags: ["Organic", "Animal Mark", "Natural"],
  }),
  createLogoAsset({
    title: "Humming Bird Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/humming-bird1.webp",
    tags: ["Bird Identity", "Elegant", "Colorful"],
  }),
  createLogoAsset({
    title: "Moto Race Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/moto-race-logo.webp",
    tags: ["Motorsport", "Speed", "Bold"],
  }),
  createLogoAsset({
    title: "Nail Queen Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/nail-queen.webp",
    tags: ["Beauty", "Nail Studio", "Luxury"],
  }),
  createLogoAsset({
    title: "Navyojan Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/navyojan.webp",
    tags: ["Organisation", "Modern Identity", "Corporate"],
  }),
  createLogoAsset({
    title: "Organics Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/Organics-logo.webp",
    tags: ["Organic Brand", "Natural", "Eco Friendly"],
  }),
  createLogoAsset({
    title: "Pasta House Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/Pasta-house.webp",
    tags: ["Restaurant", "Pasta Brand", "Food"],
  }),
  createLogoAsset({
    title: "Peacock Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/peacock.webp",
    tags: ["Peacock Mark", "Elegant", "Premium"],
  }),
  createLogoAsset({
    title: "Quick Stop Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/quick-stop.webp",
    tags: ["Retail", "Fast Service", "Modern"],
  }),
  createLogoAsset({
    title: "Restaurant 2 Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/restaurant-2.webp",
    tags: ["Restaurant", "Hospitality", "Food Brand"],
  }),
  createLogoAsset({
    title: "Restaurant Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/restaurant.webp",
    tags: ["Restaurant", "Food Identity", "Professional"],
  }),
  createLogoAsset({
    title: "Turning Point Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/TURNING-POINT.webp",
    tags: ["Corporate", "Growth", "Direction"],
  }),
  createLogoAsset({
    title: "Veggie Food Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/VEGGIE-FOOD.webp",
    tags: ["Vegetarian", "Healthy Food", "Fresh"],
  }),
  createLogoAsset({
    title: "Wetcap Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/wetcap-logo.webp",
    tags: ["Modern Brand", "Symbol Mark", "Creative"],
  }),
  createLogoAsset({
    title: "Whale Logo",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940856/whale-logo.webp",
    tags: ["Whale Mark", "Ocean", "Strong Identity"],
  }),
];

/* =========================================================
   OTHER CATEGORY DATA

   Add unlimited objects using the same structure.

   Use a custom `slug` when two assets have the same title:
   {
     slug: "unique-design-one",
     title: "Repeated Visible Title",
     image: "/images/example.webp",
   }
========================================================= */

export const photoFrameDownloads = [
  createPhotoFrameAsset({
    title: "Baby Photo Frame",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/baby-frame.webp",
    description:
      "A sweet baby photo frame design suitable for newborn memories, birthday posts, family sharing, and special celebrations.",
    tags: ["Baby Frame", "Celebration", "Family Memory"],
  }),
  createPhotoFrameAsset({
    title: "Greeting Card Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/card.webp",
    description:
      "A clean greeting card design created for wishes, announcements, celebrations, social sharing, and personalized messages.",
    tags: ["Greeting Card", "Celebration", "Digital Design"],
  }),
  createPhotoFrameAsset({
    title: "Classic Photo Frame",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/frame.webp",
    description:
      "A versatile classic photo frame layout suitable for personal photographs, events, campaigns, and branded social posts.",
    tags: ["Classic Frame", "Photo Layout", "Digital Ready"],
  }),
  createPhotoFrameAsset({
    title: "Google Template Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/google-template.webp",
    description:
      "A professional Google-themed template suitable for promotional posts, digital campaigns, announcements, and online communication.",
    tags: ["Google Template", "Campaign", "Professional"],
  }),
  createPhotoFrameAsset({
    title: "Love Photo Frame",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/love-frame.webp",
    description:
      "A romantic photo frame design created for couples, anniversaries, Valentine's Day posts, and memorable social sharing.",
    tags: ["Love Frame", "Romantic", "Couple Design"],
  }),
  createPhotoFrameAsset({
    title: "Love Story Photo Frame",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/love-story-frame.webp",
    description:
      "A storytelling photo frame layout suitable for relationship memories, anniversaries, engagement posts, and special moments.",
    tags: ["Love Story", "Anniversary", "Memory Frame"],
  }),
  createPhotoFrameAsset({
    title: "Sorry Card Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/sorry-card.webp",
    description:
      "A thoughtful sorry card design created for personal messages, apology posts, emotional communication, and digital sharing.",
    tags: ["Sorry Card", "Message Design", "Personal"],
  }),
  createPhotoFrameAsset({
    title: "Wedding Photo Frame",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941215/wedding.webp",
    description:
      "An elegant wedding photo frame suitable for wedding memories, invitations, couple posts, ceremonies, and social media sharing.",
    tags: ["Wedding", "Celebration", "Elegant Frame"],
    extraFiles: [
      /*
      {
        id: "wedding-photo-frame-psd",
        label: "PSD",
        size: "Editable source file",
        mode: "direct",
        url: "/downloads/photo-frame/wedding-photo-frame.psd",
        filename: "wedding-photo-frame.psd",
      },
      {
        id: "wedding-photo-frame-zip",
        label: "DOWNLOAD ZIP",
        size: "All source files",
        mode: "direct",
        url: "/downloads/photo-frame/wedding-photo-frame.zip",
        filename: "wedding-photo-frame.zip",
      },
      */
    ],
  }),
];

export const posterDownloads = [
  createPosterAsset({
    title: "Air Force Day Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/Air_Force_Day_Poster.webp",
    description:
      "A patriotic Air Force Day poster created for tribute campaigns, social media posts, schools, organisations, and awareness communication.",
    tags: ["Air Force Day", "Patriotic", "Awareness"],
  }),
  createPosterAsset({
    slug: "chhath-puja-poster-one",
    title: "Chhath Puja Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/chhath-puja.webp",
    description:
      "A devotional Chhath Puja poster suitable for festival greetings, community messages, business posts, and social media campaigns.",
    tags: ["Chhath Puja", "Festival", "Greeting"],
  }),
  createPosterAsset({
    slug: "chhath-puja-poster-two",
    title: "Chhath Puja Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/chhath-puja1.webp",
    description:
      "A second Chhath Puja creative designed for festive wishes, promotional communication, organisations, and digital sharing.",
    tags: ["Chhath Puja", "Devotional", "Social Post"],
  }),
  createPosterAsset({
    title: "Fresh Fruits Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/fresh-fruits.webp",
    description:
      "A fresh fruit promotional poster suitable for grocery stores, food businesses, healthy campaigns, offers, and product advertising.",
    tags: ["Fresh Fruits", "Food Promotion", "Retail"],
  }),
  createPosterAsset({
    title: "Gandhi Jayanti Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/gandhi-jayanti..webp",
    description:
      "A respectful Gandhi Jayanti poster created for schools, NGOs, organisations, public messages, and national tribute campaigns.",
    tags: ["Gandhi Jayanti", "National Day", "Tribute"],
  }),
  createPosterAsset({
    title: "Happy Diwali Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/happy-diwali.webp",
    description:
      "A vibrant Diwali greeting poster suitable for businesses, festive offers, organisations, brands, and social media wishes.",
    tags: ["Diwali", "Festival Greeting", "Celebration"],
  }),
  createPosterAsset({
    title: "Happy New Year Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/happy-new-year.webp",
    description:
      "A modern New Year poster created for greetings, business announcements, promotional campaigns, and social media sharing.",
    tags: ["New Year", "Greeting", "Celebration"],
  }),
  createPosterAsset({
    title: "Hiring Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/hiring-poster.webp",
    description:
      "A professional recruitment poster suitable for job openings, hiring campaigns, companies, agencies, and social media announcements.",
    tags: ["Hiring", "Recruitment", "Corporate"],
  }),
  createPosterAsset({
    title: "Hospital Pamphlet",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/hospital-pamphlate.webp",
    description:
      "An informative hospital pamphlet design suitable for healthcare services, medical awareness, clinics, and patient communication.",
    tags: ["Healthcare", "Hospital", "Pamphlet"],
  }),
  createPosterAsset({
    title: "Independence Day Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/independence-dayai.webp",
    description:
      "A patriotic Independence Day poster created for schools, businesses, NGOs, organisations, and national celebration campaigns.",
    tags: ["Independence Day", "Patriotic", "National Event"],
  }),
  createPosterAsset({
    title: "Mehndi Arts Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/mehndi-arts.webp",
    description:
      "A decorative Mehndi Arts poster suitable for artists, beauty businesses, wedding promotions, bookings, and social campaigns.",
    tags: ["Mehndi Art", "Beauty", "Wedding"],
  }),
  createPosterAsset({
    title: "Merry Christmas Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/merry-christmas.webp",
    description:
      "A festive Christmas poster suitable for greetings, seasonal offers, organisations, businesses, and social media campaigns.",
    tags: ["Christmas", "Festival Greeting", "Seasonal"],
  }),
  createPosterAsset({
    slug: "pamphlet-design-one",
    title: "Pamphlet Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pamphlete-2.webp",
    description:
      "A professional pamphlet layout suitable for services, promotions, awareness campaigns, events, and business communication.",
    tags: ["Pamphlet", "Promotion", "Print Design"],
  }),
  createPosterAsset({
    slug: "pamphlet-design-two",
    title: "Pamphlet Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pamphlete.webp",
    description:
      "A clean promotional pamphlet designed for business information, product communication, campaigns, and print distribution.",
    tags: ["Pamphlet", "Business", "Marketing"],
  }),
  createPosterAsset({
    slug: "pamphlet-design-three",
    title: "Pamphlet Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pamphlete1.webp",
    description:
      "An organised pamphlet design suitable for educational content, services, events, offers, and public communication.",
    tags: ["Pamphlet", "Information", "Campaign"],
  }),
  createPosterAsset({
    slug: "pamphlet-design-four",
    title: "Pamphlet Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pamphlete02.webp",
    description:
      "A modern pamphlet layout created for brand promotions, awareness material, service information, and print-ready use.",
    tags: ["Pamphlet", "Brand Promotion", "Print Ready"],
  }),
  createPosterAsset({
    slug: "pamphlet-design-five",
    title: "Pamphlet Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pamphlete4.webp",
    description:
      "A versatile pamphlet design suitable for campaigns, organisations, businesses, local promotions, and marketing communication.",
    tags: ["Pamphlet", "Marketing", "Professional"],
  }),
  createPosterAsset({
    title: "Pizza Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/pizza-poster.webp",
    description:
      "An appetising pizza poster created for restaurants, food offers, delivery campaigns, menu promotions, and social advertising.",
    tags: ["Pizza", "Restaurant", "Food Promotion"],
  }),
  createPosterAsset({
    title: "Creative Poster Design",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/poster.webp",
    description:
      "A versatile creative poster suitable for business promotions, events, marketing campaigns, announcements, and social media use.",
    tags: ["Creative Poster", "Marketing", "Campaign"],
  }),
  createPosterAsset({
    title: "Ram Navami Poster",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788941401/ramnavmi.webp",
    description:
      "A devotional Ram Navami poster suitable for festive greetings, temple events, community campaigns, and social media sharing.",
    tags: ["Ram Navami", "Festival", "Devotional"],
  }),
];

export const socialMediaBannerDownloads = [
  createSocialMediaBannerAsset({
    title: "Fashion Sale Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A stylish fashion sale banner suitable for clothing promotions, seasonal discounts, ecommerce campaigns, Instagram posts, and paid advertisements.",
    tags: ["Fashion Sale", "Ecommerce", "Social Campaign"],
  }),
  createSocialMediaBannerAsset({
    title: "Festival Offer Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A festive promotional banner created for seasonal offers, celebration campaigns, brand greetings, product discounts, and social media advertising.",
    tags: ["Festival Offer", "Promotion", "Campaign Ready"],
  }),
  createSocialMediaBannerAsset({
    title: "Product Promotion Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A professional product promotion banner designed for launches, feature highlights, ecommerce advertisements, social media posts, and digital marketing.",
    tags: ["Product Promotion", "Marketing", "Digital Ad"],
  }),
  createSocialMediaBannerAsset({
    title: "Instagram Post Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A platform-ready Instagram post banner suitable for promotions, announcements, product showcases, campaigns, and branded content.",
    tags: ["Instagram", "Social Post", "Brand Content"],
  }),
  createSocialMediaBannerAsset({
    title: "Business Campaign Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A clean business campaign banner suitable for corporate announcements, service promotion, lead generation, professional branding, and online advertisements.",
    tags: ["Business Campaign", "Corporate", "Lead Generation"],
  }),
  createSocialMediaBannerAsset({
    title: "Food Offer Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "An attractive food offer banner created for restaurants, delivery services, menu promotions, combo deals, and social media campaigns.",
    tags: ["Food Offer", "Restaurant", "Social Advertising"],
  }),
  createSocialMediaBannerAsset({
    title: "Brand Awareness Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A professional brand awareness banner suitable for storytelling, company introductions, audience engagement, digital campaigns, and visual identity communication.",
    tags: ["Brand Awareness", "Identity", "Marketing Campaign"],
  }),
  createSocialMediaBannerAsset({
    title: "Ecommerce Ad Banner",
    image: "/images/social-media-banner/logo.webp",
    description:
      "A conversion-focused ecommerce advertisement banner suitable for online stores, product offers, seasonal sales, retargeting campaigns, and social media ads.",
    tags: ["Ecommerce Ad", "Online Store", "Conversion"],
  }),
];

export const businessCardDownloads = [
  createBusinessCardAsset({
    slug: "premium-business-card-one",
    title: "Premium Business Card",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940701/chrunchy-visiting-card.webp",
    description:
      "A bold premium business card design suitable for food brands, restaurants, product businesses, founders, and professional networking.",
    tags: ["Premium Card", "Food Brand", "Professional Identity"],
    specifications: [
      {
        label: "Card Style",
        value: "Bold & Creative",
      },
    ],
  }),
  createBusinessCardAsset({
    slug: "premium-business-card-two",
    title: "Premium Business Card",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940701/visiting-card-2.webp",
    description:
      "A clean premium visiting card suitable for corporate professionals, consultants, agencies, startups, and personal brand communication.",
    tags: ["Corporate Card", "Clean Layout", "Networking"],
    specifications: [
      {
        label: "Card Style",
        value: "Corporate & Clean",
      },
    ],
  }),
  createBusinessCardAsset({
    slug: "premium-business-card-three",
    title: "Premium Business Card",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940701/visiting-card.webp",
    description:
      "A modern business card presentation designed for founders, service providers, entrepreneurs, freelancers, and growing brands.",
    tags: ["Modern Card", "Entrepreneur", "Brand Identity"],
    specifications: [
      {
        label: "Card Style",
        value: "Modern & Professional",
      },
    ],
  }),
  createBusinessCardAsset({
    slug: "premium-business-card-four",
    title: "Premium Business Card",
    image: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788940701/visiting-card1.webp",
    description:
      "A refined premium business card design suitable for luxury brands, creative professionals, agencies, and high-quality print communication.",
    tags: ["Luxury Card", "Creative Professional", "Print Ready"],
    specifications: [
      {
        label: "Card Style",
        value: "Premium & Refined",
      },
    ],
  }),
];

export const brandingMaterialDownloads = [
  createBrandingMaterialAsset({
    title: "Corporate Brand Identity Kit",
    image: "/images/branding-materials/corporate-brand-kit.webp",
    tags: ["Brand Kit", "Corporate", "Identity System"],
    extraFiles: [
      // {
      //   id: "corporate-brand-kit-zip",
      //   label: "DOWNLOAD ZIP",
      //   size: "All source files",
      //   mode: "direct",
      //   url: "/downloads/branding/corporate-brand-kit.zip",
      //   filename: "corporate-brand-identity-kit.zip",
      // },
    ],
  }),
];

/* =========================================================
   COLLECTION REGISTRY
========================================================= */

export const downloadCollections = {
  "logo-design": logoDownloads,
  "photo-frame": photoFrameDownloads,
  "poster-design": posterDownloads,
  "social-media-banner": socialMediaBannerDownloads,
  "business-card-design": businessCardDownloads,
  "branding-materials": brandingMaterialDownloads,
};

/* =========================================================
   UNIVERSAL LOOKUP HELPERS
========================================================= */

export function getDownloadCategory(categoryKey) {
  return downloadCategoryConfig[categoryKey] || null;
}

export function getDownloadsByCategory(categoryKey) {
  const collection = downloadCollections[categoryKey];
  return Array.isArray(collection) ? collection : [];
}

export function getDownloadBySlug(categoryKey, slug) {
  return getDownloadsByCategory(categoryKey).find(
    (asset) => asset.slug === slug
  );
}

export function getDownloadIndex(categoryKey, slug) {
  return getDownloadsByCategory(categoryKey).findIndex(
    (asset) => asset.slug === slug
  );
}

export function buildDownloadUrl(categoryKey, slug) {
  const cleanCategory = slugify(categoryKey);
  const cleanSlug = slugify(slug);

  if (!cleanCategory || !cleanSlug) {
    return "/";
  }

  return `/download/${cleanCategory}/${cleanSlug}`;
}

/* =========================================================
   BACKWARD-COMPATIBILITY HELPERS

   These allow older logo components to keep working while you
   gradually migrate them to the universal functions.
========================================================= */

export function getLogoDownloadBySlug(slug) {
  return getDownloadBySlug("logo-design", slug);
}

export function getLogoDownloadIndex(slug) {
  return getDownloadIndex("logo-design", slug);
}
