"use client";

import Image from "next/image";
import { WhatsAppIcon } from "./whatsapp-icon";
import { Gallery4 } from "./ui/gallery4";
import { FleetShowcase } from "./fleet-showcase";
import { WaterSpray } from "./water-spray";
import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  Menu,
  X,
  MapPin,
  Mail,
  Navigation,
  Plus,
} from "lucide-react";

const phone = "tel:+905434302010";
const whatsapp =
  "https://wa.me/905434302010?text=Merhaba%2C%20Konya'da%20su%20tankeri%20kiralama%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.";
const services = [
  {
    title: "Şantiyenin\nhayat kaynağı.",
    name: "Şantiye su ikmali",
    text: "İnşaatınızın su ihtiyacını birlikte planlayalım. Şantiye, beton santrali ve depolarınız için suyu çalışma alanınıza taşıyoruz.",
    image: "ford-cargo-4-dingil-arazoz.jpg",
    tag: "İNŞAAT & ŞANTİYE",
    position: "center 63%",
  },
  {
    title: "Her yol,\ntemiz bir başlangıç.",
    name: "Yol yıkama ve sulama",
    text: "Yol bakımından dolgu zemininin sıkıştırılmasına; yıkama ve sulama çalışmalarında sahaya uygun araçla yanınızdayız.",
    image: "arazoz-sulama-tankeri-arka.jpg",
    tag: "YOL & ALTYAPI",
    position: "center 65%",
  },
  {
    title: "Tozu geride\nbırakın.",
    name: "Toz engelleme",
    text: "Hafriyat ve şantiye alanlarında tozu kontrol altında tutmak için iş akışınıza uygun, periyodik sulama programı oluşturuyoruz.",
    image: "ford-cargo-2524-arazoz.jpg",
    tag: "SAHA & ÇEVRE",
    position: "center 65%",
  },
  {
    title: "Toprağa su.\nEmeğe destek.",
    name: "Tarla ve bahçe sulama",
    text: "Tarlanız, bahçeniz ve yeşil alanlarınız için basınçlı pompa sistemiyle sulama hizmeti sunuyoruz.",
    image: "bmc-fatih-180-su-tankeri.jpg",
    tag: "TARIM & YEŞİL ALAN",
    position: "center",
  },
  {
    title: "Sahanız için\nyerinde çözüm.",
    name: "Hafriyat ve moloz sulama",
    text: "Hafriyat çalışmalarında zemin nemlendirme ve moloz sulaması için araç ve şoför desteği sağlıyoruz.",
    image: "bmc-fatih-arazoz-sulama.jpg",
    tag: "HAFRİYAT & ZEMİN",
    position: "center 62%",
  },
  {
    title: "İhtiyaç nerede,\nsuyumuz orada.",
    name: "Beton sulama ve depo dolumu",
    text: "Beton sulaması, tank dolumu ve acil su ihtiyaçlarınız için işin süresine uygun kiralama seçenekleri sunuyoruz.",
    image: "arazoz-sulama-tankeri-arka.jpg",
    tag: "BETON & DEPOLAMA",
    position: "center 75%",
  },
];
const fleet = [
  {
    name: "Ford Cargo 2524",
    type: "ARAZÖZ / AĞIR TONAJ",
    image: "ford-cargo-2524-arazoz.jpg",
    description: "Arazöz sulama donanımıyla sahadaki işinize hazır.",
    position: "center 63%",
  },
  {
    name: "BMC Fatih 180",
    type: "SU TANKERİ / ÜSTTEN TABANCALI",
    image: "bmc-fatih-180-su-tankeri.jpg",
    description:
      "Üstten tabancalı sulama düzeneğiyle tarla ve şantiye çalışmalarında.",
    position: "center",
  },
  {
    name: "Ford Cargo · 4 dingil",
    type: "SU TANKERİ / YÜKSEK HACİM",
    image: "ford-cargo-4-dingil-arazoz.jpg",
    description: "Yüksek hacimli su ihtiyacına uygun, dört dingilli tanker.",
    position: "center 65%",
  },
];
const districts = [
  "Karatay",
  "Selçuklu",
  "Meram",
  "Ereğli",
  "Akşehir",
  "Beyşehir",
  "Çumra",
  "Seydişehir",
  "Ilgın",
  "Kulu",
  "Cihanbeyli",
  "Karapınar",
  "Bozkır",
  "Kadınhanı",
  "Sarayönü",
];
const questions = [
  [
    "Kiralama fiyatı nasıl belirleniyor?",
    "Süre, tonaj, mesafe ve sefer sayısı birlikte değerlendirilir. İşin yerini ve ihtiyacınızı telefonda paylaşın; size uygun araç ve fiyatı netleştirelim.",
  ],
  [
    "Araçlar şoförlü mü geliyor?",
    "Evet. Araçlarımız deneyimli şoförümüzle birlikte hizmet verir. Sulama ve su taşıma işini ekibimiz yürütür.",
  ],
  [
    "Aynı gün araç kiralayabilir miyim?",
    "Araç müsaitliğine göre aynı gün yönlendirme yapabiliyoruz. Acil ihtiyacınız için bizi arayarak güncel durumu öğrenebilirsiniz.",
  ],
  [
    "Konya dışında hizmet veriyor musunuz?",
    "Öncelikli çalışma alanımız Konya ve tüm ilçeleridir. İl dışındaki işler mesafeye göre değerlendirilir; ayrıntılar için bizimle iletişime geçebilirsiniz.",
  ],
];

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#baslangic"
      aria-label="Arazöz Otomotiv — ana sayfa"
    >
      <Image src="/images/arazoz-otomotiv-logo.svg" alt="Arazöz Otomotiv" width={1895} height={633} className="brand-logo" />
    </a>
  );
}
function WhatsAppLink({
  className = "",
  children = "WhatsApp’tan yazın",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <WhatsAppIcon size={20} />
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}

export default function HomeExperience() {
  const root = useRef<HTMLDivElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  useEffect(() => {
    document.documentElement.dataset.motion = motionReduced ? "reduce" : "auto";
    return () => {
      delete document.documentElement.dataset.motion;
    };
  }, [motionReduced]);

  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);
      if (motionReduced) return;
      const media = gsap.matchMedia();
      media.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
          intro
            .from(
              ".hero-scene",
              { clipPath: "inset(7% 5% 7% 5%)", duration: 1.5 },
              0,
            )
            .from(".hero-image", { scale: 1.14, duration: 2 }, 0)
            .from(
              ".hero-eyebrow, .hero-description, .hero-actions, .hero-bottom",
              { y: 28, autoAlpha: 0, stagger: 0.1, duration: 0.9 },
              0.45,
            );
          SplitText.create(".hero-title", {
            type: "lines,words",
            mask: "lines",
            autoSplit: true,
            onSplit(self) {
              return gsap.from(self.words, {
                yPercent: 115,
                rotation: 3,
                duration: 1.15,
                stagger: 0.13,
                delay: 0.15,
                ease: "power4.out",
              });
            },
          });
          gsap.to(".hero-parallax", {
            yPercent: 18,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          });
          gsap.to(".hero-copy", {
            y: -90,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: 0.7,
            },
          });
          gsap.to(".header-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "bottom bottom",
              scrub: true,
            },
          });
          gsap.utils
            .toArray<HTMLElement>(".reveal-heading")
            .forEach((element) => {
              SplitText.create(element, {
                type: "lines,words",
                mask: "lines",
                autoSplit: true,
                onSplit(self) {
                  return gsap.from(self.words, {
                    yPercent: 110,
                    rotation: 2,
                    stagger: 0.055,
                    duration: 0.85,
                    ease: "power3.out",
                    scrollTrigger: {
                      trigger: element,
                      start: "top 88%",
                      once: true,
                    },
                  });
                },
              });
            });
          gsap.from(".stats > div", {
            y: 45,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: ".stats", start: "top 92%" },
          });
          gsap.from(".gallery4-card", {
            y: 42,
            rotation: 1.5,
            stagger: 0.07,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".gallery4",
              start: "top 80%",
              once: true,
            },
          });
          gsap.from(".fleet-stage", {
            clipPath: "inset(13% 7% 13% 7%)",
            ease: "none",
            scrollTrigger: {
              trigger: ".fleet-section",
              start: "top 75%",
              end: "center center",
              scrub: 0.7,
            },
          });
          gsap.to(".marquee-reel", {
            yPercent: -50, duration: 1.4, repeat: -1, repeatDelay: 4,
            stagger: 0.12, ease: "power3.inOut",
            scrollTrigger: { trigger: ".marquee", start: "top bottom", end: "bottom top", toggleActions: "play pause resume pause" },
          });
          gsap.from(".rental-options > a", {
            y: 65,
            rotation: 2,
            stagger: 0.08,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".rental-options", start: "top 85%" },
          });
          gsap.from(".radar-ring", {
            scale: 0.7,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: {
              trigger: ".coverage-section",
              start: "top 90%",
              end: "center center",
              scrub: 1,
            },
          });
          gsap.from(".contact-heading", {
            xPercent: -6,
            ease: "none",
            scrollTrigger: {
              trigger: ".contact-section",
              start: "top bottom",
              end: "center center",
              scrub: 0.7,
            },
          });
          const footer = gsap.timeline({
            defaults: { ease: "power3.out", duration: 0.9 },
            scrollTrigger: {
              trigger: ".site-footer",
              start: "top 85%",
              once: true,
            },
          });
          footer
            .from(".footer-column", { y: 55, autoAlpha: 0, stagger: 0.1 }, 0)
            .from(".footer-map-frame", { clipPath: "inset(0 100% 0 0)" }, 0.25)
            .from(
              ".footer-wordmark > span",
              { yPercent: 110, stagger: 0.12, duration: 1.2 },
              0.25,
            );
        },
        root,
      );
      return () => media.revert();
    },
    { scope: root, dependencies: [motionReduced], revertOnUpdate: true },
  );

  return (
    <div ref={root} className={motionReduced ? "motion-reduced" : undefined}>
      <a className="skip-link" href="#icerik">
        İçeriğe geç
      </a>
      <header className="site-header">
        <Brand />
        <nav aria-label="Ana menü" className="desktop-nav">
          <a href="#hizmetler">Hizmetlerimiz</a>
          <a href="#filomuz">Filomuz</a>
          <a href="#hakkimizda">Hakkımızda</a>
          <a href="#sss">S.S.S</a>
          <a href="#iletisim">İletişim</a>
        </nav>
        <a className="header-call" href={phone}>
          <Phone size={15} />
          <span>0543 430 20 10</span>
          <ArrowUpRight size={16} />
        </a>
        <WhatsAppLink className="header-whatsapp">WhatsApp</WhatsAppLink>
        <button
          ref={menuButton}
          className="menu-button"
          aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
          aria-expanded={menuOpen}
          aria-controls="mobil-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav
          id="mobil-menu"
          className="mobile-nav"
          aria-label="Mobil menü"
          hidden={!menuOpen}
        >
          {[
            ["#hizmetler", "Hizmetlerimiz"],
            ["#filomuz", "Filomuz"],
            ["#hakkimizda", "Hakkımızda"],
            ["#sss", "S.S.S"],
            ["#iletisim", "İletişim"],
          ].map(([href, name]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>
              {name}
              <ArrowUpRight />
            </a>
          ))}
          <WhatsAppLink />
        </nav>
        <span className="header-progress" aria-hidden="true" />
      </header>

      <main id="icerik">
        <section className="hero" id="baslangic" aria-labelledby="hero-heading">
          <div className="hero-scene">
            <div className="hero-parallax">
              <Image
                src="/images/hero/hero.png"
                alt="Arazöz Otomotiv’in Ford Cargo su tankeri, gün batımında"
                fill
                preload
                sizes="100vw"
                className="hero-image"
              />
              <div className="hero-shade" />
              <WaterSpray reducedMotion={motionReduced} boosted />
            </div>
          </div>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" /> KONYA’NIN SU GÜCÜ · 2002’DEN BERİ
            </p>
            <h1 className="hero-title" id="hero-heading">
              SUYUN
              <br /> <em>GÜCÜYLE.</em>
            </h1>
            <div className="hero-description">
              <p>İşiniz nerede, biz oradayız.</p>
              <span>
                Konya arazöz ve su tankeri kiralama.
                <br />
                Şantiyeden toprağa, hayatın aktığı her yere.
              </span>
            </div>
            <div className="hero-actions">
              <a href={phone} className="button button-camel">
                Birlikte işe başlayalım
                <ArrowUpRight size={19} />
              </a>
              <WhatsAppLink className="hero-whatsapp">WhatsApp</WhatsAppLink>
            </div>
          </div>
          <div className="hero-side-note" aria-hidden="true">
            GÜÇLÜ FİLO. GÜVENİLİR HİZMET.
          </div>
          <div className="hero-bottom">
            <a href="#hakkimizda" className="scroll-cue">
              <span className="scroll-circle">
                <ArrowDown size={17} />
              </span>
              GÜCÜMÜZÜ KEŞFEDİN
            </a>
            <span className="hero-location">
              <MapPin size={13} /> KARATAY, KONYA
            </span>
            <span className="hero-index">
              01 <span>/</span> 06
            </span>
          </div>
        </section>

        <div className="trust-strip">
          <div>
            <span className="status-dot" />
            7/24 hizmetinizde
          </div>
          <div>Şoförlü & bakımlı araçlar</div>
          <div>Hafif & ağır tonaj</div>
          <div>
            Konya’nın tüm ilçelerinde
            <ArrowUpRight size={16} />
          </div>
        </div>

        <section className="about-section section-pad" id="hakkimizda">
          <div className="section-label">
            <span>01 / BİZİ TANIYIN</span>
            <span>KÖKLERİMİZ KONYA’DA.</span>
          </div>
          <div className="about-grid">
            <div>
              <h2 className="reveal-heading">
                Sadece su taşımıyoruz.
                <br /> <em>İşinize güç katıyoruz.</em>
              </h2>
              <div className="about-foot">
                <span className="asterisk" aria-hidden="true">
                  ✳
                </span>
                <p>
                  Bir şantiyenin devamı.
                  <br />
                  Bir tarlanın can suyu.
                  <br />
                  Her seferde aynı sorumluluk.
                </p>
              </div>
            </div>
            <div className="about-right">
              <p>
                2002’den beri Konya’nın yollarındayız. İhtiyacınızı dinliyor,
                doğru aracı planlıyor, suyu ihtiyaç duyduğunuz yere
                ulaştırıyoruz.
              </p>
              <p>
                Deneyimli şoförlerimiz ve düzenli bakımlı filomuzla; tek
                seferlik işlerden uzun süreli projelere kadar yanınızdayız.
              </p>
              <a className="text-link sage-action" href="#filomuz">
                Gücümüzü yakından tanıyın
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="stats">
            <div>
              <strong>
                2002<span>’den beri</span>
              </strong>
              <p>Aynı şehir. Aynı sorumluluk.</p>
            </div>
            <div>
              <strong>
                7<span>/</span>24
              </strong>
              <p>İhtiyacınız olduğunda ulaşılabilir.</p>
            </div>
            <div>
              <strong>
                Her <em>ölçekte.</em>
              </strong>
              <p>İşinize uygun tonaj ve süre.</p>
            </div>
          </div>
        </section>

        <Gallery4
          title="Hayatın aktığı her yerde."
          description="Şantiyeden toprağa, işinize uygun su çözümleri."
          reducedMotion={motionReduced}
          items={services.map((service, index) => ({
            id: `hizmet-${index + 1}`,
            title: service.name,
            description: service.text,
            image: `/images/fleet/${service.image}`,
            href: phone,
            tag: service.tag,
          }))}
        />

        <section className="fleet-section section-pad" id="filomuz">
          <div className="section-label">
            <span>03 / SAHADAKİ GÜCÜMÜZ</span>
            <span>BAKIMLI ARAÇ. DENEYİMLİ EKİP!</span>
          </div>
          <div className="fleet-top">
            <h2 className="reveal-heading">
              İşe hazır.
              <br /> <em>Yola hazır.</em>
            </h2>
          </div>
          <FleetShowcase vehicles={fleet} reducedMotion={motionReduced} />
        </section>

        <div className="marquee marquee-rolling" aria-label="Doğru zaman. Doğru ekip. Doğru araç.">
          {["DOĞRU ZAMAN", "DOĞRU EKİP", "DOĞRU ARAÇ"].map((phrase) => (
            <div className="marquee-cell" key={phrase} aria-hidden="true">
              <div className="marquee-reel"><span>{phrase}</span><span>{phrase}</span></div>
            </div>
          ))}
        </div>

        <section className="rental-section section-pad" id="kiralama">
          <div className="section-label">
            <span>04 / SİZE UYAN KİRALAMA</span>
            <span>SÜREYİ SİZ BELİRLEYİN.</span>
          </div>
          <div className="rental-heading">
            <h2 className="reveal-heading">
              Bir saat ya da bir ay.
              <br /> <em>İhtiyacınız kadar.</em>
            </h2>
            <p>
              İşinizin yerini ve süresini paylaşın.
              <br />
              Araç, şoför ve planlama bizden.
            </p>
          </div>
          <div className="rental-options">
            {[
              ["Saatlik", "Kısa süreli, tek seferlik işler."],
              ["Günlük", "Gün boyu şantiye ve sulama."],
              ["Haftalık", "Devam eden projelerinize destek."],
              ["Aylık", "Düzenli işler için planlı hizmet."],
            ].map(([name, text], i) => (
              <a
                key={name}
                href={`https://wa.me/905434302010?text=${encodeURIComponent(`Merhaba, Konya'da ${name.toLocaleLowerCase("tr")} arazöz kiralama için fiyat almak istiyorum.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <span>0{i + 1}</span>
                  <ArrowUpRight />
                </div>
                <h3>{name}</h3>
                <p>{text}</p>
              </a>
            ))}
          </div>
          <p className="rental-note">
            Net ihtiyaç, net fiyat. Süre, mesafe, tonaj ve sefer sayısına göre
            teklif alın.
          </p>
        </section>

        <section className="coverage-section section-pad" id="bolgeler">
          <div className="coverage-visual" aria-hidden="true">
            <div className="radar-ring ring-one" />
            <div className="radar-ring ring-two" />
            <div className="radar-ring ring-three" />
            <div className="radar-line horizontal" />
            <div className="radar-line vertical" />
            <div className="radar-center">
              <MapPin size={30} />
              <strong>KONYA</strong>
              <span>KARATAY’DAN TÜM İLÇELERE</span>
            </div>
            <span className="radar-label label-one">SELÇUKLU</span>
            <span className="radar-label label-two">MERAM</span>
            <span className="radar-label label-three">KARATAY</span>
          </div>
          <div className="coverage-copy">
            <p className="section-label">05 / HİZMET BÖLGELERİMİZ</p>
            <h2 className="reveal-heading">
              Merkezimiz Karatay
              <br /> <em>Rotamız tüm Konya!</em>
            </h2>
            <p>
              Şehir merkezinden ilçelere, suya ihtiyaç duyulan her noktaya.
              Konumunuzu paylaşın, birlikte planlayalım.
            </p>
            <div className="districts">
              {districts.map((district) => (
                <span key={district}>{district}</span>
              ))}
              <span className="all-districts">ve tüm ilçeler</span>
            </div>
            <WhatsAppLink className="location-whatsapp">
              Konumunuzu paylaşın
            </WhatsAppLink>
          </div>
        </section>

        <section className="faq-section section-pad" id="sss" aria-label="Sıkça sorulan sorular">
          <div>
            <p className="section-label">AKLINIZDAKİ SORULAR</p>
            <h2>
              Başlamadan
              <br /> <em>önce.</em>
            </h2>
          </div>
          <div className="faq-list">
            {questions.map(([question, answer]) => (
              <details key={question}>
                <summary>
                  {question}
                  <Plus size={20} />
                </summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact-section section-pad" id="iletisim">
          <div className="section-label">
            <span>06 / BİRLİKTE BAŞLAYALIM</span>
            <span>
              <i className="status-dot" /> 7/24 ULAŞABİLİRSİNİZ
            </span>
          </div>
          <div className="contact-heading">
            <h2>
              İşiniz beklemesin.
              <br /> <em>Biz yola çıkalım.</em>
            </h2>
            <a
              href={phone}
              className="contact-round"
              aria-label="Arazöz Otomotiv’i arayın"
            >
              <ArrowUpRight />
            </a>
          </div>
          <div className="contact-bottom">
            <a href={phone} className="contact-phone">
              0543 430 20 10
            </a>
            <WhatsAppLink className="button button-dark" />
          </div>
        </section>
      </main>
      <footer className="site-footer" id="konum">
        <div className="footer-topline">
          <span>KONYA’DA BAŞLAYAN GÜVEN.</span>
          <span className="footer-availability">
            <i className="status-dot" /> 7/24 YANINIZDAYIZ
          </span>
        </div>
        <div className="footer-main">
          <div className="footer-column footer-identity">
            <Brand footer />
            <p>
              SUYUN GÜCÜNÜ
              <br />
              SAHAYA TAŞIYORUZ.
            </p>
            <address>
              Fevziçakmak Mah.
              <br />
              10571. Sk. No:2, 42050
              <br />
              Karatay / Konya
            </address>
          </div>
          <nav className="footer-column footer-nav" aria-label="Alt menü">
            <span className="small-label">KEŞFEDİN</span>
            <a href="#hizmetler">
              Hizmetlerimiz
              <ArrowUpRight />
            </a>
            <a href="#filomuz">
              Filomuz
              <ArrowUpRight />
            </a>
            <a href="#hakkimizda">
              Hakkımızda
              <ArrowUpRight />
            </a>
            <a href="#sss" className="faq-nav-link">S.S.S<ArrowUpRight /></a>
            <a href="#kiralama">
              Kiralama
              <ArrowUpRight />
            </a>
          </nav>
          <div className="footer-column footer-reach">
            <span className="small-label">İLETİŞİME GEÇİN</span>
            <a href={phone}>
              <Phone size={18} />
              <span>0543 430 20 10</span>
            </a>
            <a href="mailto:hakanercann@hotmail.com">
              <Mail size={18} />
              <span>hakanercann@hotmail.com</span>
            </a>
            <WhatsAppLink>WhatsApp’tan yazın</WhatsAppLink>
            <p>
              Bir telefonla başlayalım.
              <br />
              İşinize uygun çözümü birlikte bulalım.
            </p>
          </div>
          <div className="footer-column footer-map">
            <div className="footer-map-title">
              <span className="small-label">KARATAY’DAYIZ</span>
              <MapPin size={16} />
            </div>
            <div className="footer-map-frame">
              <iframe
                title="Arazöz Otomotiv — Karatay, Konya konumu"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d196.72944240960518!2d32.5323007!3d37.9147502!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d08f81f9b0725d%3A0x4eaf42483deacd82!2zU3UgVGFua2VyaSBBcmF6w7Z6IFPEsWbEsXIgVGFua2VyIEJhc8SxbsOnIFNpc3RlbWk!5e0!3m2!1sen!2str!4v1792108233053!5m2!1sen!2str"
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              className="directions-link"
              href="https://www.google.com/maps/dir/?api=1&destination=37.9147938%2C32.5326835"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Navigation size={16} />
              Yol Tarifi Al
              <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        <a
          className="footer-wordmark"
          href="#baslangic"
          aria-label="Arazöz Otomotiv — başa dön"
        >
          <span>ARAZÖZ</span>
          <span>OTOMOTİV</span>
        </a>
        <div className="footer-bottom">
          <span>© Arazöz Otomotiv</span>
          <span>Konya arazöz & su tankeri kiralama</span>
          <button
            className="motion-toggle"
            aria-pressed={motionReduced}
            onClick={() => setMotionReduced(!motionReduced)}
          >
            {motionReduced ? "Hareketi etkinleştir" : "Hareketi azalt"}
            <span aria-hidden="true">{motionReduced ? "+" : "−"}</span>
          </button>
          <a href="#baslangic">
            BAŞA DÖN <ArrowUpRight size={14} />
          </a>
        </div>
      </footer>
      <div className="mobile-contact">
        <a href={phone}>
          <Phone size={17} />
          Hemen arayın
        </a>
        <WhatsAppLink>WhatsApp</WhatsAppLink>
      </div>
    </div>
  );
}
