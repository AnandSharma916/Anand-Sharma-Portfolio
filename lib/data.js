export const profile = {
  name: "Anand Sharma",
  firstName: "Anand",
  roles: [
    "Full Stack Developer",
    "React.js Developer",
    "MERN Stack Developer",
    "UI/UX Enthusiast",
  ],
  tagline:
    "I build responsive, performant web experiences with React.js and the MERN stack — blending clean UI/UX with AI-assisted development.",
  location: "New Delhi, India",
  email: "anandkpp2023@gmail.com",
  phone: "+91 94794 54314",
  available: true,
  resume: "/Anand-Sharma-CV.pdf",
  socials: [
    { label: "GitHub", href: "https://github.com/anandsharma916", handle: "@anandsharma916" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/anandsharma916/", handle: "in/anandsharma916" },
    { label: "Email", href: "mailto:anandkpp2023@gmail.com", handle: "anandkpp2023@gmail.com" },
  ],
};

export const stats = [
  { value: "1.5+", label: "Years Experience" },
  { value: "50+", label: "Projects Shipped" },
  { value: "300+", label: "DSA Problems" },
  { value: "8.2", label: "MCA CGPA" },
];

export const about = {
  heading: "Building responsive, AI-assisted web experiences that feel effortless.",
  paragraphs: [
    "I'm a Full Stack Developer with 1.5+ years of experience building responsive web applications with React.js, JavaScript, and the MERN stack. I focus on clean UI/UX, fast load times, and pixel-perfect interfaces that work flawlessly across browsers and devices.",
    "At Promopact Marketing I've shipped 50+ client projects end-to-end — from responsive UI and SEO to deployment, cPanel hosting, and REST API integration. I lean heavily on AI tools and prompt engineering to move fast without compromising on quality.",
  ],
  highlights: [
    "Responsive Web Design",
    "UI/UX Design",
    "REST API Integration",
    "Frontend Optimization",
    "AI-Assisted Coding",
    "Production Deployment",
  ],
};

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React.js", level: 95 },
      { name: "JavaScript (ES6+)", level: 92 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Redux Toolkit", level: 85 },
    ],
  },
  {
    category: "Backend & Databases",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 84 },
      { name: "MongoDB", level: 82 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    category: "Tools & AI",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "GSAP & AOS", level: 85 },
      { name: "AI-Assisted Dev", level: 92 },
      { name: "Deployment & CI/CD", level: 85 },
    ],
  },
];

export const techStack = [
  "React.js", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB",
  "MySQL", "Redux Toolkit", "GSAP", "AOS", "Bootstrap", "jQuery",
  "REST APIs", "JWT", "Git", "GitHub", "Vercel", "Netlify", "Docker", "Figma",
];

export const experience = [
  {
    role: "Full-Stack Developer",
    company: "Promopact Marketing India Pvt. Ltd.",
    logo: "/promopact-logo.webp",
    period: "Jun 2025 — Present",
    location: "New Delhi, India · On-site",
    description:
      "Contributing to the development, deployment, and maintenance of web applications end-to-end. Build responsive, interactive UIs with React.js and Hooks (useState, useEffect), craft reusable components, and manage application state across live projects. Integrate REST APIs with dynamic data rendering and assist backend work using Node.js, Express.js, and PHP. Handle database design and CRUD with MySQL/MongoDB, plus deployment and hosting on cPanel — live servers, phpMyAdmin, domains, SSL, and mail configuration.",
    tags: ["React.js", "Next.js", "React Hooks", "Node.js", "Express.js", "PHP", "MySQL", "MongoDB", "cPanel"],
  },
  {
    role: "Frontend Developer — Intern",
    company: "Promopact Marketing India Pvt. Ltd.",
    logo: "/promopact-logo.webp",
    period: "Jun 2025 — Aug 2025",
    location: "New Delhi, India",
    description:
      "Developed responsive UI using HTML, CSS, JavaScript, and React.js, and built reusable components with React Hooks. Worked with GSAP animations and collaborative problem solving across the team.",
    tags: ["React.js", "JavaScript", "GSAP", "HTML", "CSS"],
  },
  {
    role: "Software Development Engineer — Intern",
    company: "Bluestock™",
    logo: "/bluestock-logo.webp",
    // wider mark than the others, so it carries a little less padding
    logoClass: "h-full w-full object-contain p-1",
    period: "Oct 2024 — Nov 2024",
    location: "Pune, Maharashtra, India · Remote",
    description:
      "Worked as an SDE intern building and styling web interfaces with HTML5, CSS, and JavaScript while collaborating with a remote engineering team.",
    tags: ["HTML5", "CSS", "JavaScript"],
  },
  {
    role: "Web Development & Designing — Intern",
    company: "Oasis Infobyte",
    logo: "/oasis-infobyte-logo.webp",
    period: "Mar 2024 — May 2024",
    location: "Delhi, India · Remote",
    description:
      "Completed a web development and design internship building responsive, interactive web pages and strengthening core front-end fundamentals across HTML, CSS, and JavaScript.",
    tags: ["HTML", "CSS", "JavaScript", "Web Design"],
  },
];

export const projects = [
  {
    title: "A India Print House — Playing Cards Manufacturer",
    blurb:
      "A live brand site for India’s leading custom playing cards manufacturer — a filterable collection showcase for bespoke, promotional and casino decks, animated craftsmanship stats, custom-quote and bespoke-order enquiry flows, and quick WhatsApp and call actions.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion"],
    accent: "from-iris-500 to-flame-500",
    featured: true,
    image: "/aiph-playing-cards.webp",
    demo: "https://www.aiphplayingcards.in/",
    source: "https://github.com/AnandSharma916/A-print-house--promopact.git",
  },
  {
    title: "MarketPro — AI-Powered CRM Platform",
    blurb:
      "An enterprise CRM that manages customers, projects, teams, and business operations from one dashboard — with AI-driven insights, real-time analytics, revenue and pipeline tracking, and secure role-based authentication.",
    tags: ["MERN Stack", "Gemini AI", "Real-Time Analytics"],
    accent: "from-iris-500 to-iris-600",
    featured: true,
    image: "/marketpro-crm.webp",
    demo: "https://customer-relationship-management-sy-steel.vercel.app/",
    source: "https://github.com/AnandSharma916/customer-relationship-management-system-bayanah.git",
  },
  {
    title: "Atal Hose — Hydraulic Machinery Website",
    blurb:
      "A live corporate website for a precision hydraulic machinery manufacturer — product catalogues for hose crimping, cutting, skiving and testing machines, downloadable brochures, image gallery, and click-to-call enquiry flows on a fast, SEO-friendly responsive build.",
    tags: ["React.js", "Tailwind CSS", "SEO Optimized"],
    accent: "from-iris-500 to-iris-300",
    featured: false,
    image: "/atal-hose.webp",
    demo: "https://www.hosecrimpingmachine.in/",
    source: "https://github.com/AnandSharma916/Atal-Hose-promopact-Company-Live-.git",
  },
  {
    title: "AI KhataBook — Workshop Management App",
    blurb:
      "An AI-assisted admin panel for an auto parts and workshop business — digital khata and billing, job and inventory tracking, customer records, and secure authentication, all managed from a single fast dashboard.",
    tags: ["React.js", "AI Integration", "Admin Dashboard"],
    accent: "from-fern-500 to-flame-600",
    featured: false,
    image: "/ai-khatabook.webp",
    demo: "https://ai-khatabook.vercel.app/",
    source: "https://github.com/AnandSharma916/AI-Shop-Maintenance-Workshop-App-AI-KhataBook-1.git",
  },
];

export const education = [
  {
    degree: "Master of Computer Applications (MCA)",
    school: "University School of ICT (USICT), GGSIPU",
    logo: "/ggsipu-logo.webp",
    logoClass: "h-full w-full object-contain p-1 bg-white",
    period: "Jul 2023 — Jul 2025",
    detail: "Delhi, India — Grade: 8.2 CGPA. Coursework across full-stack web development, databases, operating systems, and software engineering.",
    skills: [
      "MERN Stack",
      "React.js",
      "Node.js",
      "MongoDB",
      "JavaScript",
      "Java",
      "SQL / DBMS",
      "Object-Oriented Programming",
      "Computer Networking",
      "Git & GitHub",
    ],
  },
  {
    degree: "Bachelor's Degree, Science",
    school: "Vikram University, Ujjain",
    logo: "/vikram-university-logo.webp",
    logoClass: "h-full w-full object-contain p-1 bg-white",
    period: "Nov 2019 — Jul 2022",
    detail: "Grade: A. Activities and societies: Lead of Sports and quiz team.",
    skills: [
      "Team Management",
      "Statistics",
      "Communication",
      "Self-confidence",
      "Problem Solving",
      "Canva",
      "Calculations",
    ],
  },
];

// Secondary projects — rendered as a compact grid below the main Projects
// section (components/MoreProjects.jsx), not as full-width showcase rows.
export const moreProjects = [
  {
    title: "Roadeez — Auto Parts Export Website",
    blurb:
      "A live export-facing site for a New Delhi two & three wheeler spare parts manufacturer — a categorised product catalogue spanning headlights, indicators, panels and visors, export-market and certification highlights, and WhatsApp, call and email enquiry routing for international distributors.",
    tags: ["Next.js", "Tailwind CSS", "SEO Optimized"],
    year: "2025",
    image: "/roadeez.webp",
    demo: "https://roadeez.in/",
    source: "https://github.com/AnandSharma916/Roadeez",
  },
  {
    title: "FreshCraft AI — Smart Grocery Platform",
    blurb:
      "An AI-powered organic grocery store — one-click weekly meal plans, recipe-to-cart conversion that adds every ingredient at once, an AI chef assistant, live macro-nutrition tracking, and a 20-minute express delivery flow with VIP tiers and voice search.",
    tags: ["Next.js", "AI Integration", "E-Commerce"],
    year: "2025",
    image: "/freshcraft-ai.webp",
    demo: "https://freshcraft-ai-grocery.vercel.app/",
    source: "https://github.com/AnandSharma916/freshcraft-ai-grocery",
  },
  {
    title: "StudyNotion — EdTech Learning Platform",
    blurb:
      "A full-stack ed-tech platform where instructors publish courses and students enrol and learn — email and Google sign-in, protected student and instructor dashboards, section-wise course content, progress tracking, and a checkout flow, built on a REST API with JWT auth.",
    tags: ["MERN Stack", "JWT Auth", "REST APIs"],
    year: "2024",
    image: "/studynotion.webp",
    demo: "https://study-notion-anand.vercel.app/login",
    source: "https://github.com/AnandSharma916/StudyNotionAnand-",
  },
  {
    title: "Vartitva Health — Medical Implants Website",
    blurb:
      "A brand site for an orthopaedic implant supplier — solution pages for trauma, joints, spine and arthroscopy implants, quality and process sections that build clinical trust, and partner-with-us enquiry flows with floating call, WhatsApp and catalogue actions.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    year: "2024",
    image: "/vartitva-health.webp",
    demo: "https://vartitva.vercel.app/",
    source: "https://github.com/AnandSharma916/vartitva",
  },
  {
    title: "Rikaya — Ayurvedic Haircare Shopify Store",
    blurb:
      "A live Shopify storefront for a botanical hair colour brand — custom theme with a shade-wise product catalogue, hair colour kits and premium value packs, multi-currency and language switching, order tracking and how-to-use guides, plus WhatsApp support and promotional announcement bars.",
    tags: ["Shopify", "Liquid", "E-Commerce"],
    year: "2025",
    image: "/rikaya-care.webp",
    demo: "https://rikayacare.com/",
  },
];

export const certifications = [
  "Full Stack Web Development Certification",
  "React.js Development Certification",
  "JavaScript and Frontend Development Certification",
];

export const achievements = [
  "Solved 300+ DSA problems across platforms",
  "Secured AIR 812 in NMCET 2023",
  "State-Level Volleyball Captain",
  "Built & deployed 50+ responsive frontend and MERN projects",
];

export const testScores = [
  {
    title: "Airforce Exam — Selected",
    meta: "Score: 88 · Jul 2021",
    org: "Vikram University, Ujjain",
  },
  {
    title: "NDA (Defence) Exam — Selected",
    meta: "Qualified exam · Feb 2021",
    org: "Vikram University, Ujjain",
    detail: "2× SSB screening",
  },
  {
    title: "Regional College Exam — 7th Position, All India (GEN)",
    meta: "Score: Selected · Jun 2020",
    org: "Vikram University, Ujjain",
    detail: "Top 5 student in state (Science branch)",
  },
];

export const honors = [
  {
    title: "AIR 812 in NIMCET 2023",
    meta: "Apr 2023",
    org: "Vikram University, Ujjain",
  },
  {
    title: "National Talent Search (NTS)",
    meta: "State-Level Achievement · Oct 2019",
    org: "Tagore Convent Higher Secondary School",
    detail: "5th Position — October 2019",
  },
  {
    title: "Science Quiz Test",
    meta: "State-Level Achievement · Sep 2018",
    org: "Tagore Convent Higher Secondary School",
    detail: "Third Rank — September 2018",
  },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  // Re-enable together with <Achievements /> in app/page.js
  // { label: "Awards", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];
