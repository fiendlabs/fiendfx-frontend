import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_ICON, APP_NAME, APP_URL } from "@/lib/constants";
import Header from "@/components/Header";
import Web3Provider from "@/providers/Web3Provider";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import App from "next/app";
import AppDirector from "@/components/AppController";
import { PHProvider } from "@/providers/AnalyticsProvider";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

const PostHogPageView = dynamic(() => import('@/components/PostHogPageView'), {
  ssr: false,
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <PHProvider>
      <body className={inter.className}>
        <ReactQueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={true}
          disableTransitionOnChange
        >
          <Web3Provider>
            <div>
              <PostHogPageView />
              {children}
            </div>
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
        </ReactQueryProvider>
      </body>
      </PHProvider>
    </html>
  );
}
