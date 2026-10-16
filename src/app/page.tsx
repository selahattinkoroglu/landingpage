import HomeExperience from "@/components/home-experience";

const business = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Arazöz Otomotiv",
  url: "https://konyaarazozkiralama.com",
  image: "https://konyaarazozkiralama.com/images/hero/hero.png",
  telephone: "+905434302010",
  email: "hakanercann@hotmail.com",
  foundingDate: "2002",
  description:
    "Konya ve tüm ilçelerinde şoförlü arazöz ve su tankeri kiralama.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fevziçakmak Mah. 10571. Sk. No:2",
    addressLocality: "Karatay",
    addressRegion: "Konya",
    addressCountry: "TR",
    postalCode: "42050",
  },
  areaServed: { "@type": "AdministrativeArea", name: "Konya" },
  openingHours: "Mo-Su 00:00-24:00",
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(business).replace(/</g, "\\u003c"),
        }}
      />
      <HomeExperience />
    </>
  );
}
