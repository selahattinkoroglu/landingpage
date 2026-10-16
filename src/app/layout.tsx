import type { Metadata } from "next";
import { Manrope, Anton } from "next/font/google";
import "./globals.css";
import "./refinement.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});
const editorial = Anton({
  variable: "--font-anton",
  subsets: ["latin", "latin-ext"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://konyaarazozkiralama.com"),
  title: "Konya Arazöz ve Su Tankeri Kiralama | Arazöz Otomotiv",
  description:
    "2002’den beri Konya ve tüm ilçelerinde şoförlü arazöz, su tankeri kiralama, şantiye su ikmali ve sulama. Saatlik, günlük, haftalık, aylık kiralama. 0543 430 20 10.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Arazöz Otomotiv — Suyun gücüyle.",
    description:
      "Konya arazöz ve su tankeri kiralama. İşiniz nerede, biz oradayız.",
    locale: "tr_TR",
    type: "website",
    url: "/",
    siteName: "Arazöz Otomotiv",
    images: [
      {
        url: "/images/hero/hero.png",
        width: 1672,
        height: 941,
        alt: "Arazöz Otomotiv Ford Cargo su tankeri",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${sans.variable} ${editorial.variable}`}>
      <body>{children}</body>
    </html>
  );
}
