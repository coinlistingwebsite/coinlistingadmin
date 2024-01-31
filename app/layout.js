import { Montserrat } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";

const inter = Montserrat({ subsets: ["cyrillic"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <Layout>
          <div className="text-montserrat">{children}</div>
        </Layout>
      </body>
    </html>
  );
}
