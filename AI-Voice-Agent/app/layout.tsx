import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { Header } from "@/components/header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { GlobalNotifications } from "@/components/notifications/GlobalNotifications"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Voice Agent",
  description: "Modern frontend for AI voice agent system",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <div className="flex h-screen w-full bg-background">
              <Sidebar />
              <div className="flex-1 flex flex-col min-h-0 min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto">
                  <div className="container mx-auto py-6">
                    {children}
                  </div>
                </main>
              </div>
            </div>
            <GlobalNotifications />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

