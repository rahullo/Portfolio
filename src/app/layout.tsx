import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import ToastContainer from "@/components/Toast";
import GlobalEffects from "@/components/GlobalEffects";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Rahul Lohra — AI Engineer & Product Builder",
  description:
    "Engineering AI systems from idea to production. I build intelligent products combining machine learning, scalable backends, and exceptional user experiences.",
  keywords: [
    "AI Engineer",
    "Full Stack Developer",
    "Machine Learning",
    "Freelancer",
    "Product Builder",
    "Python",
    "Django",
    "React",
    "Next.js",
    "NLP",
    "Federated Learning",
  ],
  authors: [{ name: "Rahul Lohra" }],
  openGraph: {
    title: "Rahul Lohra — AI Engineer & Product Builder",
    description:
      "Engineering AI systems from idea to production. I build intelligent products combining machine learning, scalable backends, and exceptional user experiences.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Lohra — AI Engineer & Product Builder",
    description:
      "Engineering AI systems from idea to production.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Rahul Lohra",
              jobTitle: "AI Engineer & Product Builder",
              description:
                "Engineering AI systems from idea to production.",
              url: "https://rahullohra.dev",
              sameAs: [
                "https://github.com/rahullohra",
                "https://linkedin.com/in/rahullohra",
              ],
            }),
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-black text-white relative"
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <GlobalEffects />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
