import {
  Geist,
  Geist_Mono,
  Playfair_Display,
  Inter,
  Nunito,
} from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AxiosProvider } from "@/providers/AxiosProvider";
import AuthProvider from "@/providers/AuthProvider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ClientLayout from "@/ClientLayout/ClientLayout";
import { SubscriptionProvider } from "@/providers/SubscriptionProvider";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"], // Add weights as needed
  variable: "--font-playfair",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["400", "600", "700"], // optional, depending on your needs
  display: "swap",
});

export const metadata = {
  title: {
    default: "Home | STELYS",
    template: "%s | STELYS",
  },
  description:
    "STELYS is a modern web platform designed for people with disabilities, chronic illness, and anyone who needs a calmer AI experience.",
  keywords: [
    "STELYS",
    "mental health",
    "emotional well-being",
    "self-care",
    "wellness platform",
    "AI therapy",
    "accessible technology",
    "chronic illness support",
    "disability-friendly",
    "calm AI experience",
    "disability support",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={playfair.variable}>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
      </head>
      <body className={`${inter.variable} antialiased ${nunito.variable}`}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          <AuthProvider>
            <AxiosProvider>
              <SubscriptionProvider>
                {/* <Navbar/> */}
                <ClientLayout>{children}</ClientLayout>
                {/* <Footer/> */}
              </SubscriptionProvider>
            </AxiosProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
