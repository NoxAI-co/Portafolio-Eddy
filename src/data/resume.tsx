import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Eddy Santiago",
  initials: "ES",
  url: "https://eddys.dev/",
  location: "San Francisco, CA",
  locationLink: "https://www.google.com/maps/place/medellin",
  description: "Desarrollador de software",
  summary:
    "Me enfoco en construir productos web escalables con tecnologías modernas y enfoque en UX y performance.",
  avatarUrl: "/me.png",
  skills: [
    { name: "Laravel", icon: <Icons.laravel className="size-4" /> },
    { name: "Next.js", icon: <Icons.nextjs className="size-4" /> },
    { name: "TypeScript", icon: <Icons.typescript className="size-4" /> },
    { name: "React", icon: <Icons.react className="size-4" /> },
    { name: "WordPress", icon: <Icons.wordpress className="size-4" /> },
    { name: "Figma", icon: <Icons.figma className="size-4" /> },
    { name: "Elementor", icon: <Icons.elementor className="size-4" /> },
    { name: "Vue.js", icon: <Icons.vuejs className="size-4" /> },
    { name: "MySQL", icon: <Icons.mysql className="size-4" /> },
    { name: "PostgreSQL", icon: <Icons.postgresql className="size-4" /> },
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
  ],
  contact: {
    email: "hello@example.com",
    tel: "+123456789",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/eddysantiagoo",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/eddysantiagoo/",
        icon: Icons.linkedin,

        navbar: true,
      },
      Instagram: {
        name: "Instagram",
        url: "https://www.instagram.com/eddy.santiagoo/",
        icon: Icons.instagram,

        navbar: true,
      },
      // X: {
      //   name: "X",
      //   url: "https://dub.sh/dillion-twitter",
      //   icon: Icons.x,

      //   navbar: true,
      // },
      // Youtube: {
      //   name: "Youtube",
      //   url: "https://dub.sh/dillion-youtube",
      //   icon: Icons.youtube,
      //   navbar: true,
      // },
      // email: {
      //   name: "Send Email",
      //   url: "#",
      //   icon: Icons.email,

      //   navbar: false,
      // },
    },
  },

  work: [
    {
      company: "NoxAI",
      href: "https://principal.gestoru.com/",
      badges: [],
      location: "Medellin, Colombia",
      title: "Desarrollador Frontend",
      logoUrl: "/nox.png",
      start: "May 2025",
      end: "Mar 2026",
      description:
        "Desarrollé soluciones fullstack para clientes privados, incluyendo un e-commerce B2B integrado con SAP, una plataforma de reservas de hoteles y tours con APIs en tiempo real, y herramientas de IA con MCPs, plugins y orquestación de modelos (Claude, Gemini, Kimi K2.6, Qwen 3.5) para automatizar flujos de desarrollo empresarial.",
    },
    {
      company: "Vibio Labs",
      href: "https://principal.gestoru.com/",
      badges: [],
      location: "Medellin, Colombia",
      title: "Co-fundador y Arquitecto Principal de Frontend",
      logoUrl: "/vibio.png",
      start: "Ene 2025",
      end: "Ene 2026",
      description:
        "Diseñé y lideré la arquitectura de frontend en Next.js 15 para un CRM conversacional en tiempo real, estableciendo estándares de componentización y patrones de diseño que optimizaron la escalabilidad, el rendimiento y la colaboración con el backend, mientras contribuía a la visión del producto e integraba APIs internas y de terceros para automatizar embudos de ventas, campañas de mensajería masiva y flujos avanzados de interacción con clientes.",
    },
    {
      company: "Gestoru Software",
      href: "https://principal.gestoru.com/",
      badges: [],
      location: "Medellin, Colombia",
      title: "Desarrollador Frontend y Diseñador UI UX",
      logoUrl: "/gestoru.webp",
      start: "Jun 2023",
      end: "Presente",
      description:
        "Diseñé e implementé soluciones web escalables y centradas en el usuario, creando componentes reutilizables, liderando el desarrollo de un catálogo de repuestos en línea para el mercado colombiano, integrando el frontend con backend en Laravel y APIs internas, optimizando el rendimiento en un 29% mediante lazy loading y code splitting, co-desarrollando herramientas de seguimiento de soporte, aplicando Design Thinking, realizando auditorías de accesibilidad, validando interfaces con wireframes y prototipos, y desarrollando sitios en WordPress con Elementor, WooCommerce y Jetpack para mejorar la experiencia del cliente.",
    },
  ],
  education: [
    {
      school: "Institución Universitaria Digital de Antioquia",
      href: "https://www.iudigital.edu.co/",
      degree: "Tecnólogo en desarrollo de software",
      logoUrl: "/iudigital.jpg",
      start: "Ene 2020",
      end: "Sep 2023",
    },
  ],
  projects: [
    {
      title: "ColombiAventura",
      href: "https://colombiaventura.com/co",
      dates: "Feb 2026",
      active: true,
      description:
        "Colombia Aventura es una agencia de turismo con sede en Itaguí. Enfocada en experecnas de viaje por Colombia para turistas y viajeros, ofrece tours personalizados, paquetes turísticos y servicios de transporte.",
      technologies: ["Next.js"],
      links: [
        {
          type: "Web",
          href: "https://colombiaventura.com/co",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/colombiaventura.png",
      video: "",
    },
    {
      title: "Rendi",
      href: "https://rendi.eddys.dev/",
      dates: "Dic 2024",
      active: true,
      description:
        "Aplicación web para calcular y comparar rendimientos de diferentes cuentas de ahorro y depósitos de bajo monto en Colombia",
      technologies: ["Next.js", "Zustand"],
      links: [
        {
          type: "Web",
          href: "https://rendi.eddys.dev/",
          icon: <Icons.globe className="size-3" />,
        },
      ],
      image: "/rendi.png",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Hack Western 5",
      dates: "November 23rd - 25th, 2018",
      location: "London, Ontario",
      description:
        "Developed a mobile application which delivered bedtime stories to children using augmented reality.",
      image:
        "https://pub-83c5db439b40468498f97946200806f7.r2.dev/hackline/hack-western.png",
      mlh: "https://s3.amazonaws.com/logged-assets/trust-badge/2019/mlh-trust-badge-2019-white.svg",
      links: [],
    },
  ],
} as const;
