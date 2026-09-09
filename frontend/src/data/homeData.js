import {
  Briefcase,
  Layers3,
  Palette,
  Rocket,
  Sparkles,
  Store,
} from "lucide-react";

/* =========================================================
   HOME PAGE DATA
========================================================= */

export const heroCards = [
  {
    number: "01",
    title: "Choose the outcome",
    description:
      "Start with what you need to launch, promote, present, or improve.",
  },
  {
    number: "02",
    title: "Match the right format",
    description:
      "Select a logo, poster, business card, photo frame, or full brand package.",
  },
  {
    number: "03",
    title: "Move from brief to delivery",
    description:
      "Share your direction, review the work, and receive a business-ready design.",
  },
];

export const heroStats = [
  {
    value: "6+",
    label: "Core Design Services",
  },
  {
    value: "300+",
    label: "Creative Assets",
  },
  {
    value: "50+",
    label: "Clear Project Process",
  },
];

export const trustedCustomers = [
  {
    name: "Flazetech",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939746/flazetech.webp",
  },
  {
    name: "Hack2Skill",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939746/hacktoskill.webp",
  },
  {
    name: "Instahyre",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939747/instahyer.webp",
  },
  {
    name: "Officiel CRM",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939747/officielcrm.webp",
  },
  {
    name: "Polytechnic English School",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939746/pes.webp",
  },
  {
    name: "Sri Aurobindo Society Rupantar",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939747/rupantar.webp",
  },
  {
    name: "Shoopy",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939747/shoopy.webp",
  },
  {
    name: "SIA Graphics",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939749/siagraphics.webp",
  },
  {
    name: "WarnHack",
    logo: "https://res.cloudinary.com/orfe5dmh/image/upload/v1788939749/warnhack.webp",
  },
];

export const audiencePaths = [
  {
    icon: Briefcase,
    eyebrow: "For Businesses",
    title: "Get the design your next move actually needs",
    description:
      "Launch a brand, promote an offer, prepare an event, or improve how your business looks across customer touchpoints.",
    points: [
      "Clear service-based pricing",
      "Custom creative direction",
      "Designs prepared for practical use",
    ],
    linkLabel: "Commission a Project",
    linkTo: "/contact",
    featured: true,
  },
  {
    icon: Store,
    eyebrow: "For Creative Sellers",
    title: "Present your work as a professional service",
    description:
      "Organize creative services by category, make your strengths easier to discover, and build confidence before a client reaches out.",
    points: [
      "Focused service categories",
      "Professional portfolio presentation",
      "A clearer path from discovery to enquiry",
    ],
    linkLabel: "Explore Services",
    linkTo: "#services",
  },
];

export const valueItems = [
  {
    icon: Sparkles,
    title: "Brief-first collaboration",
    description:
      "The project starts with the goal, audience, size, content, and references—not guesswork.",
  },
  {
    icon: Layers3,
    title: "Variants where they matter",
    description:
      "Logo and poster packages include useful options so you can compare directions before finalizing.",
  },
  {
    icon: Palette,
    title: "Consistent visual thinking",
    description:
      "Typography, colour, layout, and brand personality are considered together instead of as separate pieces.",
  },
  {
    icon: Rocket,
    title: "Ready for real business use",
    description:
      "Every design is created with its final use in mind, from digital campaigns to print and brand communication.",
  },
];