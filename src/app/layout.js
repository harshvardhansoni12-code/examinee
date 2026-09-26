import { Plus_Jakarta_Sans } from "next/font/google";
import { NavBar } from "../../landing-page/components/navbar/navbar.jsx";
import { Providers } from "./providers.jsx";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Examinee — Turn Every Quiz Into A Better Score",
  description: "Playful, intelligent AI study platform for mock exams, smart revision cards, and instant summaries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${plusJakartaSans.className} h-full antialiased`}>
      <body className="bg-paper-grid min-h-full text-[#171717] pt-20 selection:bg-[#FCE7F1] selection:text-[#C93678]">
        <Providers>
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#FFFDF9",
                color: "#171717",
                border: "2px solid #191919",
                borderRadius: "1rem",
                boxShadow: "4px 4px 0px #191919",
                fontWeight: "600",
                fontSize: "0.95rem",
                padding: "12px 20px",
              },
              success: {
                iconTheme: {
                  primary: "#E85B9C",
                  secondary: "#FFFFFF",
                },
              },
              error: {
                iconTheme: {
                  primary: "#EF4444",
                  secondary: "#FFFFFF",
                },
              },
            }}
          />
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
