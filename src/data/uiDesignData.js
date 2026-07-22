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
} from "lucide-react";

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
    id: "website-ui",
    title: "Website UI Design",
    category: "Web",
    icon: Monitor,
    preview: "website",
    description:
      "Responsive website interfaces created for service businesses, brands, agencies, corporate sites, and modern online experiences.",
    deliverables: [
      "Desktop and mobile layouts",
      "Reusable page sections",
      "Clear content hierarchy",
    ],
    cardImage: "",
    previewImage:
      "/images/ui-design/Advaita Collections Preview.webp",
    previewContent: {
      kicker: "Modern business website",
      headline: "A clearer digital home for a growing brand.",
      subline:
        "Responsive sections, focused content, and a confident visual hierarchy.",
      action: "Explore Services",
      metricLabel: "Page system",
      metricValue: "08 screens",
    },
  },
  {
    id: "mobile-app-ui",
    title: "Mobile App UI Design",
    category: "Mobile",
    icon: Smartphone,
    preview: "mobile",
    description:
      "Focused mobile interfaces for iOS and Android applications with practical navigation, clear actions, and consistent screens.",
    deliverables: [
      "Core app screens",
      "Mobile navigation system",
      "Responsive component states",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Mobile product experience",
      headline: "Daily tasks made simple and easy to scan.",
      subline:
        "Focused mobile navigation, quick actions, and consistent screen states.",
      action: "Continue",
      metricLabel: "App flow",
      metricValue: "12 screens",
    },
  },
  {
    id: "ecommerce-ui",
    title: "E-commerce UI Design",
    category: "Web",
    icon: ShoppingBag,
    preview: "ecommerce",
    description:
      "Conversion-focused storefronts for product discovery, category browsing, product details, cart, and checkout journeys.",
    deliverables: [
      "Storefront and collection pages",
      "Product detail experience",
      "Cart and checkout flow",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Storefront experience",
      headline: "Discover products without losing momentum.",
      subline:
        "Category browsing, product storytelling, cart, and checkout direction.",
      action: "Shop Collection",
      metricLabel: "Conversion flow",
      metricValue: "06 steps",
    },
  },
  {
    id: "dashboard-ui",
    title: "Dashboard & Admin UI",
    category: "Product",
    icon: LayoutDashboard,
    preview: "dashboard",
    description:
      "Structured dashboards for analytics, operations, management, reporting, CRM, inventory, and internal business tools.",
    deliverables: [
      "Data-focused dashboards",
      "Tables, filters, and charts",
      "Admin navigation patterns",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Operations dashboard",
      headline: "Important business data in one organized view.",
      subline:
        "Reports, filters, tables, charts, and actions built for fast decisions.",
      action: "View Report",
      metricLabel: "Live insight",
      metricValue: "+24.8%",
    },
  },
  {
    id: "saas-ui",
    title: "SaaS Product UI",
    category: "Product",
    icon: Rocket,
    preview: "saas",
    description:
      "Scalable product interfaces for software platforms, subscription tools, onboarding flows, settings, and user workspaces.",
    deliverables: [
      "Product workspace screens",
      "Onboarding experience",
      "Scalable UI patterns",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "SaaS workspace",
      headline: "A scalable product interface for everyday work.",
      subline:
        "Onboarding, workspace tools, settings, and reusable product patterns.",
      action: "Open Workspace",
      metricLabel: "Active users",
      metricValue: "2.4k",
    },
  },
  {
    id: "landing-page-ui",
    title: "Landing Page UI",
    category: "Web",
    icon: FileText,
    preview: "landing",
    description:
      "High-impact landing pages for launches, campaigns, lead generation, app promotion, and focused product offers.",
    deliverables: [
      "Conversion-led page structure",
      "Hero and feature sections",
      "Strong call-to-action flow",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Campaign landing page",
      headline: "One focused page built around one clear action.",
      subline:
        "A persuasive hero, benefit flow, proof, and conversion-led sections.",
      action: "Get Started",
      metricLabel: "Lead intent",
      metricValue: "High",
    },
  },
  {
    id: "booking-ui",
    title: "Booking & Service UI",
    category: "Industry",
    icon: CalendarDays,
    preview: "booking",
    description:
      "Easy-to-follow interfaces for appointments, consultations, reservations, service selection, and schedule management.",
    deliverables: [
      "Service selection screens",
      "Calendar and time slots",
      "Booking confirmation flow",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Booking experience",
      headline: "Choose a service and reserve a time with ease.",
      subline:
        "Service selection, calendar availability, details, and confirmation.",
      action: "Book a Slot",
      metricLabel: "Available today",
      metricValue: "08 slots",
    },
  },
  {
    id: "fintech-ui",
    title: "Fintech UI Design",
    category: "Industry",
    icon: CreditCard,
    preview: "fintech",
    description:
      "Trust-focused interfaces for digital payments, wallets, finance dashboards, account management, and transaction flows.",
    deliverables: [
      "Account overview screens",
      "Payment and transfer flows",
      "Transaction history UI",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Finance dashboard",
      headline: "Money movement that feels clear and trustworthy.",
      subline:
        "Balances, transfers, transactions, and account actions in one system.",
      action: "Send Money",
      metricLabel: "Current balance",
      metricValue: "₹42,850",
    },
  },
  {
    id: "healthcare-ui",
    title: "Healthcare UI Design",
    category: "Industry",
    icon: HeartPulse,
    preview: "healthcare",
    description:
      "Accessible healthcare interfaces for appointments, patient dashboards, reports, teleconsultation, and care management.",
    deliverables: [
      "Patient-friendly layouts",
      "Appointment journeys",
      "Health information screens",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Patient experience",
      headline: "Healthcare information without unnecessary complexity.",
      subline:
        "Appointments, reports, care details, and consultation access.",
      action: "Book Visit",
      metricLabel: "Next appointment",
      metricValue: "10:30 AM",
    },
  },
  {
    id: "education-ui",
    title: "Education & LMS UI",
    category: "Industry",
    icon: GraduationCap,
    preview: "education",
    description:
      "Learning interfaces for courses, student dashboards, lessons, progress tracking, assessments, and instructor tools.",
    deliverables: [
      "Course and lesson screens",
      "Learning progress UI",
      "Student dashboard layouts",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Learning platform",
      headline: "Courses, progress, and lessons in one calm workspace.",
      subline:
        "Student dashboards, lesson structure, assessments, and progress views.",
      action: "Resume Course",
      metricLabel: "Course progress",
      metricValue: "72%",
    },
  },
  {
    id: "food-ui",
    title: "Restaurant & Food UI",
    category: "Industry",
    icon: UtensilsCrossed,
    preview: "food",
    description:
      "Visual ordering and discovery experiences for restaurants, cloud kitchens, food delivery, menus, and table reservations.",
    deliverables: [
      "Menu and category screens",
      "Ordering journey",
      "Restaurant profile UI",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Food ordering experience",
      headline: "Browse the menu and order without friction.",
      subline:
        "Food discovery, item details, customization, cart, and order status.",
      action: "Order Now",
      metricLabel: "Delivery estimate",
      metricValue: "28 min",
    },
  },
  {
    id: "portfolio-ui",
    title: "Portfolio UI Design",
    category: "Web",
    icon: Palette,
    preview: "portfolio",
    description:
      "Presentation-led portfolio experiences for designers, photographers, studios, creators, architects, and professionals.",
    deliverables: [
      "Project showcase layouts",
      "Case-study structure",
      "Personal brand presentation",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Creative portfolio",
      headline: "A project story that makes the work easier to understand.",
      subline:
        "Selected work, case studies, capability highlights, and enquiry paths.",
      action: "View Projects",
      metricLabel: "Selected work",
      metricValue: "14 cases",
    },
  },
  {
    id: "design-system",
    title: "Design System & UI Kit",
    category: "System",
    icon: Boxes,
    preview: "system",
    description:
      "Reusable components, styles, states, tokens, and guidelines that keep growing products visually consistent.",
    deliverables: [
      "Reusable component library",
      "Colour and type system",
      "States and usage guidance",
    ],
    cardImage: "",
    previewImage: "",
    previewContent: {
      kicker: "Design system",
      headline: "Reusable UI rules that keep every screen consistent.",
      subline:
        "Components, tokens, variants, states, and practical usage guidance.",
      action: "Browse Library",
      metricLabel: "Components",
      metricValue: "64 ready",
    },
  },
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
