import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE_CONFIG } from "@/lib/config";

export const viewport: Viewport = {
  themeColor: "#01040F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "LOGIKA LAB — Software Engineering | Ecosistemas a la Medida",
  description:
    "Firma de ingeniería de software y estudio de producto digital en Cúcuta, Colombia. Construimos ecosistemas tecnológicos escalables, seguros y 100% a la medida para empresas consolidadas.",
  metadataBase: new URL(SITE_CONFIG.url),
  authors: [{ name: SITE_CONFIG.founder.name }],
  creator: SITE_CONFIG.founder.name,
  publisher: SITE_CONFIG.brandName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/brand/isotype.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/isotype.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/brand/isotype.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/brand/isotype.png",
  },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.fullTitle,
    title: "LOGIKA LAB — Software Engineering | Ecosistemas a la Medida",
    description:
      "Tu operación, convertida en un sistema a tu medida. Ingeniería de software full-stack sin plantillas ni ataduras.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "LOGIKA LAB — Software Engineering",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LOGIKA LAB — Software Engineering",
    description:
      "Ecosistemas tecnológicos escalables, seguros y 100% a la medida para empresas consolidadas.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: SITE_CONFIG.brandName,
    alternateName: SITE_CONFIG.fullTitle,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/brand/logo.png`,
    image: `${SITE_CONFIG.url}/images/og-image.png`,
    description: SITE_CONFIG.description,
    telephone: "+573144899142",
    priceRange: "$$",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder.name,
      jobTitle: `${SITE_CONFIG.founder.role} & ${SITE_CONFIG.founder.profession}`,
      image: `${SITE_CONFIG.url}/brand/juan-david-figueroa.jpg`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.location.city,
      addressRegion: SITE_CONFIG.location.region,
      addressCountry: SITE_CONFIG.location.country,
    },
    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "technical inquiry",
      telephone: "+573144899142",
      email: SITE_CONFIG.contact.email,
      availableLanguage: ["Spanish"],
    },
    sameAs: [
      SITE_CONFIG.socials.linkedin,
      SITE_CONFIG.socials.github,
      SITE_CONFIG.socials.instagram,
    ],
  };

  return (
    <html lang="es-CO" className="scroll-smooth dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#01040F] text-white selection:bg-[#1154FF] selection:text-white antialiased">
        {children}
      </body>
    </html>
  );
}
