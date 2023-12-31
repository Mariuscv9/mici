import "./globals.css";
import { Inter } from "next/font/google";
import Header from "components/Header";
import Footer from "components/Footer";
import styles from "app/page.module.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "To mici or not to mici",
  description:
    "Weather app that let's you know if it's safe to grill your mici or not",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
         <main className={styles.main}>{children}</main>
        
        <Footer />
      </body>
    </html>
  );
}
