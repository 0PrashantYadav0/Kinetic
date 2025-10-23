import { Nunito_Sans, DM_Sans } from 'next/font/google'
import "./globals.css";
import Layout from '@/components/Layout/Layout'

const nunito = Nunito_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

const dmSans = DM_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
})

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Kinetic - Virtual Collaboration Platform",
  description: "Experience seamless virtual meetings, interactive workspaces, and real-time collaboration in a beautifully designed 2D environment. Built with cutting-edge technology for the future of remote work.",
  keywords: "virtual collaboration, video chat, remote work, virtual spaces, team meetings, online workspace",
  authors: [{ name: "Prashant Yadav" }],
  openGraph: {
    title: "Kinetic - Virtual Collaboration Platform",
    description: "Experience seamless virtual meetings, interactive workspaces, and real-time collaboration in a beautifully designed 2D environment.",
    url: "https://github.com/0PrashantYadav0/Kinetic",
    siteName: "Kinetic",
    images: [
      {
        url: "/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Kinetic - Virtual Collaboration Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetic - Virtual Collaboration Platform",
    description: "Experience seamless virtual meetings, interactive workspaces, and real-time collaboration in a beautifully designed 2D environment.",
    images: ["/thumbnail.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.className}>
      <body>
        <Layout>
            {children}
        </Layout>
      </body>
    </html>
  );
}
