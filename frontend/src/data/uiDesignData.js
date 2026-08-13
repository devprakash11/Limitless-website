import {
  Boxes,
  CalendarDays,
  Code2,
  CreditCard,
  FileText,
  GraduationCap,
  HeartPulse,
  LayoutDashboard,
  Layers3,
  Monitor,
  Palette,
  Rocket,
  ShoppingBag,
  Smartphone,
  UtensilsCrossed,
  Book,
} from "lucide-react";
import { BiMobile } from "react-icons/bi";
import { FaIndustry } from "react-icons/fa6";
import { FcElectroDevices } from "react-icons/fc";
import { GiDress, GiJewelCrown } from "react-icons/gi";
import { IoHardwareChipOutline } from "react-icons/io5";
import { LiaIndustrySolid } from "react-icons/lia";
import { MdLocalGroceryStore, MdOutlineLocalGroceryStore, MdPlumbing } from "react-icons/md";
import { PiDress } from "react-icons/pi";

/*
 * =========================================================
 * UI DESIGN DATA
 * =========================================================
 *
 * Add every new UI Design card in the `uiDesignTypes` array.
 *
 * cardImage:
 *   Image shown inside the UI Design card.
 *
 * previewImage:
 *   Large full-page image shown after clicking Preview.
 *
 * Keep either image path empty to use the built-in placeholder.
 *
 * Example public paths:
 *
 * cardImage: "/images/ui-design/website-ui-card.jpg"
 * previewImage: "/images/ui-design/website-ui-preview.jpg"
 */

export const uiDesignTypes = [

{
  id: "Fashion-ui",
  title: "Advaita Collections",
  category: "Fashion E-commerce",
  icon: Monitor,
  preview: "Fashion",

  description:
    "Elegant ethnic fashion storefront designed to showcase sarees, kurtis, curated collections, new arrivals, and customer favourites.",

  deliverables: [
    "Responsive fashion storefront",
    "Product and collection sections",
    "Editorial-style visual hierarchy",
  ],

  cardImage: "/images/ui-design/cards/advaitacollection.webp",
  previewImage:
    "/images/ui-design/preview/Advaita Collections Preview.webp",

  previewContent: {
    kicker: "Ethnic fashion storefront",
    headline: "Graceful ethnic wear for every occasion.",
    subline:
      "A refined shopping experience for sarees, kurtis, new arrivals, and curated collections.",
    action: "Shop Collection",
    metricLabel: "Store layout",
    metricValue: "12+ sections",
  },
},

  {
  id: "Grocery-shop",
  title: "Aadhar Shop",
  category: "Grocery E-commerce",
  icon: MdOutlineLocalGroceryStore,
  preview: "Grocery",

  description:
    "Responsive grocery shopping interface for daily essentials, beverages, gifts, household products, and electronics.",

  deliverables: [
    "Responsive grocery storefront",
    "Category and product sections",
    "Promotional banner layouts",
  ],

  cardImage: "/images/ui-design/cards/adharshop.webp",
  previewImage:
    "/images/ui-design/preview/Adhar Shop Store Preview.webp",

  previewContent: {
    kicker: "Everyday grocery storefront",
    headline: "Everything you need in one place.",
    subline:
      "Simple browsing for groceries, beverages, household items, gifts, and gadgets.",
    action: "Shop Now",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "Jewellery-ui",
  title: "AJ Fashion Jewellery",
  category: "Jewellery E-commerce",
  icon: GiJewelCrown,
  preview: "Jewellery",

  description:
    "Elegant jewellery storefront for necklaces, earrings, sunglasses, new arrivals, and curated collections.",

  deliverables: [
    "Responsive jewellery storefront",
    "Product and price sections",
    "Collection and review layouts",
  ],

  cardImage: "/images/ui-design/cards/ajfashion.webp",
  previewImage:
    "/images/ui-design/preview/AJ Fashion Jewellery Preview.webp",

  previewContent: {
    kicker: "Jewellery shopping experience",
    headline: "Shine brighter, every day.",
    subline:
      "Browse elegant jewellery, accessories, new arrivals, and curated collections.",
    action: "Shop Collection",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "uniform-ui",
  title: "Among Uniforms",
  category: "Uniform E-commerce",
  icon: PiDress,
  preview: "Uniform",

  description:
    "Professional uniform storefront for schools, hospitals, security teams, corporate staff, and hospitality businesses.",

  deliverables: [
    "Uniform category navigation",
    "Product collection sections",
    "Responsive shopping layout",
  ],

  cardImage: "/images/ui-design/cards/among.webp",
  previewImage: "/images/ui-design/preview/Among Preview.webp",

  previewContent: {
    kicker: "Professional uniform store",
    headline: "Premium uniforms for every profession.",
    subline:
      "Browse school, medical, security, corporate, and hospitality uniforms.",
    action: "Explore Uniforms",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "hardware-ui",
  title: "Aqua Plus",
  category: "Plumbing E-commerce",
  icon: MdPlumbing,
  preview: "Harware",

  description:
    "Clean plumbing storefront for taps, fittings, bathroom products, bestsellers, and brand-focused promotions.",

  deliverables: [
    "Responsive product storefront",
    "Category and bestseller sections",
    "Promotional banner layouts",
  ],

  cardImage: "/images/ui-design/cards/aquaplus.webp",
  previewImage:
    "/images/ui-design/preview/Aquaplus Store preview.webp",

  previewContent: {
    kicker: "Plumbing product storefront",
    headline: "Built for durability and trusted performance.",
    subline:
      "Browse taps, fittings, bathroom products, and reliable plumbing solutions.",
    action: "Explore Products",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "polymer-ui",
  title: "Avon Polymers",
  category: "Industrial E-commerce",
  icon: LiaIndustrySolid,
  preview: "Polymer",

  description:
    "Industrial storefront for polymers, sprinklers, pipe fittings, valves, flanges, and related products.",

  deliverables: [
    "Industrial product categories",
    "Bestseller and product grids",
    "Promotional banner sections",
  ],

  cardImage: "/images/ui-design/cards/avon.webp",
  previewImage:
    "/images/ui-design/preview/avon store preview.webp",

  previewContent: {
    kicker: "Industrial product storefront",
    headline: "Reliable polymers and powerful sprinklers.",
    subline:
      "Browse fittings, valves, flanges, pipes, and irrigation products.",
    action: "Explore Products",
    metricLabel: "Store layout",
    metricValue: "8+ sections",
  },
},
  {
  id: "clothing-ui",
  title: "Avior Clothing",
  category: "Fashion E-commerce",
  icon: PiDress,
  preview: "clothing",

  description:
    "Modern streetwear storefront for graphic T-shirts, joggers, trending styles, and limited fashion drops.",

  deliverables: [
    "Responsive fashion storefront",
    "Product and trend sections",
    "Promotional campaign banners",
  ],

  cardImage: "/images/ui-design/cards/avior.webp",
  previewImage:
    "/images/ui-design/preview/Avior Clothing Store Preview.webp",

  previewContent: {
    kicker: "Streetwear shopping experience",
    headline: "Clean fashion for everyday wear.",
    subline:
      "Explore graphic T-shirts, joggers, latest trends, and limited drops.",
    action: "Shop Now",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "mobile-ui",
  title: "Avyukta Mobile",
  category: "Electronics E-commerce",
  icon: BiMobile,
  preview: "mobile",

  description:
    "Modern electronics storefront for car gadgets, smart accessories, audio products, chargers, toys, and daily-use tech.",

  deliverables: [
    "Responsive electronics storefront",
    "Category and product sections",
    "Promotional banner layouts",
  ],

  cardImage: "/images/ui-design/cards/avyuktamobile.webp",
  previewImage:
    "/images/ui-design/preview/Avyukta mobile Preview.webp",

  previewContent: {
    kicker: "Smart electronics storefront",
    headline: "Smart technology for everyday life.",
    subline:
      "Explore car gadgets, chargers, audio products, toys, and accessories.",
    action: "Explore Products",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "education-ui",
  title: "Books World",
  category: "Books & School Supplies",
  icon: Book,
  preview: "education",

  description:
    "School supply storefront for books, notebooks, stationery, uniforms, bags, and study essentials.",

  deliverables: [
    "Category and brand sections",
    "School and product browsing",
    "Promotional banner layouts",
  ],

  cardImage: "/images/ui-design/cards/booksworld.webp",
  previewImage:
    "/images/ui-design/preview/Books world store preview (2).webp",

  previewContent: {
    kicker: "School supply storefront",
    headline: "Everything needed for school and study.",
    subline:
      "Browse books, stationery, uniforms, bags, and learning essentials.",
    action: "Shop Now",
    metricLabel: "Store layout",
    metricValue: "10+ sections",
  },
},
  {
  id: "electronic-ui",
  title: "Byte Size Electronics",
  category: "Electronics E-commerce",
  icon: FcElectroDevices,
  preview: "electronic",

  description:
    "Electronics storefront for laptops, CCTV cameras, storage devices, printers, monitors, and computer accessories.",

  deliverables: [
    "Electronics category sections",
    "Product and offer grids",
    "Promotional banner layouts",
  ],

  cardImage: "/images/ui-design/cards/bytesize.webp",
  previewImage:
    "/images/ui-design/preview/byte size electronics preview.webp",

  previewContent: {
    kicker: "Electronics shopping experience",
    headline: "Smarter technology for work and security.",
    subline:
      "Browse laptops, CCTV cameras, storage products, printers, and accessories.",
    action: "Shop Products",
    metricLabel: "Store layout",
    metricValue: "12+ sections",
  },
},
  // {
  //   id: "portfolio-ui",
  //   title: "Portfolio UI Design",
  //   category: "Web",
  //   icon: Palette,
  //   preview: "portfolio",
  //   description:
  //     "Presentation-led portfolio experiences for designers, photographers, studios, creators, architects, and professionals.",
  //   deliverables: [
  //     "Project showcase layouts",
  //     "Case-study structure",
  //     "Personal brand presentation",
  //   ],
  //   cardImage: "/images/ui-design/cards/portfolio-ui.webp",
  //   previewImage: "/images/ui-design/previews/portfolio-ui.webp",
  //   previewContent: {
  //     kicker: "Creative portfolio",
  //     headline: "A project story that makes the work easier to understand.",
  //     subline:
  //       "Selected work, case studies, capability highlights, and enquiry paths.",
  //     action: "View Projects",
  //     metricLabel: "Selected work",
  //     metricValue: "14 cases",
  //   },
  // },
  // {
  //   id: "design-system",
  //   title: "Design System & UI Kit",
  //   category: "System",
  //   icon: Boxes,
  //   preview: "system",
  //   description:
  //     "Reusable components, styles, states, tokens, and guidelines that keep growing products visually consistent.",
  //   deliverables: [
  //     "Reusable component library",
  //     "Colour and type system",
  //     "States and usage guidance",
  //   ],
  //   cardImage: "/images/ui-design/cards/design-system-ui-kit.webp",
  //   previewImage: "/images/ui-design/previews/design-system-ui-kit.webp",
  //   previewContent: {
  //     kicker: "Design system",
  //     headline: "Reusable UI rules that keep every screen consistent.",
  //     subline:
  //       "Components, tokens, variants, states, and practical usage guidance.",
  //     action: "Browse Library",
  //     metricLabel: "Components",
  //     metricValue: "64 ready",
  //   },
  // },
];

/*
 * Add a new design using this structure:
 *
 * {
 *   id: "new-ui-design",
 *   title: "New UI Design",
 *   category: "Web",
 *   icon: Monitor,
 *   preview: "website",
 *   description: "Write the design description here.",
 *   deliverables: [
 *     "First deliverable",
 *     "Second deliverable",
 *     "Third deliverable",
 *   ],
 *   cardImage: "/images/ui-design/new-card.jpg",
 *   previewImage: "/images/ui-design/new-preview.jpg",
 *   previewContent: {
 *     kicker: "Short preview label",
 *     headline: "Main preview heading.",
 *     subline: "Short preview description.",
 *     action: "View Design",
 *     metricLabel: "Screens",
 *     metricValue: "08",
 *   },
 * }
 */

export const includedItems = [
  {
    icon: Layers3,
    title: "Responsive screen layouts",
    description:
      "Desktop, tablet, and mobile thinking based on the product requirement.",
  },
  {
    icon: Palette,
    title: "Visual style direction",
    description:
      "Typography, colour, spacing, hierarchy, and brand personality.",
  },
  {
    icon: Boxes,
    title: "Reusable components",
    description:
      "Buttons, inputs, cards, navigation, states, and repeatable UI patterns.",
  },
  {
    icon: Code2,
    title: "Developer-friendly handoff",
    description:
      "Organized layouts and design decisions prepared for implementation.",
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Understand the product",
    description:
      "Define the audience, user goal, business objective, required screens, and platform.",
  },
  {
    number: "02",
    title: "Plan the experience",
    description:
      "Organize information, screen relationships, important actions, and the overall user journey.",
  },
  {
    number: "03",
    title: "Design the interface",
    description:
      "Create polished screens with a consistent visual system, responsive logic, and clear interaction states.",
  },
  {
    number: "04",
    title: "Review and prepare",
    description:
      "Refine the selected direction and organize the final layouts for development or presentation.",
  },
];
